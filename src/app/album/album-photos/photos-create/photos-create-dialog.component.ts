import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-photos-overview-example-dialog",
    templateUrl: "./photos-create-dialog.component.html",
})
export class PhotoCreateDialogComponent {

    constructor(public dialogRef: MatDialogRef<PhotoCreateDialogComponent>) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
