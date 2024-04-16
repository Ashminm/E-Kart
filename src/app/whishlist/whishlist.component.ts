import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.css']
})
export class WhishlistComponent implements OnInit {

  products:any[]=[]
  constructor(private api:ApiService,private toster:ToastrService){}

  ngOnInit() {
    this.getData()
  }
  getData(){

    this.api.getWishListApi().subscribe({
      next:(res:any)=>{
        // console.log(res); 
        this.products=res
      },
      error:(err:any)=>{
        // this.toster.error(err)
        console.log(err);
        
      }
    })
  }

  deleteItem(id:any){
    this.api.removeWishListItem(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.api.getWishlistCountApi()
        this.toster.success("Item Removed!")
        this.getData()
      },
      error:(err:any)=>{
        this.toster.error("Item Deletion Failed!")
      }
    })
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
          this.deleteItem(data._id)
        },
        error:(err:any)=>{
          this.toster.error(err.error)
        }
      })
    }
    else{
      console.log("Login first");
      this.toster.warning("Login first!!")
    }
  }

}
