import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { of, from, Observable } from 'rxjs';
import { GoogleGenAI } from '@google/genai';
import { aiDetail, ChatHistory, MessageDetail, TextPrompt } from '../shared/model/messageBase';
import { OpenAI } from 'openai';

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
        `# Top-Level Heading (H1)

This is the main heading for the entire document or section.  Its usually the title of the page or chapter.

## Second-Level Heading (H2)

This heading divides the content below the main heading into major sections.

### Third-Level Heading (H3)

Used to break down the H2 sections into more specific topics.

#### Fourth-Level Heading (H4)

These are used for even finer divisions within an H3 section.  Use them sparingly; too many levels can make the document harder to follow.

##### Fifth-Level Heading (H5)

Rarely used.  Consider revising your structure if you need this many heading levels.

###### Sixth-Level Heading (H6)

Almost never used.  At this point, consider using bullet points or another formatting method instead of another heading level.

Here's an example of how they might be used in a document about "Baking a Cake":

# Baking a Cake

## Ingredients

This section lists the ingredients you'll need.

### Dry Ingredients

*   Flour
*   Sugar
*   Baking Powder

### Wet Ingredients

*   Eggs
*   Milk
*   Vanilla Extract

## Instructions

This section provides the steps for baking the cake.

### Preparing the Batter

#### Mixing the Dry Ingredients

Explain the steps for mixing the flour, sugar, and baking powder.

#### Adding the Wet Ingredients

Explain the steps for adding and incorporating the wet ingredients.

### Baking the Cake

Explain how to preheat the oven and bake the cake.`;
      return from([this.formatGeminiContent(sampleText)]);
    }
    else
      return from(
        this.getGeminiChatPromise(chatPrompt, userHistory, aiHistory)
  );
  }

/*
  .replace(/\#{1,6}(.*?)\#{1,6}/g, (_, match, offset, str) => {
    const count = (str.substring(0, offset+1).match(/\#/g) || []).length;
    return `<h${count}>${match}</h${count}>`;

*/

  formatGeminiContent(input: string): string {
  return input
  /*
  .replace(/\#{1,6}(.*?)\n/g, (_, match, offset, str) => {
    const count = (str.substring(0, offset+1).match(/\#/g) || []).length;
    return `<h${count}>${match}</h${count}>`;
  })*/
  .replace(/\#\#\#\#\#\#(.*?)\n/g, "<h6>$1</h6>")
  .replace(/\#\#\#\#\#(.*?)\n/g, "<h5>$1</h5>")
  .replace(/\#\#\#\#(.*?)\n/g, "<h4>$1</h4>")
  .replace(/\#\#\#(.*?)\n/g, "<h3>$1</h3>")
  .replace(/\#\#(.*?)\n/g, "<h2>$1</h2>")
  .replace(/\#(.*?)\n/g, "<h1>$1</h1>")
  .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
  .replace(/\*(.*?)\*/g, "<i>$1</i>")
  .replace(/\*\*\*(.*?)\*\*\*/g, "<b><i>$1</i></b>")
  .replace(/\*(.*?)\*/g, "<i>$1</i>")
  .replace("```", "")
}



    async getDeepSeekResponsePromise(chatPrompt: string, chatHistory: ChatHistory[]): Promise<string> {
      chatHistory.push({role: 'user', content: chatPrompt});
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
