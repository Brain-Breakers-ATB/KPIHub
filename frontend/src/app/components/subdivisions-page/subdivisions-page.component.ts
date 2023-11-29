import { Component, OnInit } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
    selector: 'app-subdivisions-page',
    templateUrl: './subdivisions-page.component.html',
    styleUrls: ['./subdivisions-page.component.sass']
})

export class SubdivisionsPageComponent implements OnInit {
    isFilterActive: boolean = false;
    isDepartmentFilterActive: boolean = false;
    facultyList: string[] = ['Faculty 1', 'Faculty 2', 'Faculty 3'];
    departmentList: string[] = ['Department 1', 'Department 2', 'Department 3'];

    searchInput = '';
    showSearchHistory = false;
    searchHistory: string[] = [];
    searchResults: string[] = [];

    ngOnInit() {
        // Load search history from localStorage when the component is initialized
        const storedHistory = localStorage.getItem('searchHistory');
        if (storedHistory) {
            this.searchHistory = JSON.parse(storedHistory);
        }
    }
    deleteHistoryItem(historyItem: string) {
        const index = this.searchHistory.indexOf(historyItem);
        if (index !== -1) {
            this.searchHistory.splice(index, 1);
            localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
        }
    }

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
        // Clear the search input when toggling the filter
        this.searchInput = '';

        this.isFilterActive = !this.isFilterActive;
        event.stopPropagation();
    }

    toggleDepartmentFilter(event: Event) {
        // Clear the search input when toggling the department filter
        this.searchInput = '';

        this.isDepartmentFilterActive = !this.isDepartmentFilterActive;
        event.stopPropagation();
    }

    toggleDropdown(event: Event) {
        // Always show the search history dropdown when clicking the input field
        this.showSearchHistory = true;
    }

    onSearchBlur() {
        setTimeout(() => {
            this.showSearchHistory = false;
        }, 200);
    }

    onSearch() {
        // Your existing search logic
        this.searchResults = ['Результат 1', 'Результат 2', 'Результат 3'];
        // Add the current searchInput to the searchHistory
        this.addToSearchHistory(this.searchInput);

        // Close the search history dropdown after pressing Enter or clicking the "Знайти" button
        this.showSearchHistory = false;
    }

    onHistoryItemClick(historyItem: string) {
        this.searchInput = historyItem;
        this.onSearch(); // Perform search when history item is clicked
    }

    clearSearchHistory(event: Event) {
        this.searchHistory = [];
        localStorage.removeItem('searchHistory');
        event.stopPropagation();
    }

    private addToSearchHistory(item: string) {
        this.searchHistory.unshift(item);

        if (this.searchHistory.length > 5) {
            this.searchHistory.pop();
        }
        localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
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
