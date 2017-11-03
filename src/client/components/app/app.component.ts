import { Component } from '@angular/core';
import { AppState} from '../../models';
import { DataObserver, data } from 'statex/angular';
import { Stores } from '../../stores';
@Component({
    selector: 'app-component',
    template: require('./app.component.html')
})
export class AppComponent extends DataObserver {
    constructor(public stores: Stores) {
        super()
      }
    
      ngOnInit() {
        // overridden ngOnInit - empty on purpose
        // this proves that DataObserver.ngOnInit is called even if ngOnInit is overridden
      }
}
