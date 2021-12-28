import { useEffect } from 'react';
import authService from "../../services/authService";

export default function Logout() {
  useEffect(() => {
    authService.logout();
    window.location = "/";
  }, [])
  return null;
}
