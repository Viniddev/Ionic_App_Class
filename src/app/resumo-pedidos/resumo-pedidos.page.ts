import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { CardComandaItemComponent } from 'src/components/card-comanda-item/card-comanda-item.component';
import { ListaItens } from 'src/utils/mock/lista-Itens';
import { Router } from '@angular/router';
import { HOME } from 'src/utils/frontEndUrls';
import { HeaderComponent } from 'src/components/header/header.component';

@Component({
  selector: 'app-resumo-pedidos',
  templateUrl: './resumo-pedidos.page.html',
  styleUrls: ['./resumo-pedidos.page.scss'],
  standalone: true,
  imports: [
    IonButton, 
    IonContent, 
    CommonModule, 
    FormsModule, 
    CardComandaItemComponent,
    HeaderComponent
  ]
})
export class ResumoPedidosPage implements OnInit {
  itens = ListaItens;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  Voltar(){
    this.router.navigateByUrl(HOME)
  }

}
