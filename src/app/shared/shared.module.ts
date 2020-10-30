import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { ConfirmarDialog } from '../shared/dialogs/remover.dialog';

@NgModule({
    declarations: [
        ConfirmarDialog
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule
    ],
    exports: [
    ],
    providers: [
    ],
    entryComponents: [
        ConfirmarDialog
    ]
})
export class SharedModule { }
