import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class DetailComponent implements OnInit, OnDestroy {

  private type: string = '';
  private id: string = '';
  private loading: boolean = false;
  private data: any;
  private dataLabels: any;
  private dataKeyLabels: any;
  private dataInfo: any;
  private dataInfoKeys: any;
  private dataInfoLabels: any;
  constructor(private detailService: DetailService, private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router, private _route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.clearVariables();
    this.initialize();
  }

  ngOnDestroy(){
  }

  initialize() {
    this.id = this._route.params['value'].id
    this.type = this._route.params['value'].type;
    this.dataLabels = Labels[this.type];
    this.dataKeyLabels = Object.keys(this.dataLabels);
    
    this.getDetail();
  }

  handlerClickMoreInfo(item: object, type: string){
    this.dataInfo = item;
    this.dataInfoKeys = Object.keys(item);
    this.dataInfoLabels = Labels[type];
  }

  checkedHidden(key) {
    if(typeof this.dataInfo[key] === 'string' && this.dataInfo[key].split('http').length > 1)
     return true;

    return typeof this.dataInfo[key] === 'object' || !this.dataInfoLabels[key]
  }

  getHidden(type: string, lists: object) {
    return (this.data[type] && this.data[type].length > 0) && !lists;
  }

  handlerMoreInfo(){
    const key = this.dataInfo.url.split("/")[5];
    const type = this.dataInfo.url.split("/")[4];
    const url = `/details/${type}/${key}`;
    this.router.navigate([url]);
    this.ngOnInit();
  }

  clearVariables(){
    this.data = null
    this.dataLabels = null
    this.dataInfo = null;
    this.dataInfoKeys = null;
    this.dataInfoLabels = null;
  }

  getImage(item: object){
    if(item) {
      const key = item['url'].split("/")[5];
      const type = item['url'].split("/")[4];
      return `../../assets/img/${type}/${key}.jpg`
    }
  }
  

  getDetail(){
    this.spinner.show();
    this.loading = true;
    this.detailService.getDetail(this.id, this.type)
    .subscribe((res) => { 
      this.data = res;
      this.spinner.hide();
      this.loading = false;

      if(this.data.name === "Darth Vader") {
        document.getElementById('audio')['play']();
      }

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

    if(this.data.films)
      this.getStarship(this.data.films, 'films');
    
    if(this.data.species)
      this.getStarship(this.data.species, 'species');
    
    if(this.data.vehicles)
      this.getStarship(this.data.vehicles, 'vehicles');

    if(this.data.homeworld)
      this.getStarship(this.data.homeworld, 'homeworld');

    if(this.data.pilots)
      this.getStarship(this.data.pilots, 'pilots');

    if(this.data.characters)
      this.getStarship(this.data.characters, 'characters');
    
    if(this.data.planets)
      this.getStarship(this.data.planets, 'planets');
    
    if(this.data.homeworld !== '')
      this.getStarship(this.data.homeworld, 'homeworld');
  }

  getStarship (data: any, type: string) { 
    const promisse = [];
    if(data && typeof data !== 'string') {
      data.forEach(url => {
        promisse.push(this.http.get(url))
      });
    }else if(data) {
      promisse.push(this.http.get(data));
    }

    forkJoin(promisse).subscribe(results => {
      this.data['list' + type] = results;
    });
  }

}