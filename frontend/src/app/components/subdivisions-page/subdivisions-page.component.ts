import {Component, OnDestroy, OnInit} from '@angular/core';
import {PaginatorState} from 'primeng/paginator';
import {DepartmentsService} from '../../services/departments.service';
import {Subject, takeUntil} from 'rxjs';
import {SelectItemGroup} from 'primeng/api';
import {Cathedra, Department} from 'src/app/models/departments';
import {InstitutesService} from 'src/app/services/institutes.service';
import {Institute} from 'src/app/models/institutes';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {SelectItem} from 'primeng/api';
import {ResultsService} from "../../services/results.service";
import {Result} from "../../models/results";

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
    selector: 'app-subdivisions-page',
    templateUrl: './subdivisions-page.component.html',
    styleUrls: ['./subdivisions-page.component.sass']
})

export class SubdivisionsPageComponent implements OnInit, OnDestroy {
    searchErrorMessage: string = ''; // Add this line
    isFilterActive: boolean = false;
    isDepartmentFilterActive: boolean = false;
    lastUniqueSearch: string = '';
    searchInput = '';
    showSearchHistory = false;
    searchHistory: string[] = [];
    searchResults: Result[] = [];
    first: number = 0;
    rows: number = 10;
    filterDepartmentList: SelectItemGroup[] = [];
    instituteList!: Institute[];
    selectedDepartments!: Department[];
    resultList!: Result[];
    private destroy$: Subject<boolean> = new Subject<boolean>();
    private departmentList!: SelectItemGroup[];
    showSearchResult: boolean = false;
    instituteFilterSelected: boolean = false;
    public totalResults: number = 0;

    constructor(
        private departmentService: DepartmentsService,
        private instituteService: InstitutesService,
        private httpClient: HttpClient,
        private resultsService: ResultsService
    ) {
    }

    totalRecords: number = 0; // Загальна кількість записів для пагінації

    ngOnInit() {
        this.getDepartments();
        this.getInstitutes();
        this.getResults();
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

    redirectToUrl(url: string): void {
        window.open(url, '_blank');
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
        const hasSelectedFilters = this.hasSelectedFilters();

        if (trimmedSearchInput === '' && !hasSelectedFilters) {
            // Set the error message to inform the user that the search field is empty
            this.searchErrorMessage = 'Please enter a search query or select filters.';
            return;
        }
        if (this.instituteFilterSelected && !this.hasSelectedFilters()) {
            // Display a message when an institute filter is selected without selecting any department filter
            this.searchErrorMessage = 'Please select at least one department along with the institute filter.';
            return;

        }
        this.addToSearchHistory(trimmedSearchInput);
        this.showSearchResult = true;
        this.totalRecords = this.searchResults.length;
        this.addToSearchHistory(trimmedSearchInput);

        // Check if the search is performed only with filters
        const isSearchOnlyWithFilters = trimmedSearchInput === '' && hasSelectedFilters;

        if (!isSearchOnlyWithFilters) {
            // If not a search only with filters, add to search history
            this.addToSearchHistory(trimmedSearchInput);
        }

        this.showSearchHistory = false;

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
            .set('first', this.first.toString())  // Include the 'first' parameter
            .set('rows', this.rows.toString())
            .set('page', page.toString());

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            // Add any other headers if needed
        });

        this.httpClient
            .get(apiUrl, {params, headers})
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
                        this.totalRecords = totalResults;
                        this.first = (page - 1) * maxResultsPerPage; // Update 'first' for pagination
                        // Print the extracted data for debugging
                        console.log('Results:', this.searchResults);
                        console.log('Total Results:', totalResults);
                    } else {
                        // Handle the case when the status is not 'success'
                        console.error('API Error:', apiResponse);
                        this.totalRecords = 0;
                    }
                },
                (error: any) => {
                    // Handle error if the HTTP request fails
                    console.error('API Error:', error);
                    this.totalRecords = 0;
                }
            );
        this.searchErrorMessage = '';
        // Your existing search logic
        this.showSearchResult = true;
        this.totalRecords = this.searchResults.length;
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
        this.first = event.first || 0;
        this.rows = event.rows || 10;
        // Adjust the range of results based on pagination
        const startIndex = this.first;
        const endIndex = startIndex + this.rows;

        // Update your displayed results based on the current page
        this.searchResults = this.resultList.slice(startIndex, endIndex);

        // Perform any other necessary logic related to pagination

        // Call the search function when the page changes
        this.onSearch();
    }

    onSelectChange(event: { value: Institute[] }) {
        const selectedInstitutes: string[] = event.value.map((instituteList: Institute) => instituteList.code);
        this.filterDepartmentList = this.departmentList.filter((department: SelectItemGroup) => selectedInstitutes.
        includes(department.label));

        // Update the filter status
        this.instituteFilterSelected = selectedInstitutes.length > 0 && this.filterDepartmentList.length === 0;
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

    private getResults(): void {
        this.resultsService.getResults().pipe(takeUntil(this.destroy$)).subscribe(
            (data: { data: { results: Result[], totalResults: number } }) => {
                this.resultList = data.data.results;
                this.totalResults = data.data.totalResults;
                // Assign the results to searchResults of type Result[]
                this.searchResults = data.data.results;
            },
            (error) => {
                console.error('Error fetching results:', error);
                this.totalResults = 0;
            }
        );
    }

    private getInstitutes(): void {
        this.instituteService
            .getInstitutes()
            .pipe(takeUntil(this.destroy$))
            .subscribe((institutes: Institute[]) => this.instituteList = institutes)

    }
    private hasSelectedFilters(): boolean {
        // Check if at least one filter is selected
        return this.filterDepartmentList.some(group =>
            group.items && group.items.length > 0 &&
            group.items.some((item: SelectItem<any>) => (item as CustomSelectItem).checked !== undefined && (item as CustomSelectItem).checked)
        ) || (this.selectedDepartments && this.selectedDepartments.length > 0);
    }
}

interface CustomSelectItem {
    label: string;
    checked?: boolean; // Add this line if 'checked' is a valid property
}
interface CustomSelectItem extends SelectItem {
    checked?: boolean;
}
