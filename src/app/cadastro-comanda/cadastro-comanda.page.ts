import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonSearchbar, IonSelect, IonSelectOption  } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/components/header/header.component';
import { IMesas } from 'src/@types/IMesas';
import { ListaMesas } from 'src/utils/mock/lista-mesas';
import { CardPedidoComponent } from 'src/components/card-pedido/card-pedido.component';
import { Router } from '@angular/router';
import { IProdutos } from 'src/@types/IProdutos';
import { ListaProdutos } from 'src/utils/mock/lista-produtos';
import { VISUALIZAR_PEDIDO } from 'src/utils/frontEndUrls';
import { FirestoreService } from 'src/utils/services/firestore/firestore.service';

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
  PedidosFiltrados: Array<IProdutos> = ListaProdutos;
  ProdutosCardapio: Array<IProdutos> = ListaProdutos;

  mesas: Array<IMesas> = ListaMesas;
  mesaSelecionada: string;

  constructor(private router: Router, private fs: FirestoreService) {
    this.mesaSelecionada = '';
  }

  ngOnInit() {}

  pesquisa(event: any) {
    const termo = event.detail.value;
    
    if (termo !== '') {
      const listaFiltrada: Array<IProdutos> = this.ProdutosCardapio.filter(
        (element: IProdutos) => element.nome.toLowerCase().includes(termo.toLowerCase())
      );
      this.PedidosFiltrados = listaFiltrada;
    } else {
      this.PedidosFiltrados = this.ProdutosCardapio;
    }
  }

  filtraCategoria(categoria: string){
    const listaFiltrada: Array<IProdutos> = this.ProdutosCardapio.filter(
      (element: IProdutos) => element.categoria === categoria
    );
    this.PedidosFiltrados = listaFiltrada;
  }

  Finalizar() {
    const lista: Array<IProdutos> = this.ProdutosCardapio.filter(
      (product: IProdutos) => product.quantidade > 0
    );

    if(lista.length > 0){
      const finalRequest: any = [...lista, { mesa: this.mesaSelecionada }];

      // this.fs.addDocument('items', finalRequest[0]); //todo - estruturar melhor como inserir os dados de pedidos no FB

      this.router.navigateByUrl(VISUALIZAR_PEDIDO);
    }
  }
}
