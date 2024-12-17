import { HttpMethod } from '#shared/enums/http';
import type { ApiRequest } from '../types/index.ts';

export class ApiRequestBuilder {
  private endpoint = '/';
  private method: HttpMethod = HttpMethod.Get;
  private headers: Record<string, string> = {};
  private body?: BodyInit;
  private abortController?: AbortController;

  setEndpoint(endpoint: string): this {
    this.endpoint = endpoint;
    return this;
  }

  setMethod(method: HttpMethod): this {
    this.method = method;
    return this;
  }

  setHeaders(headers: Record<string, string>): this {
    this.headers = Object.assign(this.headers, headers);
    return this;
  }

  setAuthHeader(token: string | null): this {
    if (!token) return this;
    this.setHeaders({
      Authorization: `Bearer ${token}`
    });
    return this;
  }

  setJsonBody(body: unknown): this {
    this.setHeaders({ 'Content-Type': 'application/json' });
    this.body = JSON.stringify(body);
    return this;
  }

  setAbortController(abortController: AbortController): this {
    this.abortController = abortController;
    return this;
  }

  build(): ApiRequest {
    return {
      endpoint: this.endpoint,
      parameters: {
        method: this.method,
        headers: this.headers,
        body: this.body,
        signal: this.abortController?.signal
      },
      control: {
        abortController: this.abortController
      }
    };
  }
}
