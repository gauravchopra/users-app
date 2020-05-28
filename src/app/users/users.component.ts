import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import { USERS } from '../mock-users';
import { UserService } from '../user.service';
import { MessageService } from '../message.service';
import { UserDetails } from '../userDetails';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
	users:User[];
	selectedUserDetails: UserDetails[];
	userDetails:UserDetails[];

  constructor(private userService:UserService,private messageService: MessageService) { }

  ngOnInit(): void {
  this.getUsers();
  }

  getUsers():void{
  	this.userService.getUsers()
  	.subscribe(users=>this.users=users);
  }

  getUserPosts(id:number):void{
  	this.userService.getUserPosts(id)
  	.then(userDetails=>this.userDetails=userDetails
    );
  }

  onSelect(user: User): void {
  	this.getUserPosts(user.id);
    this.selectedUserDetails = this.userDetails;
    this.messageService.add(`UserService: Selected user id=${user.id}`);
  }

}
