import { CommonModule } from '@angular/common';
import { GeminiAiService } from './../../service/gemini-ai.service';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { finalize, tap } from 'rxjs';

@Component({
  selector: 'app-google-ai',
  standalone: true,
  providers: [],
  imports: [CommonModule, HeaderComponent, FormsModule],
  templateUrl: './google-ai.component.html',
  styleUrl: './google-ai.component.css',
})
export class GoogleAiComponent {
  prompt: string = '';
  aiResponse: string = '';
  showSpinner = false;

  constructor(private geminiAiService: GeminiAiService) {}

  getResponse() {
    console.log('1');
    this.aiResponse = '';
    this.showSpinner = true;
    /*
    this.geminiAiService.getResponse(this.prompt).then((res) => {
      this.aiResponse = res;
      console.log(this.aiResponse);
      this.showSpinner = false;
    });
    */
    //this.geminiAiService.getResponse(this.prompt, true)
    this.geminiAiService.getResponse(this.prompt)
    .pipe(tap(res => console.log(res)),
          finalize(() => this.showSpinner = false))
    .subscribe(res => this.aiResponse = res
    )
    ;

    console.log('2');
  }
}
