import { Component, Input, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input() idUser: string = "";
  actualUser: IUser = { first_name: '', last_name: '', username: '', email: '', image: '', password: '' };
  usersServices = inject(UsersService);


  async ngOnInit() {
    try {
      this.actualUser = await this.usersServices.getByid(this.idUser);
    } catch (error) {
      console.error(error);
    }
  }
}
