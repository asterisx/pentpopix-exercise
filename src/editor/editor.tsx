import { createContext, useEffect, useRef, useState } from "react";
import {
  useEditor,
  EditorContent as BaseEditorContent,
  Editor as TiptapEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Action,
  ActionTagName,
  Character,
  CharacterTagName,
  Dialogue,
  DialogueTagName,
  SceneSetting,
  SceneSettingTagName,
} from "./components";
import { styled } from "@mui/material";
import { IOption, ISuggestion } from "./types";
import { useOption } from "./hooks";
import { ToolBar } from "./components/common";

const FullHeightContainer = styled("div")({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  border: "none",
});

const EditorContent = styled(BaseEditorContent)({
  flexGrow: 1,
  height: "100%",
  border: "none",
  margin: "50px",
});

type Props = {
  content?: string;
};

export const CharactersContext = createContext<ISuggestion[]>([]);

export const Editor = ({ content = "" }: Props) => {
  const [currentOption, setCurrentOption] = useOption(IOption.SCENE_SETTING);
  const [characters, setCharacters] = useState<string[]>([
    "Ashwin",
    "James",
    "Getha",
  ]);
  const currentOptionRef = useRef(currentOption);

  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "takeFull",
      },
    },
    extensions: [
      Character.configure({
        onCharacterCreated: ({ value }: { value: string }) => {
          setCharacters((characters) => [...characters, value]);
          setCurrentOption(IOption.CHARACTER);
        },
      }),
      SceneSetting.configure({
        onSceneAdded: () => setCurrentOption(IOption.ACTION),
      }),
      Action,
      Dialogue,
      StarterKit,
    ],
    content,
    onCreate: () => {
      setCurrentOption(IOption.SCENE_SETTING);
    },
    editable: false,
  });

  useEffect(() => {
    currentOptionRef.current = currentOption;
    let nodeType;
    switch (currentOption) {
      case IOption.ACTION:
        nodeType = ActionTagName;
        break;
      case IOption.CHARACTER:
        nodeType = CharacterTagName;
        break;
      case IOption.DIALOGUE:
        nodeType = DialogueTagName;
        break;
      case IOption.SCENE_SETTING:
        nodeType = SceneSettingTagName;
        break;
    }
    editor
      ?.chain()
      .insertContentAt(editor.state.doc.content.size, {
        type: nodeType,
      })
      .run();
    editor?.view.dom.focus();

    editor
      ?.chain()

      .focus()
      .run();
  }, [currentOption, editor]);

  return (
    <FullHeightContainer
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <ToolBar
        currentOption={currentOptionRef.current!}
        onOptionChange={(option: IOption) => setCurrentOption(option)}
      />
      <CharactersContext.Provider value={characters}>
        <EditorContent editor={editor} />
      </CharactersContext.Provider>
    </FullHeightContainer>
  );
};
