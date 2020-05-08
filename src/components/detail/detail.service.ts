

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, forkJoin } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';

import { BASE_URL } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  constructor(private http: HttpClient) {}

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getDetail(id, type):Observable<any> {

    const url = BASE_URL + `${type}/${id}`;

    return this.http.get(url)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  } 

  errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    ;
    return throwError(errorMessage);
  }

  

  getData(data) {
    return new Promise ((resolve, rejects) => { 
      const promisse = [];
      if(data && typeof data !== 'string') {
        data.forEach(url => {
          promisse.push(this.http.get(url))
        });
      }else if(data) {
        promisse.push(this.http.get(data));
      }
  
      forkJoin(promisse).subscribe(results => {
        resolve(results);
      });
    
    })
  }
}