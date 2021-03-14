import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { Observable } from "rxjs";
import { take, tap } from "rxjs/operators";
import { LogService } from "../log/log.service";
import { AlbumPhoto } from "./album.model";

@Injectable({
  providedIn: "root"
})
export class AlbumService {

  private albumsPhotos: Record<string, BehaviorSubject<AlbumPhoto[]>> = {};

  constructor(private http: HttpClient, private logService: LogService) { }

  getAlbumPhotos$(albumId: string | null): Observable<AlbumPhoto[]> {
    if (!albumId) {
      return of([]);
    }

    if (this.albumsPhotos[albumId]) {
      // Photos already in memory
      return this.albumsPhotos[albumId];
    }

    const albumPhotos = localStorage.getItem(this.getKey(albumId));
    if (albumPhotos) {
      // Photos loaded from local storage
      this.albumsPhotos[albumId] = new BehaviorSubject<AlbumPhoto[]>(JSON.parse(albumPhotos));
      return this.albumsPhotos[albumId];
    } else {
      // No photos loaded, get them from the API
      this.albumsPhotos[albumId] = new BehaviorSubject<AlbumPhoto[]>([]);
      this.http.get<AlbumPhoto[]>(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`).pipe(
        take(1),
        tap((albumsPhotos) => this.persistAlbums(albumId, albumsPhotos))
      ).subscribe();
      return this.albumsPhotos[albumId];
    }
  }

  addPhotoToAlbum(albumId: string, title: string): void {
    const currentPhtotos = this.albumsPhotos[albumId].getValue();
    const newPhotos = [{
      id: new Date().getTime(),
      url: "assets/ghost.jpg",
      thumbnailUrl: "assets/ghost.jpg",
      title
    }, ...currentPhtotos] as AlbumPhoto[];
    this.persistAlbums(albumId, newPhotos);
    this.logService.log({
      action: "add",
      type: "photo",
      id: albumId
    });
  }

  removeAlbumPhoto(albumId: string, photoId: number): void {
    const albumsPhotos = this.albumsPhotos[albumId].getValue();
    const newPhotos = albumsPhotos.filter((a) => a.id !== photoId);
    this.persistAlbums(albumId, newPhotos);
    this.logService.log({
      action: "delete",
      type: "album",
      id: albumId
    });
  }

  private getKey(albumId: string): string {
    return "album_" + albumId + "_photos";
  }

  private persistAlbums(albumId: string, albumPhotos: AlbumPhoto[]): void {
    this.albumsPhotos[albumId].next(albumPhotos);
    localStorage.setItem(this.getKey(albumId), JSON.stringify(albumPhotos));
  }
}


