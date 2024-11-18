import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { paw, home, alarm, search, person } from 'ionicons/icons';

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
    { name: 'profile', title: 'Profile', icon: 'person', route: 'profile',
    },
  ];

  constructor(private readonly _navCtrl: NavController) {}

  ngOnInit(): void {
    addIcons({ paw, home, alarm, search, person });
  }

  protected doNavigate(url: string) {
    this._navCtrl.navigateForward(url);
  }
}
