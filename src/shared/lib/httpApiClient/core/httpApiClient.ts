import { HttpMethod, type HttpStatusMessage } from '#shared/enums/http';
import { deepMerge } from '#shared/utils/deepMerge';
import { to } from '#shared/utils/to.ts';
import {
  HttpApiResponse,
  RequestInitialParameters,
  RequestParameters,
  ResponseBody,
  ResponseMetadata
} from '../types';
import { isSuccessResponseBody } from '../types/guard.ts';

export class HttpApiClient {
  private static instance: HttpApiClient;
  private readonly baseUrl: string;
  private readonly initialParameters: RequestInitialParameters;

  private constructor(
    baseUrl: string,
    initialParameters: RequestInitialParameters = {}
  ) {
    this.baseUrl = baseUrl;
    this.initialParameters = initialParameters;
  }

  public static getInstance(baseUrl: string = '', initialParameters: RequestInitialParameters = {}): HttpApiClient {
    if (!HttpApiClient.instance) {
      HttpApiClient.instance = new HttpApiClient(baseUrl, initialParameters);
    }

    return HttpApiClient.instance;
  }

  public async sendRequest<T>(
    method: HttpMethod,
    endpoint: string,
    parameters: RequestParameters = {}
  ): Promise<HttpApiResponse<T>> {
    const url: string = `${this.baseUrl}${endpoint}`;
    const requestParameters: RequestInitialParameters = deepMerge(
      this.initialParameters,
      { ...parameters, method }
    );

    const [ fetchError, response ] = await to<Response>(() =>
      fetch(url, requestParameters)
    );
    if (fetchError) return [ fetchError, undefined, undefined ];

    const metadata: ResponseMetadata = {
      statusCode: response.status,
      statusMessage: response.statusText as HttpStatusMessage
    };

    const [ parseError, body ] = await to<ResponseBody<T>>(() => response.json());
    if (parseError) return [ parseError, undefined, metadata ];

    metadata.debugInfo = body.debugInfo;

    if (!isSuccessResponseBody<T>(body)) {
      return [ new Error(body.error.message), undefined, metadata ];
    }

    return [ undefined, body.data, metadata ];
  }
}
