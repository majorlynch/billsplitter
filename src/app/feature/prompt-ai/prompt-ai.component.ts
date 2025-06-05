import { CommonModule } from '@angular/common';
import { PromptAiService } from '../../service/prompt-ai.service';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import { FormsModule } from '@angular/forms';
import { debounceTime, finalize, tap } from 'rxjs';

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
  showInProgress = false;

  constructor(private PromptAiService: PromptAiService) {}

  getResponse() {
    this.aiGeminiResponse = '';
    this.aiDeepSeekResponse = '';
    this.showInProgress = true;
    /*
    this.PromptAiService.getResponse(this.prompt).then((res) => {
      this.aiResponse = res;
      console.log(this.aiResponse);
      this.showInProgress = false;
    });
    */
    //this.PromptAiService.getResponse(this.prompt, true)
    this.PromptAiService.getGeminiResponse(this.prompt, true)
    .pipe(tap(res => console.log(res)),
          finalize(() => this.showInProgress = false))
    .subscribe(res => this.aiGeminiResponse = res
    );

    this.PromptAiService.getDeepseekResponse(this.prompt, true)
    .pipe(tap(res => console.log(res)),
          finalize(() => this.showInProgress = false))
    .subscribe(res => this.aiDeepSeekResponse = res
    );
  }
}
