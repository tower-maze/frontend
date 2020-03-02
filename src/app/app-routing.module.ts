import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';

import { AuthGuard } from './shared/guards/auth/auth.guard';
import { PublicGuard } from './shared/guards/auth/public.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [PublicGuard],
    loadChildren: () =>
      import('./lazy/onboarding/onboarding.module').then((m) => m.OnboardingModule)
  },
  {
    path: 'game',
    canActivate: [AuthGuard],
    loadChildren: () => import('./lazy/game/game.module').then((m) => m.GameModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    QuicklinkModule,
    RouterModule.forRoot(routes, { preloadingStrategy: QuicklinkStrategy })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
