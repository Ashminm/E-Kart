import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products:any[]=[]

  constructor(private api:ApiService,private toaster:ToastrService){}

  ngOnInit() {
    this.getData()
  }

  getData(){
    this.api.getAllProducts().subscribe((res:any)=>{
      // console.log(res);
      this.products=res
      
    },(err)=>{
      console.log(err);
      
    })
  }

  addWish(data:any){
    if(sessionStorage.getItem('Token')){
      console.log(data);
      this.api.addWishListApi(data).subscribe({
        next:(res:any)=>{
          this.toaster.success("Item added to Wishlist") 
        },
        error:(err:any)=>{
          this.toaster.info(err.error)
        }
      }) 
    }
    else{
      this.toaster.warning("Login First")
    }
  }

}
