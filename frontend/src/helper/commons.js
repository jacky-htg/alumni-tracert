let timer;

export const debounce = (func) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    func()
  }, 750);
}