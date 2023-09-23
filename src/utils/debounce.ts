type Callback<T> = (params: T) => void;

function debounce<T>(callback: Callback<T>, ms: number): Callback<T> {
  let timeout: NodeJS.Timeout = setTimeout(() => {}, 0);
  return (params) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(params);
    }, ms);
  };
}

export { debounce };
