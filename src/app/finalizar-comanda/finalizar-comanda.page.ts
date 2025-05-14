import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { CardFechamentoItemComponent } from 'src/components/card-fechamento-item/card-fechamento-item.component';
import { Router } from '@angular/router';
import { HOME } from 'src/utils/constants/frontEndUrls';
import { ItemFecharComanda } from 'src/utils/mock/lista-Itens';
import { HeaderComponent } from 'src/components/header/header.component';

@Component({
  selector: 'app-finalizar-comanda',
  templateUrl: './finalizar-comanda.page.html',
  styleUrls: ['./finalizar-comanda.page.scss'],
  standalone: true,
  imports: [
    IonButton, 
    IonContent, 
    CommonModule, 
    FormsModule,
    CardFechamentoItemComponent, 
    HeaderComponent
  ]
})
export class FinalizarComandaPage implements OnInit {
  item = ItemFecharComanda

  constructor(private router: Router) { }

  ngOnInit() {
  }

  Voltar(){
    this.router.navigateByUrl(HOME)
  }

}
