import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class isNotAuthenticatedGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!this.authService.isAuthenticated()) {
      return true; // El usuario no está autenticado, permite el acceso.
    } else {
      // El usuario está autenticado, redirige a la página de inicio.
      this.router.navigate(['/dashboard']);
      return false;
    }
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean
    {
    console.log(this.canActivate(next, state));
    return this.canActivate(next, state); // Reutiliza la lógica de canActivate para rutas hijas.
    }
}
