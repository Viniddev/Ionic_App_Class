import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { CardFechamentoItemComponent } from 'src/components/card-fechamento-item/card-fechamento-item.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HOME } from 'src/utils/constants/frontEndUrls';
import { HeaderComponent } from 'src/components/header/header.component';
import { PedidosFirestoreService } from 'src/utils/services/firestore/pedidos-firestore.service';
import { IItemComanda } from 'src/@types/IItemComanda';
import { IPedido } from 'src/@types/IPedido';

@Component({
  selector: 'app-finalizar-comanda',
  templateUrl: './finalizar-comanda.page.html',
  styleUrls: ['./finalizar-comanda.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    CardFechamentoItemComponent,
    HeaderComponent,
  ],
})
export class FinalizarComandaPage implements OnInit {
  documentId: string;
  pedido: IPedido;
  item: IItemComanda;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pedidosService: PedidosFirestoreService
  ) {}

  ngOnInit() {
    this.getItemComanda();
  }

  ionViewWillEnter() {
    this.getItemComanda();
  }

  async getItemComanda() {
    const idComanda = this.activatedRoute.snapshot.paramMap.get('id');

    if (idComanda) {
      this.pedido = await this.pedidosService.getPedidoDocumentById(idComanda);
      this.item = {
        id: idComanda,
        numero: this.pedido.numero,
        itens: this.pedido.itens,
        total: this.calculaTotal(this.pedido),
      };
    }
  }

  calculaTotal(pedido: IPedido) {
    let totalPedido = 0;

    for (const item of pedido.itens) {
      totalPedido += item.preco * item.quantidade;
    }
    return totalPedido;
  }

  Voltar() {
    this.router.navigateByUrl(HOME);
  }
}
