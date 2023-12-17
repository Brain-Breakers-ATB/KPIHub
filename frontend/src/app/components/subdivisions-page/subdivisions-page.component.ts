import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { DepartmentsService } from '../../services/departments.service';
import { Subject, takeUntil } from 'rxjs';
import { SelectItemGroup } from 'primeng/api';
import { Cathedra, Department } from 'src/app/models/departments';
import { InstitutesService } from 'src/app/services/institutes.service';
import { Institute } from 'src/app/models/institutes';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SelectItem } from 'primeng/api';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
    selector: 'app-subdivisions-page',
    templateUrl: './subdivisions-page.component.html',
    styleUrls: ['./subdivisions-page.component.sass']
})

export class SubdivisionsPageComponent implements OnInit, OnDestroy {
    isFilterActive: boolean = false;
    isDepartmentFilterActive: boolean = false;
    lastUniqueSearch: string = '';
    searchInput = '';
    showSearchHistory = false;
    searchHistory: string[] = [];
    searchResults: string[] = [];
    first: number = 0;
    rows: number = 10;
    filterDepartmentList: SelectItemGroup[] = [];
    instituteList!: Institute[];
    selectedDepartments!: Department[];
    private destroy$: Subject<boolean> = new Subject<boolean>();
    private departmentList!: SelectItemGroup[];
    showSearchResult: boolean = false;
    constructor(
        private departmentService: DepartmentsService,
        private instituteService: InstitutesService,
        private httpClient: HttpClient,
    ) { }
    totalRecords: number = 0; // Загальна кількість записів для пагінації

    ngOnInit() {
        this.getDepartments();
        this.getInstitutes();
        const storedHistory = localStorage.getItem('searchHistory');
        if (storedHistory) {
            this.searchHistory = JSON.parse(storedHistory);
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    deleteHistoryItem(event: Event, historyItem: string) {
        // Prevent the default action of the event
        event.preventDefault();
        // Stop the event from further propagation
        event.stopPropagation();

        const index = this.searchHistory.indexOf(historyItem);
        if (index !== -1) {
            this.searchHistory.splice(index, 1);
            localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
        }

        // Keep the dropdown open
        this.showSearchHistory = true;
    }

    toggleFilter(event: Event) {
        this.searchInput = '';
        this.isFilterActive = !this.isFilterActive;
        event.stopPropagation();
    }

    toggleDepartmentFilter(event: Event) {
        this.searchInput = '';

        this.isDepartmentFilterActive = !this.isDepartmentFilterActive;
        event.stopPropagation();
    }

    toggleDropdown(event: Event) {
        // Show the search history
        this.showSearchHistory = true;

        // Check if the click event originated from the delete button or clear history button
        const isDeleteButton = (event.target as HTMLElement).classList.contains('delete-button');
        const isClearHistoryButton = (event.target as HTMLElement).classList.contains('clear-history-button');

        // Close the dropdown only if it's not the delete button or clear history button click
        if (!isDeleteButton && !isClearHistoryButton) {
            this.showSearchHistory = true;
        }
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

        const apiUrl = 'http://localhost:3000/api/search';

        // Modify the following lines to handle optional filters
        const selectedInstitutes = this.filterDepartmentList
            .filter(group => group.items && group.items.length > 0 &&
                group.items
                    .map((item: SelectItem<any>) => item as CustomSelectItem) // Map to CustomSelectItem
                    .some((item: CustomSelectItem) => item.checked !== undefined && item.checked))
            .map(group => group.label)
            .join(',');

        const selectedDepartments = this.selectedDepartments
            ? this.selectedDepartments.map(department => department.name).join(',')
            : '';

        const keywords = trimmedSearchInput;
        const sort = 'date';
        const maxResultsPerPage = this.rows;
        const page = (this.first / this.rows) + 1;

        const params = new HttpParams()
            .set('institutes', selectedInstitutes)
            .set('departments', selectedDepartments)
            .set('keywords', keywords)
            .set('sort', sort)
            .set('maxResultsPerPage', maxResultsPerPage.toString())
            .set('page', page.toString());

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            // Add any other headers if needed
        });

        this.httpClient
            .get(apiUrl, { params, headers })
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (apiResponse: any) => {
                    if (apiResponse.status === 'success') {
                        // Extract data from the response
                        const responseData = apiResponse.data;
                        const results = responseData.results;
                        const totalResults = responseData.totalResults;

                        // Update your searchResults or other properties based on the extracted data
                        this.searchResults = results;

                        // Print the extracted data for debugging
                        console.log('Results:', this.searchResults);
                        console.log('Total Results:', totalResults);
                    } else {
                        // Handle the case when the status is not 'success'
                        console.error('API Error:', apiResponse);
                    }
                },
                (error: any) => {
                    // Handle error if the HTTP request fails
                    console.error('API Error:', error);
                }
            );
        // Your existing search logic
        this.addToSearchHistory(trimmedSearchInput);
        this.showSearchResult = true;
        this.totalRecords = this.searchResults.length;
        this.addToSearchHistory(trimmedSearchInput);

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
        // Clearing the search history
        this.searchHistory = [];
        localStorage.removeItem('searchHistory');

        // Clear the last unique search
        this.lastUniqueSearch = '';

        // Keep the dropdown open
        this.showSearchHistory = true;

        // Prevent further event propagation
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

    onSelectChange(event: { value: Institute[] }) {
        const selectedInstitutes: string[] = event.value.map((instituteList: Institute) => instituteList.code);
        this.filterDepartmentList = this.departmentList.filter((department: SelectItemGroup) => selectedInstitutes.
        includes(department.label));
        console.log(selectedInstitutes);
        console.log(this.departmentList);
    }

    private getDepartments(): void {
        this.departmentService.getDepartments().pipe(takeUntil(this.destroy$)).subscribe(
            (departments: Department[]) => {
                this.departmentList = departments.map((department: Department) => ({
                    label: department.shortName,
                    items: department.departments.map((cathedra: Cathedra) => ({
                        label: cathedra.fullName,
                        value: cathedra.shortName
                    }))
                }))
            })
    }

    private getInstitutes(): void {
        this.instituteService
            .getInstitutes()
            .pipe(takeUntil(this.destroy$))
            .subscribe((institutes: Institute[]) => this.instituteList = institutes)
    }
}

interface CustomSelectItem {
    label: string;
    checked?: boolean; // Add this line if 'checked' is a valid property
}
