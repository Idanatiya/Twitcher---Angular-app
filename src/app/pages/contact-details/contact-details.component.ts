import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';

import { Contact } from './../../models/contact.model';
import { User } from './../../models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  contact: Contact = null
  loggedUser: User = null
  constructor(private route: ActivatedRoute, private router: Router, private contactService: ContactService, private userService: UserService) { }

  ngOnInit(): void {
    console.log('intalizing..')
    this.loggedUser = this.userService.getLoggedInUser()
    console.log('user logegd in details',this.loggedUser)
    this.route.data.subscribe(data => {
      // console.log('data?:',data.contact);
      this.contact = data.contact;
    })



  }

  goBack() {
    this.router.navigateByUrl('/twitch-app/contacts')
  }

  goEdit(contactId) {
    this.router.navigateByUrl(`/twitch-app/contact/edit/${contactId}`)
  }

  deleteContact(contactId) {
    this.contactService.remove(contactId).subscribe(() => this.router.navigateByUrl('/twitch-app/contacts'));
  }


  nextUser(contactId) {
    const $nextContact = this.contactService.getNextContact(contactId);
    $nextContact.subscribe(nextContact => {
      console.log('next?',nextContact)
      this.router.navigateByUrl(`/twitch-app/contacts/${nextContact._id}`)
    })
  }

  get filterMoves() {
    const moves = this.loggedUser.moves.filter(move =>  move.contact._id === this.contact._id);
    console.log('filtered:',moves)
    return moves
  }

  transferFunds(coins) {
    if(this.loggedUser.coins < 0 || this.loggedUser.coins === 0 || this.loggedUser.coins - coins < 0) {
      alert('You ran out of coins!')
      return;
    }
    this.userService.addMove(this.contact,coins).subscribe(updatedUser => {
      this.loggedUser = updatedUser
      console.log('updated user in details:',this.loggedUser)
    })
  }

  get role() {
    return this.contact.role === 'streamer' ? 'fab fa-twitch' : 'far fa-user-circle';
  }

}


// nextUser(contactId) {
//   const $nextContactId =  this.contactService.getNextContact(contactId);
//   $nextContactId.subscribe(nextContactId => {
//     const $contact = this.contactService.getById(nextContactId)
//     $contact.subscribe(contact => {
//      this.contact = contact
//      this.router.navigateByUrl(`/contacts/${nextContactId}`)
//      console.log('contact is:',contact)
//     })
//   })