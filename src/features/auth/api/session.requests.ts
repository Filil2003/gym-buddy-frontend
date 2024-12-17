import { HttpMethod } from '#shared/enums/http';
import { type ApiRequest, ApiRequestBuilder } from '#shared/lib/api-client';
import type { AuthCredentials } from '../types.ts';

export const register = (credentials: AuthCredentials): ApiRequest =>
  new ApiRequestBuilder()
    .setMethod(HttpMethod.Post)
    .setEndpoint('/auth/register')
    .setJsonBody(credentials)
    .setAbortController(new AbortController())
    .build();

export const signIn = (credentials: AuthCredentials): ApiRequest =>
  new ApiRequestBuilder()
    .setMethod(HttpMethod.Post)
    .setEndpoint('/auth/sign-in')
    .setJsonBody(credentials)
    .setAbortController(new AbortController())
    .build();
