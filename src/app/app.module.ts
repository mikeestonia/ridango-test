import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UserListComponent } from "./user/user-list/user-list.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { HttpClientModule } from "@angular/common/http";

import { MatExpansionModule } from "@angular/material/expansion";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";

import { AlbumListComponent } from "./album/album-list/album-list.component";
import { AlbumPhotosComponent } from "./album/album-photos/album-photos.component";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { AlbumCreateDialogComponent } from "./album/album-create/album-create-dialog.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { LogComponent } from "./log/log.component";
import { PhotoCreateDialogComponent } from "./album/album-photos/photos-create/photos-create-dialog.component";
import { MetricsComponent } from './log/metrics/metrics.component';


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    PageNotFoundComponent,
    AlbumListComponent,
    AlbumPhotosComponent,
    AlbumCreateDialogComponent,
    LogComponent,
    PhotoCreateDialogComponent,
    MetricsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    HttpClientModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
