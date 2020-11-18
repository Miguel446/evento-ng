import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '../../../../environments/environment';

import { Inscricao } from '../../models/inscricao.model';

@Injectable({
  providedIn: 'root'
})
export class InscricaoService {

  private readonly PATH: string = '/inscricoes';

  constructor(private http: HttpClient) { }

  cadastrar(inscricao: Inscricao): Observable<any> {
    return this.http.post(env.baseUrl + this.PATH, inscricao);
  }

  buscar(id: number): Observable<any> {
    return this.http.get(env.baseUrl + this.PATH + '/' + id);
  }

  consultar(eventoId: any, cpf: string, nome: string, pagina: number, totalLinhas: number): Observable<any> {
    const params = 'eventoId=' + eventoId + '&cpf=' + cpf + '&nome=' + nome + '&pagina=' + pagina + '&totalLinhas=' + totalLinhas;
    return this.http.get(env.baseUrl + this.PATH + '/paginacao' + '?' + params);
  }

  listar(): Observable<any> {
    return this.http.get(env.baseUrl + this.PATH);
  }

  remover(id: number): Observable<any> {
    return this.http.delete(env.baseUrl + this.PATH + '/' + id);
  }

  gerarCracha(nome: string): Observable<any> {
    return this.http.get(env.baseUrl + this.PATH + '/encurtaNome/' + nome);
  }

  upload(planilha: FormData, categoriaId: number, empresaId: number) {
    return this.http.post(env.baseUrl + this.PATH + '/planilha' + '?categoriaId=' + categoriaId + '&empresaId=' + empresaId, planilha);
  }
}
