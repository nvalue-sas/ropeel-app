export const validUndefined = (arrayText, separator) => {
  return arrayText.join(separator).trim();
};

export const validValue = (value, nullValue) => {
  if (typeof value === 'undefined' || value === null) {
    return nullValue;
  } else {
    return value;
  }
};
