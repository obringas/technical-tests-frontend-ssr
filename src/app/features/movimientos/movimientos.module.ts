import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Shared Module (incluye GenericTableComponent)
import { SharedModule } from '../../shared/components/shared.module';

// PrimeNG
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

// Routing
import { MovimientosRoutingModule } from './movimientos-routing.module';

// Store
import { movimientosReducer } from './store/movimientos.reducer';
import { MovimientosEffects } from './store/movimientos.effects';

// Components
import { MovimientosPageComponent } from './pages/movimientos-page/movimientos-page.component';
import { MovimientoFormComponent } from './components/movimiento-form/movimiento-form.component';
import { MovimientosListComponent } from './components/movimientos-list/movimientos-list.component';

@NgModule({
  declarations: [
    MovimientosPageComponent,
    MovimientoFormComponent,
    MovimientosListComponent
  ],
  imports: [
    CommonModule,
    MovimientosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,  // <-- AGREGADO: Importa GenericTableComponent
    StoreModule.forFeature('movimientos', movimientosReducer),
    EffectsModule.forFeature([MovimientosEffects]),
    // PrimeNG
    CardModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    DropdownModule,
    AutoCompleteModule,
    TagModule,
    TooltipModule
  ]
})
export class MovimientosModule { }