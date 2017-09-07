import {ActivatedRouteSnapshot, RouteReuseStrategy, DetachedRouteHandle} from '@angular/router';
import * as _ from 'lodash';

export class CustomRouteReuseStrategy extends RouteReuseStrategy {
  private reloadComponents: string[] = ['CurriculumsComponent'];
  //check if we should 
  shouldDetach(route: ActivatedRouteSnapshot): boolean { return false;}
  store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {  }
  shouldAttach(route: ActivatedRouteSnapshot): boolean {return false; }
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle|null { return null}
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {  
    if(this.shouldReload(future) && (future.routeConfig === curr.routeConfig)){
      return false;
    }
      
    return future.routeConfig === curr.routeConfig;
  }
  // shouldAttachByData(route: ActivatedRouteSnapshot){
  //   if(!route.data || !Object.keys(route.data).length) return false;
  //   return _.intersection(Object.keys(route.data), this.reloadData).length > 0; 
  // }
  shouldReload(route: ActivatedRouteSnapshot){
    if(!route.component) return false;
    return ((route.component as any).name && this.reloadComponents.indexOf((route.component as any).name) > -1)
  }
}