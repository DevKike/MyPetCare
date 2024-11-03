import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const MODULES = [CommonModule];

const COMPONENTS = [];

const PROVIDERS = [];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  providers: [...PROVIDERS],
  exports: [...MODULES, ...COMPONENTS],
})
export class SharedModule {}