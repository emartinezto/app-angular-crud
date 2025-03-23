import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
      this.user = await this.usersServices.getByid(this.idUser);
      this.title = 'Actualizar Usuario';
    }
    this.userForm = new FormGroup({
      _id: new FormControl(this.idUser || null, this.idUser ? [Validators.required] : []),
      first_name: new FormControl(this.user?.first_name || '', [
        Validators.required,
        Validators.minLength(3)
      ]),
      last_name: new FormControl(this.user?.last_name || '', [
        Validators.required,
        Validators.minLength(3)
      ]),
      username: new FormControl(this.user?.username || '', [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl(this.user?.email || '', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]),
      image: new FormControl(this.user?.image || '', [
        Validators.required,
        Validators.pattern(/^https?:\/\/.*/)
      ]),
      password: new FormControl(this.user?.password || '', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16)
      ]),
    }, []);
  }

  async getDataForm() {
    if (this.userForm.value._id) {
      // actualizando
      try {
        let response = await this.usersServices.update(this.userForm.value);
        // La forma de tratar si hay un error en la respuesta
        if ('error' in response) {
          toast.error(`${response.error}`);
        } else {
          console.log(response);
          toast.success('Usuario actualizado correctamente');
          this.router.navigate(['/home']);
        }
      } catch (error) {
        console.error(error);
        toast.error(`${error}`);
      }
    } else {
      try {
        // nuevo usuario (insertar)
        let response = await this.usersServices.insert(this.userForm.value);
        // La forma de tratar si hay un error en la respuesta
        if ('error' in response) {
          toast.error(`${response.error}`);
        } else {
          console.log(response);
          toast.success('Usuario se ha creado correctamente');
          this.router.navigate(['/home']);
        }
      } catch (error) {
        console.error(error);
        toast.error(`${error}`);
      }
    }
  }

  checkControl(controlName: string, errorName: string): Boolean | undefined {
    return this.userForm.get(controlName)?.hasError(errorName) && this.userForm.get(controlName)?.touched;

  }
}
