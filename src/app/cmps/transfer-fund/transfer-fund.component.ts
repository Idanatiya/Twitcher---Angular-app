import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrls: ['./transfer-fund.component.scss']
})
export class TransferFundComponent implements OnInit {

  coins: number = 1
  @Input() maxCoins : number
  @Output() emitTransferFunds =  new EventEmitter()
  constructor() { }

  ngOnInit(): void {
    console.log('max copins?',this.maxCoins)
  }

  onTransferCoins(ev: any) {
    this.emitTransferFunds.emit(this.coins)
  }

}
