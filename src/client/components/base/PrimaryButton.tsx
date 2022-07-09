import {CSSProperties, MouseEventHandler} from "react";
import Link from "next/link";
import styles from "client/styles/PrimaryButton.module.css";

type Props = {
  text: string;
  linkHref?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  customStyles?: CSSProperties;
};

export default ({text, linkHref, onClick, customStyles}: Props) => {
  const content = (
    <button onClick={onClick} style={customStyles} className={styles.button}>
      {text}
    </button>
  );

  if (linkHref) return <Link href={linkHref}>{content}</Link>;
  return content;
};
