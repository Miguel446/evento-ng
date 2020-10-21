import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParticipanteFormComponent } from './participante/form/participante-form.component';
import { ParticipanteListarComponent } from './participante/listar/participante-listar.component';
import { FormaPagamentoFormComponent } from './forma-pagamento/form/forma-pagamento-form.component';
import { FormaPagamentoListarComponent } from './forma-pagamento/listar/forma-pagamento-listar.component';
import { EventoFormComponent } from './evento/form/evento-form.component';
import { EventoListarComponent } from './evento/listar/evento-listar.component';

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
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CadastroRoutingModule { }