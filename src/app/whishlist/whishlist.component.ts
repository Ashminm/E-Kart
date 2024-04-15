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

}
