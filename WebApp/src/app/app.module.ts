import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { ProductModule } from "./product/product.module";

import { NotFoundComponent } from "./not-found.component";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  // { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: '', redirectTo: 'products', pathMatch: 'full'},
  { path: '**', component: NotFoundComponent}
]; 

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    ProductModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatDialogModule,
    FormsModule,
    RouterModule.forRoot(routes, {useHash: true}),
    
  ],
  exports:[
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
