import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IResponse } from '../interfaces/iresponse.interface';
import { lastValueFrom, Observable } from 'rxjs';
import { IUser } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private httpClient = inject(HttpClient);
  private baseUrl: string = 'https://peticiones.online/api/users';

  getAll(pageURL?: string): Observable<IResponse> {
    const url = pageURL ? `${this.baseUrl}?page=${pageURL}` : `${this.baseUrl}?page=1`;
    return this.httpClient.get<IResponse>(url);
  }

  getByid(id: string): Promise<IUser> {
    return lastValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/${id}`));
  }

  delete(id: string): Promise<IUser> {
    return lastValueFrom(this.httpClient.delete<IUser>(`${this.baseUrl}/${id}`));
  }
}
