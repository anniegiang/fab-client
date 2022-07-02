import Group from "client/components/groups/Group";
import {Group as GroupType} from "types/group";
import cardStyles from "client/styles/Card.module.css";

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
