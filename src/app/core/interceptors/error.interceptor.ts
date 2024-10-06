import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const _ToastrService=inject(ToastrService)

  return next(req).pipe(catchError((err)=>{
    console.log("inter",err.error.error );

    _ToastrService.error(err.error.error , 'Linked Post')

  return throwError(()=>err)


  }))




};
