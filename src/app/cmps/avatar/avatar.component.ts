import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input() username : string
  @Input() avatarUrl : string
  @Input() bcg : string
  @Input() size : string
  constructor() { }

  ngOnInit(): void {
  }

  get avatarName() {
    return this.username.split(' ').map(letter => letter.charAt(0)).join('').toUpperCase();
  }

  get bgColor() {
    return !this.avatarUrl && !this.bcg ? `#${Math.random().toString().substring(2,8)}` : this.bcg;
  }

  setMyStyles() {
    let styles = {
      'background-color': this.bgColor,
      'width': this.size + 'px',
      'height:': this.size + 'px',
      'lineHeight': this.size + 'px'
    };
    return styles;
  }

}
