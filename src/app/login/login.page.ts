import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HOME } from 'src/utils/frontEndUrls';

import {
  IonContent,
  IonButton,
  IonItem,
  IonNote,
  IonInput
} from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonButton,
    IonItem,
    IonNote,
    IonInput,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class LoginPage implements OnInit {
  credentials: FormGroup = this.fb.group({
    email: [''],
    password: [''],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  Deslogar() {
    this.router.navigate([HOME]);
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  async register() {
   console.log('register clicado');
  }

  async login() {
    console.log('login clicado');
  }

  async showAlert(header: string, message: string) {
    console.log('showAlert acionado');
  }
}
