import { AfterViewChecked, Component, DoCheck } from '@angular/core';
import {
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';
import { ChatAiContacts } from './chat-contacts/chat-contacts';
import { HttpClient } from '@angular/common/http';
import { ChatAiService } from '../../service/chat-services';
import {
  ChatContent,
  ChatHistory,
  MessageDetail,
} from '../../shared/model/messageBase';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { aiDetail } from '../../shared/model/messageBase';

@Component({
  selector: 'app-chat-ai',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatAiContacts],
  templateUrl: './chat-ai.component.html',
  styleUrl: './chat-ai.component.css',
  encapsulation: ViewEncapsulation.Emulated,
  providers: [HttpClient],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatAiComponent implements AfterViewChecked, DoCheck {
  chatPrompt: string = '';
  showInProgress = false;
  aiList: aiDetail[] = [];
  selectedAI: aiDetail | undefined;
  displayMessages: MessageDetail[] = [];
  chatContent: ChatContent[] = [];
  isChatLoading: boolean = false;

  constructor(
    private chatAiService: ChatAiService,
    private cdRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.cdRef.detach();
  }

  ngOnInit() {
    this.chatAiService.getContactData().subscribe((res) => (this.aiList = res));
    this.selectedAI = this.aiList.find((r) => r.aiName == 'Gemini');
    this.chatContent = [
      {
        aiName: 'Gemini',
        messageDetail: [],
      },
      {
        aiName: 'Deepseek',
        messageDetail: [],
      },
    ];
    this.cdRef.detectChanges();
  }

  ngAfterViewChecked(): void {
    let div = document.getElementById('chatBody');
    div!.scrollTop = div!.scrollHeight - 100;
  }

  ngDoCheck(): void {
    console.log('Perform check');
  }

  sendMessage() {
    let chatResponse: string = '';
    this.isChatLoading = true;
    const newUserMessage: MessageDetail[] = [
      {
        userId: 1,
        userName: 'Conor',
        userImage: 'assets/images/avatar1.png',
        userStatus: 'online',
        userType: 'user',
        messageDetail: this.chatPrompt,
        messageTime: new Date(),
        messageTimeText: new Date().toLocaleString('en-GB'),
      },
    ];
    this.displayMessages = [...this.displayMessages, ...newUserMessage];
    this.cdRef.detectChanges();

    if (this.selectedAI?.aiName == 'Gemini') {
      const userHistory = this.displayMessages
        .filter((r) => r.userType == 'user')
        .map((r) => ({ text: r.messageDetail }));
      const aiHistory = this.displayMessages
        .filter((r) => r.userType == 'assistant')
        .map((r) => ({ text: r.messageDetail }));

      this.chatAiService
        .getGeminiChat(this.chatPrompt, userHistory, aiHistory)
        .pipe(
          finalize(() => {
            const newResponseMessage: MessageDetail[] = [
              {
                userId: 2,
                userName: this.selectedAI!.aiName,
                userImage: this.selectedAI!.aiImage,
                userStatus: 'online',
                userType: 'assistant',
                messageDetail: `${chatResponse}`,
                messageTime: new Date(),
                messageTimeText: new Date().toLocaleString('en-GB'),
              },
            ];
            this.displayMessages = [
              ...this.displayMessages,
              ...newResponseMessage,
            ];
            this.chatContent.filter(
              (r) => r.aiName == this.selectedAI!.aiName
            )[0].messageDetail = this.displayMessages;
            this.isChatLoading = false;
            this.cdRef.detectChanges();
          })
        )
        .subscribe(
          (res) => (
            (chatResponse = this.chatAiService.formatGeminiContent(res)),
            this.ngZone.runOutsideAngular(() => console.log(res))
          )
        );
    } else if (this.selectedAI?.aiName == 'Deepseek') {
      const chatHistory: ChatHistory[] = this.displayMessages.map(
        ({ userType, messageDetail }) => ({
          role: userType,
          content: messageDetail,
        })
      );

      this.chatAiService
        .getDeepseekResponse(this.chatPrompt, chatHistory)
        .pipe(
          finalize(() => {
            const newResponseMessage: MessageDetail[] = [
              {
                userId: 2,
                userName: this.selectedAI!.aiName,
                userImage: this.selectedAI!.aiImage,
                userStatus: 'online',
                userType: 'assistant',
                messageDetail: `${chatResponse}`,
                messageTime: new Date(),
                messageTimeText: new Date().toLocaleString('en-GB'),
              },
            ];
            this.displayMessages = [
              ...this.displayMessages,
              ...newResponseMessage,
            ];
            this.chatContent.filter(
              (r) => r.aiName == this.selectedAI!.aiName
            )[0].messageDetail = this.displayMessages;
            this.isChatLoading = false;
            this.cdRef.detectChanges();
          })
        )
        .subscribe(
          (res) => (chatResponse = this.chatAiService.formatGeminiContent(res))
        );
    }
  }

  setSelectedAi(newSelectedAI: string) {
    if (this.selectedAI!.aiName != newSelectedAI)
      this.displayMessages = this.chatContent
        .filter((a) => a.aiName == newSelectedAI)
        .flatMap((r) => r.messageDetail);
    this.selectedAI = this.aiList.filter((r) => r.aiName == newSelectedAI)[0];
    this.chatPrompt = '';
    this.cdRef.detectChanges();
  }
}
