import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.css']
})
export class WhishlistComponent implements OnInit {

  products:any[]=[]
  constructor(private api:ApiService){}

  ngOnInit() {
    this.getData()
  }
  getData(){
    this.api.getWishListApi().subscribe({
      next:(res:any)=>{
        console.log(res); 
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

}
