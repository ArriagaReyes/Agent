const log = (fn) => {
    if(process.env.NODE_ENV !== 'production' || 'test') fn();
}

const info = (...params) =>
    log(() => console.log(params));

const error = (...params) =>
    log(() => console.error(params));

module.exports = { info, error };