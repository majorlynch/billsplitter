import { CommonModule } from '@angular/common';
import { PromptAiService } from '../../service/prompt-ai.service';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import { FormsModule } from '@angular/forms';
import { finalize, tap } from 'rxjs';

@Component({
  selector: 'app-google-ai',
  standalone: true,
  providers: [],
  imports: [CommonModule, HeaderComponent, FormsModule],
  templateUrl: './prompt-ai.component.html',
  styleUrl: './prompt-ai.component.css',
})
export class PromptAiComponent {
  prompt: string = '';
  aiGeminiResponse: string = '';
  aiDeepSeekResponse: string = '';
  isLoadingGemini = false;
  isLoadingDeepseek = false;

  constructor(private PromptAiService: PromptAiService) {}

  getResponse() {
    this.aiGeminiResponse = '';
    this.aiDeepSeekResponse = '';
    this.isLoadingGemini = true;
    this.isLoadingDeepseek = true;
    this.PromptAiService.getGeminiResponse(this.prompt)
    .pipe(finalize(() => this.isLoadingGemini = false))
    .subscribe(res => this.aiGeminiResponse = res
    );

    this.PromptAiService.getDeepseekResponse(this.prompt)
    .pipe(tap(res => console.log(res)),
          finalize(() => this.isLoadingDeepseek = false))
    .subscribe(res => this.aiDeepSeekResponse = res
    );
  }
}
