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
                    'Authorization' : 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBoZWxwZGVzay5jb20iLCJjcmVhdGVkIjoxNTMyOTk2MDgzMDUxLCJleHAiOjE1MzM2MDA4ODN9.yDZrrUb5D5Jc0dgeFJh0sNIrggREZrW5CtpijK5ah8kvh2c6rRxxPXFgkp0cTaCqMZqStNwzBWG2fWW6HZiisA'//this.shared.token.toString()
               }
            });           
            return next.handle(authRequest);
        }else        {
            return next.handle(req);
        }
    }

}