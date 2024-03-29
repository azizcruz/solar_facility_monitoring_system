import { useEffect } from "react";
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({
  element,
  children,
}: {
  element?: JSX.Element;
  children?: JSX.Element;
}) {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/auth", { replace: true });
    }
  }, [token, navigate]);

  return element || children;
}
