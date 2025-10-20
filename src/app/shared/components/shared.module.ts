import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

// Components
import { HeaderComponent } from './../../shared/components/header/header.component';
import { FooterComponent } from './../../shared/components/footer/footer.component';
import { GenericTableComponent } from './../../shared/components/generic-table/generic-table.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    GenericTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    TagModule,
    TooltipModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    GenericTableComponent
  ]
})
export class SharedModule { }