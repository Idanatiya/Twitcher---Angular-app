import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrls: ['./contact-filter.component.scss']
})
export class ContactFilterComponent implements OnInit {
  filterBy = {
    term:  '',
  }
  timeout;
  @Output() emitFilter = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  handleChange(ev: any) {
    this.filterBy.term = ev.target.value
    if(this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('sending the request!')
      this.emitFilter.emit(this.filterBy);
      //clearTimeout(this.timeout)
      //search function
    }, 300);

    // console.log('filterBy', this.filterBy)
  }

}
