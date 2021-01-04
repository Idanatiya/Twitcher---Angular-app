import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, throwError, Observable, of,Subject } from 'rxjs';;
import { User } from './../models/user.model';
import { retry, catchError, map, filter,tap } from 'rxjs/operators';
import { Move } from './../models/move.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) {}
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true // to allow cookies to go from "https://localhost:4567" to "http://localhost:5678"
  };
  private BASE_URL = environment.baseUrl;
  private _users$ = new BehaviorSubject<User[]>([]);
  public users$ = this._users$.asObservable();
  private _loggedInUser$ = new BehaviorSubject({});
  public loggedInUser$ = this._loggedInUser$.asObservable();

  public query() {
    this.http.get<User[]>(`${this.BASE_URL}/user`)
      .subscribe(users => {
        this._users$.next(users)
      })
  }

  public getById(id: string) {
    return this.http.get<User>(`${this.BASE_URL}/user/${id}`)
    .pipe(
      retry(1),
      catchError(() => throwError('no contact found!'))
    );
  }


  public getLoggedInUser() {
    if (sessionStorage.user) {
      const localLoggedinUser = JSON.parse(sessionStorage.user);
      return localLoggedinUser
    } 
  }


  public isLoggedUser() {
    if(sessionStorage.user) return Promise.resolve(true)
    else return Promise.resolve(false)
  }


  public logout() {
    console.log('in logout in user service')
    return this.http.post<any>(`${this.BASE_URL}/auth/logout`,null,this.httpOptions).pipe(
      tap(() => {
        this._loggedInUser$.next(null);
        sessionStorage.clear();
      })
    )
  }


  
public addMove(contact, coinsAmount) {
  //getting the loggedInUser
  const loggedUser = this.getLoggedInUser();
  loggedUser.coins -= coinsAmount;
  loggedUser.amount = coinsAmount
  const user = {
    from: loggedUser.username,
    id: loggedUser._id,
  }
  const move = {
    at: Date.now(),
    user,
    contact,
    coinsAmount
  }
  loggedUser.moves.unshift(move);
  return this.http.put<User>(`${this.BASE_URL}/user/${loggedUser._id}`,loggedUser,this.httpOptions)
        .pipe(
          tap(updatedUser  => {
            console.log('updated user?:',updatedUser)
            this._loggedInUser$.next(updatedUser);
            sessionStorage.user = JSON.stringify(updatedUser);
            })
          )
}


  public signup(userCreds) {
        console.log('user in sign on frontend before post',userCreds)
        return this.http.post<User>(`${this.BASE_URL}/auth/signup`, userCreds,this.httpOptions).pipe(
          tap(savedUser => {
            console.log('saved user:',savedUser)
            const user = this._handleLogin(savedUser)
            this._loggedInUser$.next(user)
          })
       )
 }

 public login(userCreds) {
   return this.http.post<User>(`${this.BASE_URL}/auth/login`,userCreds,this.httpOptions).pipe(
     tap(savedUser => {
       console.log('login succefull:',savedUser);
       const user = this._handleLogin(savedUser);
       this._loggedInUser$.next(user);
     })
   )
 }


  private _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user
  }

}
