import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonItem, IonList, IonButton} from '@ionic/angular/standalone';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonInput,
    IonItem,
    IonList,
    IonButton,
    RouterLinkWithHref,
  ],
})
export class PerfilPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
