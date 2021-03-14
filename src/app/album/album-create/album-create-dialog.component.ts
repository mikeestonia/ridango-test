import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-dialog-overview-example-dialog",
    templateUrl: "./album-create-dialog.component.html",
})
export class AlbumCreateDialogComponent {

    constructor(public dialogRef: MatDialogRef<AlbumCreateDialogComponent>) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
