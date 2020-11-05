import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '../../../../environments/environment';

import { Inscricao } from '../../models/inscricao';

@Injectable({
  providedIn: 'root'
})
export class InscricaoServiceService {

  private readonly PATH: string = '/participantes';

  constructor(private http: HttpClient) { }

  cadastrar(inscricao: Inscricao): Observable<any> {
    return this.http.post(env.baseUrl + this.PATH, inscricao);
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
