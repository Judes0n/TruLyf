import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatusEnum } from 'src/app/enum/user-status-enum';
import { UserTypeEnum } from 'src/app/enum/user-type-enum';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http : HttpClient) {}
}
