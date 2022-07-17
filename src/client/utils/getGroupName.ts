import {Group} from "types/group";

export const getGroupName = ({name, enName}: Group) => `${name} * ${enName}`;
