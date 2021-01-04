import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  // user = {name: '', email: '', password: ''}
  isSignup: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router,private userService: UserService) { }

  ngOnInit(): void {
  }

  get linkTxt() {
    return this.isSignup ? 'Already have account? Login!': 'You dont have an account? Sign up!' 
  }

  get btnTxt() {
    return this.isSignup ? 'Sign up' : 'Login'
  }
  signUp(userCreds) {
    this.userService.signup(userCreds).subscribe(loggedInUser => {
      // console.log('logged user?:',loggedInUser)
      this.router.navigateByUrl(`/twitch-app`)
    })
  }

  pageAction(formCreds) {
    return this.isSignup ? this.signUp(formCreds) : this.login(formCreds)
  }

  login(userCreds) {
    this.userService.login(userCreds).subscribe(() => {
      console.log('login is successfull!')
      this.router.navigateByUrl('/twitch-app')
    })
  }

  toggleMode() {
    this.isSignup = !this.isSignup
  }
}
  

