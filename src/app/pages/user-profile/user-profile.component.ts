import { Component, OnInit } from '@angular/core';
import { User } from './../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: User = null
  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      //find contact
     const $user= this.userService.getById(params.id);
     //subscribe to get the contact out of the obseravble
     $user.subscribe(user => {
       console.log('in profile',user)
       this.user = user
       console.log('user in profile',this.user)
     })
    })
  }

}
