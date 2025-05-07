import { Routes } from '@angular/router';
import { authGuard } from 'src/utils/services/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    // canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'perfil',
    loadComponent: () =>
      import('./perfil/perfil.page').then((m) => m.PerfilPage),
    // canActivate: [authGuard],
  },
  {
    path: 'cadastro-comanda',
    loadComponent: () =>
      import('./cadastro-comanda/cadastro-comanda.page').then(
        (m) => m.CadastroComandaPage
      ),
    // canActivate: [authGuard],
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./cadastro/cadastro.page').then((m) => m.CadastroPage),
  },
  {
    path: 'visualizar-pedidos',
    loadComponent: () => import('./visualizar-pedidos/visualizar-pedidos.page').then( m => m.VisualizarPedidosPage)
  },
  {
    path: 'resumo-pedidos',
    loadComponent: () => import('./resumo-pedidos/resumo-pedidos.page').then( m => m.ResumoPedidosPage)
  },
  {
    path: 'finalizar-comanda',
    loadComponent: () => import('./finalizar-comanda/finalizar-comanda.page').then( m => m.FinalizarComandaPage)
  },
  {
    path: 'abertura-comanda',
    loadComponent: () =>
      import('./abertura-comanda/abertura-comanda.page').then((m) => m.AberturaComandaPage),
  },
];
