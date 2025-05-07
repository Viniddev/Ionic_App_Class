import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonContent, IonItem, IonInput, IonNote, IonButton } from '@ionic/angular/standalone';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HOME, LOGIN } from 'src/utils/frontEndUrls';
import { HeaderComponent } from 'src/components/header/header.component';

@Component({
  selector: 'app-abertura-comanda',
  templateUrl: './abertura-comanda.page.html',
  styleUrls: ['./abertura-comanda.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    IonItem,
    IonInput,
    IonNote,
    ReactiveFormsModule,
    IonButton,
    HeaderComponent
  ]
})
export class AberturaComandaPage implements OnInit {
  cadastro!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.cadastro = this.fb.group({
      numeroMesa: ['', Validators.required],
      nome: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      cpf: ['', [Validators.pattern(/^\d{11}$/)]],
      telefone: ['', [Validators.pattern(/^\d{10,11}$/)]],
    });
  }

  get nome() {
    return this.cadastro.get('nome');
  }

  get telefone() {
    return this.cadastro.get('telefone');
  }

  get cpf() {
    return this.cadastro.get('cpf');
  }

  get numeroMesa() {
    return this.cadastro.get('numeroMesa');
  }

  voltar() {
    this.router.navigate([HOME]);
  }
}


 

