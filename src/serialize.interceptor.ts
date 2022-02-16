import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

// where NestInterceptor<T, R>, T is stream of response, R is stream of value
@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    console.log('app interceptor');
    // handle returns stream..
    return next
      .handle()
      //.pipe(map(value => JSON.stringify(value).split(/(?=[A-Z])/).join('_').toLowerCase()));
      .pipe(map(value => camelToSnake(value)));
  }
}

export function camelToSnake(value: any) {
  if (Array.isArray(value)) {
    return value.map(camelToSnake);
  }

  if (typeof value === 'object') {
    return Object.fromEntries(
        Object.entries(value).map(([key, value]) => 
          [key.split(/(?=[A-Z])/).join('_').toLowerCase(), camelToSnake(value)])
    );
  }
  return value;
}

function recursivelyStripNullValues(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(recursivelyStripNullValues);
  }
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, value]) => [key, recursivelyStripNullValues(value)])
    );
  }
  if (value !== null) {
    return value;
  }
}
