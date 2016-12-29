import {Component, OnInit, OnDestroy} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-home',   
    template: `
    <p-fileUpload name="file" url="OCR/uploadFile" (onUpload)="uploadComplete($event)"
              accept="image/*" maxFileSize="2000000">

    </p-fileUpload>
    Invoice <input type="text" [(ngModel)]="res.invoice" pInputText>
    Total <input type="text" [(ngModel)]="res.total" pInputText>
`
})
export class HomeComponent  {
    res: any = { invoice: '', total: '' };
    words: any[];
    uploadComplete(res) {
        var data= JSON.parse(res.xhr.response);       
        this.words = data.ocr_content.split(/\s+/gm);
        var ocr_map = JSON.parse(data.ocr_map);       
        Object.keys(ocr_map).forEach(key => {           
            this.res[key] = this.getValue(ocr_map[key]);
        });       
    }

    private getValue(arr: any[]) {
        arr = arr.sort((a, b) => a.index - b.index);
        if (arr.length == 0) {
            return '';
        }
        else if (arr.length == 1) {
            return this.words[arr[0].index];
        }
        const item = arr.find(_ => _.ctrlKey);
        if (item) {
            const index = arr.indexOf(item), len = arr.length;
            let find: boolean = false;
            if (index - 1 >= 0) {
                const it = arr[index - 1];
                if (it.text === this.words[it.index]) {
                    find = true;
                }
            }
            if (index + 1 < len) {
                const it = arr[index + 1];
                if (it.text === this.words[it.index]) {
                    find = true;
                }
            }
            if (find) {
                return this.words[item.index];
            }
            if (index - 1 >= 0) {
                const it = this.words.find(_ => _ === arr[index - 1].text);
                if (it) {
                    return this.words[this.words.indexOf(it) + 1];
                }
            }
            if (index + 1 < len) {
                const it = this.words.find(_ => _ === arr[index + 1].text);
                if (it) {
                    return this.words[this.words.indexOf(it) - 1];
                }
            }

        }

    }
}

