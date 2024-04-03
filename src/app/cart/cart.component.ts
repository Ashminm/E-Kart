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
  constructor(private api:ApiService,private toastr:ToastrService){}

  ngOnInit() {
    this.getCart()
  }
  getCart(){
    this.api.getCartApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.cartProducts=res
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  deleteCartItem(id:any){
    this.api.deleteCartItemApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.toastr.success("cart item deleted!")
        this.getCart()
      },
      error:(err:any)=>{
        console.log(err);
        this.toastr.error("Deletion faild!")
      }
    })
  }

}
