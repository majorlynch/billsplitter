import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { AppCommonModule } from './app.common.module';

//import { routes } from './app.routes';
import { PromptAiComponent } from './feature/prompt-ai/prompt-ai.component';
import { MainComponent } from './feature/main.component';
import { ChatAiComponent } from './feature/chat-ai/chat-ai.component';

const routes: Routes = [
  { path: 'ai', title: 'AI Prompt', component: PromptAiComponent },
  { path: 'billsplitter', title: 'Bill Splitter', component: MainComponent },
  { path: 'chat', title: 'AI Chat', component: ChatAiComponent },
  { path: '', redirectTo: '/billsplitter', pathMatch: 'full' },
];

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(AppCommonModule),
    provideRouter(routes)
  ],
};
