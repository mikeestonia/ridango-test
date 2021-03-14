import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LogAction } from "./log.model";

@Injectable({
  providedIn: "root"
})
export class LogService {

  loggedActions$ = new BehaviorSubject<LogAction[]>(this.getInitialLoggedActions());

  constructor() { }

  private getInitialLoggedActions(): LogAction[] {
    const actions = localStorage.getItem("log_actions");
    return actions ? JSON.parse(actions) : [];
  }

  log(action: LogAction): void {
    this.loggedActions$.next([action, ...this.loggedActions$.getValue()]);
    localStorage.setItem("log_actions", JSON.stringify(this.loggedActions$.getValue()));
  }

}

