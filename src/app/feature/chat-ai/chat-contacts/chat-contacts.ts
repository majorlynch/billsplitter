import { Component, Input, Output, OnInit, EventEmitter } from "@angular/core";
import { ChatAiService } from "../../../service/chat-services";
import { CommonModule } from "@angular/common";
import { aiDetail } from "../../../shared/model/messageBase";

@Component( {
    selector: 'app-chat-contacts',
    templateUrl: './chat-contacts.html',
    styleUrl: './chat-contacts.css',
    standalone: true,
    imports: [CommonModule]
})

export class ChatAiContacts implements OnInit {
    @Input() selectedAI: string = '';
    @Output() setSelectedAi = new EventEmitter<string>();
    
    aiList : aiDetail[] = [];

    constructor (private chatAiService: ChatAiService) {}

    ngOnInit () {
        this.getContactData();
    }

    getContactData() {
        this.chatAiService.getContactData().subscribe(res => this.aiList = res);
        console.log(this.aiList);
    }

    setSelectedContact(aiName: string) {
        this.setSelectedAi.emit(aiName);
        
    }

} 
