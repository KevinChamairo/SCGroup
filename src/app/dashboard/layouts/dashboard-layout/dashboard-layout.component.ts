import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {
  private authService = inject( AuthService );

  public scgroup =
  {
    "solicitud": [
                  {
                    "idsolicitud": "4",
                    "fecha_solicitud": "2023-07-18",
                    "solicitud": "Solicitan arrendamiento de una bomba para riego de 210 manzanas de tierra.",
                    "fecha_creacion": "2023-07-18 04:18:41",
                    "afectado":"Juan Salcedo",

                    "proceso": [
                        {
                            "idevaluacion": "3",
                            "idsolicitud": "4",
                            "fecha_evaluacion": "2023-07-18",
                            "evaluacion": "En análisis por el comité de CSR.",
                            "fecha_creacion": "2023-07-18 05:18:41"
                        },
                        {
                            "idimplementacion": "2",
                            "idsolicitud": "4",
                            "fecha_implementacion": "2023-07-18",
                            "implementacion": "Se implemento arrendamiento de una bomba para riego ",
                            "fecha_creacion": "2023-07-18 06:18:41"
                        }
                    ]
                  },
                  {
                    "idsolicitud": "3",
                    "fecha_solicitud": "2023-07-17",
                    "solicitud": "Solicitud corresponde a rótulos de identificación de la aldea y señalización de cruce para las aldeas San Benito la Bomba y Las Animas. Así, como rótulos de ornato ( No tirar basura).",
                    "fecha_creacion": "2023-07-17 03:18:41",
                    "afectado":"Sandra Billar",
                    "proceso": [
                        {
                            "idevaluacion": "4",
                            "idsolicitud": "3",
                            "fecha_evaluacion": "2023-07-18",
                            "solicitud_evaluacion": "En análisis por el comité de Relaciones Comunitarias.",
                            "fecha_creacion": "2023-07-18 04:18:41"
                        },
                        {
                            "idimplementacion": "3",
                            "idsolicitud": "3",
                            "fecha_implementacion": "2023-07-18",
                            "implementacion": "Se implemento ótulos de identificación de la aldea y señalización de cruce ",
                            "fecha_creacion": "2023-07-18 05:18:41"
                        }
                    ]
                  },
                  {
                    "idsolicitud": "2",
                    "fecha_solicitud": "2023-07-13",
                    "solicitud": "Solicita un plan o respuesta como solucionar la excesiva velocidad de los vehículos de la empresa, proveedores y transporte particular de sus empleados.",
                    "fecha_creacion": "2023-07-13 04:18:41",
                    "afectado":"Cameron Diaz",
                    "proceso": [
                        {
                            "idevaluacion": "1",
                            "idsolicitud": "2",
                            "fecha_evaluacion": "2023-07-13",
                            "evaluacion": "En evaluación por el comité de análisis de CSR.",
                            "fecha_creacion": "2023-07-13 05:18:41"
                        },
                        {
                            "idevaluacion": "2",
                            "idsolicitud": "2",
                            "fecha_evaluacion": "2023-07-13",
                            "evaluacion": "El Sr. Juan Perez solicita se le presente un plan de cómo estamos verificando y sensibilizando al personal tanto de la empresa como de los contratistas para que respeten los límites de velocidad y respeten la presencia de población en la vía",
                            "fecha_creacion": "2023-07-13 06:18:41"
                        },
                        {
                            "idimplementacion": "1",
                            "idsolicitud": "2",
                            "fecha_implementacion": "2023-07-13",
                            "implementacion": "Se implemento un plan o respuesta como solucionar la excesiva velocidad de los vehículos de la empresa",
                            "fecha_creacion": "2023-07-13 07:18:41"
                        }
                    ]
                }
      ]
  }

  //Trabajamos con FormGroup
  public registrosolicitudesFG: FormGroup = new FormGroup({});

  constructor(private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {

    console.warn(this.scgroup);
    this.registrosolicitudesFG = this.setFormValue();
  }

  setFormValue(): any{
    return this.fb.group({
      afectado: ['', Validators.required],
      nro_solicitud: ['', Validators.required],
      fecha_solicitud: ['', Validators.required],
      solicitud: ['', Validators.required],
      cuenta_creacion: ['', Validators.required],
    });
  }

  aniadirSolicitudes(): void{
    let objetoSolicitudes = {
      idsolicitud: this.registrosolicitudesFG.value.nro_solicitud,
      afectado: this.registrosolicitudesFG.value.afectado,
      fecha_solicitud: this.registrosolicitudesFG.value.fecha_solicitud,
      solicitud: this.registrosolicitudesFG.value.solicitud,
      fecha_creacion: this.registrosolicitudesFG.value.cuenta_creacion,
      proceso: []  // Agrega una matriz vacía de procesos si no tienes datos de proceso en este momento
    };

    console.log(objetoSolicitudes);

    this.scgroup.solicitud.push({ ...objetoSolicitudes});

  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  eliminarSolicitud(idsolicitud: string) {
    const index = this.scgroup.solicitud.findIndex(item => item.idsolicitud === idsolicitud);

    if (index !== -1) {
      this.scgroup.solicitud.splice(index, 1);
    }
    console.warn('Se eliminò y quedò: ',this.scgroup.solicitud);

  }

  public navigationExtras: NavigationExtras = {
    state: {
      value: null,
    },
  };

  agregarEvaluacion( obj: any) {
    this.navigationExtras.state!["value"] = obj;
    console.log(this.navigationExtras.state!["value"])
    localStorage.setItem('solicitud', JSON.stringify(obj));
    console.log('Agregando evaluacion exitosamente...');
    this.router.navigate(['dashboard/agregar-evaluacion'],
    this.navigationExtras
    );
  }

}
