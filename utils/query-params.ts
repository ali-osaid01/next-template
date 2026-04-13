type ParamValue = string | number | boolean | null | undefined;

export function buildQueryParams(
  input: Record<string, ParamValue | ParamValue[]>
): URLSearchParams {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(input)) {
    if (value === undefined || value === null || value === "") continue;

    const values = Array.isArray(value) ? value : [value];
    for (const v of values) {
      if (v !== undefined && v !== null && v !== "") {
        params.append(key, String(v));
      }
    }
  }

  return params;
}
