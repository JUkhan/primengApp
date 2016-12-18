import { Component } from '@angular/core';
import {MenuItem} from 'primeng/primeng';
@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    private items: MenuItem[];
    private msgs: any[] = [{ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' }];
    private growlMsgs: any[] = [{ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' }];
    blockedDocument: boolean = false;
    /*
    success
    info
    warn
    error
     */
    ngOnInit() {
        this.items = [
            { label: 'Stats', icon: 'fa-bar-chart' },
            { label: 'Calendar', icon: 'fa-calendar' },
            { label: 'Documentation', icon: 'fa-book' },
            { label: 'Support', icon: 'fa-support' },
            { label: 'Social', icon: 'fa-twitter' }
        ];
    }
 }
