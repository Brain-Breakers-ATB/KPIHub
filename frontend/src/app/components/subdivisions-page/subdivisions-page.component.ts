import { Component } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';

@Component({
    selector: 'app-subdivisions-page',
    templateUrl: './subdivisions-page.component.html',
    styleUrls: ['./subdivisions-page.component.sass']
})

export class SubdivisionsPageComponent {
    isFilterActive: boolean = false;
    isDepartmentFilterActive: boolean = false;
    facultyList: string[] = ['Faculty 1', 'Faculty 2', 'Faculty 3'];
    departmentList: string[] = ['Department 1', 'Department 2', 'Department 3'];
    first: number = 0;
    rows: number = 10;

    /* results: any[] = [];
    totalResults: number = 0;
    maxResultsPerPage: number = 10;
    currentPage: number = 1;
    Math: any;
    totalPages: number = 0;
    pageNumbers: number[] = []; 

    ngOnInit() {
        // You can call your backend here to fetch initial data
        this.fetchResults();
    } */

    toggleFilter(event: Event) {
        this.isFilterActive = !this.isFilterActive;
        event.stopPropagation();
    }

    toggleDepartmentFilter(event: Event) {
        this.isDepartmentFilterActive = !this.isDepartmentFilterActive;
        event.stopPropagation();
    }

    showDepartments(faculty: string) {
        console.log(`Showing departments for ${faculty}`);
        this.isDepartmentFilterActive = true;
    }

    onPageChange(event: PaginatorState) {
        this.first = event.first!;
        this.rows = event.rows!;
    }

    /* fetchResults() {
        // Mock backend response
        const mockResponse = {
            status: 'success',
            data: {
                results: [
                    {
                        title: 'Result 1',
                        url: 'http://result1.com',
                        snippet: 'Snippet 1'
                    },
                    { 
                        title: 'Result 2', 
                        url: 'http://result2.com', 
                        snippet: 'Snippet 2' 
                    },
                    // ... (up to 10 results based on maxResultsPerPage)
                ],
                totalResults: 25
            }
        };

        // Assigning mock response to properties
        this.results = mockResponse.data.results;
        this.totalResults = mockResponse.data.totalResults;

        this.totalPages = Math.ceil(this.totalResults / this.maxResultsPerPage);
        this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

    onPageChange(newPage: number) {
        this.currentPage = newPage;
        // You can call your backend with updated page number here
        this.fetchResults();
    }

    getPagesArray(): number[] {
        const totalPages = Math.ceil(this.totalResults / this.maxResultsPerPage);
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    } */
}