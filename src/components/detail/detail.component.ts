import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { Labels } from '../../core/constants/constants';
import { DetailService } from './detail.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  type: string = '';
  id: string = '';
  loading: boolean = false;
  data: any;
  dataLabels: any;
  dataKeyLabels: any;
  dataInfo: any;
  dataInfoKeys: any;
  dataInfoLabels: any;
  constructor(private detailService: DetailService, private router: Router, private _route: ActivatedRoute, private http: HttpClient) { }

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
    if(item && item['url']) {
      const key = item['url'].split("/")[5];
      const type = item['url'].split("/")[4];
      return `../../assets/img/${type}/${key}.jpg`
    }
  }
  
  notFoundImage(elem: string) {
    document.getElementById(elem)['src'] = `../../assets/img/big-placeholder.jpg`; 
  }

  getDetail(){
    // this.spinner.show();
    this.loading = true;
    this.detailService.getDetail(this.id, this.type)
    .subscribe((res) => { 
      this.data = res;
      // this.spinner.hide();
      this.loading = false;

      if(this.data.name === "Darth Vader") {
        document.getElementById('audio')['play']();
      }

     this.getAllInfo();
    },
    (error)=>{
      this.data = [];
      this.loading = false;
    });
  }

  getAllInfo() {
    if(this.data.starships)
      this.detailService.getData(this.data.starships).then((results)=>{
        this.data['liststarships'] = results;
      });

    if(this.data.films)
      this.detailService.getData(this.data.films).then((results)=>{
        this.data['listfilms'] = results;
      });
    
    if(this.data.species)
      this.detailService.getData(this.data.species).then((results)=>{
        this.data['listspecies'] = results;
      });
    
    if(this.data.vehicles)
      this.detailService.getData(this.data.vehicles).then((results)=>{
        this.data['listvehicles'] = results;
      });

    if(this.data.homeworld)
      this.detailService.getData(this.data.homeworld).then((results)=>{
        this.data['listhomeworld'] = results;
      });

    if(this.data.pilots)
      this.detailService.getData(this.data.pilots).then((results)=>{
        this.data['listpilots'] = results;
      });

    if(this.data.characters)
      this.detailService.getData(this.data.characters).then((results)=>{
        this.data['listcharacters'] = results;
      });
    
    if(this.data.planets)
      this.detailService.getData(this.data.planets).then((results)=>{
        this.data['listplanets'] = results;
      });
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