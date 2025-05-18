import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonContent, IonItem, IonInput, IonNote, IonButton } from '@ionic/angular/standalone';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Validacoes } from 'src/utils/forms/validacoes';
import { AuthService } from 'src/utils/services/auth/auth.service';
import { AlertController } from '@ionic/angular';
import { ICredentials, MapUserCredentials } from 'src/@types/ICredentials';
import { MaskitoOptions, MaskitoElementPredicate } from '@maskito/core';
import { FirestoreService } from 'src/utils/services/firestore/firestore.service';
import { USUARIOS } from 'src/utils/constants/backEndUrls';
import { LOGIN } from 'src/utils/constants/frontEndUrls';
import { IUserInformations, MapUserInformations } from 'src/@types/IUserInformations';
import { ProfileInfo } from 'src/utils/mock/profile-info';

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
  schemas: [NO_ERRORS_SCHEMA],
})
export class CadastroPage implements OnInit {
  cadastro!: FormGroup;
  isBlocked: boolean = false;

  readonly phoneMask: MaskitoOptions = {
    mask: [
      '(', /\d/, /\d/, ')', ' ',
      /\d/, /\d/, /\d/, /\d/, /\d/,
      '-', /\d/, /\d/, /\d/, /\d/,
    ],
  };

  readonly maskPredicate: MaskitoElementPredicate = async (el) => {
    return (el as unknown as HTMLIonInputElement).getInputElement();
  };
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController,
    private fs: FirestoreService
  ) {}

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
          Validacoes.senhasCombinam('password', false),
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

  async Cadastrar() {
    if(!this.cadastro.invalid){
      this.isBlocked = true;

      const credentials: ICredentials = MapUserCredentials(this.cadastro);
      const userInformations: IUserInformations = MapUserInformations(this.cadastro)

      await this.fs.addDocument(USUARIOS, userInformations);
      const user = await this.authService.register(credentials);

      if (user) {
        this.cadastro.reset();
        this.showAlert('Sucesso', 'Usuario cadastrado no sistema!');
      } else {
        this.showAlert('Falha no registro', 'Tente novamente!');
      }

      this.isBlocked = false;
    }else{
       this.showAlert('Dados inválidos', 'Todos os campos devem ser preenchidos antes de submeter.');
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
