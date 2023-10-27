import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://159.65.96.86:8080/services/auth/signin';

  constructor(private http: HttpClient) { }

  headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
  };

  login(username: string, password: string): Observable<any> {
    // Construye el objeto JSON que se enviará en la solicitud POST
    const body = {
      username: username,
      password: password
    };

    // Establece las cabeceras para la solicitud POST (puedes ajustarlas según las necesidades)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Realiza la solicitud POST a la API de autenticación
    return this.http.post(this.apiUrl, body, { headers: headers });
  }

  isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('accessToken');
    return !!accessToken; // Devuelve true si accessToken no es nulo o indefinido, indicando que el usuario está autenticado.
  }

  logout() {
    localStorage.removeItem('tokenType');
    localStorage.removeItem('accessToken');
  }
}
