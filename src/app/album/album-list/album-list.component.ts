import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { take, tap } from "rxjs/operators";
import { Album } from "src/app/user/user.model";
import { UserService } from "src/app/user/user.service";
import { AlbumCreateDialogComponent } from "../album-create/album-create-dialog.component";

@Component({
  selector: "app-album-list",
  templateUrl: "./album-list.component.html",
  styleUrls: ["./album-list.component.scss"]
})
export class AlbumListComponent implements OnInit, OnDestroy {

  @Input() userId: number | undefined;

  albums: Album[] | undefined;

  userAlbums$$: Subscription | undefined;

  constructor(private userService: UserService, public dialog: MatDialog, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.userAlbums$$ = this.userService.getUserAlbums$(this.userId).pipe(
      tap((albums) => {
        this.albums = albums;
        this.cd.markForCheck();
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.userAlbums$$?.unsubscribe();
  }

  deleteAlbum(albumId: number): void {
    if (this.userId) {
      this.userService.removeUserAlbum(this.userId, albumId);
    }
  }

  addAlbum(): void {
    const dialogRef = this.dialog.open(AlbumCreateDialogComponent, {
      width: "250px"
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      console.log("RESULT", result);
      if (this.userId && result) {
        this.userService.createAlbum(this.userId, result);
      }
    });
  }

}
