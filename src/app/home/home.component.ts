import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products:any[]=[]
  searchKey:any;

  constructor(private api:ApiService,private toaster:ToastrService,private route:Router){}

  ngOnInit() {
    this.getData()
  }

  getData(){
    this.api.getAllProducts().subscribe((res:any)=>{
      console.log(res);
      this.products=res
     
    },(err)=>{
      console.log(err);
      
    })
  }

  addWish(data:any){
    if(sessionStorage.getItem('Token')){
      // console.log(data);
      this.api.addWishListApi(data).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.api.getWishlistCountApi()
          this.toaster.success("Item added to Wishlist") 
        },
        error:(err:any)=>{
          console.log("Already in wishlist");
          this.toaster.info(err.error)
        }
      }) 
    }
    else{ 
      this.toaster.warning("Please Login First!!")
      // this.route.navigateByUrl('/log')
    }
  }

  addCart(data:any){
    if(sessionStorage.getItem("Token")){
      const {id,title,image,category,price}=data
      const product={id,title,image,price,category,quantity:1}
      this.api.addToCartApi(product).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.api.getCartCountApi()
          this.toaster.success("Item added to cart")
          
        },
        error:(err:any)=>{
          this.toaster.error(err.error)
        }
      })
    }
    else{
      console.log("Login first");
      this.toaster.warning("Please Login first!!")
      // this.route.navigateByUrl('/log')

    }
  }
  getSearchItem(e:any){
    this.searchKey=e
    console.log(e);
    
  }

}
