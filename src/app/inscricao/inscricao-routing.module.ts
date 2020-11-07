import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscricaoFormComponent } from './form/inscricao-form.component';
import { InscricaoListarComponent } from './listar/inscricao-listar.component';

export const routes: Routes = [
    {
        path: 'inscricao',
        component: InscricaoListarComponent,
    },
    {
        path: 'inscricao/form',
        component: InscricaoFormComponent,
    },
    {
        path: 'inscricao/form/:id',
        component: InscricaoFormComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InscricaoRoutingModule { }