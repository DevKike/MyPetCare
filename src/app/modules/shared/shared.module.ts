import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from './services/storage/storage.service';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from './components/button/button.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { RouterModule } from '@angular/router';


const MODULES = [CommonModule, IonicModule, RouterModule];

const COMPONENTS = [TabsComponent, ButtonComponent];


const PROVIDERS = [StorageService];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  providers: [...PROVIDERS],
  exports: [...MODULES, ...COMPONENTS],
})
export class SharedModule {}
