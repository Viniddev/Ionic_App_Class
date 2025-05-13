import { Routes } from '@angular/router';
import { TabNavegacaoComponent } from 'src/components/tab-navegacao/tab-navegacao.component';
import { authGuard } from 'src/utils/services/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./cadastro/cadastro.page').then((m) => m.CadastroPage),
  },
  {
    path: 'perfil',
    loadComponent: () =>
      import('./perfil/perfil.page').then((m) => m.PerfilPage),
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'service',
    component: TabNavegacaoComponent,
    children: [
      {
        path: 'cadastro-comanda',
        loadComponent: () =>
          import('./cadastro-comanda/cadastro-comanda.page').then(
            (m) => m.CadastroComandaPage
          ),
        canActivate: [authGuard],
      },
      {
        path: 'visualizar-pedidos',
        loadComponent: () =>
          import('./visualizar-pedidos/visualizar-pedidos.page').then(
            (m) => m.VisualizarPedidosPage
          ),
        canActivate: [authGuard],
      },
      {
        path: 'resumo-pedidos',
        loadComponent: () =>
          import('./resumo-pedidos/resumo-pedidos.page').then(
            (m) => m.ResumoPedidosPage
          ),
        canActivate: [authGuard],
      },
      {
        path: 'finalizar-comanda',
        loadComponent: () =>
          import('./finalizar-comanda/finalizar-comanda.page').then(
            (m) => m.FinalizarComandaPage
          ),
        canActivate: [authGuard],
      },
      {
        path: '',
        redirectTo: 'cadastro-comanda',
        pathMatch: 'full',
      },
    ],
  },
];
