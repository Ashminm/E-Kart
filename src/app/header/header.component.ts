import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  username:any=""
  wishCount:any=0;
  cartCount:any=0;
  constructor(private api:ApiService,private route:Router){}

ngOnInit(){
  if(sessionStorage.getItem("existingUser")){
    const user:any=sessionStorage.getItem("existingUser")
    this.username=JSON.parse(user).username
    this.api.wishListCount.subscribe((res:any)=>{
      this.wishCount=res
    });
    this.api.cartListCount.subscribe((res:any)=>{
      this.cartCount=res
    })
  }
}
 

logOut(){
  localStorage.clear()
  sessionStorage.clear()
  this.wishCount=0
  this.cartCount=0
this.route.navigateByUrl("/log")
}
}
