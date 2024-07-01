function convertCamelCaseToTitleCase(camelCaseString) {
  // Step 1: Insert space before each uppercase letter and convert the string to lowercase
  const spacedString = camelCaseString.replace(/([A-Z])/g, " $1").toLowerCase();

  // Step 2: Capitalize the first letter of each word
  const titleCaseString = spacedString.replace(/\b\w/g, (match) =>
    match.toUpperCase()
  );

  return titleCaseString;
}

export default convertCamelCaseToTitleCase;