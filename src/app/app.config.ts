import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp({
        "projectId": "planning-poker-930be",
        "appId": "1:1044216793080:web:36733da385af3a15d4380d",
        "storageBucket": "planning-poker-930be.appspot.com",
        "apiKey": "AIzaSyB0LiqCVbowwfrlKsC3fpLpHKKfRE2HrXU",
        "authDomain": "planning-poker-930be.firebaseapp.com",
        "messagingSenderId": "1044216793080",
        "measurementId": "G-KZK3KK3B0J"
      })),
      provideFirestore(() => getFirestore())),
  ]
};
