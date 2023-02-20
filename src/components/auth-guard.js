import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

export const AuthGuard = (props) => {
  const { children } = props;
  const router = useRouter();

  // Only do authentication check on component mount.
  // This flow allows you to manually redirect the user after sign-out, otherwise this will be
  // triggered and will automatically redirect to sign-in page.

  useEffect(() => {
    const access_key = localStorage.getItem("access_key");
    const role_id = localStorage.getItem("role_id");
    if (!access_key || !role_id) {
      router.replace("/login");
    }
  }, [children]);
  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};
