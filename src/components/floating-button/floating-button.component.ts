import { Component } from '@angular/core';
import {
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  add,
  chevronBack,
  chevronDown,
  chevronForward,
  chevronUp,
} from 'ionicons/icons';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss'],
  imports: [IonFab, IonFabButton, IonFabList, IonIcon],
  standalone: true
})
export class FloatingButtonComponent {
  constructor() {
    addIcons({ add, chevronBack, chevronDown, chevronForward, chevronUp });
  }
}
