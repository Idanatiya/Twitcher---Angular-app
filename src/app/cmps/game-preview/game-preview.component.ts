import {ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'game-preview',
  templateUrl: './game-preview.component.html',
  styleUrls: ['./game-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamePreviewComponent implements OnInit {

  @Input() game
  constructor() { }

  ngOnInit(): void {
  }


  get gameTitle() {
    const {name} = this.game
    return name.length > 30 ? `${name.substring(0,30)}...` : name;
  }

}
