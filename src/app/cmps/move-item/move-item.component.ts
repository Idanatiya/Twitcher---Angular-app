import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'move-item',
  templateUrl: './move-item.component.html',
  styleUrls: ['./move-item.component.scss']
})
export class MoveItemComponent implements OnInit {
  @Input() move 
  constructor() { }

  ngOnInit(): void {
  }

}
