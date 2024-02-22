import { useAuth } from "./useAuth";

export const useErrorHandler = () => {
  const { logout } = useAuth();

  function handleGraphQLError(error) {
    const extractedError = JSON.parse(JSON.stringify(error));
    if (extractedError.networkError) {
      const message = error.networkError.result.errors[0].message;
      checkForceLogoutMessage(message);
      return message;
    }
    if (extractedError.graphQLErrors) {
      const message = error.graphQLErrors[0].message;
      checkForceLogoutMessage(message);
      return message;
    }
    return extractedError.message;
  }

  function checkForceLogoutMessage(message: string) {
    if (message.includes("jwt expired") || message.includes("invalid token")) {
      logout();
    }
  }

  return {
    handleGraphQLError,
  };
};
