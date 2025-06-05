import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageDetail } from '../../../shared/model/messageBase';
import { CommonModule } from '@angular/common';
import { ChatAiService } from '../services/chat-services';

@Component({
  selector: 'app-chat-message-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-message-list.component.html',
  styleUrl: './chat-message-list.component.css',
})
export class ChatMessageListComponent implements OnInit{
  
  constructor (private chatAiService: ChatAiService) {}

  ngOnInit() {
    this.getMessageData();
  }

  messageDetail: MessageDetail[] = [];

  getMessageData() {
    this.chatAiService.getMessages().subscribe((res) => this.messageDetail = res);
  }

}
