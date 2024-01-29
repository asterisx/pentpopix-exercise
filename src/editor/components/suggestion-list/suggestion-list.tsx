import { useEffect, useRef, useState } from "react";
import { ISuggestion } from "../../types";
import List from "@material-ui/core/List";
import { SuggestionItem } from "./suggestion-item";

interface SuggestionListProps {
  suggestions: ISuggestion[];
  onSuggestionSelected: (option: ISuggestion) => void;
}
export const SuggestionList = ({
  suggestions,
  onSuggestionSelected,
}: SuggestionListProps): JSX.Element => {
  const [hoverIndex, setHoverIndex] = useState(0);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    listRef.current?.focus();
  }, []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    event.preventDefault();
    event.stopPropagation();
    switch (event.key) {
      case "ArrowUp":
        setHoverIndex((oldIndex) => Math.max(0, oldIndex - 1));
        return true;
      case "ArrowDown":
        setHoverIndex((oldIndex) =>
          Math.min(suggestions.length - 1, oldIndex + 1)
        );
        return true;
      case "Enter":
        onSuggestionSelected(suggestions[hoverIndex]);
        return true;
      default:
        return true;
    }
  };

  return (
    <List ref={listRef} onKeyDown={onKeyDown} tabIndex={0} autoFocus>
      {suggestions.map((suggestion, index) => (
        <SuggestionItem
          key={index}
          isActive={index === hoverIndex}
          onMouseEnter={() => setHoverIndex(index)}
          onClick={() => onSuggestionSelected(suggestions[index])}
        >
          {suggestion}
        </SuggestionItem>
      ))}
    </List>
  );
};
