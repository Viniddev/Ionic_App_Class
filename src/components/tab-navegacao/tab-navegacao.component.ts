import { Component, OnInit } from '@angular/core';
import {
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { library, playCircle, radio, search, personOutline } from 'ionicons/icons';
import { NEW_PRODUCT } from 'src/utils/constants/frontEndUrls';

@Component({
  selector: 'app-tab-navegacao',
  templateUrl: './tab-navegacao.component.html',
  styleUrls: ['./tab-navegacao.component.scss'],
  imports: [IonIcon, IonTabBar, IonTabButton, IonTabs],
})
export class TabNavegacaoComponent implements OnInit {
  documentId: string = NEW_PRODUCT;

  constructor() {
    addIcons({ library, playCircle, radio, search, personOutline });
  }

  ngOnInit() {}
}
