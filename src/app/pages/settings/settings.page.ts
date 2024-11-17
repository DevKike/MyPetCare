import { Component, OnInit } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { FirestoreCollection } from 'src/app/modules/shared/enums/FirestoreCollection';
import { IUser } from 'src/app/modules/shared/interfaces/IUser';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';
import { FirestoreService } from 'src/app/modules/shared/services/firestore/firestore.service';
import { LoadingService } from 'src/app/modules/shared/services/loading/loading.service';
import { NavigationService } from 'src/app/modules/shared/services/navigation/navigation.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  protected userData!: IUser;
  protected userName!: IUser["name"];

  constructor(
    private readonly _authSrv: AuthService,
    private readonly _navSrv: NavigationService,
    private readonly _firestoreSrv: FirestoreService,
    private readonly _loadingSrv: LoadingService,
  ) {}

  async ngOnInit() {
    await this.loadUserData();
  }

  protected doNavigate() {
    try {
      this._navSrv.navigateTo('/profile');
    } catch (error) {
      throw error;
    }
  }

  private async getUserData() {
    try {
      const userId = await this._authSrv.getAuthUserId();
  
      if (!userId) {
        return;
      }
  
      this.userData = await firstValueFrom(this._firestoreSrv.getDocumentById(FirestoreCollection.USERS, userId));
    } catch (error) {
      throw error;
    }
  }

  private async loadUserData() {
    try {
      this._loadingSrv.showLoading();
      await this.getUserData();

      this.userName = `${this.userData.name} ${this.userData.lastName}`;
    } catch (error) {
      throw error;
    } finally {
      this._loadingSrv.hideLoading();
    }
  }
}
