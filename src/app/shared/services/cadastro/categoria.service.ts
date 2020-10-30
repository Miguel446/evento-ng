import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '../../../../environments/environment';

import { Categoria } from '../../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  // TODO adicionar headers jwt
  private readonly PATH: string = '/categorias';

  constructor(private http: HttpClient) { }

  cadastrar(categoria: Categoria): Observable<any> {
    return this.http.post(env.baseUrl + this.PATH, categoria);
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
