export const reverse_debounce = (func, timeout = 300) => {
    let timer;

    return (...args) => {
        if (!timer) {
            func(...args);
        }

        clearTimeout(timer);

        timer = setTimeout(() => {
            timer = undefined
        }, timeout);
    }
}