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
          try {
            await this.userService.delete(id);
            if (this.deleteItemEmit.observed) {
              this.deleteItemEmit.emit(true);
            } else {
              this.router.navigate(['/home']);
            }
            toast.info('El usuario se ha eliminado correctamente');
          } catch (msg: any) {
            toast.error(msg.error);
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
