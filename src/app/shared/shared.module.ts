import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ComponentsModule } from './components/components.module';
import { GuardsModule } from './guards/guards.module';
import { InterceptorModule } from './interceptor/interceptor.module';
import { ResolversModule } from './resolvers/resolvers.module';
import { ServicesModule } from './services/services.module';
import { StoreModule } from './store/store.module';

@NgModule({
  imports: [
    HttpClientModule,
    ComponentsModule,
    GuardsModule,
    InterceptorModule,
    ResolversModule,
    ServicesModule,
    StoreModule
  ],
  exports: [
    HttpClientModule,
    ComponentsModule,
    GuardsModule,
    InterceptorModule,
    ResolversModule,
    ServicesModule,
    StoreModule
  ]
})
export class SharedModule {}
