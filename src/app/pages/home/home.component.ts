import { Component, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { IResponse } from '../../interfaces/iresponse.interface';
import { toast } from 'ngx-sonner';
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
  totalPage: number = 0;
  pages: number[] = [];

  ngOnInit() {
    this.usersServices.getAll().subscribe({
      next: (data) => {
        this.arrUsers = data.results;
        this.totalPage = data.total_pages;
        for (let i = 1; i <= this.totalPage; i++) {
          this.pages.push(i);
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  changePage(event: any) {
    const pageURL = event.target.dataset.page;
    this.usersServices.getAll(pageURL).subscribe({
      next: (data) => {
        this.arrUsers = data.results;
      },
      error: (error) => {
        console.error(error);
      }
    });

  }

  deleteUser(event: Boolean) {
    if (event) {
      //refresco la lista de empleados this.arrUsers  
      this.usersServices.getAll().subscribe({
        next: (data) => {
          this.arrUsers = data.results;
          toast.info(`El usuario se ha eliminado de la lista`);
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }
}
