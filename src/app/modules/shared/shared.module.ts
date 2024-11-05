import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from './services/storage/storage.service';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from './components/button/button.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SheetModalComponent } from './components/sheet-modal/sheet-modal.component';
import { CardModalComponent } from './components/card-modal/card-modal.component';
import { HeaderComponent } from './components/header/header.component';
import { RefresherComponent } from './components/refresher/refresher.component';
import { InputComponent } from './components/input/input.component';

const MODULES = [CommonModule, IonicModule, RouterModule, FormsModule];

const COMPONENTS = [
  TabsComponent,
  ButtonComponent,
  SheetModalComponent,
  CardModalComponent,
  HeaderComponent,
  RefresherComponent,
  InputComponent
];

const PROVIDERS = [StorageService];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  providers: [...PROVIDERS],
  exports: [...MODULES, ...COMPONENTS],
})
export class SharedModule {}
