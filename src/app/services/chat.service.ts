import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Channel, Messages, UserBackgroundColor } from '../utils/chat.types';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private httpClient: HttpClient) {}

  getChannelId(username: string) {
    return this.httpClient
      .get<Channel>(`${environment.kickV1}/channels/${username}`)
      .pipe(map(({ id }) => id));
  }

  getChatMessages(channelId: number) {
    return this.httpClient
      .get<Messages>(`${environment.kickV2}/channels/${channelId}/messages`)
      .pipe(map(({ data: { messages } }) => messages));
  }
}
