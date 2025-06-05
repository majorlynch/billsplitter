import { Component } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import { ViewEncapsulation } from '@angular/core';
import { ChatAiContacts } from "./chat-contacts/chat-contacts";
import { HttpClient, HttpHandler } from '@angular/common/http';

@Component({
  selector: 'app-chat-ai',
  standalone: true,
  imports: [ChatAiContacts],
  templateUrl: './chat-ai.component.html',
  styleUrl: './chat-ai.component.css',
  encapsulation: ViewEncapsulation.Emulated,
  providers: [HttpClient]
})
export class ChatAiComponent {

}
