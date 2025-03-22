import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
  @Input() back: Boolean = false;
  userService = inject(UsersService);
  @Output() deleteItemEmit: EventEmitter<Boolean> = new EventEmitter();
  router = inject(Router)

  deleteUser(id: string) {
    toast(`¿deseas borrar el usuario ${this.user.first_name} ${this.user.last_name} ?`, {
      action: {
        label: 'Aceptar',
        onClick: async () => {
          let response = await this.userService.delete(id);
          // La forma de tratar si hay un error en la respuesta
          if ('error' in response) {
            toast.error(`${response.error}`);
            return;
          }
          toast.info(`El usuario ${this.user.first_name} ${this.user.last_name} se ha eliminado correctamente`);
          if (this.deleteItemEmit.observed) {
            this.deleteItemEmit.emit(true);
          } else {
            this.router.navigate(['/home']);
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
