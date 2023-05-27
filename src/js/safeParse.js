function safeParse(stringToParse, defaultValue) {
  try {
    return stringToParse === null ? defaultValue : JSON.parse(stringToParse);
  } catch (err) {
    return defaultValue;
  }
}

export default safeParse;
