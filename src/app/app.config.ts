import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { AppCommonModule } from './app.common.module';

//import { routes } from './app.routes';
import { GoogleAiComponent } from './feature/google-ai/google-ai.component';
import { MainComponent } from './feature/main.component';

const routes: Routes = [
    { path: 'ai', title: 'Genesis AI', component: GoogleAiComponent },
    { path: 'billsplitter', title: 'Bill Splitter', component: MainComponent },
    { path: '',   redirectTo: '/billsplitter', pathMatch: 'full' },
  ];


export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(
    AppCommonModule
  ),
  provideRouter(routes)]
};
