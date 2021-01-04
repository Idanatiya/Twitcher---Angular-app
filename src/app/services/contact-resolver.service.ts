import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Contact } from './../models/contact.model';
import { ContactService } from 'src/app/services/contact.service';


@Injectable({
  providedIn: 'root'
})

export class ContactResolverService implements Resolve<Observable<Contact>> {
  constructor(private contactService: ContactService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id')
    console.log('id in resolve?:', id)
    const contact$ = this.contactService.getById(id)
    contact$.subscribe(null,
      (err) => {
        if (err) alert('Contact not found')
        this.router.navigateByUrl('/')
      })
    return contact$
  }
}
