import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization':'Bearer 70seuvwxujxp6o8t6yjs7nmvsor4q1',
    'Client-ID': 'lizc8ir800t1td4mjslkh08r1m8x51'
  })
  // ?client_id=lizc8ir800t1td4mjslkh08r1m8x51&Authirization=Bearer70seuvwxujxp6o8t6yjs7nmvsor4q1
}

@Injectable({
  providedIn: 'root'
})
export class GameService {


  constructor(private http: HttpClient) { }

  query() : Observable<any> {
    if(localStorage.gameDB) return JSON.parse(localStorage.gameDB);
    console.log('doing ajax...')
    return this.http.get('https://api.twitch.tv/helix/games/top', httpOptions);
  }

  queryByGameId(gameId): Observable<any> {
    const url = `https://api.twitch.tv/helix/streams?game_id=${gameId}`;
    return this.http.get(url,httpOptions);
  }

  

  queryStreamerById(streamerId): Observable<any> {
    const url = `https://api.twitch.tv/helix/users?id=${streamerId}`;
    return this.http.get(url,httpOptions);
  }
}
