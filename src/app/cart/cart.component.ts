import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts:any[]=[]
  totalAmount:any=0
  constructor(private api:ApiService,private toastr:ToastrService){}

  ngOnInit() {
    this.getCart()
  }
  getCart(){
    this.api.getCartApi().subscribe({
      next:(res:any)=>{
        // console.log(res);
        this.cartProducts=res
        this.getTotalAmount()
        
      },
      error:(err:any)=>{
        // console.log(err);
        this.toastr.error(err)
      }
    })
  }

  deleteCartItem(id:any){
    this.api.deleteCartItemApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.toastr.success("cart item deleted!")
        this.getCart()
        this.api.getCartCountApi()
      },
      error:(err:any)=>{
        console.log(err);
        this.toastr.error("Deletion faild!")
      }
    })
  }

  getTotalAmount(){
    if(this.cartProducts.length>0){
      this.totalAmount=this.cartProducts.map((item:any)=>item.totalPrice).reduce((p1:any,p2:any)=>p1+p2)
      console.log(this.totalAmount);
    }else{
      this.totalAmount=0
    }
      
  }

  increase(id:any){
    this.api.incQuantityItemApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getCart()
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  
  decrease(id:any){
    this.api.decQuantityItemApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getCart()
        this.api.getCartCountApi()
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  emptyCart(){
    this.api.emptycartApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.toastr.success("Cart is Empty!")
        this.api.getCartCountApi()
        this.getCart()
        this.getTotalAmount()
      },error:(err:any)=>{
        this.toastr.error("Somthing went wrong!")
        console.log(err);
        
      }
    })
  }


}
