import { Component, Input, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { ButtonsComponent } from "../../shared/buttons/buttons.component";
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-user',
  imports: [ButtonsComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input() idUser: string = "";
  actualUser: IUser = { _id: '', first_name: '', last_name: '', username: '', email: '', image: '', password: '' };
  usersServices = inject(UsersService);


  async ngOnInit() {
    let response = this.actualUser = await this.usersServices.getByid(this.idUser);
    // La forma de tratar si hay un error en la respuesta
    if ('error' in response) {
      toast.error(`${response.error}`);
      return;
    }
  }
}
