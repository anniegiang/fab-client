import {useState} from "react";
import Image, {ImageProps} from "next/image";

const DEFAULT_RATIO = 16 / 9;

type CustomProps = {
  initialwidth: string | number;
  initialheight: string | number;
  ratio?: number;
};

type Props = ImageProps & CustomProps;

export default (props: Props) => {
  const {
    src,
    className,
    initialwidth,
    initialheight,
    ratio = DEFAULT_RATIO
  } = props;
  const [naturalRatio, setNaturalRatio] = useState<number>(ratio);
  const height =
    typeof initialheight === "number"
      ? initialheight / naturalRatio
      : initialheight;

  return (
    <Image
      {...props}
      src={src}
      width={initialwidth}
      height={height}
      className={className}
      onLoadingComplete={({naturalWidth, naturalHeight}) =>
        setNaturalRatio(naturalWidth / naturalHeight)
      }
    />
  );
};
