import {Artist} from "types/artist";

export const getArtistName = ({affectionateName, name, enName}: Artist) => {
  return affectionateName ? affectionateName : `${name} * ${enName}`;
};
