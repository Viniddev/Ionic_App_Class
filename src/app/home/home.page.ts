import { Component } from '@angular/core';
import {
  IonContent,
  IonButton,
} from '@ionic/angular/standalone';

import { Router } from '@angular/router';
import { LOGIN } from 'src/utils/frontEndUrls';
import { HeaderComponent } from 'src/components/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonContent,
    IonButton,
    HeaderComponent,
  ],
})
export class HomePage {
  constructor(private router: Router) {}

  Login() {
    this.router.navigate([LOGIN]);
  }
}
