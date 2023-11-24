import { Component, OnInit } from '@angular/core';

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
}
