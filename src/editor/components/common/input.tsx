import { TextareaAutosize } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

export const Input = withStyles({
  root: {
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
      outline: "none",
    },
    "& fieldset": { border: "none" },
  },
})(TextareaAutosize);
