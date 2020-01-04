'use strict';

export default (url, options, timeout) => {
    return Promise.race([
        fetch(url, options),
        new Promise((ignored, reject) =>
            setTimeout(() => reject(new Error('timeout')), timeout)
        )
    ]);
}