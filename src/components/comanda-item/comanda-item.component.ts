import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ItemComanda {
  id: number;
  numero: number;
  itens: {
    quantidade: number;
    nome: string;
  }[];
  total: number,
}

@Component({
  selector: 'app-comanda-item',
  templateUrl: './comanda-item.component.html',
  styleUrls: ['./comanda-item.component.scss'],
  imports: [CommonModule]
})
export class ComandaItemComponent  implements OnInit {
  @Input({ required: true }) itemComanda!: ItemComanda;
  @Output() editar = new EventEmitter<void>();
  @Output() fechar = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

}
