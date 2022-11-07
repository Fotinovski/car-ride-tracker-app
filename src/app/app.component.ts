import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Car Ride Tracker';
  countDarko:number = 0;
  countZarko:number = 0

  addRideDarko(){
    this.countDarko ++
  }
  minusRideDarko(){
    this.countDarko --
  }

  addRideZarko(){
    this.countZarko ++
  }
  minusRideZarko(){
    this.countZarko --
  }

}
