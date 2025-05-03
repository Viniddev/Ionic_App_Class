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
  credentials!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {}

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
    //todo
  }

  async login() {
    //todo
  }

  async showAlert(header: string, message: string) {
    //todo
  }
}
