'use strict';

import httpStatus from "./httpStatusToMessage.js";

export default (status, input) => {
    const message = httpStatus.get(status);
    if (message !== undefined) {
        input.placeholder = message;
    } else {
        throw new Error('unexpected error');
    }
}