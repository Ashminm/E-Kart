import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  username:any=""
  wishCount:any=0;
  cartCount:any=0;
  // count:any
  constructor(private api:ApiService){}

ngOnInit(){
  // this.getCount()
  if(sessionStorage.getItem("existingUser")){
    const user:any=sessionStorage.getItem("existingUser")
    this.username=JSON.parse(user).username
    this.api.wishListCount.subscribe((res:any)=>{
      this.wishCount=res
    })
    this.api.cartListCount.subscribe((res:any)=>{
      this.cartCount=res
    })
  }
}
 
// getCount(){
//   this.api.getWishListApi().subscribe((res:any)=>{
//     this.count=(res.length)
//   })
// }
}
