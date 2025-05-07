import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { ComandaItemComponent } from 'src/components/comanda-item/comanda-item.component';
import { ListaItens } from 'src/utils/mock/lista-Itens';
import { Router } from '@angular/router';
import { HOME } from 'src/utils/frontEndUrls';


@Component({
  selector: 'app-resumo-pedidos',
  templateUrl: './resumo-pedidos.page.html',
  styleUrls: ['./resumo-pedidos.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ComandaItemComponent]
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
