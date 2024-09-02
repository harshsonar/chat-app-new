import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from "@angular/platform-browser/animations"
import { provideHttpClient, withFetch } from '@angular/common/http';


// const firebaseConfig = {
//   apiKey: "AIzaSyDP0NADeSSRXqpDuTVm0UMeODgyaSOo6M8",
//   authDomain: "chat-app-3c994.firebaseapp.com",
//   databaseURL: "https://chat-app-3c994-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "chat-app-3c994",
//   storageBucket: "chat-app-3c994.appspot.com",
//   messagingSenderId: "550983625851",
//   appId: "1:550983625851:web:dc4779537dbf41a00e86de"
// };


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimations(),
    provideHttpClient(withFetch()),

    // // For Firebase
    // importProvidersFrom([
    //   provideFirebaseApp(() => initializeApp(firebaseConfig)),
    //   provideAuth(() => getAuth())
    // ]),
  ]
};
