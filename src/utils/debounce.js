function debounce(callback, ms) {
  let timeout = setTimeout(() => {}, 0);
  return (params) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(params);
    }, ms);
  };
}

export { debounce };
