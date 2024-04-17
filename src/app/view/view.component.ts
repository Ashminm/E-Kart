import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit{
  pid:any=0
  product:any={}

  constructor(private aroute:ActivatedRoute,private api:ApiService,private toster:ToastrService){
    this.aroute.params.subscribe((res:any)=>{
      // console.log(res.id);
      this.pid=res.id
      
    })
  }
ngOnInit() {
  this.getData()
}
getData(){
  this.api.getProduct(this.pid).subscribe((res:any)=>{
    this.product=res
    // console.log(this.product);
    
  })
}

addWish(data:any){
  if(sessionStorage.getItem('Token')){
    // console.log(data);
    this.api.addWishListApi(data).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.api.getWishlistCountApi()
        this.toster.success("Item added to Wishlist") 
      },
      error:(err:any)=>{
        console.log("Already in wishlist");
        this.toster.info(err.error)
      }
    }) 
  }
  else{
    
    this.toster.warning("Please Login First!!")
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
        this.toster.success("Item added to cart")
        
      },
      error:(err:any)=>{
        this.toster.error(err.error)
      }
    })
  }
  else{
    console.log("Login first");
    this.toster.warning("Please Login first!!")
  }
}
  

}
