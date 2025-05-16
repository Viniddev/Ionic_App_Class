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
import { VISUALIZAR_PEDIDO } from 'src/utils/constants/frontEndUrls';
import { FirestoreService } from 'src/utils/services/firestore/firestore.service';
import { INovoPedido } from 'src/@types/INovoPedido';
import { PEDIDOS } from 'src/utils/constants/backEndUrls';
import { AlertController } from '@ionic/angular';
import { IPedido } from 'src/@types/IPedido';
import { EnumStatusOptions } from 'src/@types/Enums/Status';
import { PedidosFirestoreService } from 'src/utils/services/firestore/pedidos-firestore.service';

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

  constructor(
    private router: Router,
    private fs: FirestoreService,
    private alertController: AlertController,
    private pedidosService: PedidosFirestoreService
  ) {}

  ngOnInit() {
    this.mesaSelecionada = '';
  }

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

  // async finalizarPedido() {
  //   const lista: Array<IProdutos> = this.ProdutosCardapio.filter(
  //     (product: IProdutos) => product.quantidade > 0
  //   )

  //   console.log(lista)

  //   const pedido: INovoPedido = {
  //     numero: +this.mesaSelecionada,
  //     status: EnumStatusOptions.Pronto,
  //     itens: lista.filter(item => {
  //       item.nome,
  //       item.quantidade
  //     })
  //   }

  //   console.log(pedido)

  //   if(lista.length > 0 && this.mesaSelecionada !== "") {
  //       await this.pedidoService.setNewDocument(pedido);
  //   //   const finalRequest: INovoPedido = {
  //   //     produtos: lista,
  //   //     mesa: this.mesaSelecionada
  //   //   };

  //   //   this.fs.addDocument(PEDIDOS, finalRequest);

  //   //   this.router.navigateByUrl(VISUALIZAR_PEDIDO);
  //   }else{
  //     this.showAlert('Dados inválidos', 'É necessário informar o número da mesa e o pedido para finalizar.');
  //   }
  // }

  async finalizarPedido() {
    const lista: Array<IProdutos> = this.ProdutosCardapio.filter(
      (product: IProdutos) => product.quantidade > 0
    );

    this.mesaSelecionada = this.mesaSelecionada.replace(/\D/g, "")
    const pedido: INovoPedido = {
        numero: Number(this.mesaSelecionada),
        status: EnumStatusOptions.AguardandoConfirmacaoCozinha,
        itens: lista
          .filter(item => item.quantidade > 0)
          .map(item => ({
            nome: item.nome,
            quantidade: item.quantidade
      }))
    }

    if(lista.length > 0 && this.mesaSelecionada !== ""){
      await this.pedidosService.setNewDocument(pedido);

      this.router.navigateByUrl(VISUALIZAR_PEDIDO);
    }else{
      this.showAlert('Dados inválidos', 'É necessário informar o número da mesa e o pedido para finalizar.');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['ok'],
    });

    await alert.present();
  }
}
