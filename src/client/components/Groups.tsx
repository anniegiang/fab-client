import Group from "Components/Group";
import {Group as GroupType} from "Types/group";
import cardStyles from "Client/styles/Card.module.css";

type Props = {
  groups: GroupType[];
};

export default ({groups}: Props) => {
  return (
    <div className={cardStyles.rootContainer}>
      {groups.map((group) => (
        <Group key={group.id} group={group} />
      ))}
    </div>
  );
};
