import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { Album, User } from "./user.model";

@Injectable({
  providedIn: "root"
})
export class UserService {

  users$ = this.http.get<User[]>("https://jsonplaceholder.typicode.com/users/");

  constructor(private http: HttpClient) { }

  getUserAlbums$(userId: number | undefined): Observable<Album[]> {
    return userId ? this.http.get<Album[]>(`https://jsonplaceholder.typicode.com/users/${userId}/albums`).pipe(take(1)) : of([]);
  }

}


