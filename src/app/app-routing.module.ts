import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./lazy/onboarding/onboarding.module').then((m) => m.OnboardingModule)
  },
  {
    path: 'game',
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
