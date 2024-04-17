import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ViewComponent } from './view/view.component';
import { WhishlistComponent } from './whishlist/whishlist.component';
import { CartComponent } from './cart/cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { authGuard } from './guards/auth.guard'; 

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'log',component:LoginComponent},
  {path:'reg',component:RegistrationComponent},
  {path:'view/:id',component:ViewComponent},
  {path:'wish',canActivate:[authGuard],component:WhishlistComponent},
  {path:'cart',canActivate:[authGuard],component:CartComponent},
  {path:'checkout',canActivate:[authGuard],component:CheckOutComponent},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
