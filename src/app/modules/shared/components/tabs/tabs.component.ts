import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { paw, home, alarm, search, settings } from 'ionicons/icons';

interface Tab {
  name: string;
  title: string;
  icon: string;
  route: string;
}
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  public tabs = [
    { name: 'home', title: 'Home', icon: 'home', route: 'home' },
    { name: 'myPets', title: 'My Pets', icon: 'paw', route: 'my-pets' },
    { name: 'reminder', title: 'Reminders', icon: 'alarm', route: 'reminders' },
    {
      name: 'settings',
      title: 'Settings',
      icon: 'settings',
      route: 'settings',
    },
  ];

  constructor(private readonly _navCtrl: NavController) {}

  ngOnInit(): void {
    addIcons({ paw, home, alarm, search, settings });
  }

  protected doNavigate(url: string) {
    this._navCtrl.navigateForward(url);
  }
}

