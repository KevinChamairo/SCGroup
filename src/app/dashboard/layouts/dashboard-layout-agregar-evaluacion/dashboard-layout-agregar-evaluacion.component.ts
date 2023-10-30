import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout-agregar-evaluacion',
  templateUrl: './dashboard-layout-agregar-evaluacion.component.html',
  styleUrls: ['./dashboard-layout-agregar-evaluacion.component.css']
})
export class DashboardLayoutAgregarEvaluacionComponent implements OnInit  {

  public data102: any;
  public data103: any;
  public data103arrEvaluaciones: any[] = [];

  //Trabajamos con FormGroup
  public registroevaluacionesFG: FormGroup = new FormGroup({});

  constructor(private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.data102 = localStorage.getItem("solicitud")
    this.data103 = JSON.parse(this.data102);
    console.warn(this.data103);
    this.data103arrEvaluaciones = this.data103.proceso

    this.registroevaluacionesFG = this.setFormValue()
  }

  setFormValue(): any{
    return this.fb.group({
      evaluacion: ['', Validators.required],
      fecha_creacion: ['', Validators.required],
      fecha_evaluacion: ['', Validators.required],
      nro_evaluacion: ['', Validators.required]
    });
  }

  aniadirEvaluaciones(): void{
    let objEvaluaciones = {
      evaluacion: this.registroevaluacionesFG.value.evaluacion,
      fecha_creacion: this.registroevaluacionesFG.value.fecha_creacion,
      fecha_evaluacion: this.registroevaluacionesFG.value.fecha_evaluacion,
      idsolicitud: this.data103.idsolicitud,
      idevaluacion: this.registroevaluacionesFG.value.nro_evaluacion
    };

    console.log(objEvaluaciones);

    this.data103.proceso.push({ ...objEvaluaciones});

    console.warn(this.data103);
    this.data103arrEvaluaciones = this.data103.proceso
    console.warn(this.data103arrEvaluaciones);

  }


  // onLogout() {
  //   this.authService.logout();
  //   this.router.navigate(['/login']);
  // }

  eliminarEvaluacion(idevaluacion: string) {
    const index = this.data103arrEvaluaciones.findIndex(item => item.idevaluacion === idevaluacion);

    if (index !== -1) {
      this.data103arrEvaluaciones.splice(index, 1);
    }
    console.warn('Se eliminò y quedò: ',this.data103arrEvaluaciones);

  }

  regresar(): void{
    this.router.navigate(['/dashboard']);
  }


}


