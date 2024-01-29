import { useEffect, useRef } from "react";
import { ListItem } from "@material-ui/core";

interface SuggestionItemProps extends React.ComponentPropsWithoutRef<"div"> {
  isActive: boolean;
  className?: string;
  style?: Object;
}

export const SuggestionItem = ({
  isActive,
  className,
  style,
  ...props
}: SuggestionItemProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isActive) {
      ref.current?.scrollIntoView({ block: "nearest" });
    }
  }, [isActive]);

  return (
    <ListItem
      button
      ref={ref}
      style={{
        backgroundColor: isActive ? "lightgrey" : undefined,
        ...style,
      }}
      {...props}
    />
  );
};
