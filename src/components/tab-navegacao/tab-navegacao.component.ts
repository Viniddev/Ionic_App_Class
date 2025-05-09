import { Component, OnInit } from '@angular/core';
import {
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';

@Component({
  selector: 'app-tab-navegacao',
  templateUrl: './tab-navegacao.component.html',
  styleUrls: ['./tab-navegacao.component.scss'],
  imports: [
    IonIcon,
    IonTabBar,
    IonTabButton,
    IonTabs
  ],
})
export class TabNavegacaoComponent implements OnInit {
  constructor() {
    addIcons({ library, playCircle, radio, search });
  }

  ngOnInit() {}
}
