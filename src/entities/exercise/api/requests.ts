import { getSessionToken } from '#entities/session';
import { HttpMethod } from '#shared/enums/http';
import { type ApiRequest, ApiRequestBuilder } from '#shared/lib/api-client';
import type { CreateExerciseData, UpdateExerciseData } from '../model/types.ts';

export const getAll = (): ApiRequest =>
  new ApiRequestBuilder()
    .setEndpoint('/exercises')
    .setMethod(HttpMethod.Get)
    .setAuthHeader(getSessionToken())
    .setAbortController(new AbortController())
    .build();

export const getOne = (id: string): ApiRequest =>
  new ApiRequestBuilder()
    .setEndpoint(`/exercises/${id}`)
    .setMethod(HttpMethod.Get)
    .setAuthHeader(getSessionToken())
    .setAbortController(new AbortController())
    .build();

export const create = (exercise: CreateExerciseData): ApiRequest =>
  new ApiRequestBuilder()
    .setEndpoint('/exercises')
    .setMethod(HttpMethod.Post)
    .setAuthHeader(getSessionToken())
    .setJsonBody(exercise)
    .setAbortController(new AbortController())
    .build();

export const update = (id: string, exercise: UpdateExerciseData): ApiRequest =>
  new ApiRequestBuilder()
    .setEndpoint(`/exercises/${id}`)
    .setMethod(HttpMethod.Put)
    .setAuthHeader(getSessionToken())
    .setJsonBody(exercise)
    .setAbortController(new AbortController())
    .build();

export const remove = (id: string): ApiRequest =>
  new ApiRequestBuilder()
    .setEndpoint(`/exercises/${id}`)
    .setMethod(HttpMethod.Delete)
    .setAuthHeader(getSessionToken())
    .setAbortController(new AbortController())
    .build();
