import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { BehaviorSubject, throwError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';


import { retry, catchError, map, filter } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) { }
  private BASE_URL = 'http://localhost:3000/api/contact'

  private _contacts$ = new BehaviorSubject<Contact[]>([]);
  public contacts$ = this._contacts$.asObservable()


  public query(filterBy = null) {
    this.http.get<Contact[]>(this.BASE_URL)
      .pipe(
        map(contacts => {
          console.log('contacts before filter', contacts)
          console.log('filterby:', filterBy)
          if (filterBy) return this._filter(contacts, filterBy.term)
          else return contacts

        })
      ).subscribe(contacts => {
        console.log('load contacts', contacts);
        this._contacts$.next(this._sort(contacts));
      })

  }

  public remove(contactId) {
    const removedContact$ = this.http.delete(this.BASE_URL + `/${contactId}`)
    removedContact$.subscribe(data => {
      const contacts = this._contacts$.getValue().filter(contact => contact._id !== contactId)
      this._contacts$.next(contacts)
    })
    return removedContact$
  }

  getEmptyContact() {
    return { name: '', email: '', phone: '', role: '' }
  }


  public getById(id: string): Observable<Contact> {
    return this.http.get<Contact>(this.BASE_URL + `/${id}`)
      .pipe(
        retry(1),
        catchError(() => throwError('no contact found!'))
      );
    //   const contact = this._contacts.find(contact => contact.id === id)
    // return contact ? of(contact) : throwError('no contact found')
  }

  public save(contact) {
    console.log('contact in service > save():', contact)
    return contact._id ? this._edit(contact) : this._add(contact)
  }


  private _add(contact) {
    console.log('Add!!!');

    const contactToAdd = new Contact(undefined, contact.name, contact.email, contact.phone, contact.role)
    return this.http.post<Contact>(this.BASE_URL, contactToAdd).pipe(
      tap(savedContact => {
        const contacts = [...this._contacts$.getValue(), savedContact]
        this._contacts$.next(contacts)
      })
    )
    // console.log('contact:',contact$)
    // .subscribe(savedContact => {
    //   const contacts = [...this._contacts$.getValue(), savedContact]
    //   this._contacts$.next(contacts)
    // })
    // contact$.subscribe(contact => {
    //   console.log('after adding to server:',contact)
    //   const contacts = [...this._contacts$.getValue(), contact]
    //   console.log('contacts are now:',contacts)
    // })
    // return contact$
  }
  private _edit(contact) {
    console.log('activating edit ajax')
    const contact$ = this.http.put<Contact>(`${this.BASE_URL}/${contact._id}`, contact)
    contact$.subscribe(contact => {
      const contacts = this._contacts$.getValue().map(currContact => currContact._id === contact._id ? contact : currContact)
      this._contacts$.next(contacts)
    })
    return contact$
  }

  getNextContact(contactId) {
    var contactIdx = this._contacts$.getValue().findIndex(contact => contact._id === contactId);
    if (contactIdx === this._contacts$.getValue().length - 1) contactIdx = 0;
    else contactIdx++;
    const nextContact = this._contacts$.getValue()[contactIdx];
    // const nextContact = this._contacts$.getValue()[contactIdx]._id;
    console.log('found whole obj', this._contacts$.getValue()[contactIdx])
    return contactIdx !== -1 ? of(nextContact) : throwError(`Problem with contact idx`);
  }

  private _filter(contacts, term) {
    term = term.toLocaleLowerCase()
    return contacts.filter(contact => {
      return contact.name.toLocaleLowerCase().includes(term) ||
        contact.phone.toLocaleLowerCase().includes(term) ||
        contact.email.toLocaleLowerCase().includes(term)
    })
  }

  private _sort(contacts: Contact[]): Contact[] {
    console.log('contacts in sort:', contacts)
    return contacts.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }

}


// public isUserAdmin() {
//   return Promise.resolve(Math.random() > 0.5)
// }