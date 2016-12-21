import { NgModule}      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { CommonModule, APP_BASE_HREF, LocationStrategy, HashLocationStrategy }        from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';
import {  RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';
import { HomeComponent } from './home/home.component';
import {AwaitListComponent} from './home/awaitList';
import {MapComponent} from './MapComponent/MapComponent';
import {Word} from './MapComponent/Word';
import {SharedModule} from './Shared/shared.module';
import {InputTextModule} from 'primeng/primeng';

import {routing} from './app.routes';


@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        HttpModule,
        RouterModule,
        routing, SharedModule.forRoot()    
    ],
    declarations: [AppComponent, HomeComponent, AwaitListComponent, MapComponent, Word],
    bootstrap: [AppComponent],
    //providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppModule { }
