import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ProfileInfo } from 'src/utils/mock/profile-info';
import { Router } from '@angular/router';
import { HOME } from 'src/utils/constants/frontEndUrls';
import { HeaderComponent } from 'src/components/header/header.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, HeaderComponent],
})
export class PerfilPage {
  perfil = ProfileInfo

  constructor(private router: Router) {}

  Voltar(){
    this.router.navigateByUrl(HOME);
  }
}
