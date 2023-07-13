import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  private channelName!: string;
  private channelId!: number;
  public messages: any[] = [];
  @ViewChild('myElem') element!: ElementRef;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.channelName = this.route.snapshot.params['channel'];
    this.getChannelId().then(() => {
      this.getChatMessages();
    });

    setInterval(() => {
      this.getChatMessages();
    }, 1500);
  }

  getChannelId() {
    return new Promise<void>((resolve) => {
      this.httpClient
        .get(`https://kick.com/api/v1/channels/${this.channelName}`)
        .subscribe((res: any) => {
          this.channelId = res.id;
          resolve();
        });
    });
  }

  getChatMessages() {
    this.httpClient
      .get(`https://kick.com/api/v2/channels/${this.channelId}/messages`)
      .subscribe((res: any) => {
        this.messages = res.data.messages;
        this.messages = this.messages.reverse();
        console.log(this.messages);
        this.element.nativeElement.scrollIntoView({
          behavior: 'smooth',
        });
      });
  }
}
