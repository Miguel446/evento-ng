import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  private readonly PATH: string = 'http://viacep.com.br/ws/${cep}/json/';

  constructor(private http: HttpClient) { }

  buscar(cep: string): Observable<any> {
    return this.http.get(this.PATH.replace("${cep}", cep));
  }
}
