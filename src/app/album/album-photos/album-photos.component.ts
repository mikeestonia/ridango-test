import { Component, HostBinding, OnInit, ViewEncapsulation } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { switchMap, take, tap } from "rxjs/operators";
import { AlbumPhoto } from "../album.model";
import { AlbumService } from "../album.service";
import { PhotoCreateDialogComponent } from "./photos-create/photos-create-dialog.component";

@Component({
  selector: "app-album-photos",
  templateUrl: "./album-photos.component.html",
  styleUrls: ["./album-photos.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AlbumPhotosComponent implements OnInit {

  @HostBinding("class.app-album-photos") hostClass = true;

  albumPhotos: AlbumPhoto[] | undefined;

  constructor(private route: ActivatedRoute, private albumService: AlbumService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params) => this.albumService.getAlbumPhotos$(params.get("id"))),
      tap((albumPhotos) => this.albumPhotos = albumPhotos),
      take(1)
    ).subscribe();
  }

  addPhoto(): void {
    const dialogRef = this.dialog.open(PhotoCreateDialogComponent, {
      width: "250px"
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      console.log("TESILFSD", result);
    });
  }

  photoTrackBy(index: number, photo: AlbumPhoto): number {
    return photo.id;
  }
}
