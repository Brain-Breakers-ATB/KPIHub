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
        this.searchResults = ['Результат 1', 'Результат 2', 'Результат 3'];

        this.addToSearchHistory(this.searchInput);

        this.showSearchHistory = false;
    }

    onHistoryItemClick(historyItem: string) {
        this.searchInput = historyItem;
        this.onSearch();
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