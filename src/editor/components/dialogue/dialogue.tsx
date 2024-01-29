import { CommandProps, Node, mergeAttributes } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { Div } from "../common";

export const TagName = "pentopix-dialogue";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    [TagName]: {
      setDialogue: () => ReturnType;
      toggleDialogue: () => ReturnType;
      unsetDialogue: () => ReturnType;
    };
  }
}

export const Dialogue = Node.create({
  name: TagName,

  defaultOptions: {
    HTMLAttributes: {},
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
    return ReactNodeViewRenderer(() => <DialogueComponent />);
  },

  addCommands() {
    return {
      setDialogue:
        () =>
        ({ commands }: CommandProps) => {
          return commands.wrapIn(this.name);
        },
      toggleDialogue:
        () =>
        ({ commands }: CommandProps) => {
          return commands.toggleWrap(this.name);
        },
      unsetDialogue:
        () =>
        ({ commands }: CommandProps) => {
          return commands.lift(this.name);
        },
    };
  },
});

const DialogueComponent: React.FC = () => (
  <NodeViewWrapper>
    <Div contentEditable isTextCenter />
  </NodeViewWrapper>
);
