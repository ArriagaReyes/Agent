const stage = process.env.NODE_ENV;

const log = (fn) => {
    if(!stage.localeCompare('development')) fn();
}

const info = (...params) =>
    log(() => console.log(params));

const error = (...params) =>
    log(() => console.error(params));

module.exports = { info, error };