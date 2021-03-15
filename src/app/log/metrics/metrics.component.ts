import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { LogService } from "../log.service";

@Component({
  selector: "app-metrics",
  templateUrl: "./metrics.component.html",
  styleUrls: ["./metrics.component.scss"]
})
export class MetricsComponent implements OnInit {

  metrics$ = this.logService.loggedActions$.pipe(
    map((actions) => {
      const photosDel = actions.filter(a => a.type === "photo" && a.action === "delete").length;
      const photosAdd = actions.filter(a => a.type === "photo" && a.action === "add").length;
      const albumsDel = actions.filter(a => a.type === "album" && a.action === "delete").length;
      const albumsAdd = actions.filter(a => a.type === "album" && a.action === "add").length;
      return {
        photos: `There have been ${photosAdd} addition(s) and ${photosDel} deletion(s) of photos!`,
        albums: `There have been ${albumsAdd} addition(s) and ${albumsDel} deletion(s) of albums!`
      };
    })
  );

  constructor(private logService: LogService) { }

  ngOnInit(): void {
  }

}
