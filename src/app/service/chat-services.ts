import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { of, from, Observable } from 'rxjs';
import { GoogleGenAI } from '@google/genai';
import { aiDetail, ChatHistory, MessageDetail, TextPrompt } from '../shared/model/messageBase';
import { OpenAI } from 'openai';
import { FireBaseService } from './firebase-service';

@Injectable({
  providedIn: 'root',
})
export class ChatAiService {
  docs:any;
  response: any;
  //Gemini
  ai = new GoogleGenAI({
    apiKey: environment.apiKeyGemini,
  });

  openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    dangerouslyAllowBrowser: true,
    apiKey: environment.apiKeyDeepSeek
  });

  constructor(private firebaseService: FireBaseService) {
    this.docs = this.firebaseService.getAll();
    console.log(this.docs.query);
  }

  async getGeminiChatPromise(chatPrompt: string, userHistory: TextPrompt[], aiHistory: TextPrompt[]): Promise<string> {
    const chat = this.ai.chats.create({
      model: 'gemini-2.0-flash',
      history: [
        {
          role: 'user',
          parts: userHistory,
        },
        {
          role: 'model',
          parts: aiHistory,
        },
      ],
    });

    this.response = await chat.sendMessage({
      message: chatPrompt,
    });
    return this.response.text;
  }

  getGeminiChat(chatPrompt: string, userHistory: TextPrompt[], aiHistory: TextPrompt[], returnSampleText?: boolean
  ): Observable<string> {
    

    if (returnSampleText) {
      setTimeout(() => {
      console.log("Waited 3 seconds!");
    }, 3000);

    const sampleText =
        '### header 3 text ### Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
      return from([sampleText]);
    }
    else
      return from(
        this.getGeminiChatPromise(chatPrompt, userHistory, aiHistory)
  );
  }

  formatGeminiContent(content: string): string {
    content.replace('\n', '<br>');
    
    return content.replace(/(#{1,6})\s*(.*?)(#{1,6})\s\n/g, (_, hashes, text) => {
        const level = hashes.length; // Count number of # characters
        return `<h${level}>${text}</h${level}>\n`;
    });
  }

    async getDeepSeekResponsePromise(chatPrompt: string, chatHistory: ChatHistory[]): Promise<string> {
      chatHistory.push({role: 'user', content: chatPrompt});
      console.log(chatHistory);
    const completion = await this.openai.chat.completions.create({
      model: "deepseek-chat",
      messages: chatHistory as any,
    });

    return (completion.choices[0].message.content!);
  }

  getDeepseekResponse(chatPrompt: string, chatHistory: ChatHistory[], returnSampleText?: boolean): Observable<string> {
    if (returnSampleText) {
      const sampleText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
      return from([sampleText]);
    }
    else
      return from(this.getDeepSeekResponsePromise(chatPrompt, chatHistory));
  }

    getContactData(): Observable<aiDetail[]> {
    return of([
      {
        aiName: 'Gemini',
        aiImage: 'assets/images/gemini.png',
        aiOnlineStatus: 'online',
      },
      {
        aiName: 'Deepseek',
        aiImage: 'assets/images/deepseek.png',
        aiOnlineStatus: 'online',
      }
    ]);
  }

  getMessages(): Observable<MessageDetail[]> {
    return of([]);
  }
}
