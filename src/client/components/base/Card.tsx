import {CSSProperties, ReactNode} from "react";
import Link from "next/link";
import Image from "client/components/base/Image";
import styles from "client/styles/Card.module.css";

type Props = {
  linkHref: string;
  imageHeight: number;
  imageWidth: number;
  imageSrc: string;
  children: ReactNode;
  imageName?: string;
  cardContainerStyles?: CSSProperties;
};

export default ({
  linkHref,
  imageSrc,
  imageName,
  imageWidth,
  imageHeight,
  cardContainerStyles,
  children
}: Props) => {
  return (
    <Link href={linkHref}>
      <div className={styles.contentContainer} style={cardContainerStyles}>
        <Image
          className={styles.image}
          src={imageSrc}
          alt={imageName}
          initialwidth={imageWidth}
          initialheight={imageHeight}
        />
        <div className={styles.content}>{children}</div>
      </div>
    </Link>
  );
};
