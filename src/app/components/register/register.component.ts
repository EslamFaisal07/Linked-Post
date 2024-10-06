import { Component, inject, OnDestroy, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsersService } from '../../core/services/users.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent   {


  isLoading :WritableSignal<boolean> = signal(false)
  msgError :WritableSignal<boolean> = signal(false)




  signUpSubscribe !: Subscription

private readonly _FormBuilder = inject(FormBuilder)
private readonly _UsersService = inject(UsersService)
private readonly _Router = inject(Router)

registerForm : FormGroup = this._FormBuilder.group({
  name:[null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]],
  email:[null ,[Validators.required , Validators.email]],
  password:[null ,[Validators.required , Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
  rePassword:[null ,[Validators.required ]],
  dateOfBirth:[null ,[Validators.required]],
  gender:[null ,[Validators.required]],
} , {validators:this.confirmPassword})




confirmPassword(g:AbstractControl){
  if(g.get('password')?.value === g.get('rePassword')?.value){
return null
}else{
  return {mismatch:true}
}



}




registerSubmit():void{

if (this.registerForm.valid) {



  this.isLoading.set(true)
  this.signUpSubscribe  = this._UsersService.signUp(this.registerForm.value).subscribe({
    next:(res)=>{
      // console.log(res);
      this.isLoading.set(false)


      if (res.message == 'success') {


this._Router.navigate(['/login'])
      }

    },
    error:(err)=>{
      // console.log(err);
      this.isLoading.set(false)
      this.msgError.set(err.error.message);



    }


  })
}

else{
  this.registerForm.setErrors({mismatch:true})
  this.registerForm.markAllAsTouched()
}






}





}
