import { NgModule } from '@angular/core';

import { GuardsModule } from './guards/guards.module';
import { InterceptorModule } from './interceptor/interceptor.module';
import { ServicesModule } from './services/services.module';
import { StoreModule } from './store/store.module';

@NgModule({
  imports: [GuardsModule, InterceptorModule, ServicesModule, StoreModule],
  exports: [StoreModule]
})
export class SharedModule {}
