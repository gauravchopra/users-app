import { Component, OnInit } from '@angular/core';

import {User} from '../user';

import { UserService } from '../user.service';

import { UserDetails } from '../userDetails';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {

users:User[];
  control = new FormControl();
	selectedUserDetails: UserDetails[];
	userDetails:UserDetails[];
  filteredUsers: Observable<User[]>;

  constructor(private userService:UserService) { }

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

}
