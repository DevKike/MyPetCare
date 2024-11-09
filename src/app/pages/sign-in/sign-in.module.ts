import { NgModule } from '@angular/core';

import { SignInPageRoutingModule } from './sign-in-routing.module';

import { SignInPage } from './sign-in.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    SignInPageRoutingModule,
    SharedModule
  ],
  declarations: [SignInPage]
})
export class SignInPageModule {}
