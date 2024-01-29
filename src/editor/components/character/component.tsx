import { NodeViewProps } from "@tiptap/core";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { NodeViewWrapper } from "@tiptap/react";
import { Popover } from "@material-ui/core";

import { SuggestionList } from "../suggestion-list/suggestion-list";
import { Div, getCursorCoordinates, useKeyPress } from "../common";
import { ISuggestion } from "../../types";
import { CharactersContext } from "../../editor";

export interface CharacterComponentProps extends NodeViewProps {
  onCharacterCreated: ({ value }: { value: string }) => void;
  suggestions: string[];
}

export const CharacterComponent: React.FC<CharacterComponentProps> = ({
  editor,
  onCharacterCreated,
}) => {
  const suggestions = useContext(CharactersContext);
  const text = useRef<string>("");
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });
  const keyPressAction = useCallback(() => {
    onCharacterCreated({ value: text.current });
  }, [onCharacterCreated]);

  useKeyPress("Enter", keyPressAction, anchorRef);

  const handleSuggestionClick = (suggestion: ISuggestion) => {
    text.current = suggestion;
  };

  useEffect(() => {
    setCursorPosition(getCursorCoordinates());
  }, []);

  return (
    <NodeViewWrapper contentEditable="false">
      <Div
        onInput={(e: React.FormEvent<HTMLDivElement>) =>
          (text.current = e.currentTarget.innerText)
        }
        contentEditable
        ref={anchorRef}
        dangerouslySetInnerHTML={{ __html: text.current }}
        isTextCenter
      />
      <Popover
        open={suggestions.length > 0}
        style={{
          top: cursorPosition.top,
          left: cursorPosition.left,
        }}
      >
        <SuggestionList
          suggestions={suggestions}
          onSuggestionSelected={handleSuggestionClick}
        />
      </Popover>
    </NodeViewWrapper>
  );
};
