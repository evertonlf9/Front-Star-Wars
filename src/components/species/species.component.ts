import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { Labels } from '../../core/constants/constants';
import { SpeciesService } from './species.service';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss']
})
export class SpeciesComponent implements OnInit {

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
  constructor(private SpeciesService: SpeciesService, private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.dataLabels = Labels['species'];
    this.dataKeyLabels = Object.keys(this.dataLabels);

    this.getSpecies();
  }

  handlerChangePaginate(e: Event) {
    this.pageSize = e['pageSize'];
    this.currentPage = e['pageIndex'];
    this.getSpecies();
  }

  handlerChangeLimit() {
    this.getSpecies();
  }

  getImage(specie: object){
    const key = specie['url'].split("/")[5];
    return `../../assets/img/species/${key}.jpg`
  }

  handlerKeyPress(e: Event) {
    if(e['keyCode'] === 13) {
      this.search = e.currentTarget['value'];
      if(this.search.trim().length > 1)
        this.getSpecies();
    }
  }

  handlerClickSearch(){
    if(this.search.trim().length > 1)
      this.getSpecies();
  }

  handlerClickClearSearch() {
    this.search = '';
    this.getSpecies();
  } 

  handlerClickMoreInfo(people: Object) {
    const key = people['url'].split("/")[5];
    const url = `/details/species/${key}`;
    this.router.navigate([url]);
  }

  getSpecies(){
    this.spinner.show();
    this.loading = true;
    this.SpeciesService.getAllSpecies(this.search, this.pageSize, (this.currentPage === 0 ? 1 : (this.currentPage + 1)))
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
