import {Artist} from "types/artist";

export const getArtistName = ({affectionateName, name, enName}: Artist) =>
  affectionateName ? affectionateName : `${name} * ${enName}`;
