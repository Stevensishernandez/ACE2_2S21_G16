import { Component } from '@angular/core';


import {MatSnackBar} from '@angular/material/snack-bar';
import { ClockComponent } from "./components/otros/clock/clock.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'practica1-app';

  constructor(private _snackBar:MatSnackBar){}

  ngOnInit()
  {
    this.openSnackBar();
  }
  openSnackBar() {
    this._snackBar.openFromComponent(ClockComponent, {
      horizontalPosition: 'end'
    });
  }
}
