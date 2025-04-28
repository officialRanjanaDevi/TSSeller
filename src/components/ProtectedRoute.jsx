import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { useContext, useEffect } from "react";
import RootLayout from "../layouts/RootLayout";

export const ProtectedRoute = () => {
  const [authenticated] = useContext(UserContext);

  const storeStatus = authenticated.storeStatus; // assuming storeStatus is part of the user object

  // if (!authenticated.user?._id) {
  //   return <Navigate to="/dashboard" />;
  // }

  switch (storeStatus) {
    case "Process":
      return <Navigate to="/become-seller/basic-info" />;
    case "Submitted":
      return <Navigate to="/become-seller/verificationdone" />;
    case "Varified":
      return (
        <RootLayout>
          <Outlet />
        </RootLayout>
      );
    case "Failed":
      return <Navigate to="/become-seller/verification" />;
    // default:
    //   return <Navigate to="/become-seller/sellerlogin" />;
 
  }
};
