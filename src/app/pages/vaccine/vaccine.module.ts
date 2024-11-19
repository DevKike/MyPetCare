import { NgModule } from '@angular/core';

import { VaccinePageRoutingModule } from './vaccine-routing.module';

import { VaccinePage } from './vaccine.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    VaccinePageRoutingModule,
    SharedModule
  ],
  declarations: [VaccinePage]
})
export class VaccinePageModule {}
