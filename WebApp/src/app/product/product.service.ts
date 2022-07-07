import { ErrorHandler, Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, JsonpClientBackend } from "@angular/common/http"
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
        return this.http.put<Product>(API, body, {'headers':headers}).pipe(map(data => {return data;}), catchError((error) => {
            console.log(error);
            return throwError(error);
        }));
    }

    delete(id: number){
        return this.http.delete(`${API}?id=${id}`).subscribe();
    }
}

