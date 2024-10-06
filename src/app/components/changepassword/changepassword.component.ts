import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsersService } from '../../core/services/users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.scss'
})
export class ChangepasswordComponent  implements OnDestroy{

  changeSubscribe ! :Subscription

private readonly _FormBuilder = inject(FormBuilder)
private readonly _UsersService = inject(UsersService)
private readonly _Router = inject(Router)
private readonly _ToastrService = inject(ToastrService)



changeForm:FormGroup = this._FormBuilder.group({
  password:[null , [Validators.required , Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
  newPassword:[null , [Validators.required , Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],

}
)




changeSubmit():void{

if (this.changeForm.valid) {

this.changeSubscribe = this._UsersService.changePassword(this.changeForm.value).subscribe({
  next: (res) => {
    // console.log(res);


    if (res.message == 'success') {
      localStorage.setItem("userToken" , res.token)

      this._UsersService.saveUserData()
      this._Router.navigate(['/home'])
      this._ToastrService.success('Change Success')

    }

  },
  error: (err) => {
    console.log(err);

  }
})
}else{
  this.changeForm.markAllAsTouched()
}

}



ngOnDestroy(): void {
    this.changeSubscribe?.unsubscribe()
}

}
