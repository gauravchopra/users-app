import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import { USERS } from '../mock-users';
import { UserService } from '../user.service';
import { MessageService } from '../message.service';
import { UserDetails } from '../userDetails';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
	users:User[];
  control = new FormControl();
	selectedUserDetails: UserDetails[];
	userDetails:UserDetails[];
  filteredUsers: Observable<User[]>;

  constructor(private userService:UserService,private messageService: MessageService) { }

  ngOnInit(): void {
  this.getUsers();
  this.filteredUsers = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  

  private _filter(value: string): User[] {
    const filterValue = this._normalizeValue(value);
    if(this.users !=undefined) 
    return this.users.filter(user => this._normalizeValue(user.name).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
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
