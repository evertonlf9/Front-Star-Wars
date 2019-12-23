import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { Labels } from '../../core/constants/constants';
import { FilmService } from './film.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

  ageEvent: PageEvent;
  private data: any = null;
  private search: string = '';
  private loading: boolean = false;
  private pageSize: number = 10
  private currentPage: number = 0;
  private totalPages: number = 0;
  private itensPerPage: any = ['5', '10', '25', '100'];
  private dataLabels: any;
  private dataKeyLabels: any;
  constructor(private filmService: FilmService, private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.dataLabels = Labels['films'];
    this.dataKeyLabels = Object.keys(this.dataLabels);

    this.getFilm();
  }

  handlerChangePaginate(e: Event) {
    this.pageSize = e['pageSize'];
    this.currentPage = e['pageIndex'];
    this.getFilm();
  }

  handlerChangeLimit() {
    this.getFilm();
  }

  getImage(film: object){
    const key = film['url'].split("/")[5];
    return `../../assets/img/films/${key}.jpg`
  }

  handlerKeyPress(e: Event) {
    if(e['keyCode'] === 13) {
      this.search = e.currentTarget['value'];
      if(this.search.trim().length > 1)
        this.getFilm();
    }
  }

  handlerClickSearch(){
    if(this.search.trim().length > 1)
      this.getFilm();
  }

  handlerClickClearSearch() {
    this.search = '';
    this.getFilm();
  } 

  handlerClickMoreInfo(film: Object) {
    const key = film['url'].split("/")[5];
    const url = `/details/films/${key}`;
    this.router.navigate([url]);
  }

  getFilm(){
    this.spinner.show();
    this.loading = true;
    this.filmService.getAllFilms(this.search, this.pageSize, (this.currentPage === 0 ? 1 : (this.currentPage + 1)))
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
