import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IItemComandaResumida } from 'src/@types/IItemComanda';
import { MesasFirestoreService } from 'src/utils/services/firestore/mesas-firestore.service';
import { Router } from '@angular/router';
import { RESUMO_PEDIDO } from 'src/utils/constants/frontEndUrls';

@Component({
  selector: 'app-card-fechamento-item',
  templateUrl: './card-fechamento-item.component.html',
  styleUrls: ['./card-fechamento-item.component.scss'],
  imports: [CommonModule],
})
export class CardFechamentoItemComponent implements OnInit {
  @Input({ required: true }) item!: IItemComandaResumida;

  constructor(private mesaService: MesasFirestoreService, private router: Router ) {}

  ngOnInit() {}

  async fechar(){
    await this.mesaService.desbloqueiaMesa(this.item.numero);
    this.router.navigateByUrl(RESUMO_PEDIDO)
    //todo: mudar o status da mesa
  }
}
