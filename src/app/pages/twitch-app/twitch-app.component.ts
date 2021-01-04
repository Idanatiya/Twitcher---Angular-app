import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'twitch-app',
  templateUrl: './twitch-app.component.html',
  styleUrls: ['./twitch-app.component.scss']
})
export class TwitchAppComponent implements OnInit {
  
  user = null
  constructor(private route: ActivatedRoute, private router: Router,private userService: UserService) { }

  ngOnInit(): void {
    console.log('intializing...')
    const savedUser = this.userService.getLoggedInUser();
    console.log('saved user twitch app?:',savedUser)
    this.user = savedUser
  }

  doLogout(restValue) {
    console.log('what is rest value?',restValue)
    this.userService.logout().subscribe(() => {
      console.log('in subscribe')
      this.user = restValue;
      this.router.navigateByUrl('/')
    })
  }

}

// this.userService.getLoggedInUser().subscribe(loggedInUser => {
//   console.log('logged user is:', loggedInUser)
//   this.user = loggedInUser
// })