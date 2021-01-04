import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';


@Component({
  selector: 'stream-preview',
  templateUrl: './stream-preview.component.html',
  styleUrls: ['./stream-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StreamPreviewComponent implements OnInit {
  constructor(public sanitizer:DomSanitizer) { }
  url: SafeResourceUrl;
  @Input() stream;


  ngOnInit(): void {
  }

  get streamTitle() {
    const {title} = this.stream
    return title.length > 20 ? `${title.substring(0,20)}...` : title
  }

  get streamStarted() {
    const {started_at} = this.stream
    return new Date(started_at.split("T")[0]).toLocaleString();
  }

  get visitStream() {
    const {user_name} = this.stream;
    return `http://twitch.tv/${user_name}`;
  }
  get iframeLink() {
    const {user_name} = this.stream;
    return `http://www.twitch.tv/embed?channel=${user_name}`

  }

  
 

}
