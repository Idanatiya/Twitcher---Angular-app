import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from './../../models/contact.model';
import { ContactService } from 'src/app/services/contact.service';


@Component({
  selector: 'contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {
  contacts:Contact[] = []
  subscription: Subscription
  contacts$;
  isLoading: boolean
  constructor(private contactService: ContactService ) { }

  ngOnInit(): void {
    this.contacts$ = this.contactService.contacts$
    // console.log(this.contacts$)
    this.isLoading = true
    this.subscription = this.contactService.contacts$.subscribe(contacts => {
      console.log('updating...')
      this.contacts = contacts
    })
    this.contactService.query();
    this.isLoading = false
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
    console.log('destroyed!')
  }

  doFilter(filterBy) {
    console.log('term in filter:',filterBy)
    this.contactService.query(filterBy);
  }

}
