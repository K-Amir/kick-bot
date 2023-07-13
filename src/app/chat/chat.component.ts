import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { Message, UserBackgroundColor } from '../utils/chat.types';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  private channelName!: string;

  public usersBackgroundColor: UserBackgroundColor = {};

  public messages: any[] = [];

  @ViewChild('lastMessage') lastMessage!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.channelName = this.route.snapshot.params['channel'];
    this.chatService.getChannelId(this.channelName).subscribe((channelId) => {
      setInterval(() => {
        this.fetchMessages(channelId);
      }, 1000);
    });
  }

  fetchMessages(channelId: number) {
    this.chatService.getChatMessages(channelId).subscribe((messages) => {
      const chatMessages = messages.reverse();
      this.evaluateCommands(messages);
      this.scrollToLastMessage();
      this.messages = chatMessages;
    });
  }

  evaluateCommands(messages: Message[]) {
    messages.forEach((m) => {
      if (m.content.startsWith('!bg')) {
        this.setUserCustomBackground(m);
      }
    });
  }

  setUserCustomBackground(message: Message) {
    this.usersBackgroundColor[message.sender.username] =
      message.content.slice(4);
  }

  calcUserBackground(username: string) {
    const userBackgroundColor = this.usersBackgroundColor[username];
    if (!userBackgroundColor) return;
    return {
      backgroundColor: this.usersBackgroundColor[username],
    };
  }

  scrollToLastMessage() {
    if (!this.lastMessage) return;
    this.lastMessage.nativeElement.scrollIntoView({
      behavior: 'smooth',
    });
  }
}
