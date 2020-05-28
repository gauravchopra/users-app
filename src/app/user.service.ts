import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { UserDetails } from './userDetails';
import { USERS } from './mock-users';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

private usersUrl='https://jsonplaceholder.typicode.com/users';
private userDetailUrl='https://jsonplaceholder.typicode.com/posts?userId=';

getUsers(): Observable<User[]> {
this.messageService.add('UserService: fetched users');
   return this.http.get<User[]>(this.usersUrl);
}

async getUserPosts(id:number):Promise<UserDetails[]>{
	this.messageService.add('UserService: fetched user details for user'+id);
	const t = await this.http.get<UserDetails[]>(this.userDetailUrl+id).toPromise();
	return t;
}

private log(message: string) {
  this.messageService.add(`UserService: ${message}`);
}

  constructor( private http: HttpClient,private messageService: MessageService) { }
}
