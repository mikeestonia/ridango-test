import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PageNotFoundComponent implements OnInit {

  @HostBinding('class.app-page-not-found') hostClass = true;

  constructor() { }

  ngOnInit(): void {
  }

}
