import Image, {ImageProps} from "next/image";
import styles from "client/styles/Image.module.css";

type Props = ImageProps;

export default (props: Props) => {
  const {src} = props;
  return (
    <div className={styles.container}>
      <Image layout="fill" objectFit="cover" {...props} src={src} />
    </div>
  );
};
