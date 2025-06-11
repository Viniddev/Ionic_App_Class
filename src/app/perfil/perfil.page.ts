import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ProfileInfo } from 'src/utils/mock/profile-info';
import { Router } from '@angular/router';
import { LOGIN } from 'src/utils/constants/frontEndUrls';
import { ProfileFirestoreService } from 'src/utils/services/firestore/profile-firestore.service';
import { IUserInformations } from 'src/@types/IUserInformations';
import { AuthService } from 'src/utils/services/auth/auth.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class PerfilPage implements OnInit {
  perfil: IUserInformations = ProfileInfo;
  pedidosService: any;
  disabled: boolean = false;

  constructor(
    private router: Router,
    private profileService: ProfileFirestoreService,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.getAllPedidos();
  }

  async getAllPedidos() {
    this.perfil = await this.profileService.getUserProfileInformations();
    return this.perfil;
  }

  async Atualizar() {
    this.disabled = true;
    const nomeRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
    const telefoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}[-]?\d{4}$/;

    if(!nomeRegex.test(this.perfil.nome)){
      this.showAlert(
        'Nome inválido',
        'Nome não deve conter caracteres especiais.'
      );
      this.disabled = false;
      return;
    }

    if(!telefoneRegex.test(this.perfil.telefone)){
      this.showAlert(
        'Telefone inválido',
        'Telefone deve estar em um formato valido.'
      );
      this.disabled = false;
      return;
    }

    await this.profileService.updateUserProfileInformations(this.perfil);
    this.disabled = false;
  }

  sair() {
    this.authService.logout();
    this.router.navigate([LOGIN]);
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
