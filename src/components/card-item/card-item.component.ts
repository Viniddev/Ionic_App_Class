import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Mesa {
  id: number;
  numero: number;
  status: string;
  itens: {
    quantidade: number;
    nome: string;
  }[];
}

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
  imports: [CommonModule]
})
export class CardItemComponent  implements OnInit {
  @Input({ required: true }) mesa!: Mesa;

  constructor() { }

  ngOnInit() {}

  getStatusClass(status: string): { [key: string]: boolean } {
    const statusMap: Record<string, string> = {
      'Pronto': 'pronto',
      'Em Produção': 'em-producao',
      'Aguardando confirmação da cozinha': 'aguardando'
    };

    const normalizedStatus = statusMap[status] ||
                           status.toLowerCase()
                                .replace(/\s+/g, '-')
                                .normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "");

    return { [normalizedStatus]: true };
  }

  getTranslatedStatus(status: string): string {
    const statusTranslations: Record<string, string> = {
      'Pronto': 'Pronto',
      'Em Produção': 'Em Produção',
      'Aguardando confirmação da cozinha': 'Aguardando'
    };

    return statusTranslations[status] || status;
  }

}
