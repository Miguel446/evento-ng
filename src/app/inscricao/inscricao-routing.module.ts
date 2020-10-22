import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscricaoFormComponent } from './form/inscricao-form.component';

export const routes: Routes = [
    {
        path: 'inscricao/form',
        component: InscricaoFormComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InscricaoRoutingModule { }