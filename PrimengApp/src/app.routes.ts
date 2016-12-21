import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AwaitListComponent} from './home/awaitList';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent }, 
    { path: 'await', component: AwaitListComponent },  
    { path: 'setting', loadChildren: 'app/setting/setting.module' }
];

export const routing = RouterModule.forRoot(routes);