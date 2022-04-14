import { PiralPlugin } from "piral";
import { getToken, getUserInfo, User } from "./client";
import { MyPiletApi } from "./types";

export function createMyApi(): PiralPlugin<MyPiletApi> {
  return (context) => {
    const setUser = (user: User) => {
      context.dispatch((state) => ({
        ...state,
        user: {
          id: user.sub,
          name: user.preferred_username,
          company: user.organization,
        },
      }));
    };

    setUser({
      DOB: "",
      organization: "",
      preferred_username: "...",
      sub: "",
    });

    getUserInfo().then(setUser);

    return {
      getCurrentUser() {
        return context.readState((s) => s.user);
      },
      requestToken() {
        return getToken();
      },
    };
  };
}
