const get = (id, defaultValue) =>
    JSON.parse(window.localStorage.getItem(id) || defaultValue);

const set = (id, value) => {
    window.localStorage.setItem(id, JSON.stringify(value));
};
