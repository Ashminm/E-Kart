import { Component } from '@angular/core';
import { Validators,FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb:FormBuilder,private toaster:ToastrService,private api:ApiService,private route:Router){}
logForm=this.fb.group({
  email:['',[Validators.required,Validators.email]],
  password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9@!]*'),Validators.minLength(6)]]
})

getFormdata(){
  // console.log(this.logForm.value);
  this.api.userLogin(this.logForm.value).subscribe({
    next:(res:any)=>{
      sessionStorage.setItem('existingUser',JSON.stringify(res.existingUser))
      sessionStorage.setItem('Token',res.token) 
      this.api.getWishlistCountApi()
      this.toaster.success("Login Successfully!")    
      this.route.navigateByUrl('/')
    },
    error:(err:any)=>{
      this.toaster.error(err.error)
    }
  })
}

}
