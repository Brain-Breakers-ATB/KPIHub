import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GalleryPageComponent} from "./gallery-page.component";
import {TreeSelectModule} from 'primeng/treeselect';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [GalleryPageComponent],
    imports: [CommonModule, TreeSelectModule, FormsModule]
})

export class GalleryPageModule { }
