import { Component } from '@angular/core';

@Component({
    selector: 'app-subdivisions-page',
    templateUrl: './subdivisions-page.component.html',
    styleUrls: ['./subdivisions-page.component.sass']
})
export class SubdivisionsPageComponent {
<<<<<<< Updated upstream

=======
    isFilterActive: boolean = false;
    isDepartmentFilterActive: boolean = false;
    facultyList: string[] = ['Faculty 1', 'Faculty 2', 'Faculty 3']; // Add your list of faculties here
    departmentList: string[] = ['Department 1', 'Department 2', 'Department 3']; // Add your list of departments here

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
        // You can implement logic to fetch the departments for the selected faculty here
        // For now, let's just set isDepartmentFilterActive to true
        this.isDepartmentFilterActive = true;
    }
>>>>>>> Stashed changes
}
