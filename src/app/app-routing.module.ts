import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AlbumPhotosComponent } from "./album/album-photos/album-photos.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { UserListComponent } from "./user-list/user-list.component";

const routes: Routes = [
  { path: "", component: UserListComponent },
  { path: "photos/:id", component: AlbumPhotosComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
