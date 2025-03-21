import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { toast } from 'ngx-sonner';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-buttons',
  imports: [RouterLink],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {
  @Input() user!: IUser;
  userService = inject(UsersService);
  @Output() deleteItemEmit: EventEmitter<Boolean> = new EventEmitter();

  deleteUser(id: string) {
    toast(`¿deseas borrar el usuario ${this.user.first_name} ${this.user.last_name} ?`, {
      action: {
        label: 'Aceptar',
        onClick: async () => {
          try {
            let response = await this.userService.delete(id);

            if ('error' in response) {
              toast.error(`${response.error}`);
            } else {
              this.deleteItemEmit.emit(true);
            }
          } catch (error) {
            console.error('Error en la petición:', error);
            toast.error('Ocurrió un error al intentar borrar el usuario.');
          }
        }
      },
      cancel: {
        label: 'Cancelar',
        onClick: () => toast.info('El usuario no se a borrado'),
      },
    })
  }
}
