import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from "@angular/platform-browser/animations"
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NbLayoutModule, NbListModule, NbThemeModule, NbUserModule } from '@nebular/theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      NbThemeModule.forRoot({name: 'default'}),
      NbLayoutModule
    ),
  ]
};
