import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { GoogleGenAI } from '@google/genai';
import { OpenAI } from 'openai';

@Injectable({
  providedIn: 'root',
})
export class GeminiAiService {
  constructor() {}
  response: any;

  //Gemini
  ai = new GoogleGenAI({
    apiKey: environment.apiKeyGemini,
  });

  //DeepSeek
  openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    dangerouslyAllowBrowser: true,
    apiKey: environment.apiKeyDeepSeek
  });

  async getGeminiResponsePromise(prompt: string): Promise<string> {

    try {
      /*
      setTimeout(() => {
        this.response = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

      }, 1000); // Delay of 1000 milliseconds (1 second)
      */

      this.response = await this.ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
      });
    } catch (e) {
      console.log(e);
    }
    return this.response.text;
    //return this.response;
  }

  getGeminiResponse(prompt: string, returnSampleText?: boolean): Observable<string> {
    if (returnSampleText) {
      const sampleText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
      return from([sampleText]);
    }
    else
      return from(this.getGeminiResponsePromise(prompt));
  }

  async getDeepSeekResponsePromise(prompt: string): Promise<string> {
    const completion = await this.openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "deepseek-chat"
    });

    return (completion.choices[0].message.content!);
  }

  getDeepseekResponse(prompt: string, returnSampleText?: boolean): Observable<string> {
    if (returnSampleText) {
      const sampleText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
      return from([sampleText]);
    }
    else
      return from(this.getDeepSeekResponsePromise(prompt));
  }

}
