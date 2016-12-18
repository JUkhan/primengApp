import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule }         from '@angular/common';
import { FormsModule }          from '@angular/forms';
import { RouterModule }         from '@angular/router';
import { COMPILER_PROVIDERS }   from '@angular/compiler';
import {AppService} from './app.service';

import {ButtonModule} from 'primeng/primeng';
import {SplitButtonModule} from 'primeng/primeng';
import {TabMenuModule} from 'primeng/primeng';
import {MessagesModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {CheckboxModule} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {ListboxModule} from 'primeng/primeng';
import {SpinnerModule} from 'primeng/primeng';
import {RadioButtonModule} from 'primeng/primeng';
import {DataTableModule, SharedModule as pSharedModule} from 'primeng/primeng';
import {TabViewModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {FileUploadModule} from 'primeng/primeng';
import {TooltipModule} from 'primeng/primeng';
import {BlockUIModule} from 'primeng/primeng';

const PRIMENG = [
    InputTextModule,
    ButtonModule,
    SplitButtonModule,
    TabMenuModule,
    MessagesModule,
    GrowlModule,
    DropdownModule,
    CalendarModule,
    CheckboxModule,
    InputTextareaModule,
    ListboxModule,
    SpinnerModule,
    RadioButtonModule,
    DataTableModule,
    pSharedModule,
    TabViewModule,
    DialogModule,
    FileUploadModule,
    TooltipModule,
    BlockUIModule
];

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule, ...PRIMENG],
    declarations: [       
    ],
    exports: [
        CommonModule,
        FormsModule,
        ...PRIMENG
    ],
    providers: [COMPILER_PROVIDERS]
})
export class SharedModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [AppService]
        };
    }
}



