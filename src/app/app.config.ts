import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { AppCommonModule } from './app.common.module';

//import { routes } from './app.routes';
import { PromptAiComponent } from './feature/prompt-ai/prompt-ai.component';
import { MainComponent } from './feature/main.component';
import { ChatAiComponent } from './feature/chat-ai/chat-ai.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
  provideAppCheck,
} from '@angular/fire/app-check';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

const routes: Routes = [
  { path: 'ai', title: 'AI Prompt', component: PromptAiComponent },
  { path: 'billsplitter', title: 'Bill Splitter', component: MainComponent },
  { path: 'chat', title: 'AI Chat', component: ChatAiComponent },
  { path: '', redirectTo: '/billsplitter', pathMatch: 'full' },
];

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(AppCommonModule),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'cl-angular-training',
        appId: '1:807616859621:web:cdbc4a6fe34825a494f30c',
        databaseURL:
          'https://cl-angular-training-default-rtdb.europe-west1.firebasedatabase.app',
        storageBucket: 'cl-angular-training.firebasestorage.app',
        apiKey: 'AIzaSyBdgIkui4VLwWui6bdimqyyIcKAx-nt3mE',
        authDomain: 'cl-angular-training.firebaseapp.com',
        messagingSenderId: '807616859621',
        measurementId: 'G-FDJWF6YG6C',
      })
    ),
    provideAuth(() => getAuth()),
    provideAppCheck(() => {
      const provider = new ReCaptchaEnterpriseProvider(
        environment.reCaptchaKey
      );
      return initializeAppCheck(undefined, {
        provider,
        isTokenAutoRefreshEnabled: true,
      });
    }),
    provideFirestore(() => getFirestore()),
  ],
};
