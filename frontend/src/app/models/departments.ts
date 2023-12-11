export interface Cathedra {
    fullName: string;
    shortName: string;
}

export interface Department {
    name: string;
    shortName: string;
    departments: Cathedra[];
}
