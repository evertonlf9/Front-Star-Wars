import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { Labels } from '../../core/constants/constants';
import { DetailService } from './detail.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  private type: string = '';
  private id: string = '';
  private loading: boolean = false;
  private data: any;
  private dataLabels: any;
  private dataInfo: any;
  constructor(private detailService: DetailService, private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router, private _route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.id = this._route.params['value'].id
    this.type = this._route.params['value'].type;
    this.dataLabels = Labels[this.type];
    this.getDetail();
  }

  handlerClickMoreInfo(item: object){
    this.dataInfo = item;
  }

  getDetail(){
    this.spinner.show();
    this.loading = true;
    this.detailService.getDetail(this.id, this.type)
    .subscribe((res) => { 
      this.data = res;
      this.spinner.hide();
      this.loading = false;

     this.getAllInfo();
    },
    (error)=>{
      this.toastr.error("Error!");
      this.spinner.hide();
      this.loading = false;
    });
  }

  getAllInfo(){
    if(this.data.starships)
      this.getStarship(this.data.starships, 'starships');

    if(this.data.films, 'films')
      this.getStarship(this.data.films, 'films');
    
    if(this.data.species, 'species')
      this.getStarship(this.data.species, 'species');
    
    if(this.data.vehicles, 'vehicles')
      this.getStarship(this.data.vehicles, 'vehicles');

    if(this.data.homeworld, 'homeworld')
      this.getStarship(this.data.homeworld, 'homeworld');
  }

  getStarship (data: any, type: string) { 
    const promisse = [];
    if(typeof data !== 'string') {
      data.forEach(url => {
        promisse.push(this.http.get(url))
      });
    }else {
      promisse.push(this.http.get(data));
    }

    forkJoin(promisse).subscribe(results => {
      this.data['list' + type] = results;
    });
  }

}