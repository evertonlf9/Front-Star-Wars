import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { Labels } from '../../core/constants/constants';
import { StarshipService } from './starship.service';

@Component({
  selector: 'app-starship',
  templateUrl: './starship.component.html',
  styleUrls: ['./starship.component.scss']
})
export class StarshipComponent implements OnInit {

  pageEvent: PageEvent;
  private data: any = null;
  private search: string = '';
  private loading: boolean = false;
  private pageSize: number = 10
  private currentPage: number = 0;
  private totalPages: number = 0;
  private itensPerPage: any = ['5', '10', '25', '100'];
  private dataLabels: any;
  private dataKeyLabels: any;
  constructor(private starshipService: StarshipService, private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.dataLabels = Labels['starships'];
    this.dataKeyLabels = Object.keys(this.dataLabels);

    this.getStarship();
  }

  handlerChangePaginate(e: Event) {
    this.pageSize = e['pageSize'];
    this.currentPage = e['pageIndex'];
    this.getStarship();
  }

  handlerChangeLimit() {
    this.getStarship();
  }

  handlerKeyPress(e: Event) {
    if(e['keyCode'] === 13) {
      this.search = e.currentTarget['value'];
      if(this.search.trim().length > 1)
        this.getStarship();
    }
  }

  getImage(starship: object){
    const key = starship['url'].split("/")[5];
    return `../../assets/img/starships/${key}.jpg`
  }

  handlerClickSearch(){
    this.search = document.getElementById('search')['value'];
    if(this.search.trim().length > 1)
      this.getStarship();
  }

  handlerClickClearSearch() {
    this.search = '';
    this.getStarship();
  } 

  handlerClickMoreInfo(starship: Object) {
    const key = starship['url'].split("/")[5];
    const url = `/details/starships/${key}`;
    this.router.navigate([url]);
  }

  getStarship(){
    this.spinner.show();
    this.loading = true;
    this.starshipService.getAllStarship(this.search, this.pageSize, (this.currentPage === 0 ? 1 : (this.currentPage + 1)))
    .subscribe((data) => {  

      this.data = data.results;
      this.totalPages = data.count;
      this.spinner.hide();
      this.loading = false;
    },
    (error)=>{
      this.data = [];
      this.spinner.hide();
      this.loading = false;
    });
  }

}
