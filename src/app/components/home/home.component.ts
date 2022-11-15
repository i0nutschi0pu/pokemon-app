import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAdmin!: boolean;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.isAdmin = this.userService.isAdmin;
  }

}
