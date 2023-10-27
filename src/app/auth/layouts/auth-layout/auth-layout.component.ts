import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent {
  public sidebarItems = [
    { label: 'Ingresar', icon: 'login', url: './login-in'},
  ]
}
