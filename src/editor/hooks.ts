import { useState } from "react";
import { IOption } from "./types";

export const useOption = (
  initial: IOption
): [IOption, (options: IOption) => void] => {
  const [currentOption, setCurrentOption] = useState<IOption>(initial);

  const optionTransitions = {
    [IOption.SCENE_SETTING]: [IOption.ACTION, IOption.CHARACTER],
    [IOption.ACTION]: [
      IOption.SCENE_SETTING,
      IOption.ACTION,
      IOption.CHARACTER,
    ],
    [IOption.CHARACTER]: [IOption.DIALOGUE, IOption.ACTION],
    [IOption.DIALOGUE]: [IOption.ACTION, IOption.SCENE_SETTING],
  };

  const setOption = (option: IOption) => {
    if (optionTransitions[currentOption].includes(option)) {
      setCurrentOption(option);
    }
  };

  return [currentOption, setOption];
};
