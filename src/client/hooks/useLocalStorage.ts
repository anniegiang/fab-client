import {useState, useEffect} from "react";
import LocalStorage from "../LocalStorage";

export const useGetItem = (key: string) => {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    setValue(LocalStorage.get(key));
  }, []);

  return value;
};
