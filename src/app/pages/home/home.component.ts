import { Component, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { IResponse } from '../../interfaces/iresponse.interface';
import { UserCardComponent } from "../../components/user-card/user-card.component";

@Component({
  selector: 'app-home',
  imports: [UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  arrUsers: IUser[] = [];
  usersServices = inject(UsersService);

  ngOnInit() {
    this.usersServices.getAll().subscribe({
      next: (data) => {
        this.arrUsers = data.results;
        console.log(this.arrUsers);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
