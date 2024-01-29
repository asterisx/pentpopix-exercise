import { CommandProps, Node, mergeAttributes } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { Div } from "../common";

export const TagName = "pentopix-action";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    [TagName]: {
      setAction: () => ReturnType;
      toggleAction: () => ReturnType;
      unsetAction: () => ReturnType;
    };
  }
}

export const Action = Node.create({
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
    return ReactNodeViewRenderer(() => <ActionComponent />);
  },

  addCommands() {
    return {
      setAction:
        () =>
        ({ commands }: CommandProps) => {
          return commands.wrapIn(this.name);
        },
      toggleAction:
        () =>
        ({ commands }: CommandProps) => {
          return commands.toggleWrap(this.name);
        },
      unsetAction:
        () =>
        ({ commands }: CommandProps) => {
          return commands.lift(this.name);
        },
    };
  },
});

const ActionComponent: React.FC = () => (
  <NodeViewWrapper>
    <Div contentEditable isTextCenter={false} />
  </NodeViewWrapper>
);
