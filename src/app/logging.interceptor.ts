import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      headers: req.headers.set('Custom-Header', 'MyCustomHeaderValue'),
    });

    console.log('Request:', clonedRequest); //Log the request

    return next.handle(clonedRequest).pipe(
      tap((event: any) => {
        if (event instanceof HttpResponse) {
          console.log('Response:', event); //Log the response
        }
      })
    );
  }
}
