import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EMPTY, BehaviorSubject, combineLatest } from 'rxjs';
import { ProductService } from './product.service';
import { catchError, map } from 'rxjs/operators';
import { ProductCategoryService } from '../product-categories/product-category.service';
import { Product } from './product';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})

export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  
  private categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();


  products$ = combineLatest([
    this.productService.productsWithCategories$,
    this.categorySelectedAction$
  ]).pipe(
    map(([products, selectedCategoryId])=>(
      products.filter(product => selectedCategoryId ==0 ? true: product.categoryId ==selectedCategoryId)
    ))
  );

  category$ = this.productCategoryService.productCategories$.pipe(catchError(err => {
      this.errorMessage = err;
      return EMPTY;
  })
  )
 
  constructor(private productService: ProductService, private productCategoryService: ProductCategoryService) { }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(selectedCategoryId: string): void {
    this.categorySelectedSubject.next(+selectedCategoryId)
  }
}
