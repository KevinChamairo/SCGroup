import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { DashboardLayoutAgregarEvaluacionComponent } from './layouts/dashboard-layout-agregar-evaluacion/dashboard-layout-agregar-evaluacion.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
  },
  {
    path: 'agregar-evaluacion',
    component: DashboardLayoutAgregarEvaluacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
