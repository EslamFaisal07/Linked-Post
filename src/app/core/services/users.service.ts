import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements OnInit {

  userData : any = null
  userPhoto:WritableSignal<string>=signal('');


private readonly _HttpClient = inject(HttpClient)
private readonly _Router = inject(Router)


ngOnInit(): void {
  this.getLogedUserData().subscribe({
    next: (res) => {
 
      this.userPhoto.set(res.user.photo)


    }
  })
}

saveUserData(){
  if (localStorage.getItem('userToken') !== null) {
this.userData = jwtDecode(localStorage.getItem('userToken')!)

  }
}


signUp(data:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}users/signup` ,  data)
}



signIn(data:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}users/signin` , data)
}


changePassword(data:object):Observable<any>
{
  return this._HttpClient.patch(`${environment.baseUrl}users/change-password` , data)
}



uploadProfilePhoto(data:object):Observable<any>
{
  return this._HttpClient.put(`${environment.baseUrl}users/upload-photo` , data)
}


getLogedUserData():Observable<any>
{
  return this._HttpClient.get(`${environment.baseUrl}users/profile-data` )
}



signOut():void{
  localStorage.removeItem('userToken')
  this.userData = null
  this._Router.navigate(['/login'])
}


}
