import { Injectable } from "@angular/core";

import { Observable, of } from "rxjs";
import { UserContact } from "../../../shared/model/contactBase";

@Injectable ({
    providedIn : 'root',
})

export class ChatAiService {

    constructor () {}

    getContactData() : Observable<UserContact[]> {
        return of([
        {
            userId: 1,
            userName: 'Barry Brown',
            userStatus: 'online',
            userImage: 'https://bootdey.com/img/Content/avatar/avatar1.png'
        },
        {
            userId: 2,
            userName: 'Alan Nolan',
            userStatus: 'online',
            userImage: 'https://bootdey.com/img/Content/avatar/avatar2.png'
        },
        {
            userId: 3,
            userName: 'Stacey Tate',
            userStatus: 'off',
            userImage: 'https://bootdey.com/img/Content/avatar/avatar3.png'
        },
        {
            userId: 4,
            userName: 'Adrian Gatz',
            userStatus: 'off',
            userImage: 'https://bootdey.com/img/Content/avatar/avatar4.png'
        },
        {
            userId: 5,
            userName: 'Toby Finn',
            userStatus: 'busy',
            userImage: 'https://bootdey.com/img/Content/avatar/avatar5.png'
        },
        {
            userId: 6,
            userName: 'Gary Green',
            userStatus: 'busy',
            userImage: 'https://bootdey.com/img/Content/avatar/avatar6.png'
        },
    ],
    );
    }
} 