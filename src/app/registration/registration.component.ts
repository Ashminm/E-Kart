import { Component } from '@angular/core';
import { FormBuilder,Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(private fb:FormBuilder, private api:ApiService, private toaster:ToastrService,private route:Router){}

  regForm=this.fb.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-Z 0-9]*')]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9@!]*'),Validators.minLength(6)]]
  })

  getFormData(){
    // console.log(this.regForm.value);
    this.api.userRegistration(this.regForm.value).subscribe({
      next:(res:any)=>{
        // console.log(res); 
        this.toaster.success(`${this.regForm.value.username} Successfully Registerd!`);
        this.route.navigateByUrl('/log')
      },
      error:(err)=>{
        this.toaster.error("Registration Faild! Existing user!!");
        
      }
    })
    
  }

}
