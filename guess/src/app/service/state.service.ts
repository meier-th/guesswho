import { Injectable } from '@angular/core';
import { Difficulty } from '../model/difficulty';
import { DataBean } from '../model/data-bean';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  data: DataBean;

  constructor() { }
}
