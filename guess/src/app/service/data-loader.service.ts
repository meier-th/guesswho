import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Difficulty } from '../model/difficulty';
import { Observable } from 'rxjs';
import { DataBean } from '../model/data-bean';

@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {

  constructor(private http: HttpClient) { }

  loadData(diff : Difficulty) :Observable<DataBean> {
    let params = new HttpParams().set('difficulty', diff.toString());
    return this.http.get<DataBean>('http://localhost:4200/api', {params});
  }

}
