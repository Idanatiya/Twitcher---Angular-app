import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';



//Important note => auth guard determine if user can enter the route in true or false values

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }
  async canActivate() {
    const isLoggedUser = await this.userService.isLoggedUser();
    if(!isLoggedUser) {
      this.router.navigateByUrl('/signup');
      console.log('You are unathorized to enter the route')
    } 
    return isLoggedUser ;
  }
}

