import { getSessionToken } from '#entities/session';
import { HttpMethod } from '#shared/enums/http';
import { type ApiRequest, ApiRequestBuilder } from '#shared/lib/api-client';
import type { CreateWorkoutData } from '../model/types.ts';

export const getAll = (): ApiRequest =>
  new ApiRequestBuilder()
    .setEndpoint('/api/workout-sessions')
    .setMethod(HttpMethod.Get)
    .setAuthHeader(getSessionToken())
    .setAbortController(new AbortController())
    .build();

export const getOne = (id: string): ApiRequest =>
  new ApiRequestBuilder()
    .setEndpoint(`/api/workout-sessions/${id}`)
    .setMethod(HttpMethod.Get)
    .setAuthHeader(getSessionToken())
    .setAbortController(new AbortController())
    .build();

export const create = (workout: CreateWorkoutData): ApiRequest =>
  new ApiRequestBuilder()
    .setEndpoint('/api/workout-sessions')
    .setMethod(HttpMethod.Post)
    .setAuthHeader(getSessionToken())
    .setJsonBody(workout)
    .setAbortController(new AbortController())
    .build();

export const remove = (id: string): ApiRequest =>
  new ApiRequestBuilder()
    .setEndpoint(`/api/workout-sessions/${id}`)
    .setMethod(HttpMethod.Delete)
    .setAuthHeader(getSessionToken())
    .setAbortController(new AbortController())
    .build();
