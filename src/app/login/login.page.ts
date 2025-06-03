import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CADASTRO_COMANDA, LOGIN, NEW_PRODUCT } from 'src/utils/constants/frontEndUrls';
import { AlertController } from '@ionic/angular';

import {
  IonContent,
  IonButton,
  IonItem,
  IonInput
} from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/utils/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonButton,
    IonItem,
    IonInput,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class LoginPage implements OnInit {
  credentials!: FormGroup;
  isDisabled: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  Deslogar() {
    this.router.navigate([LOGIN]);
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  async login() {
    if(!this.credentials.invalid){
      this.isDisabled = true;
      const user = await this.auth.login(this.credentials.value);

      if (user) {
        this.credentials.reset();
        this.router.navigate([CADASTRO_COMANDA, NEW_PRODUCT]);
      } else {
        this.showAlert('Email ou Senha incorretos.', 'Tente novamente!');
      }

      this.isDisabled = false;
    }else{
      this.showAlert('Email / Senha inválidos.', 'Login e senha não podem ser vazios.');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['ok'],
    });

    await alert.present();
  }
}
