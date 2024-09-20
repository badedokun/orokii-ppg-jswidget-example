import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const routes: Routes = [
  { path: '', component: AppComponent }, // Home or default route
  { path: 'checkout', component: CheckoutComponent }, // Checkout route
];
