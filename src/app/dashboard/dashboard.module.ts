import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardLayoutAgregarEvaluacionComponent } from './layouts/dashboard-layout-agregar-evaluacion/dashboard-layout-agregar-evaluacion.component';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardLayoutAgregarEvaluacionComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
