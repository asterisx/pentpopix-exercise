import {
  AppBar as MuiAppBar,
  Button as MuiButton,
  IconButton as MuiIconButton,
  Toolbar,
  styled,
} from "@mui/material";
import {
  Terrain as TerrainIcon,
  Campaign as CampaignIcon,
  Face as FaceIcon,
  RecordVoiceOver as RecordVoiceOverIcon,
  Undo as UndoIcon,
  Redo as RedoIcon,
  FormatListBulleted as FormatListBulletedIcon,
  FormatListNumbered as FormatListNumberedIcon,
  LockOpen as LockOpenIcon,
  Sync as SyncIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import { IOption } from "../../types";

interface Props {
  onOptionChange: (option: IOption) => void;
  currentOption: IOption;
}

const AppBar = styled(MuiAppBar)({
  padding: "10px",
  paddingLeft: "50px",
  paddingRight: "50px",
});

const IconButton = styled(MuiIconButton)({
  paddingLeft: "1rem",
  paddingRight: "1rem",
  "& svg": {
    fontSize: "2rem",
  },
});

const Button = styled(MuiButton)({
  fontSize: "1.1rem",
  padding: "10px 8px",
  fontWeight: "normal",
  textTransform: "none",
});

const Spacer = styled("div")({
  flexGrow: 1,
});

interface ActionContainerProps {
  gap?: string;
}

const ActionContainer = styled("div")<ActionContainerProps>(
  ({ gap = "16px" }) => ({
    display: "flex",
    alignItems: "center",
    gap,
  })
);

export const ToolBar = ({ onOptionChange, currentOption }: Props) => {
  return (
    <AppBar position="sticky" color="default" elevation={0}>
      <Toolbar variant="dense">
        <IconButton
          onClick={() => onOptionChange(IOption.SCENE_SETTING)}
          color={currentOption === "SCENE_SETTING" ? "primary" : "default"}
        >
          <TerrainIcon />
        </IconButton>
        <IconButton
          onClick={() => onOptionChange(IOption.ACTION)}
          color={currentOption === "ACTION" ? "primary" : "default"}
        >
          <CampaignIcon />
        </IconButton>
        <IconButton
          onClick={() => onOptionChange(IOption.CHARACTER)}
          color={currentOption === "CHARACTER" ? "primary" : "default"}
        >
          <FaceIcon />
        </IconButton>
        <IconButton
          onClick={() => onOptionChange(IOption.DIALOGUE)}
          color={currentOption === "DIALOGUE" ? "primary" : "default"}
        >
          <RecordVoiceOverIcon />
        </IconButton>
        <IconButton>
          <UndoIcon />
        </IconButton>
        <IconButton>
          <RedoIcon />
        </IconButton>
        <IconButton>
          <FormatListBulletedIcon />
        </IconButton>
        <IconButton>
          <DescriptionIcon />
        </IconButton>
        <IconButton>
          <FormatListNumberedIcon />
        </IconButton>

        <Spacer />
        <ActionContainer>
          <IconButton>
            <LockOpenIcon />
          </IconButton>

          <Button variant="contained" color="primary">
            <ActionContainer gap="5px">
              <SyncIcon />
              Sync to Project
            </ActionContainer>
          </Button>
        </ActionContainer>
      </Toolbar>
    </AppBar>
  );
};
