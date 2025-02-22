import { Component, OnInit } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { HOME } from 'src/utils/frontEndUrls';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonButton, RouterModule],
})
export class LoginPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  Deslogar() {
    this.router.navigate([HOME]);
  }
}
