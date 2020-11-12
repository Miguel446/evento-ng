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

  carregar(data: any, form: any) {
    form.get('cep').setValue(data.cep);
    form.get('endereco').setValue(data.logradouro);
    form.get('bairro').setValue(data.bairro);
    form.get('cidade').setValue(data.localidade);
    form.get('estado').setValue(data.uf);
  }

  limpar(form: any) {
    form.get('endereco').setValue('');
    form.get('bairro').setValue('');
    form.get('cidade').setValue('');
    form.get('estado').setValue('');
  }

}
