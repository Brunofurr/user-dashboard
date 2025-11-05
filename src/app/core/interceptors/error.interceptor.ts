import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { HttpStatus } from "../enums/http-status.enum";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ocorreu um erro desconhecido';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Erro: ${error.error.message}`;
      } else {
        errorMessage = handleServerError(error);
      }

      return throwError(() => new Error(errorMessage));
    })
  );
}

function handleServerError(error: HttpErrorResponse): string {
  switch (error.status) {
    case HttpStatus.BAD_REQUEST:
      return 'Requisição inválida. Verifique os dados enviados.';
    case HttpStatus.UNAUTHORIZED:
      return 'Não autorizado. Faça login novamente.';
    case HttpStatus.FORBIDDEN:
      return 'Acesso negado.';
    case HttpStatus.NOT_FOUND:
      return 'Recurso não encontrado.';
    case HttpStatus.INTERNAL_SERVER_ERROR:
      return 'Erro no servidor. Tente novamente mais tarde.';
    case HttpStatus.SERVICE_UNAVAILABLE:
      return 'Serviço temporariamente indisponível.';
    default:
      return `Erro ${error.status}: ${error.message}`;
  }
}

