export default function reffer() {
  let component = this;
  let name;

  switch (arguments.length) {
    case 1:
      [name] = arguments;
      break;
    case 2:
      [component, name] = arguments;
      break;
    default:
      throw new Error(`reffer: must be supplied with either 1 or 2 arguments. Got ${arguments.length}.`);
  }

  const callback = (ref) => component[name] = ref;
  // this allows you to instead spread the result onto your component
  callback.ref = callback;

  return callback;
}
