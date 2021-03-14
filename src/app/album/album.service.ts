import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { AlbumPhoto } from "./album.model";

@Injectable({
  providedIn: "root"
})
export class AlbumService {

  constructor(private http: HttpClient) { }

  getAlbumPhotos$(albumId: string | null): Observable<AlbumPhoto[]> {
    return albumId ? this.http.get<AlbumPhoto[]>(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`).pipe(take(1)) : of([]);
  }

}


