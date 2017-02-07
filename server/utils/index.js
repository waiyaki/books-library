export const fork = (lastly, a, b) => x => lastly(a(x), b(x));
