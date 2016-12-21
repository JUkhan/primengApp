import {Component, OnInit, OnDestroy} from '@angular/core';
import {AppService} from '../Shared/app.service';
@Component({
    moduleId: module.id,
    selector: 'await',
    template: `
<p-dataTable [value]="list">
    <header>Await List</header>
    <p-column field="ocr_content" header="Content"></p-column>
    <p-column header="Action" >
         <template let-row="rowData" pTemplate="body">
            <button type="button" pButton (click)="selectRow(row)"  label="Map"></button>
         </template>    
    </p-column>
    
</p-dataTable>
<map-component [text]="map.ocr_content" (onSave)="save($event)"></map-component>
    `
})
export class AwaitListComponent {
    list: any[] = [{ ocr_content:'Content1', id:1}];
    map: any = {};
    constructor(private service: AppService) {
        this.loadData();
    }
    private selectRow(row) {
        this.map = row;
    }

    private loadData() {
        this.service.get('OCR/GetAwaitList').subscribe(res => this.list = res);
    }
    private save(data) {
        this.service.post('OCR/SaveAwait', { id: this.map.id, ocr_map: data })
            .subscribe(res => {
                console.log(res);
            });
    }
}