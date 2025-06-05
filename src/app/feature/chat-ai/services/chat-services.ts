import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { UserContact } from '../../../shared/model/contactBase';
import { MessageDetail } from '../../../shared/model/messageBase';

@Injectable({
  providedIn: 'root',
})
export class ChatAiService {
  constructor() {}

  getContactData(): Observable<UserContact[]> {
    return of([
      {
        userId: 1,
        userName: 'Barry Brown',
        userStatus: 'online',
        userImage: 'assets/images/avatar1.png',
      },
      {
        userId: 2,
        userName: 'Alan Nolan',
        userStatus: 'online',
        userImage: 'assets/images/avatar2.png',
      },
      {
        userId: 3,
        userName: 'Stacey Tate',
        userStatus: 'off',
        userImage: 'assets/images/avatar3.png',
      },
      {
        userId: 4,
        userName: 'Adrian Gatz',
        userStatus: 'off',
        userImage: 'assets/images/avatar4.png',
      },
      {
        userId: 5,
        userName: 'Toby Finn',
        userStatus: 'busy',
        userImage: 'assets/images/avatar5.png',
      },
      {
        userId: 6,
        userName: 'Gary Green',
        userStatus: 'busy',
        userImage: 'assets/images/avatar6.png',
      },
    ]);
  }

  getMessages(): Observable<MessageDetail[]> {
    return of([]);
  }
}
