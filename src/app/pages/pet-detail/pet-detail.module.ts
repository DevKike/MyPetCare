import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PetDetailPageRoutingModule } from './pet-detail-routing.module';

import { PetDetailPage } from './pet-detail.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetDetailPageRoutingModule,
    SharedModule
  ],
  declarations: [PetDetailPage]
})
export class PetDetailPageModule {}
