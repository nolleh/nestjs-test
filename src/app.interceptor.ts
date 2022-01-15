import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

// where NestInterceptor<T, R>, T is stream of response, R is stream of value
@Injectable()
export class AppInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    console.log('app interceptor');
    // handle returns stream..
    return next
      .handle()
      //.pipe(map(value => JSON.stringify(value).split(/(?=[A-Z])/).join('_').toLowerCase()));
      .pipe(map(value => camelToSnake(value)));
  }
}

function camelToSnake(value: any) {
  return Object.fromEntries(
      Object.entries(value).map(([key, value]) => [key.split(/(?=[A-Z])/).join('_').toLowerCase(), value])
  );
}
