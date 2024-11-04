import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
<<<<<<< HEAD:src/app/home/home.module.ts
import { SharedModule } from '../modules/shared/shared.module';
=======
import { SharedModule } from 'src/app/modules/shared/shared.module';
SharedModule
>>>>>>> ca6971d89ed91b3f9c9f8854785f2eeedac52cf0:src/app/pages/home/home.module.ts


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule
<<<<<<< HEAD:src/app/home/home.module.ts
  ],
=======
],
>>>>>>> ca6971d89ed91b3f9c9f8854785f2eeedac52cf0:src/app/pages/home/home.module.ts
  declarations: [HomePage]
})
export class HomePageModule {}
