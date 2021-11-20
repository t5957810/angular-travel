
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import * as AppConstant from '../shared/model/app-constant';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  appConstant = AppConstant;
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const modifiedRequest = request.clone({
      url: this.appConstant.Common.CORS_ANYWHERE + `${request.url}`
    });
    return next.handle(modifiedRequest);
  }
}
