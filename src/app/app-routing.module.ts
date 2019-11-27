import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AboutComponent } from './about/about.component';
import { ContacusComponent } from './contacus/contacus.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { SetComponent } from './set/set.component';
import { SetDetailsComponent} from './set-details/set-details.component';
import { StepComponent } from './step/step.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/food/:page', component: ProductComponent },
  { path: 'product/food/food-detail/:id', component: ProductDetailsComponent },
  { path: 'product/combo', component: SetComponent },
  { path: 'product/combo/combo-detail/:id', component: SetDetailsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContacusComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order/:id', component: OrderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'step', component: StepComponent },
  { path: '**', component: HomeComponent, redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
