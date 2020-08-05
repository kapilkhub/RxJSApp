import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { Subscription, EMPTY, Subject } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html',
  changeDetection :ChangeDetectionStrategy.OnPush
})
export class ProductListAltComponent {
  pageTitle = 'Products';
  errorMessage = '';
  selectedProductId: number;
  
  private errorSubject = new Subject<string>();
  errorSubjectAction$ = this.errorSubject.asObservable();

  products$ = this.productService.productsWithCategories$
              .pipe(
                catchError(err =>{                  
                  this.errorSubject.next(err);
                  return EMPTY
                })
              );

  selectedProduct$ = this.productService.selectedProduct$;

  constructor(private productService: ProductService) { }




  onSelected(productId: number): void {
  this.productService.onSelectedProduct(productId);
  }
}
