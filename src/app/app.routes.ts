import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const routes: Routes = [
    {path: '', component: LandingPageComponent},
    {path: 'home', component: HomeComponent}
];
