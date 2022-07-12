import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http"
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import { RouterModule, Routes } from "@angular/router";

//Container
import { ProductMainComponent } from "./components/product-main.component"
import { ProductView } from "./components/product-view.component"
import { ProductAddDialog } from "./components/product-add.component"
import { ConfirmationDialog } from "./components/confirmation.component";

//Components
// import { ProductAddComponent } from "./components/product-add.component"
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

//Service
import { ProductService } from "./product.service"

const routes : Routes = [
  {
      path: 'products',
      children: [
          {
              path: '', component: ProductMainComponent
          },
          {
              path: ':id', component: ProductView
          }
      ]
  }
];

@NgModule({
  declarations: [
    ProductMainComponent,
    ProductView,
    ProductAddDialog,
    ConfirmationDialog
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    RouterModule.forChild(routes)
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

