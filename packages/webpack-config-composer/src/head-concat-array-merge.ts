export = (a: Array<any> | unknown, b: Array<any> | unknown): any => {
  return (Array.isArray(a) && Array.isArray(b))
    ? [].concat(b).concat(a)
    : undefined;
  };
