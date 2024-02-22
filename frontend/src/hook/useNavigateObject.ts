import { useNavigate } from "react-router-dom";

export const useNavigateObject = () => {
  const navigate = useNavigate();
  return navigate;
};
