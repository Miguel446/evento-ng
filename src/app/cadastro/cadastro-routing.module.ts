import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroComponent } from './cadastro.component';
import { ClienteFormComponent } from './cliente/form/cliente-form.component';
import { ClienteListarComponent } from './cliente/listar/cliente-listar.component';
import { FormaPagamentoFormComponent } from './forma-pagamento/form/forma-pagamento-form.component';
import { FormaPagamentoListarComponent } from './forma-pagamento/listar/forma-pagamento-listar.component';

export const routes: Routes = [
    {
        path: 'cadastro/cliente',
        component: ClienteListarComponent,
    },
    {
        path: 'cadastro/forma-pagamento',
        component: FormaPagamentoListarComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CadastroRoutingModule { }