import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataBean } from '../model/data-bean';
import { FormGroup, FormControl } from '@angular/forms';
import { StateService } from '../service/state.service';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  data: DataBean;

  name = 'Marilyn Monroe';

  form = new FormGroup({
    names: new FormControl(),
  });

  constructor(private router: Router, private state: StateService) { 
    this.data = state.data;
  }

  ngOnInit(): void {
    console.log(this.data.img_url);
    console.log(this.data.correct);
  }

  restart() {
    this.router.navigate(['']);
  }

  checkAnswer() {
    console.log(this.name);
    if (this.name === this.data.correct)
      Swal.fire('Correct!', 'It\'s '+this.name, 'success');
    else
      Swal.fire('Incorrect!', 'It\'s '+this.data.correct, 'error');
  }

}
