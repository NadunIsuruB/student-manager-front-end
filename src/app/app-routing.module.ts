import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './services/auth-guard.service';

const routes: Routes = [
  { 
    path: 'webapp', 
    loadChildren: () => import('./modules/core/core.module').then(m => m.CoreModule),
    canActivate: [authGuard]
  }, 
  { 
    path: '', 
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
