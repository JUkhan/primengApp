import {Component, OnInit, OnDestroy} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-home',   
    template: `
    <p-fileUpload name="file" url="OCR/uploadFile" (onUpload)="uploadComplete($event)"
              accept="image/*" maxFileSize="2000000">

    </p-fileUpload>
    <textarea [(ngModel)]="res.text" [autoResize]="true"  pInputTextarea></textarea>
    <textarea [(ngModel)]="res.error" [autoResize]="true"  pInputTextarea></textarea>
`
})
export class HomeComponent  {
    res: any = {text:'', error:''};
    uploadComplete(res) {
        this.res = JSON.parse(res.xhr.response);
       
    }
}

