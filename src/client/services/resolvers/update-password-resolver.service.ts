import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, TargetTypeService, UserService } from '../../services';
import { User } from '../../models';
@Injectable()
export class UpdatePasswordResolver implements Resolve<User> { 
    constructor(private targetTypeService: TargetTypeService, private router: Router, private authService: AuthenticationService, private userService: UserService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<User> {
        console.log(route.queryParams);
        let query = `email=${route.queryParams.email}&resetPasswordToken=${route.queryParams.token}`;
        //retrieve the first
        return this.userService.list(query).map(users => users != null && users.length > 0 ? users[0] : null).toPromise();
    }
}
