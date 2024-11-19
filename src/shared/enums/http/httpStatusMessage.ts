export enum HttpStatusMessage {
  // 1xx: Informational responses
  Continue = 'Continue',
  SwitchingProtocols = 'Switching Protocols',
  Processing = 'Processing',
  EarlyHints = 'Early Hints',

  // 2xx: Successful responses
  Ok = 'OK',
  Created = 'Created',
  Accepted = 'Accepted',
  NonAuthoritativeInformation = 'Non-Authoritative Information',
  NoContent = 'No Content',
  ResetContent = 'Reset Content',
  PartialContent = 'Partial Content',
  MultiStatus = 'Multi-Status',
  AlreadyReported = 'Already Reported',
  ImUsed = 'IM Used',

  // 3xx: Redirection messages
  MultipleChoices = 'Multiple Choices',
  MovedPermanently = 'Moved Permanently',
  Found = 'Found',
  SeeOther = 'See Other',
  NotModified = 'Not Modified',
  UseProxy = 'Use Proxy',
  TemporaryRedirect = 'Temporary Redirect',
  PermanentRedirect = 'Permanent Redirect',

  // 4xx: Client error responses
  BadRequest = 'Bad Request',
  Unauthorized = 'Unauthorized',
  PaymentRequired = 'Payment Required',
  Forbidden = 'Forbidden',
  NotFound = 'Not Found',
  MethodNotAllowed = 'Method Not Allowed',
  NotAcceptable = 'Not Acceptable',
  ProxyAuthenticationRequired = 'Proxy Authentication Required',
  RequestTimeout = 'Request Timeout',
  Conflict = 'Conflict',
  Gone = 'Gone',
  LengthRequired = 'Length Required',
  PreconditionFailed = 'Precondition Failed',
  PayloadTooLarge = 'Payload Too Large',
  UriTooLong = 'URI Too Long',
  UnsupportedMediaType = 'Unsupported Media Type',
  RangeNotSatisfiable = 'Range Not Satisfiable',
  ExpectationFailed = 'Expectation Failed',
  ImATeapot = "I'm a teapot",
  MisdirectedRequest = 'Misdirected Request',
  UnprocessableEntity = 'Unprocessable Entity',
  Locked = 'Locked',
  FailedDependency = 'Failed Dependency',
  TooEarly = 'Too Early',
  UpgradeRequired = 'Upgrade Required',
  PreconditionRequired = 'Precondition Required',
  TooManyRequests = 'Too Many Requests',
  RequestHeaderFieldsTooLarge = 'Request Header Fields Too Large',
  UnavailableForLegalReasons = 'Unavailable For Legal Reasons',

  // 5xx: Server error responses
  InternalServerError = 'Internal Server Error',
  NotImplemented = 'Not Implemented',
  BadGateway = 'Bad Gateway',
  ServiceUnavailable = 'Service Unavailable',
  GatewayTimeout = 'Gateway Timeout',
  HttpVersionNotSupported = 'HTTP Version Not Supported',
  VariantAlsoNegotiates = 'Variant Also Negotiates',
  InsufficientStorage = 'Insufficient Storage',
  LoopDetected = 'Loop Detected',
  BandwidthLimitExceeded = 'Bandwidth Limit Exceeded',
  NotExtended = 'Not Extended',
  NetworkAuthenticationRequired = 'Network Authentication Required'
}