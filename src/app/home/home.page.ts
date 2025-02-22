import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  logoIonic,
  airplaneOutline,
  chevronDownCircle,
  chevronForwardCircle,
  chevronUpCircle,
  colorPalette,
  document,
  globe,
} from 'ionicons/icons';
import { Router } from '@angular/router';
import { LOGIN } from 'src/utils/frontEndUrls';
import { FloatingButtonComponent } from '../../components/floating-button/floating-button.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonContent,
    IonFab,
    IonFabButton,
    IonFabList,
    FloatingButtonComponent,
  ],
})

export class HomePage {
  constructor(private router: Router) {
    addIcons({
      logoIonic,
      airplaneOutline,
      chevronDownCircle,
      chevronForwardCircle,
      chevronUpCircle,
      colorPalette,
      document,
      globe,
    });
  }

  Login() {
    this.router.navigate([LOGIN]);
  }
}
