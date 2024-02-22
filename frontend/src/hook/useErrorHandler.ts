import { useAuth } from "./useAuth";

enum ErrorType {
  InvalidToken = "invalid token",
  ExpiredToken = "jwt expired",
  MalformedToken = "jwt malformed",
}

export const useErrorHandler = () => {
  const { logout } = useAuth();

  function handleGraphQLError(error): string {
    const extractedError = JSON.parse(JSON.stringify(error));
    if (extractedError.networkError) {
      const message = error.networkError.result.errors[0].message;
      const forceLogoutMssage = checkForceLogoutMessage(message);
      if (forceLogoutMssage) {
        return forceLogoutMssage;
      }
      return message;
    }
    if (extractedError.graphQLErrors) {
      const message = error.graphQLErrors[0].message;
      const forceLogoutMssage = checkForceLogoutMessage(message);
      if (forceLogoutMssage) {
        return forceLogoutMssage;
      }
      return message;
    }
    return extractedError.message;
  }

  function checkForceLogoutMessage(message: string) {
    if (
      message.includes(ErrorType.InvalidToken) ||
      message.includes(ErrorType.ExpiredToken) ||
      message.includes(ErrorType.MalformedToken)
    ) {
      logout();
      return "Authentication error. Please login again.";
    }
  }

  return {
    handleGraphQLError,
  };
};
