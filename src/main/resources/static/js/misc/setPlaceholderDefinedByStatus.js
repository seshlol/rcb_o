'use strict';

import httpStatus from "./httpStatusToMessage.js";

export default (statusCode, input) => {
    const statusMessage = httpStatus[`STATUS_CODE_${statusCode}`];
    if (statusMessage !== undefined) {
        input.placeholder = statusMessage;
    } else {
        throw new Error('unexpected error');
    }
}