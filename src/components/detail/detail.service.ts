
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
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

    return this.http.get(url, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }  


  async getStarship (url) {
    const reposResponse = await fetch(url);
    const response = await reposResponse.json();

    // const userName = 'felipenmoura';
    // const url = 'https://api.github.com/users';
    // const reposResponse = await fetch(`${url}/${userName}/repos`);
    // response.push(await reposResponse.json());
    console.log(response)
  }

  getStarship2 (){

    var promise1 = Promise.resolve(3);
    var promise2 = 42;
    var promise3 = new Promise(function(resolve, reject) {
      setTimeout(resolve, 100, 'foo');
    });

    Promise.all([promise1, promise2, promise3]).then(function(values) {
      console.log(values);
    });
  }

  re(){
    var pilots = [];
var fetchGet = {
  method:'GET',
  headers: {
      'Content-Type': 'application/json'
    },
};
function addPilots( pilotsData) {
  console.log('addPilots',pilotsData);
  pilots.push(pilotsData);
}

function getUrlContent(data) {
  var arr = data.pilots    ;

  arr.forEach(function (e,i,a) {
    fetch(e,fetchGet)
      .then(function (req) {
        req.json().then(addPilots)
      })
      .catch(console.error)
  })
}
function getStarship(id){
  fetch(`https://swapi.co/api/starships/${id}`,fetchGet)
  .then(function (req) {
    console.log(req)
    req.json().then(getUrlContent)
  })
  .catch(console.error)
}
getStarship(12)
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
    console.log(errorMessage);
    return throwError(errorMessage);
 }

}
