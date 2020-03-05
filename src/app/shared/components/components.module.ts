import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [ErrorComponent],
  imports: [CommonModule, MatSnackBarModule],
  exports: [ErrorComponent]
})
export class ComponentsModule {}
