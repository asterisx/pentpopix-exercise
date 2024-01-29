import { OrderedList } from "@tiptap/extension-ordered-list";
import { CommandProps, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { SceneSettingComponent, SceneSettingComponentProps } from "./component";

export const TagName = "pentopix-scene-setting";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    [TagName]: {
      setSceneSetting: () => ReturnType;
      toggleSceneSetting: () => ReturnType;
      unsetSceneSetting: () => ReturnType;
    };
  }
}

export const SceneSetting = OrderedList.extend({
  name: TagName,

  defaultOptions: {
    onCharacterCreated: ({ value }: { value: string }) => {},
    onSceneAdded: () => {},
    onTextUpdated: (newText: string) => {},
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
    return ReactNodeViewRenderer((props: SceneSettingComponentProps) => (
      <SceneSettingComponent
        {...props}
        onSceneAdded={this.options.onSceneAdded}
      />
    ));
  },

  addCommands() {
    return {
      setSceneSetting:
        () =>
        ({ commands }: CommandProps) => {
          return commands.wrapIn(this.name);
        },
      toggleSceneSetting:
        () =>
        ({ commands }: CommandProps) => {
          return commands.toggleWrap(this.name);
        },
      unsetSceneSetting:
        () =>
        ({ commands }: CommandProps) => {
          return commands.lift(this.name);
        },
    };
  },
});
