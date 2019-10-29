import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})

export class AvPaginationComponent implements OnInit {
    lastPageIndex: number;
    thisCurrentPageIndex: number;
    disableNextButton: false;

    /**
     * How many items on one page
     */
    @Input() itemsPerPage;

    /**
     * How many items
     */
    @Input() totalItems;

    /**
     * Two way binding
     */
    @Input()
    get currentPageIndex() {
        return this.thisCurrentPageIndex;
    }
    @Output() currentPageIndexChange = new EventEmitter();
    set currentPageIndex(index) {
        this.lastPageIndex = index;
        this.thisCurrentPageIndex = index;
        this.currentPageIndexChange.emit(this.thisCurrentPageIndex);
    }

    /**
     * emit event When enter or blur, and the page index is changed
     */
    @Output() pageChange = new EventEmitter();

    constructor(private changeDetector: ChangeDetectorRef) { }

    ngOnInit(): void { }

    /**
     * call when press enter on input
     */
    onInputEnter(): void {
        if (!this.isValidNumber(this.thisCurrentPageIndex)) {
            this.thisCurrentPageIndex = 1;
        }
        this.currentPageIndexChange.emit(this.thisCurrentPageIndex);
        if (this.lastPageIndex !== this.thisCurrentPageIndex) {
            this.lastPageIndex = this.thisCurrentPageIndex;
            this.pageChange.emit(this.thisCurrentPageIndex);
        }
    }

    /**
     * call when blur from input
     */
    onInputBlur(): void {
        this.onInputEnter();
    }

    /**
     * Call when click next item
     */
    onNextClick(): void {
        if (!this.isDisableNextButton()) {
            this.thisCurrentPageIndex += 1;
            this.onInputEnter();
        }
    }

    /**
     * Call when click previous item
     */
    onPrevClick(): void {
        if (this.thisCurrentPageIndex !== 1) {
            this.thisCurrentPageIndex -= 1;
            this.onInputEnter();
        }
    }

    /**
     * Alway check the next button whether is valid.
     */
    isDisableNextButton(): boolean {
        try {
            return this.thisCurrentPageIndex * 1 === Math.ceil(this.totalItems / this.itemsPerPage);
        } catch (ex) {
            return false;
        }
    }

    /**
     * Check the input index whether is valid one
     * @param inputValue
     */
    private isValidNumber(inputValue: any): boolean {
        try {
            const regValidInput = /^(([1-9]\d*))$/g;
            return regValidInput.test(inputValue) &&
                inputValue <= Math.ceil(this.totalItems / this.itemsPerPage);
        } catch (ex) {
            console.error(ex);
        }
    }

}
