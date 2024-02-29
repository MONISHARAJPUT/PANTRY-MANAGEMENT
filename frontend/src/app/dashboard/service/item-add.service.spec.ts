import { TestBed } from '@angular/core/testing';

import { ItemAddService } from './item-add.service';

describe('ItemAddService', () => {
    let service: ItemAddService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ItemAddService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
