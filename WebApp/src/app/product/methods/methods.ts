import { Product } from "../models/product.interface";
import { map, Observable, Subscriber } from 'rxjs';

export function convertToBase64(product: Product, productForm: Product, file: File){
    const observable = new Observable((subscriber : Subscriber<any>)=>{
       readFile(file, subscriber);
    })

    observable.subscribe((data) => {
      productForm.imageBase64 = data;
      product.imageBase64 = data;
    });
}

function readFile(file: File, subscriber: Subscriber<any>){
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      subscriber.next(fileReader.result);
      subscriber.complete();
    }

    fileReader.onerror = () => {
      subscriber.error();
      subscriber.complete();
    }
  }