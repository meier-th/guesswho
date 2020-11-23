import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Difficulty } from '../model/difficulty';
import {FormControl, FormGroup} from '@angular/forms';
import { StateService } from '../service/state.service';
import { DataLoaderService } from '../service/data-loader.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  diff = 'Easy';

  difficulties = [
    'Easy',
    'Moderate',
    'Hard',
  ];

  form = new FormGroup({
    difficulties: new FormControl(this.difficulties[0]),
  });

  constructor(private loader: DataLoaderService, private router: Router, public fb: FormBuilder, private state: StateService) { }

  ngOnInit(): void {
  }

  startGame(diff: Difficulty): void {
    this.loader.loadData(diff).subscribe(data => {
      this.state.data = data;
      this.router.navigate(['/game']);
    })
  }

  onSubmit() {
    switch (this.diff) {
      case 'Easy':
        this.startGame(Difficulty.EASY);
        break;
      case 'Moderate':
        this.startGame(Difficulty.MODERATE);
        break;
      case 'Hard':
        this.startGame(Difficulty.HARD);
        break;
    }
  }

}
