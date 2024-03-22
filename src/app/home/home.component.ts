import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products:any[]=[]

  constructor(private api:ApiService){}

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

}
