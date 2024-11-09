import { NgModule } from '@angular/core';

import { PrincipalPageRoutingModule } from './principal-routing.module';

import { PrincipalPage } from './principal.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [PrincipalPageRoutingModule, SharedModule],
  declarations: [PrincipalPage],
})
export class PrincipalPageModule {}
