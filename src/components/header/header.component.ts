import { Component, Input, input } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { personCircle } from 'ionicons/icons';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { PERFIL } from 'src/utils/frontEndUrls';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    IonHeader, 
    IonToolbar
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponent {
  @Input({ required: true }) title!: string; 

  constructor(private router: Router) {
    addIcons({ personCircle });
  }

  Perfil() {
    this.router.navigate([PERFIL]);
  }
}
