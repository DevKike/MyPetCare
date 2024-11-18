import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'principal',
    loadChildren: () => import('./pages/principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'my-pets',
    loadChildren: () => import('./pages/my-pets/my-pets.module').then( m => m.MyPetsPageModule)
  },
  {
    path: 'reminders',
    loadChildren: () => import('./pages/reminders/reminders.module').then( m => m.RemindersPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },

  {
    path: 'sign-in',
    loadChildren: () => import('./pages/sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'slide',
    loadChildren: () => import('./pages/slide/slide.module').then( m => m.SlidePageModule)
  },

  {
    path: 'pet-detail/:id',
    loadChildren: () => import('./pages/pet-detail/pet-detail.module').then( m => m.PetDetailPageModule)
  },
  {
    path: 'vaccine',
    loadChildren: () => import('./pages/vaccine/vaccine.module').then( m => m.VaccinePageModule)
  },
  {
    path: '**',
    redirectTo: 'slide',
    pathMatch: 'full'
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
