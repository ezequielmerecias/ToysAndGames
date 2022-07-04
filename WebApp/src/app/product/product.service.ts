import { Injectable } from "@angular/core";
import { HttpClient, JsonpClientBackend } from "@angular/common/http"
import { Observable, map, takeUntil, of, Subscription} from "rxjs";
import { throwError, catchError, tap } from "rxjs"
import { Product } from "./models/product.interface";

const API: string = "https://localhost:7240/api/Products";

@Injectable()
export class ProductService{
    status: String;
    productd: Product;
    constructor(private http: HttpClient){}

    get(): Observable<Product[]>{
        return this.http.get<Product[]>(API);
    }

    update(product: Product) : Observable<Product>{
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(product);
        return this.http.put<Product>(API, body, {'headers':headers});
    }

    delete(id: number){
        return this.http.delete(`${API}?id=${id}`).subscribe(() => this.status = 'Delete successful');
    }
}

