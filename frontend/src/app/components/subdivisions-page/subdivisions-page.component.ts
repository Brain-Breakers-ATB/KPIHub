import { Component, OnInit } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';

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
    lastUniqueSearch: string = '';
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
        const trimmedSearchInput = this.searchInput.trim();
        if (trimmedSearchInput === '') {
            return;
        }

        // Your existing search logic
        this.searchResults = ['Результат 1', 'Результат 2', 'Результат 3'];
        // Додаємо поточний searchInput в історію пошуку
        this.addToSearchHistory(trimmedSearchInput);

        // Закриваємо випадаючий список історії пошуку після натискання Enter або кнопки "Знайти"
        this.showSearchHistory = false;
    }

    onHistoryItemClick(historyItem: string) {
        // Перевіряємо, чи цей запит унікальний
        const index = this.searchHistory.indexOf(historyItem);
        if (index !== -1) {
            // Переміщаємо вибраний елемент на початок історії пошуку
            this.searchHistory.splice(index, 1);
            this.searchHistory.unshift(historyItem);

            // Зберігаємо тільки перші 5 результатів
            this.searchHistory = this.searchHistory.slice(0, 5);

            // Оновлюємо локальне сховище з історією пошуку
            localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
        }

        // Додаємо вибраний елемент історії в поле пошуку
        this.searchInput = historyItem.trim();

        // Виконуємо пошук
        this.onSearch();

        // Зберігаємо цей запит як останній унікальний
        this.lastUniqueSearch = this.searchInput;

        // Закриваємо випадаючий список історії пошуку
        this.showSearchHistory = false;
    }

    clearSearchHistory(event: Event) {
        // Очищаємо історію пошуку та локальне сховище
        this.searchHistory = [];
        localStorage.removeItem('searchHistory');

        // Очищаємо останній унікальний запит
        this.lastUniqueSearch = '';

        // Закриваємо випадаючий список історії пошуку
        this.showSearchHistory = false;

        // Зупиняємо подальше поширення події вверх
        event.stopPropagation();
    }

    private addToSearchHistory(item: string) {
        // Додаємо тільки унікальні результати в історію пошуку
        if (!this.searchHistory.includes(item)) {
            this.searchHistory.unshift(item.trim());

            // Зберігаємо тільки перші 5 результатів
            if (this.searchHistory.length > 5) {
                this.searchHistory.pop();
            }
            localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
        }
    }

    showDepartments(faculty: string) {
        console.log(`Showing departments for ${faculty}`);
        this.isDepartmentFilterActive = true;
    }

    onPageChange(event: PaginatorState) {
        this.first = event.first!;
        this.rows = event.rows!;
    }
}
