import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators'
// import {catchError, map} from 'rxjs'

import { LoadingService } from './loading.service';

/**
 * This class is for intercepting http requests. When a request starts, we set the loadingSub property
 * in the LoadingService to true. Once the request completes and we have a response, set the loadingSub
 * property to false. If an error occurs while servicing the request, set the loadingSub property to false.
 * @class {HttpRequestInterceptor}
 */
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private _loading: LoadingService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loading.setLoading(true, request.url);
    return next.handle(request)
      .pipe(
        
        
        catchError(err => {
            if(err instanceof HttpErrorResponse) {
                // handle http errors here, maybe retry, update headers, etc..
                // return of({success: false});
                this._loading.setLoading(false, request.url);
                console.log(err);
                // return err;
            }
            // this error is unexpected, we don't know what to do
            // let the app interceptor handle it, but upstream observables
            // won't know what to do either. Our app has crashed...
            // You can return success false, but why handle this error?
            return throwError(err);
        })
        
        // catchError((err: HttpErrorResponse) => {
        // this._loading.setLoading(false, request.url);
        // return err;
        // })
      )
      .pipe(map<HttpEvent<any>, any>((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this._loading.setLoading(false, request.url);
        }
        return event;
      }));
  }
}