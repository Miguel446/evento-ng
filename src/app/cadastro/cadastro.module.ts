import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';

import { ParticipanteFormComponent } from './participante/form/participante-form.component';
import { ParticipanteListarComponent } from './participante/listar/participante-listar.component';
import { FormaPagamentoFormComponent } from './forma-pagamento/form/forma-pagamento-form.component';
import { FormaPagamentoListarComponent } from './forma-pagamento/listar/forma-pagamento-listar.component';
import { EventoListarComponent } from './evento/listar/evento-listar.component';
import { EventoFormComponent } from './evento/form/evento-form.component';
import { EmpresaListarComponent } from './empresa/listar/empresa-listar.component';
import { EmpresaFormComponent } from './empresa/form/empresa-form.component';

@NgModule({
  declarations: [
    ParticipanteFormComponent,
    ParticipanteListarComponent,
    FormaPagamentoFormComponent,
    FormaPagamentoListarComponent,
    EventoListarComponent,
    EventoFormComponent,
    EmpresaListarComponent,
    EmpresaFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatDividerModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatBadgeModule,
    MatTableModule,
    MatInputModule
  ]
})
export class CadastroModule { }
