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
    try {
      this.actualUser = await this.usersServices.getByid(this.idUser);
    } catch (msg: any) {
      toast.error(msg.error);
    }
  }
}
