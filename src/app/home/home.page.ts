import { Component } from '@angular/core';
import {
  IonContent,
  IonButton,
} from '@ionic/angular/standalone';

import { Router } from '@angular/router';
import { ABERTURA_COMANDA, CADASTRO, CADASTRO_COMANDA, LOGIN, RESUMO_PEDIDO, VISUALIZAR_PEDIDO } from 'src/utils/frontEndUrls';
import { HeaderComponent } from 'src/components/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, HeaderComponent],
})
export class HomePage {
  constructor(private router: Router) {}

  AbrirComanda() {
    this.router.navigate([ABERTURA_COMANDA]);
  }

  CadastrarPedido() {
    this.router.navigate([CADASTRO_COMANDA]);
  }

  Visualizar() {
    this.router.navigate([VISUALIZAR_PEDIDO]);
  }

  Resumo() {
    this.router.navigate([RESUMO_PEDIDO]);
  }
}
