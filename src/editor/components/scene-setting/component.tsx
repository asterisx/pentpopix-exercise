import { SuggestionList } from "../suggestion-list/suggestion-list";
import { NodeViewProps } from "@tiptap/core";
import { useEffect, useRef, useState } from "react";
import { NodeViewWrapper } from "@tiptap/react";

import { Div, useKeyPress, getCursorCoordinates } from "../common";
import { Popover } from "@material-ui/core";

const timesOfDay = [
  "DAY",
  "NIGHT",
  "DAWN",
  "SUNRISE",
  "MORNING",
  "AFTERNOON",
  "NOON",
];

const sceneTypes = ["INT.", "EXT./INT."];

const sceneTypeIdentifiers = ["e", "E", "i", "I"];

export interface SceneSettingComponentProps extends NodeViewProps {
  onSceneAdded: () => void;
}

export const SceneSettingComponent = ({
  onSceneAdded,
}: SceneSettingComponentProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const text = useRef<string>("");
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });

  useKeyPress("Enter", () => setShowSuggestions(true), anchorRef);

  const onSuggestionSelected = (suggestion: string) => {
    setShowSuggestions(false);
    if (timesOfDay.includes(suggestion)) {
      text.current += ` - ${suggestion}`;
      onSceneAdded();
    } else {
      text.current = suggestion;
      setSuggestions(timesOfDay);
    }
  };

  const handleTextChange = (newText: string) => {
    text.current = newText;
    if (
      !sceneTypes.find((st) => text.current.startsWith(st)) &&
      sceneTypeIdentifiers.some((char) => text.current.startsWith(char))
    ) {
      setShowSuggestions(true);
      setSuggestions(sceneTypes);
    }
  };

  useEffect(() => {
    if (showSuggestions) {
      setCursorPosition(getCursorCoordinates());
    }
  }, [showSuggestions]);

  return (
    <>
      <NodeViewWrapper contentEditable="false">
        <Div
          onInput={(e: React.FormEvent<HTMLDivElement>) =>
            handleTextChange(e.currentTarget.innerText)
          }
          contentEditable
          ref={anchorRef}
          dangerouslySetInnerHTML={{ __html: text.current }}
          isTextBold
        />
      </NodeViewWrapper>
      <Popover
        open={showSuggestions}
        style={{
          top: cursorPosition.top,
          left: cursorPosition.left,
        }}
      >
        <SuggestionList
          suggestions={suggestions}
          onSuggestionSelected={onSuggestionSelected}
        />
      </Popover>
    </>
  );
};
