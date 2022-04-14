import * as React from "react";
import { useGlobalState } from "piral";

export const User: React.FC = () => {
  const user = useGlobalState((s) => s.user);
  return <b>{user.name}</b>;
};
