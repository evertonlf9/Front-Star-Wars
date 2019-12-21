import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  private currentPage: string = 'character';
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.currentPage = this.router.routerState.snapshot.url
  }

  handlerNextPage(page) {
    this.router.navigate([page]);
  }

  checkedMenuActive(page) {
    console.log(this.router)
    console.log(this.activatedRoute)
    console.log(page)
    return false
  }

}
