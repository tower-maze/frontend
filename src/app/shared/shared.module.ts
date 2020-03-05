import { NgModule } from '@angular/core';

import { GuardsModule } from './guards/guards.module';
import { InterceptorModule } from './interceptor/interceptor.module';
import { ResolversModule } from './resolvers/resolvers.module';
import { ServicesModule } from './services/services.module';
import { StoreModule } from './store/store.module';

@NgModule({
  imports: [GuardsModule, InterceptorModule, ResolversModule, ServicesModule, StoreModule],
  exports: [GuardsModule, InterceptorModule, ResolversModule, ServicesModule, StoreModule]
})
export class SharedModule {}
