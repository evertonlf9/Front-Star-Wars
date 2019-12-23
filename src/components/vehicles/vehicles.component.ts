import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { Labels } from '../../core/constants/constants';
import { VehiclesService } from './vehicles.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {

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
  constructor(private vehiclesService: VehiclesService, private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.dataLabels = Labels['vehicles'];
    this.dataKeyLabels = Object.keys(this.dataLabels);

    this.getVehicle();
  }

  handlerChangePaginate(e: Event) {
    this.pageSize = e['pageSize'];
    this.currentPage = e['pageIndex'];
    this.getVehicle();
  }

  handlerChangeLimit() {
    this.getVehicle();
  }

  getImage(vehicle: object){
    const key = vehicle['url'].split("/")[5];
    return `../../assets/img/vehicles/${key}.jpg`
  }

  handlerKeyPress(e: Event) {
    if(e['keyCode'] === 13) {
      this.search = e.currentTarget['value'];
      if(this.search.trim().length > 1)
        this.getVehicle();
    }
  }

  handlerClickSearch(){
    this.search = document.getElementById('search')['value'];
    if(this.search.trim().length > 1)
      this.getVehicle();
  }

  handlerClickClearSearch() {
    this.search = '';
    this.getVehicle();
  } 

  handlerClickMoreInfo(vehicle: Object) {
    const key = vehicle['url'].split("/")[5];
    const url = `/details/vehicles/${key}`;
    this.router.navigate([url]);
  }

  getVehicle(){
    this.spinner.show();
    this.loading = true;
    this.vehiclesService.getAllVehicle(this.search, this.pageSize, (this.currentPage === 0 ? 1 : (this.currentPage + 1)))
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
