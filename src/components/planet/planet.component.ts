import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { Labels } from '../../core/constants/constants';
import { PlanetService } from './planet.service';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit {

  pageEvent: PageEvent;
  private data: any = '';
  private search: string = '';
  private loading: boolean = false;
  private pageSize: number = 10
  private currentPage: number = 0;
  private totalPages: number = 0;
  private itensPerPage: any = ['5', '10', '25', '100'];
  private dataLabels: any;
  private dataKeyLabels: any;
  constructor(private planetService: PlanetService, private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.dataLabels = Labels['planets'];
    this.dataKeyLabels = Object.keys(this.dataLabels);

    this.getPlanet();
  }

  handlerChangePaginate(e: Event) {
    this.pageSize = e['pageSize'];
    this.currentPage = e['pageIndex'];
    this.getPlanet();
  }

  handlerChangeLimit() {
    this.getPlanet();
  }

  handlerKeyPress(e: Event) {
    if(e['keyCode'] === 13) {
      this.getPlanet();
    }
  }

  handlerClickSearch(){
    if(this.search.trim().length > 1)
      this.getPlanet();
  }

  handlerClickClearSearch() {
    this.search = '';
    this.getPlanet();
  } 

  handlerClickMoreInfo(people: Object) {
    const key = people['url'].split("/")[5];
    const url = `/details/planets/${key}`;
    this.router.navigate([url]);
  }

  getPlanet(){
    this.spinner.show();
    this.loading = true;
    this.planetService.getAllPlanet(this.search, this.pageSize, (this.currentPage === 0 ? 1 : (this.currentPage + 1)))
    .subscribe((data) => {  

      this.data = data.results;
      this.totalPages = data.count;
      this.spinner.hide();
      this.loading = false;
    },
    (error)=>{
      this.toastr.error("Error!");
      this.spinner.hide();
      this.loading = false;
    });
  }

}
