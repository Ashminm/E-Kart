import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


export const authGuard: CanActivateFn = (route, state) => {
  const api=inject(ApiService)
  const toster=inject(ToastrService)
  const router=inject(Router)

  if(api.isLoggedIn()){
    return true
  }else{
    toster.warning("Please Login First!!")
    router.navigateByUrl('/log')
    return false
  }


  return true;
};
