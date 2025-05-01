import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonContent, IonItem, IonInput, IonNote, IonButton } from '@ionic/angular/standalone';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LOGIN } from 'src/utils/frontEndUrls';
import { Validacoes } from 'src/utils/forms/validacoes';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
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
  ],
})
export class CadastroPage implements OnInit{
  cadastro!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}
  
  ngOnInit() {
    this.cadastro = this.fb.group({
      nome: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.email,
        ]),
      ],
      cpf: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
          Validacoes.validaCpf,
        ]),
      ],
      telefone: ['', [Validators.required]],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
          Validacoes.senhasCombinam('passwordConfirm', true),
        ]),
      ],
      passwordConfirm: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
          Validacoes.senhasCombinam('password', true),
        ]),
      ],
    });
  }

  get email() {
    return this.cadastro.get('email');
  }

  get password() {
    return this.cadastro.get('password');
  }

  get passwordConfirm() {
    return this.cadastro.get('passwordConfirm');
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

  voltar() {
    this.router.navigate([LOGIN]);
  }
}
