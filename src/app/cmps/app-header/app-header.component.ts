import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  @Input() user
  @Output() logout = new EventEmitter()

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    // this.userService.getCurrentUser().subscribe(loggedInUser => {
    //   console.log('logged user is:', loggedInUser)
    //   this.user = loggedInUser
    // })
  }

  goProfile(userId) {
    this.router.navigateByUrl(`/twitch-app/profile/${userId}`)
  }

  doLogout() {
    console.log('doing logout')
    this.logout.emit(null); 
  }
}
