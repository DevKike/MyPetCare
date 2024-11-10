import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from './services/storage/storage.service';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from './components/button/button.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SheetModalComponent } from './components/sheet-modal/sheet-modal.component';
import { CardModalComponent } from './components/card-modal/card-modal.component';
import { HeaderComponent } from './components/header/header.component';
import { RefresherComponent } from './components/refresher/refresher.component';
import { InputComponent } from './components/input/input.component';
import { SegmentComponent } from './components/segment/segment.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ListComponent } from './components/list/list.component';
import { AuthService } from './services/auth/auth.service';
import { FirestoreService } from './services/firestore/firestore.service';
import { LoadingService } from './services/loading/loading.service';
import { LocalNotificationsService } from './services/localNotifications/local-notifications.service';
import { LocalStorageService } from './services/localStorage/local-storage.service';
import { ToastService } from './services/toast/toast.service';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { CardComponent } from './components/card/card.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

const MODULES = [
  CommonModule,
  IonicModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  AngularFireAuthModule
];

const COMPONENTS = [
  TabsComponent,
  ButtonComponent,
  SheetModalComponent,
  CardModalComponent,
  HeaderComponent,
  RefresherComponent,
  InputComponent,
  SegmentComponent,
  SearchBarComponent,
  ListComponent,
  ThumbnailComponent,
  CardComponent,
  SegmentComponent,
  SheetModalComponent,
  SearchBarComponent,
  CalendarComponent
];

const PROVIDERS = [
  StorageService,
  AuthService,
  FirestoreService,
  LoadingService,
  LocalNotificationsService,
  LocalStorageService,
  ToastService,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  providers: [...PROVIDERS],
  exports: [...MODULES, ...COMPONENTS],
})
export class SharedModule {}
