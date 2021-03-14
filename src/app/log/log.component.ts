import { Component, OnInit } from "@angular/core";
import { LogService } from "./log.service";

@Component({
  selector: "app-log",
  templateUrl: "./log.component.html",
  styleUrls: ["./log.component.scss"]
})
export class LogComponent implements OnInit {

  JSON = JSON;

  constructor(public logService: LogService) { }

  ngOnInit(): void {
  }

}
