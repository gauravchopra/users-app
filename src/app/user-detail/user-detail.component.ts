import { Component, OnInit, Input } from '@angular/core';

import { UserDetails } from '../userDetails';



@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

@Input() userDetails: UserDetails[];


  constructor() { }

  ngOnInit(): void {
   
  }

  

}
