
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { AppConstant } from '../shared/model/app-constant';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const modifiedRequest = request.clone({
      url: AppConstant.CORS_ANYWHERE + `${request.url}`
    });
    return next.handle(modifiedRequest);
  }
}
