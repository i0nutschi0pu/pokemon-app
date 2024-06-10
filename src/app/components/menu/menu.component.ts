import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isAdmin!: boolean;
  id!: number;
  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isAdmin = this.userService.isAdmin;
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    
    // this.router = this.router.navigate(['pokemon', pokemon.id, 'details']);
  }

}
