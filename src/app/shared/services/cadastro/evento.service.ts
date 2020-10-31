import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '../../../../environments/environment';

import { Evento } from '../../models/evento.model';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  // TODO adicionar headers jwt
  private readonly PATH: string = '/eventos';

  constructor(private http: HttpClient) { }

  cadastrar(evento: Evento): Observable<any> {
    return this.http.post(env.baseUrl + this.PATH, evento);
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
