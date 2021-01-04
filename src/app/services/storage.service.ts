import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  save(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }
  
   load(key) {
    const val = localStorage.getItem(key);
    return JSON.parse(val);
  }
  
  deleteItem(key) {
    localStorage.removeItem(key);
  }
}
