import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SlidePageRoutingModule } from './slide-routing.module';

import { SlidePage } from './slide.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';


@NgModule({
  imports: [SharedModule, SlidePageRoutingModule],
  declarations: [SlidePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SlidePageModule {}
