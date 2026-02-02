export function generateUUID(): string {
  // Check if the modern, secure function exists
  if (crypto && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback for older browsers.
  // @ts-ignore
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
