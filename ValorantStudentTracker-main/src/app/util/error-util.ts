import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NoStudentExistsError } from "../spreadsheet.service";

export function handleError(snackBar: MatSnackBar, error: Error) {
    if (error instanceof HttpErrorResponse) {
        handleHttpError(snackBar, error);
    } else {
        handleUnexpectedError(snackBar, error);
    }

    console.log(error);
}

function handleHttpError(snackBar: MatSnackBar, error: HttpErrorResponse) {
    var errorMessage: string = `Woah! Something went wrong (${error.status})`;
    if (error.status === 404) {
        errorMessage = "Page not found...";
    } else if (error.status === 429) {
        errorMessage = "Daily request limit exceeded... try again tomorrow!";
    }

    snackBar.open(errorMessage, 'Dismiss', {
        panelClass: ['snackbar-warn']
    });
}

function handleUnexpectedError(snackBar: MatSnackBar, error: NoStudentExistsError) {
    snackBar.open(`Unexpected exception... check console...`, 'Dismiss', {
        panelClass: ['snackbar-warn']
    });
}