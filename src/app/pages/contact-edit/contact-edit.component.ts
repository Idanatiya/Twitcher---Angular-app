import { Component, OnInit } from '@angular/core';
import { Contact } from './../../models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { tap } from 'rxjs/operators'

@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private contactService: ContactService) { }
  contact: Contact = { name: '', phone: '', email: '', coins: 0, role: '' }
  // contact  = null
  roles = ['user', 'streamer']


  ngOnInit(): void {
    this.route.data.subscribe(data => {
      console.log('data?:', data.contact);
      if (data.contact) this.contact = data.contact;
    })
  }

  saveContact() {
    console.log('contact before going to service:', this.contact)
    this.contactService.save(this.contact)
      .subscribe((data) => {
        console.log('in edit after getting data?', data)
        this.router.navigateByUrl('/twitch-app/contacts')
        // this.contact = this.contactService.getEmptyContact()
      })
  }
  //with form tempolate driven
  // saveContact(contact) {
  //   this.contactService.save(contact).subscribe(data => {
  //     console.log('data in contact?',data)
  //     this.router.navigateByUrl('/contacts')
  //     // this.contact = this.contactService.getEmptyContact()
  //   })
  // }


  get btnTxt() {
    return this.contact._id ? 'Update Contact' : 'Add Contact'
  }

}
