import { Observable } from 'rxjs';
import { SharedService } from './../../services/shared.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";

import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    
    shared: SharedService;

    constructor()
    {
        this.shared = SharedService.getInstance();
    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let authRequest: any;

        if (this.shared.isLoggedIn()){
            authRequest = req.clone({
                setHeaders: {
                    'Authorization' : this.shared.token.toString()
                }
            });
            return next.handle(authRequest);
        }else        {
            return next.handle(req);
        }
    }

}