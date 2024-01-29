import { styled } from "@mui/material/styles";
import { forwardRef } from "react";

interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
  isTextCenter?: boolean;
  isTextBold?: boolean;
}

const DivComponent = styled("div")<DivProps>(
  ({ theme, isTextCenter = false, isTextBold = false }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    textAlign: isTextCenter ? "center" : "left",
    fontWeight: isTextBold ? 800 : "normal",
    display: "inline-block",
    minWidth: "100px",
    width: "100%",
    ":focus-visible": {
      outline: "none",
    },
  })
);

export const Div = forwardRef<HTMLDivElement, DivProps>((props, ref) => (
  <DivComponent
    ref={ref}
    {...props}
    onFocus={(e: React.FocusEvent<HTMLDivElement>) => {
      const div = window.getSelection();
      div?.selectAllChildren(e.currentTarget);
      div?.collapseToEnd();
    }}
  />
));
