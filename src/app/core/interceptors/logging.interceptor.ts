import { HttpInterceptorFn } from '@angular/common/http';
import { tap, finalize } from 'rxjs';
import { environment } from '../../../environments/environments';


export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  if (!environment.enableLogging) {
    return next(req);
  }

  const startTime = Date.now();

  console.log(`[HTTP Request] ${req.method} ${req.url}`, {
    headers: req.headers,
    body: req.body,
  });

  return next(req).pipe(
    tap({
      next: (event) => {
        console.log(`[HTTP Response] ${req.method} ${req.url}`, event);
      },
      error: (error) => {
        console.error(`[HTTP Error] ${req.method} ${req.url}`, error);
      },
    }),
    finalize(() => {
      const duration = Date.now() - startTime;
      console.log(`[HTTP Completed] ${req.method} ${req.url} - ${duration}ms`);
    })
  );
};
