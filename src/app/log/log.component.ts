import { Component, HostBinding, OnInit, ViewEncapsulation } from "@angular/core";
import { LogService } from "./log.service";

@Component({
  selector: "app-log",
  templateUrl: "./log.component.html",
  styleUrls: ["./log.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class LogComponent implements OnInit {

  @HostBinding("class.app-log") hostClass = true;

  JSON = JSON;

  constructor(public logService: LogService) { }

  ngOnInit(): void {
  }

}
