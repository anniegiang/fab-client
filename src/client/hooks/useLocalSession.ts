import {useState, useEffect} from "react";
import {Nullable} from "types/common";
import LocalSession from "client/LocalSession";

export const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState<Nullable<string>>(null);

  useEffect(() => {
    if (accessToken !== null) {
      LocalSession.updateAccessToken = accessToken;
    } else {
      setAccessToken(LocalSession.accessToken);
    }
  }, [accessToken]);

  return {accessToken, setAccessToken};
};

export const useUserId = () => {
  const [userId, setUserId] = useState<Nullable<string>>(null);

  useEffect(() => {
    if (userId !== null) {
      LocalSession.updateUserId = userId;
    } else {
      setUserId(LocalSession.userId);
    }
  }, [userId]);

  return {userId, setUserId};
};
