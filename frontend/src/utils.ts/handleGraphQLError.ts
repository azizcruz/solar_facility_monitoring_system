export function handleGraphQLError(error) {
  const extractedError = JSON.parse(JSON.stringify(error));

  if (extractedError.networkError) {
    return error.networkError.result.errors[0].message;
  }
  if (extractedError.graphQLErrors) {
    return error.graphQLErrors[0].message;
  }
  return extractedError.message;
}
