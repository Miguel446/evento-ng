import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '../../../../environments/environment';

import { Participante } from '../../models/participante.model';

@Injectable({
  providedIn: 'root'
})
export class ParticipanteService {

  // TODO adicionar headers jwt
  private readonly PATH: string = '/participantes';

  constructor(private http: HttpClient) { }

  cadastrar(participante: Participante): Observable<any> {
    console.log(participante.empresa.id);
    console.log(participante.categoria.id);
    return this.http.post(env.baseUrl + this.PATH, participante);
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
