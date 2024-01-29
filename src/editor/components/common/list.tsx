import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";

interface Props {
  items: string[];
  onItemSelected: (selectedItem: string) => void;
}

export const SelectableList = ({ items, onItemSelected }: Props) => {
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List>
        {items.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{
              "&:hover": {
                bgcolor: "primary.main",
                color: "primary.contrastText",
              },
            }}
          >
            <ListItemButton onClick={() => onItemSelected(item)}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
