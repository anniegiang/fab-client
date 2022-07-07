import {CSSProperties, ReactNode, MouseEventHandler} from "react";
import Link from "next/link";
import Image from "client/components/base/Image";
import styles from "client/styles/Card.module.css";

type Props = {
  linkHref: string;
  imageSrc?: string;
  children?: ReactNode;
  cardContainerStyles?: CSSProperties;
  onClick?: MouseEventHandler;
};

export default ({
  linkHref,
  imageSrc,
  cardContainerStyles,
  children,
  onClick
}: Props) => {
  const content = (
    <div
      className={styles.contentContainer}
      style={cardContainerStyles}
      onClick={onClick}
    >
      {imageSrc && <Image className={styles.image} src={imageSrc} />}
      <div className={styles.content}>{children}</div>
    </div>
  );

  return onClick ? content : <Link href={linkHref}>{content}</Link>;
};
