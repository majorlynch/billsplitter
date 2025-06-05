import { Component, OnInit } from "@angular/core";
import { UserContact } from "../../../shared/model/contactBase";
import { ChatAiService } from "../services/chat-services";
import { CommonModule } from "@angular/common";

@Component( {
    selector: 'app-chat-contacts',
    templateUrl: './chat-contacts.html',
    styleUrl: './chat-contacts.css',
    standalone: true,
    imports: [CommonModule]
})

export class ChatAiContacts implements OnInit {
    userContactList : UserContact[] = [];

    constructor (private chatAiService: ChatAiService) {}

    ngOnInit () {
        this.chatAiService.getContactData().subscribe(res => this.userContactList = res);
    }

}