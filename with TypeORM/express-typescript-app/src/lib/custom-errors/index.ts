const BadRequestException = class BadRequestException extends Error { };
const NotFoundException = class NotFoundException extends Error { };
const ServerException = class ServerException extends Error { };

export { BadRequestException, NotFoundException, ServerException };
