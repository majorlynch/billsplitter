import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import { ViewEncapsulation } from '@angular/core';
import { ChatAiContacts } from "./chat-contacts/chat-contacts";
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ChatAiService } from './services/chat-services';
import { MessageDetail } from '../../shared/model/messageBase';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-ai',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatAiContacts],
  templateUrl: './chat-ai.component.html',
  styleUrl: './chat-ai.component.css',
  encapsulation: ViewEncapsulation.Emulated,
  providers: [HttpClient]
})
export class ChatAiComponent implements AfterViewChecked{

  inputMessage : string = '';

  constructor (private chatAiService: ChatAiService) {}
  
    ngOnInit() {
      this.getMessageData();
    }

    ngAfterViewChecked(): void {
            let div = document.getElementById("chatBody");
      div!.scrollTop = div!.scrollHeight-100;
    }
  
    messageDetail: MessageDetail[] = [];
  
    getMessageData() {
      this.chatAiService.getMessages().subscribe((res) => this.messageDetail = res);
    }

    sendMessage() {
      console.log(this.inputMessage);
      const newMessage =
            [
                    {
        userId: 2,
        userName: 'Conor',
        userImage: 'assets/images/avatar1.png',
        userStatus: 'online',
        userType: 'user',
        messageDetail: this.inputMessage,
        messageTime: new Date(),
        messageTimeText: new Date().toLocaleString('en-GB')
      },
      {
        userId: 2,
        userName: 'Gemini',
        userImage: 'assets/images/avatar_robot.png',
        userStatus: 'online',
        userType: 'responder',
        messageDetail: `Standard reply to '${this.inputMessage}'`,
        messageTime: new Date(),
        messageTimeText: new Date().toLocaleString('en-GB')
      }];

      this.messageDetail = [...this.messageDetail, ...newMessage];
      console.log(this.messageDetail);


    }

}
