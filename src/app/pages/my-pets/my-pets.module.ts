import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyPetsPageRoutingModule } from './my-pets-routing.module';

import { MyPetsPage } from './my-pets.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyPetsPageRoutingModule,
    SharedModule
  ],
  declarations: [MyPetsPage]
})
export class MyPetsPageModule {}
