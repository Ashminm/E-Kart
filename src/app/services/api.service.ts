import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  SERVER_URL="http://localhost:3000"
  wishListCount=new BehaviorSubject(0)
  cartListCount=new BehaviorSubject(0)

  constructor(private http:HttpClient) {
    if(sessionStorage.getItem("Token")){
      this.getWishlistCountApi()
      this.getCartCountApi()
    }
   }
   
  getAllProducts(){
    return this.http.get(`${this.SERVER_URL}/all-products`)
  }
  getProduct(id:any){
    return this.http.get(`${this.SERVER_URL}/get-product/${id}`)
  }
  userRegistration(data:any){
    return this.http.post(`${this.SERVER_URL}/add-user`,data)
  }
  userLogin(data:any){
    return this.http.post(`${this.SERVER_URL}/login`,data)
  }

// --------------------------------------
  appendTokenToHeader(){
    const token=sessionStorage.getItem('Token')
    let headers=new HttpHeaders()
    if(token){
      headers=headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  addWishListApi(product:any){
    return this.http.post(`${this.SERVER_URL}/add-wish`,product,this.appendTokenToHeader())
  }

  getWishListApi(){
    return this.http.get(`${this.SERVER_URL}/get-wish`,this.appendTokenToHeader())
  }

  removeWishListItem(id:any){
    return this.http.delete(`${this.SERVER_URL}/delete-wishItem/${id}`,this.appendTokenToHeader())    
  }

  getWishlistCountApi(){
    this.http.get(`${this.SERVER_URL}/get-wish`,this.appendTokenToHeader()).subscribe((res:any)=>{
      this.wishListCount.next(res.length)
      
    })
  }
  addToCartApi(product:any){
    return this.http.post(`${this.SERVER_URL}/add-toCart`,product,this.appendTokenToHeader())
  }
  getCartApi(){
    return this.http.get(`${this.SERVER_URL}/view-cartList`,this.appendTokenToHeader())
  }
  getCartCountApi(){
    this.http.get(`${this.SERVER_URL}/view-cartList`,this.appendTokenToHeader()).subscribe((res:any)=>{
      this.cartListCount.next(res.length)
      
    })
  }
  deleteCartItemApi(id:any){
    return this.http.delete(`${this.SERVER_URL}/delete-cart-Item/${id}`,this.appendTokenToHeader())    
  }

}
