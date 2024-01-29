import { ReactNodeViewRenderer, CommandProps } from "@tiptap/react";
import { Node, mergeAttributes } from "@tiptap/core";
import { CharacterComponent, CharacterComponentProps } from "./component";

export const TagName = "pentopix-character";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    [TagName]: {
      setCharacter: () => ReturnType;
      toggleCharacter: () => ReturnType;
      unsetCharacter: () => ReturnType;
    };
  }
}

export const Character = Node.create({
  name: TagName,

  defaultOptions: {
    HTMLAttributes: {},
    suggestions: [],
    onCharacterCreated: ({ value }: { value: string }) => {},
  },

  content: "inline*",

  group: "block",

  parseHTML() {
    return [
      {
        tag: TagName,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [TagName, mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer((props: CharacterComponentProps) => (
      <CharacterComponent
        {...props}
        onCharacterCreated={this.options.onCharacterCreated}
      />
    ));
  },

  addCommands() {
    return {
      setCharacter:
        () =>
        ({ commands }: CommandProps) => {
          return commands.wrapIn(this.name);
        },
      toggleCharacter:
        () =>
        ({ commands }: CommandProps) => {
          return commands.toggleWrap(this.name);
        },
      unsetCharacter:
        () =>
        ({ commands }: CommandProps) => {
          return commands.lift(this.name);
        },
    };
  },
});
