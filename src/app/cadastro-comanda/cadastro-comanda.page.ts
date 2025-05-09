import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonSearchbar, IonSelect, IonSelectOption  } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/components/header/header.component';
import { IMesas } from 'src/@types/IMesas';
import { ListaMesas } from 'src/utils/mock/lista-mesas';
import { CardPedidoComponent } from 'src/components/card-pedido/card-pedido.component';
import { Router } from '@angular/router';
import { HOME } from 'src/utils/frontEndUrls';

@Component({
  selector: 'app-cadastro-comanda',
  templateUrl: './cadastro-comanda.page.html',
  styleUrls: ['./cadastro-comanda.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    HeaderComponent,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonButton,
    CardPedidoComponent,
  ],
})
export class CadastroComandaPage implements OnInit {
  mesas: Array<IMesas> = ListaMesas;
  mesaSelecionada: string;

  constructor(private router: Router) {
    this.mesaSelecionada = '';
  }

  ngOnInit() {}

  pesquisa(event: any) {
    //todo
  }
  
  Voltar() {
    this.router.navigateByUrl(HOME);
  }
}
