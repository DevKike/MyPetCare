import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from './services/storage/storage.service';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from './components/button/button.component';

const MODULES = [CommonModule, IonicModule];

const COMPONENTS = [ButtonComponent];

const PROVIDERS = [StorageService];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  providers: [...PROVIDERS],
  exports: [...MODULES, ...COMPONENTS],
})
export class SharedModule {}