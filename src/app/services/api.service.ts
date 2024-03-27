import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  SERVER_URL="http://localhost:3000"
  constructor(private http:HttpClient) { }


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

}
