import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { CharacterService } from './character.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  // MatPaginator Output
  pageEvent: PageEvent;

  private data: any = '';
  private search: string = '';
  private loading: boolean = false;
  private pageSize: number = 10
  private currentPage: number = 0;
  private totalPages: number = 0;
  private itensPerPage: any = ['5', '10', '25', '100'];
  constructor(private characterService: CharacterService, private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.getPeople();
  }

  handlerChangePaginate(e: Event) {
    this.pageSize = e['pageSize'];
    this.currentPage = e['pageIndex'];
    this.getPeople();
  }

  handlerChangeLimit() {
    this.getPeople();
  }

  handlerKeyPress(e: Event) {
    if(e['keyCode'] === 13) {
      this.getPeople();
    }
  }

  handlerClickSearch(){
    if(this.search.trim().length > 1)
      this.getPeople();
  }

  handlerClickClearSearch() {
    this.search = '';
    this.getPeople();
  } 

  handlerClickMoreInfo(people: Object, id: number) {
    const url = `/details/people/${id + 1}`;
    this.router.navigate([url]);
  }

  getPeople(){
    this.spinner.show();
    this.loading = true;
    this.characterService.getAllCharacter(this.search, this.pageSize, (this.currentPage === 0 ? 1 : (this.currentPage + 1)))
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
