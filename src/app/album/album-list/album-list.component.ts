import { Component, Input, OnInit } from "@angular/core";
import { take, tap } from "rxjs/operators";
import { Album } from "src/app/user/user.model";
import { UserService } from "src/app/user/user.service";

@Component({
  selector: "app-album-list",
  templateUrl: "./album-list.component.html",
  styleUrls: ["./album-list.component.scss"]
})
export class AlbumListComponent implements OnInit {

  @Input() userId: number | undefined;

  albums: Album[] | undefined;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserAlbums$(this.userId).pipe(
      tap((albums) => this.albums = albums)
    ).subscribe();
  }

  deleteAlbum(albumId: number): void {
    if (this.userId) {
      this.userService.removeUserAlbum(this.userId, albumId);
    }
  }

}
