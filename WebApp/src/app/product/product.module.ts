import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http"
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';

//Container
import { ProductMainComponent } from "./components/product-main.component"
import { ProductAddDialog } from "./components/product-add.component"

//Components
// import { ProductAddComponent } from "./components/product-add.component"
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from '@angular/material/button';

//Service
import { ProductService } from "./product.service"

@NgModule({
  declarations: [
    ProductMainComponent,
    ProductAddDialog
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ProductMainComponent
  ],
  providers: [
    ProductService
  ]
})

export class ProductModule { 
  
   constructor() {
  }
  
}
