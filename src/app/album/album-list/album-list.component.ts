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
    this.userService.getUserAlbums$(this.userId).pipe(take(1),
      tap((albums) => this.albums = albums)
    ).subscribe();
  }

}
