import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonSearchbar, IonSelect, IonSelectOption  } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/components/header/header.component';
import { IMesas } from 'src/@types/IMesas';
import { CardPedidoComponent } from 'src/components/card-pedido/card-pedido.component';
import { ActivatedRoute, Router } from '@angular/router';
import { IProdutos } from 'src/@types/IProdutos';
import { NEW_PRODUCT, RESUMO_PEDIDO, VISUALIZAR_PEDIDO } from 'src/utils/constants/frontEndUrls';
import { AlertController } from '@ionic/angular';
import { PedidosFirestoreService } from 'src/utils/services/firestore/pedidos-firestore.service';
import { MesasFirestoreService } from 'src/utils/services/firestore/mesas-firestore.service';
import { CardapioFirestoreService } from 'src/utils/services/firestore/cardapio-firestore.service';
import { IItem } from 'src/@types/IItem';

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
  ProdutosFiltrados: Array<IProdutos>;
  ProdutosCardapio: Array<IProdutos>;

  mesas: Array<IMesas>;
  mesaSelecionada: string = '';

  isDisabled: boolean = false;
  IdPedido: string = '';
  seletorMesaDisabled: boolean = false;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private pedidosService: PedidosFirestoreService,
    private mesasService: MesasFirestoreService,
    private cardapioSerive: CardapioFirestoreService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.IdPedido = this.activatedRoute.snapshot.paramMap.get('id');
    this.pesquisaInformacoesEstabelecimento();
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
      this.ProdutosFiltrados = listaFiltrada;
    } else {
      this.ProdutosFiltrados = this.ProdutosCardapio;
    }
  }

  filtraCategoria(categoria: string) {
    const listaFiltrada: Array<IProdutos> = this.ProdutosCardapio.filter(
      (element: IProdutos) => element.categoria === categoria
    );
    this.ProdutosFiltrados = listaFiltrada;
  }

  async pesquisaInformacoesEstabelecimento() {
    this.mesas = await this.mesasService.buscaListaMesasVazias();
    this.ProdutosCardapio = await this.cardapioSerive.getCardapio();
    this.ProdutosFiltrados = Array.from([...this.ProdutosCardapio]);

    if(this.IdPedido !== NEW_PRODUCT)
      this.pesquisaInformacoesComanda();
  }

  async pesquisaInformacoesComanda(){
    this.seletorMesaDisabled = true;
    const produto = await this.pedidosService.getPedidoDocumentById(this.IdPedido);

    this.mesaSelecionada = this.mesasService.createElementIdentificador(produto.numero);

    this.ProdutosCardapio = this.ProdutosCardapio.map((element: IProdutos) => {
      const item = produto.itens.find(
        (produto: IItem) => produto.id === element.id
      );
      if (item) {
        element.quantidade = item.quantidade;
      }
      return element;
    });
  }

  async finalizarPedido() {
    if(this.IdPedido !== NEW_PRODUCT){
      this.editaPedidos();
    }else{
      this.cadastraComanda();      
    }
  }
  
  async editaPedidos() {
    this.isDisabled = true;
    //chamada
    await this.pedidosService.editaPedido(this.ProdutosCardapio, this.IdPedido);

    this.LimpaCampos();
    this.isDisabled = false;
    this.router.navigateByUrl(VISUALIZAR_PEDIDO);
  }

  async cadastraComanda() {
    this.isDisabled = true;

    //chamada
    await this.pedidosService.cadastroPedido(this.ProdutosCardapio, this.mesaSelecionada);

    this.LimpaCampos();
    this.isDisabled = false;
    this.router.navigateByUrl(RESUMO_PEDIDO);
  }

  LimpaCampos() {
    this.pesquisaInformacoesEstabelecimento();
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
