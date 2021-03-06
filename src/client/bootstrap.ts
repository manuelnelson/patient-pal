const styles = require('./styles/site.scss');

import './helpers/string-extensions';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import {enableProdMode} from '@angular/core';

if(process.env.NODE_ENV == 'production'){
    enableProdMode();    
}
platformBrowserDynamic().bootstrapModule(AppModule);
