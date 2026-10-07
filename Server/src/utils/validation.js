// Returns the names of fields that are missing or blank strings.
export const missingFields = (body, fields) =>
  fields.filter((field) => {
    const value = body?.[field];
    return value === undefined || value === null || String(value).trim() === '';
  });
