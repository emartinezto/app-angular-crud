import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  @Input() idUser: string = "";
  userForm: FormGroup = new FormGroup({}, []);
  user!: IUser;
  usersServices = inject(UsersService);
  title: string = 'Registrar Usuario';
  router = inject(Router);


  async ngOnInit() {
    if (this.idUser) {
      // llamamos al servicio y cargamos los datos del empleado
      this.user = await this.usersServices.getByid(this.idUser);
      this.title = 'Actualizar Usuario';
    }
    this.userForm = new FormGroup({
      _id: new FormControl(this.idUser || null, []),
      first_name: new FormControl(this.user?.first_name || '', []),
      last_name: new FormControl(this.user?.last_name || '', []),
      email: new FormControl(this.user?.email || '', []),
      image: new FormControl(this.user?.image || '', []),
      password: new FormControl(this.user?.password || '', []),
    }, []);
  }

  async getDataForm() {
    if (this.userForm.value._id) {
      // actualizando
      let response = await this.usersServices.update(this.userForm.value);
      // La forma de tratar si hay un error en la respuesta
      if ('error' in response) {
        toast.error(`${response.error}`);
      } else {
        toast.success('Usuario actualizado correctamente');
        this.router.navigate(['/home']);
      }
    } else {
      // insertando
      let response = await this.usersServices.insert(this.userForm.value);
      // La forma de tratar si hay un error en la respuesta
      if ('error' in response) {
        toast.error(`${response.error}`);
      } else {
        toast.success('Usuario se ha creado correctamente');
        this.router.navigate(['/home']);
      }
    }
  }
}
