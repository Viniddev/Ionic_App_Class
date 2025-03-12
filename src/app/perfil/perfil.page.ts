import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonInput,
  IonItem,
  IonList,
} from '@ionic/angular/standalone';
import { RouterLinkWithHref } from '@angular/router';
import { DUMMY_USERS } from '../dummy-users'

let random = Math.floor(Math.random() * DUMMY_USERS.length)

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    IonButton,
    RouterLinkWithHref,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonInput,
    IonItem,
    IonList,
  ],
})
export class PerfilPage {
  constructor() {}

  selectedUser = DUMMY_USERS[random];
}
