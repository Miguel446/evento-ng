import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParticipanteFormComponent } from './participante/form/participante-form.component';
import { ParticipanteListarComponent } from './participante/listar/participante-listar.component';
import { FormaPagamentoFormComponent } from './forma-pagamento/form/forma-pagamento-form.component';
import { FormaPagamentoListarComponent } from './forma-pagamento/listar/forma-pagamento-listar.component';
import { EventoFormComponent } from './evento/form/evento-form.component';
import { EventoListarComponent } from './evento/listar/evento-listar.component';
import { EmpresaFormComponent } from './empresa/form/empresa-form.component';
import { EmpresaListarComponent } from './empresa/listar/empresa-listar.component';
import { CategoriaFormComponent } from './categoria/form/categoria-form.component';
import { CategoriaListarComponent } from './categoria/listar/categoria-listar.component';

export const routes: Routes = [
    {
        path: 'cadastro/participante',
        component: ParticipanteListarComponent,
    },
    {
        path: 'cadastro/participante/form',
        component: ParticipanteFormComponent,
    },
    {
        path: 'cadastro/forma-pagamento',
        component: FormaPagamentoListarComponent,
    },
    {
        path: 'cadastro/forma-pagamento/form',
        component: FormaPagamentoFormComponent,
    },
    {
        path: 'cadastro/evento',
        component: EventoListarComponent,
    },
    {
        path: 'cadastro/evento/form',
        component: EventoFormComponent,
    },
    {
        path: 'cadastro/empresa',
        component: EmpresaListarComponent,
    },
    {
        path: 'cadastro/empresa/form',
        component: EmpresaFormComponent,
    },
    {
        path: 'cadastro/empresa/form/:id',
        component: EmpresaFormComponent
    },
    {
        path: 'cadastro/categoria',
        component: CategoriaListarComponent,
    },
    {
        path: 'cadastro/categoria/form',
        component: CategoriaFormComponent,
    },
    {
        path: 'cadastro/categoria/form/:id',
        component: CategoriaFormComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CadastroRoutingModule { }