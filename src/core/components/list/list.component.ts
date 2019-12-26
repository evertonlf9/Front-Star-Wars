import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { Labels } from '../../../core/constants/constants';
import { ListService } from './list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() type: string;
  @Input() classType: string;
  @Input() style: string;

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
  constructor(private listService: ListService, private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.dataLabels = Labels[this.type];
    this.dataKeyLabels = Object.keys(this.dataLabels);

    this.getData();
  }

  handlerChangePaginate(e: Event) {
    this.pageSize = e['pageSize'];
    this.currentPage = e['pageIndex'];
    this.getData();
  }

  handlerChangeLimit() {
    this.getData();
  }

  getImage(item: object){
    const key = item['url'].split("/")[5];

    if(key > 27 && this.type === 'planets'){
      return null;
    }

    return `../../assets/img/${this.type}/${key}.jpg`
  }

  handlerKeyPress(e: Event) {
    if(e['keyCode'] === 13 && !this.loading) {
      this.search = e.currentTarget['value'];
      if(this.search.trim().length > 1)
        this.getData();
    }
  }

  handlerClickSearch() {
    this.search = document.getElementById('search')['value'];
    if(this.search.trim().length > 1)
      this.getData();
  }

  handlerClickClearSearch() {
    this.search = '';
    this.getData();
  } 

  handlerKeyPressClearSearch(e:Event){
    if(e['keyCode'] === 13 && !this.loading) {
      this.handlerClickClearSearch();
    }
  }
  
  handlerKeyPressSearch(e:Event){
    if(e['keyCode'] === 13 && !this.loading) {
      this.handlerClickSearch();
    }
  }
  
  handlerKeyPressMoreInfo(e:Event, item: Object){
    if(e['keyCode'] === 13 && !this.loading) {
      this.handlerClickMoreInfo(item)
    }
  }

  handlerClickMoreInfo(item: Object) {
    const key = item['url'].split("/")[5];
    const url = `/details/${this.type}/${key}`;
    this.router.navigate([url]);
  }

  getData(){
    this.spinner.show();
    this.loading = true;
    this.listService.getData(this.search, this.type, this.pageSize, (this.currentPage === 0 ? 1 : (this.currentPage + 1)))
    .subscribe((data) => { 
      this.data = data.results;
      this.totalPages = data.count;
      this.spinner.hide();
      this.loading = false;
    },
    (error) => {      
      this.data = [];
      this.currentPage = 0;
      this.spinner.hide();
      this.loading = false;
    });
  }

}
