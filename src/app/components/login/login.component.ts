import { Router, RouterLink } from '@angular/router';
import { UsersService } from './../../core/services/users.service';
import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
// import { UsersService } from '../../core/services/users.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent   implements OnDestroy  {


loginSubscribe!:Subscription


private readonly _FormBuilder = inject(FormBuilder)
private readonly _UsersService = inject(UsersService)
private readonly _ToastrService = inject(ToastrService)
private readonly _Router = inject(Router)


loginForm : FormGroup = this._FormBuilder.group({
    email:[null ,[Validators.required , Validators.email]],
  password:[null ,[Validators.required , Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],

})


loginSubmit():void{


  if (this.loginForm.valid) {
    this.loginSubscribe = this._UsersService.signIn(this.loginForm.value).subscribe({
      next:(res)=>{
        console.log(res);

        if (res.message == 'success') {
          localStorage.setItem("userToken" , res.token)
          this._UsersService.saveUserData()
          this._Router.navigate(['/home'])
          this._ToastrService.success('Login Success')


        }



      },
      error : (err)=>{
        console.log(err);

      }
    })

  }else{
    this.loginForm.setErrors({mismatch:true})
    this.loginForm.markAllAsTouched()
  }


}



ngOnDestroy(): void {
    this.loginSubscribe?.unsubscribe()
}


}










