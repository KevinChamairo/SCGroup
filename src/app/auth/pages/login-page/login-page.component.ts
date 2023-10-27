import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../service/auth.service';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  private fb = inject( FormBuilder );
  public username: string = '';
  public password: string = '';
  public usuarios: Array<any> = [];

  //Trabajamos con FormGroup
  public myForm: FormGroup = new FormGroup({});

  constructor(private AuthService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.myForm = this.setFormValue();
  }

  setFormValue(): any{
    return this.fb.group({
      username:    ['', [ Validators.email, Validators.required ]],
      password: ['', [ Validators.required, Validators.minLength(6) ]],
    });
  }

  onLogin(username: string, password: string): void {
    this.AuthService.login(this.myForm.value.username, this.myForm.value.password).subscribe(
      (response) => {
        // Maneja la respuesta de la API aquí
        const accessToken = response.accessToken;
        const tokenType = response.tokenType;
        // Almacena el token en localStorage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('tokenType', tokenType);
        // Maneja la respuesta de la API aquí, por ejemplo, almacena el token en localStorage o realiza acciones adicionales de autenticación.
        console.log(accessToken);
        console.log(tokenType);
        // Redirige al usuario a la ruta /dashboard
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        // Maneja cualquier error que pueda ocurrir durante la solicitud.
        console.error('Error en la solicitud de inicio de sesión', error);
        // Muestra una notificación Swal con el mensaje de error
        Swal.fire({
        icon: 'error',
        title: 'Error en inicio de sesión',
        text: 'Ocurrió un error durante el inicio de sesión. Por favor, verifica tus credenciales e intenta nuevamente.',
      });
      }
    );
  }
}
