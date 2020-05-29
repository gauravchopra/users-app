import { Component, OnInit } from '@angular/core';
import {User} from '../user';

import { UserService } from '../user.service';
import { MessageService } from '../message.service';
import { UserDetails } from '../userDetails';
import {MatTableDataSource} from '@angular/material/table';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
	 displayedColumns: string[] = ['id', 'name'];
  dataSource = new MatTableDataSource<User>();
  users:User[];
  
  selectedUserDetails: UserDetails[];
  userDetails:UserDetails[];

    constructor(private userService:UserService) { }

  ngOnInit(): void {


this.userService.getUsers()
    .subscribe(

    data => {

      console.log("data>>>>>",data);

      this.users = data;

      this.dataSource.data = this.users;
 
  
  });

  }

  onSelect(id: number): void {
    this.getUserPosts(id);
    this.selectedUserDetails = this.userDetails;
    
  }

   getUserPosts(id:number):void{
    this.userService.getUserPosts(id)
    .then(userDetails=>this.userDetails=userDetails
    );
  }

  getUsers():void{
    this.userService.getUsers()
    .subscribe(users=>this.users=users);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
