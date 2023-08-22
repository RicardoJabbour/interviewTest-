import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable,Injector } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(
    private injector: Injector,
    private loaderService:LoaderService,
    ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();

    let tokenizedReq
    if (req.params.has('setToken')){
      tokenizedReq = req.clone({
        setHeaders:{
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
    }else {
      tokenizedReq = req.clone({});
    }

    return next.handle(tokenizedReq).pipe(
      finalize(() => {
        this.loaderService.hide();
      })
    );
  }
}
