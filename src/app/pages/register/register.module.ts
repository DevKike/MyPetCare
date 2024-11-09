import { NgModule } from '@angular/core';
import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [RegisterPageRoutingModule, SharedModule],
  declarations: [RegisterPage],
})
export class RegisterPageModule {}
