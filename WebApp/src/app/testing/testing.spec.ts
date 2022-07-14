import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing'
import { ProductService } from '../product/product.service'

describe('GetTesting', () => {
    let pService : ProductService;

    beforeEach(() => {
        TestBed.configureTestingModule( { providers: [ProductService]})
    });

    it('Get all products', () => {
        // pService = TestBed.inject(ProductService);
        // expect(pService.getAll()).toBe()
    })
});