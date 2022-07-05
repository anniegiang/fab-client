import {CSSProperties, ReactNode} from "react";
import Link from "next/link";
import Image from "client/components/base/Image";
import styles from "client/styles/Card.module.css";

type Props = {
  linkHref: string;
  imageSrc?: string;
  children: ReactNode;
  cardContainerStyles?: CSSProperties;
};

export default ({linkHref, imageSrc, cardContainerStyles, children}: Props) => {
  return (
    <Link href={linkHref}>
      <div className={styles.contentContainer} style={cardContainerStyles}>
        {imageSrc && <Image className={styles.image} src={imageSrc} />}
        <div className={styles.content}>{children}</div>
      </div>
    </Link>
  );
};
