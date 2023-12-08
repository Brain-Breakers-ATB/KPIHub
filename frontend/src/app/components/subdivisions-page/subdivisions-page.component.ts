import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { DepartmentsService } from "../../services/departments.service";
import { Subject, take, takeUntil } from "rxjs";
import { SelectItemGroup } from 'primeng/api';
import { Cathedra, Department } from 'src/app/models/departments';
import { InstitutesService } from 'src/app/services/institutes.service';
import { Institute } from 'src/app/models/institutes';

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

    departments: Department[] = [];

    private destroy$: Subject<boolean> = new Subject<boolean>();

    filterDepartmentList: SelectItemGroup[] = [];

    private departmentList!: SelectItemGroup[];

    instituteList!: Institute[];

    selectedDepartments!: Department[];

    constructor(private departmentService: DepartmentsService, private instituteService: InstitutesService) { }

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

    deleteHistoryItem(historyItem: string) {
        const index = this.searchHistory.indexOf(historyItem);
        if (index !== -1) {
            this.searchHistory.splice(index, 1);
            localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
        }
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

    onSelectChange(event: { value: Institute[] }) {
        const selectedInstitutes: string[] = event.value.map((instituteList: Institute) => instituteList.code);
        this.filterDepartmentList = this.departmentList.filter((department: SelectItemGroup) => selectedInstitutes.includes(department.label));
        console.log(selectedInstitutes);
        console.log(this.departmentList);
    }

    private getDepartments(): void {
        this.departmentService.getDepartments().pipe(takeUntil(this.destroy$)).subscribe((departments: Department[]) => {
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
