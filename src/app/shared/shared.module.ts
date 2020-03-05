import { NgModule } from '@angular/core';

import { ComponentsModule } from './components/components.module';
import { GuardsModule } from './guards/guards.module';
import { InterceptorModule } from './interceptor/interceptor.module';
import { ServicesModule } from './services/services.module';
import { StoreModule } from './store/store.module';

@NgModule({
  imports: [ComponentsModule, GuardsModule, InterceptorModule, ServicesModule, StoreModule],
  exports: [ComponentsModule, GuardsModule, InterceptorModule, ServicesModule, StoreModule]
})
export class SharedModule {}
