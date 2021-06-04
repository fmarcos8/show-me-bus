export function buildQueryParam(params) {
  const query = new URLSearchParams(params);
  return query.toString();
}