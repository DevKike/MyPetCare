import { Component, Input, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { paw, home, alarm, search } from 'ionicons/icons';

interface Tab {
  name: string;
  title: string;
  icon: string;
  route: string
}
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent   {
  @Input() tabs: Tab[] = [];

  constructor() {

    addIcons({ paw, home, alarm, search });
  }


}
