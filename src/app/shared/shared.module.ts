import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { ConfirmarDialog } from '../shared/dialogs/remover.dialog';
import { DataPipe } from './pipes/data.pipe';

@NgModule({
    declarations: [
        ConfirmarDialog,
        DataPipe,
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule
    ],
    exports: [
        DataPipe,
    ],
    providers: [
    ],
    entryComponents: [
        ConfirmarDialog
    ]
})
export class SharedModule { }
