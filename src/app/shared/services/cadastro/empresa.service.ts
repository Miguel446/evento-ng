import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '../../../../environments/environment';

import { Empresa } from '../../models/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  // TODO adicionar headers jwt
  private readonly PATH: string = '/empresas';

  constructor(private http: HttpClient) { }

  cadastrar(empresa: Empresa): Observable<any> {
    return this.http.post(env.baseUrl + this.PATH, empresa);
  }

  buscar(id: number): Observable<any> {
    return this.http.get(env.baseUrl + this.PATH + '/' + id);
  }

  listar(): Observable<any> {
    return this.http.get(env.baseUrl + this.PATH);
  }

  remover(id: number): Observable<any> {
    return this.http.delete(env.baseUrl + this.PATH + '/' + id);
  }
}
