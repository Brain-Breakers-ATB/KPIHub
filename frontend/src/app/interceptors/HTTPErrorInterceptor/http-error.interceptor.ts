import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, delay, mergeMap, retry, throwError} from 'rxjs';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((err: HttpErrorResponse) => {
        switch(err.status){
          case 400:
            console.error("Bad Request");
            break;
          case 404:
            console.error("URL Not Found");
            break;
          case 408:
            console.error("Request Timeout");
            break;
          case 500:
            console.error("Internal Server Error");
            break;
          case 504:
            console.error("Service Unvailabe")
            break;
        }
        return throwError(()=> err);
      })
    );
  }
}
