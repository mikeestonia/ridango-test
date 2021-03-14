import { Component, HostBinding, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
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
export class AlbumPhotosComponent implements OnInit, OnDestroy {

  @HostBinding("class.app-album-photos") hostClass = true;

  albumId: string | null | undefined;
  albumPhotos: AlbumPhoto[] | undefined;
  albumPhotos$$: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.albumPhotos$$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const albumId = params.get("id");
        this.albumId = albumId;
        return this.albumService.getAlbumPhotos$(albumId);
      }),
      tap((albumPhotos) => this.albumPhotos = albumPhotos)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.albumPhotos$$?.unsubscribe();
  }

  addPhoto(): void {
    const dialogRef = this.dialog.open(PhotoCreateDialogComponent, {
      width: "250px"
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (this.albumId && result) {
        this.albumService.addPhotoToAlbum(this.albumId, result);
      }
    });
  }

  removePhoto(photoId: number): void {
    if (this.albumId) {
      this.albumService.removeAlbumPhoto(this.albumId, photoId);
    }
  }

  photoTrackBy(index: number, photo: AlbumPhoto): number {
    return photo.id;
  }
}
