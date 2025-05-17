import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonSearchbar, IonSelect, IonSelectOption  } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/components/header/header.component';
import { IMesas } from 'src/@types/IMesas';
import { CardPedidoComponent } from 'src/components/card-pedido/card-pedido.component';
import { Router } from '@angular/router';
import { IProdutos } from 'src/@types/IProdutos';
import { ListaProdutos } from 'src/utils/mock/lista-produtos';
import { VISUALIZAR_PEDIDO } from 'src/utils/constants/frontEndUrls';
import { INovoPedido } from 'src/@types/INovoPedido';
import { AlertController } from '@ionic/angular';
import { EnumStatusOptions } from 'src/@types/Enums/Status';
import { PedidosFirestoreService } from 'src/utils/services/firestore/pedidos-firestore.service';
import { MesasFirestoreService } from 'src/utils/services/firestore/mesas-firestore.service';

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
  PedidosFiltrados: Array<IProdutos> = Array.from([...ListaProdutos]);
  ProdutosCardapio: Array<IProdutos> = Array.from([...ListaProdutos]);

  mesas: Array<IMesas>;
  mesaSelecionada: string;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private pedidosService: PedidosFirestoreService,
    private mesasService: MesasFirestoreService
  ) {}

  ngOnInit() {
    this.mesaSelecionada = '';
    this.pesquisaMesasVazias();
  }

  ionViewWillLeave() {
    this.LimpaCampos();
  }

  pesquisa(event: any) {
    const termo = event.detail.value;

    if (termo !== '') {
      const listaFiltrada: Array<IProdutos> = this.ProdutosCardapio.filter(
        (element: IProdutos) =>
          element.nome.toLowerCase().includes(termo.toLowerCase())
      );
      this.PedidosFiltrados = listaFiltrada;
    } else {
      this.PedidosFiltrados = this.ProdutosCardapio;
    }
  }

  filtraCategoria(categoria: string) {
    const listaFiltrada: Array<IProdutos> = this.ProdutosCardapio.filter(
      (element: IProdutos) => element.categoria === categoria
    );
    this.PedidosFiltrados = listaFiltrada;
  }

  async pesquisaMesasVazias() {
    this.mesas = await this.mesasService.buscaListaMesasVazias();
  }

  async finalizarPedido() {
    const lista: Array<IProdutos> = this.ProdutosCardapio.filter(
      (product: IProdutos) => product.quantidade > 0
    );

    if (lista.length > 0 && this.mesaSelecionada !== '') {
      this.mesaSelecionada = this.mesaSelecionada.replace(/\D/g, '');

      const pedido: INovoPedido = {
        numero: Number(this.mesaSelecionada),
        status: EnumStatusOptions.AguardandoConfirmacaoCozinha,
        itens: lista
          .filter((item) => item.quantidade > 0)
          .map((item) => ({
            nome: item.nome,
            quantidade: item.quantidade,
            preco: item.preco,
          })),
      };

      //limpar os campos apos a submissao do formulario
      this.LimpaCampos();

      await this.pedidosService.setNewPedidoDocuments(pedido);

      this.pedidosService.notificarAtualizacao();
      this.router.navigateByUrl(VISUALIZAR_PEDIDO);
    } else {
      this.showAlert(
        'Dados inválidos',
        'É necessário informar o número da mesa e o pedido para finalizar.'
      );
    }
  }

  LimpaCampos() {
    this.mesaSelecionada = '';
    this.PedidosFiltrados = Array.from([...ListaProdutos]);
    this.ProdutosCardapio = Array.from([...ListaProdutos]);
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
