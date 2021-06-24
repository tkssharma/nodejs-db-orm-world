import Err from './errorcode';

const ResponseTemplate = {
  general(data: any) {
    return data;
  },
  successMessage(message: any) {
    return {
      success: true,
      message
    };
  },
  /**
   * Returns standard success response
   * @param {*} data
   * @param {String} message
   */
  success(data: any, message: any) {
    return {
      success: true,
      message,
      data
    };
  },
  error(message: any, err: any, code: any) {
    return {
      success: false,
      message: message || 'some error occurred',
      error: err || 'error occurred on server, please try again after some time.',
      code: code || Err.InternalServerError
    };
  },
  commonAuthUserDataError(data: any) {
    return ResponseTemplate.error(
      data.message || 'Authentication error',
      data.error || 'token verification failed, Please try again',
      data.code || Err.TokenValidationFailed
    );
  },
  emptyContent() {
    return ResponseTemplate.error(
      'empty content found',
      `you must provide valid data and it must not be empty
      ref: http://stackoverflow.com/questions/18419428/what-is-the-minimum-valid-json`,
      Err.EmptyRequestBody
    );
  },
  invalidContentType() {
    return ResponseTemplate.error(
      'invalid content type',
      `you must specify content type and it must be application/json',
      ref: 'http://stackoverflow.com/questions/477816/what-is-the-correct-json-content-type`,
      Err.InvalidContentType
    );
  },
  BadRequestFromJoi(err: any) {
    return ResponseTemplate.error(
      err.message,
      err.error,
      err.code || Err.ValidationFailed
    );
  },
  routeNotFound(req: any) {
    return ResponseTemplate.error(
      'api not found',
      `${req.method} ${req.url}`,
      Err.RouteNotFound
    );
  },
  userNotFound() {
    return ResponseTemplate.error(
      'user not found',
      "the user you're looking for doesn't exist or you dont have permissions to access it.",
      Err.UserNotFound
    );
  },
  userAlreadyExist() {
    return ResponseTemplate.error(
      'user with email already exist',
      'User with same email already exist in System, please use another email',
      Err.EmailAlreadyExists
    );
  },
  userAlreadyInvited() {
    return ResponseTemplate.error(
      'user with email already invited',
      'User with same email already invited, Another link can be send after 24 hours window',
      Err.DuplicateInvite
    );
  }
}

export default ResponseTemplate;