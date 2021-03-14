import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { Observable } from "rxjs";
import { take, tap } from "rxjs/operators";
import { LogService } from "../log/log.service";
import { Album, User } from "./user.model";

@Injectable({
  providedIn: "root"
})
export class UserService {

  users$ = this.http.get<User[]>("https://jsonplaceholder.typicode.com/users/");

  private usersAlbums: Record<number, BehaviorSubject<Album[]>> = {};

  constructor(private http: HttpClient, private logService: LogService) { }

  getUserAlbums$(userId: number | undefined): Observable<Album[]> {
    if (!userId) {
      return of([]);
    }

    if (this.usersAlbums[userId]) {
      // Albums already in memory
      return this.usersAlbums[userId];
    }

    const userAlbums = localStorage.getItem(this.getKey(userId));
    if (userAlbums) {
      // Albums loaded from local storage
      this.usersAlbums[userId] = new BehaviorSubject<Album[]>(JSON.parse(userAlbums));
      return this.usersAlbums[userId];
    } else {
      // No albums loaded, get them from the API
      this.usersAlbums[userId] = new BehaviorSubject<Album[]>([]);
      this.http.get<Album[]>(`https://jsonplaceholder.typicode.com/users/${userId}/albums`).pipe(
        take(1),
        tap((albums) => this.persistAlbums(userId, albums))
      ).subscribe();
      return this.usersAlbums[userId];
    }
  }

  removeUserAlbum(userId: number, albumId: number): void {
    const currentAlbums = this.usersAlbums[userId].getValue();
    const newAlbums = currentAlbums.filter((a) => a.id !== albumId);
    this.persistAlbums(userId, newAlbums);
    this.logService.log({
      action: "delete",
      type: "album",
      userId
    });
  }

  createUserAlbum(userId: number, title: string): void {
    const currentAlbums = this.usersAlbums[userId].getValue();
    const newAlbums = [{
      id: new Date().getMilliseconds(),
      userId,
      title,
    }, ...currentAlbums];
    this.persistAlbums(userId, newAlbums);
    this.logService.log({
      action: "add",
      type: "album",
      userId
    });
  }

  private getKey(userId: number): string {
    return "user_" + userId + "_albums";
  }

  private persistAlbums(userId: number, albums: Album[]): void {
    this.usersAlbums[userId].next(albums);
    localStorage.setItem(this.getKey(userId), JSON.stringify(albums));
  }
}
