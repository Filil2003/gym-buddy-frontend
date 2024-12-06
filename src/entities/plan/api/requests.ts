import { getSessionToken } from '#entities/session';
import { HttpMethod } from '#shared/enums/http';
import { type ApiRequest, ApiRequestBuilder } from '#shared/lib/api-client';
import type { CreatePlanData, UpdatePlanData } from '../model/types.ts';

export const getAll = (): ApiRequest =>
  new ApiRequestBuilder()
    .setEndpoint('/api/workout-plans')
    .setMethod(HttpMethod.Get)
    .setAuthHeader(getSessionToken())
    .setAbortController(new AbortController())
    .build();

export const getOne = (id: string): ApiRequest =>
  new ApiRequestBuilder()
    .setEndpoint(`/api/workout-plans/${id}`)
    .setMethod(HttpMethod.Get)
    .setAuthHeader(getSessionToken())
    .setAbortController(new AbortController())
    .build();

export const create = (Plan: CreatePlanData): ApiRequest =>
  new ApiRequestBuilder()
    .setEndpoint('/api/workout-plans')
    .setMethod(HttpMethod.Post)
    .setAuthHeader(getSessionToken())
    .setJsonBody(Plan)
    .setAbortController(new AbortController())
    .build();

export const update = (id: string, Plan: UpdatePlanData): ApiRequest =>
  new ApiRequestBuilder()
    .setEndpoint(`/api/workout-plans/${id}`)
    .setMethod(HttpMethod.Put)
    .setAuthHeader(getSessionToken())
    .setJsonBody(Plan)
    .setAbortController(new AbortController())
    .build();

export const remove = (id: string): ApiRequest =>
  new ApiRequestBuilder()
    .setEndpoint(`/api/workout-plans/${id}`)
    .setMethod(HttpMethod.Delete)
    .setAuthHeader(getSessionToken())
    .setAbortController(new AbortController())
    .build();
