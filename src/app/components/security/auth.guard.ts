import { Observable } from 'rxjs';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { SharedService } from '../../services/shared.service';

@Injectable()
export class AuthGuard implements CanActivate
{
    shared: SharedService;

    constructor(private router: Router)
    {
        this.shared = SharedService.getInstance();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        
        if (this.shared.isLoggedIn()){
            return true;
        }
        else{
            this.router.navigate(['/login']);
            return false;
        }
    }    
}