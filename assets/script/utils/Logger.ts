/**
 * 日志类，取代 console
 */
export default class Logger {

    constructor() {

    }
    static log(...args) {
        console.log.apply(console, args);
    }
    static trace(...args) {
        console.log.apply(console, args);
    }
}