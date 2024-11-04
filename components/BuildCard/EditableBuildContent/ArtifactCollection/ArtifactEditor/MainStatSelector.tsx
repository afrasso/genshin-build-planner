import { forwardRef, useImperativeHandle, useState } from "react";

import ISaveableContentHandle from "@/components/iSaveableContentHandle";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MAIN_STATS_BY_ARTIFACT_TYPE } from "@/constants";
import { ArtifactType, Stat } from "@/types";
interface MainStatSelectorProps {
  artifactType: ArtifactType;
  mainStat?: Stat;
  onUpdate: (mainStat: Stat) => void;
}

const MainStatSelector = forwardRef<ISaveableContentHandle, MainStatSelectorProps>(
  ({ artifactType, mainStat, onUpdate }, ref) => {
    const [isValid, setIsValid] = useState(true);

    const cancel = () => {};

    const save = () => {
      return validate();
    };

    const validate = () => {
      const newIsValid = !!mainStat;
      setIsValid(newIsValid);
      return newIsValid;
    };

    useImperativeHandle(ref, () => ({
      cancel,
      save,
      validate,
    }));

    const onMainStatChange = (mainStat: string) => {
      onUpdate(mainStat as Stat);
      setIsValid(true);
    };

    return (
      <>
        <div>
          <Label className="text-s font-semibold" htmlFor="main-stat">
            Main Stat
          </Label>
          <Select onValueChange={onMainStatChange} value={mainStat}>
            <SelectTrigger className="h-8" id="main-stat" isValid={isValid}>
              <SelectValue placeholder="Select main stat" />
            </SelectTrigger>
            <SelectContent>
              {MAIN_STATS_BY_ARTIFACT_TYPE[artifactType].map((stat: Stat) => (
                <SelectItem key={stat} value={stat}>
                  {stat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="h-6">{!isValid && <p className="text-red-500 text-sm">Please select a main stat.</p>}</div>
      </>
    );
  }
);

MainStatSelector.displayName = "MainStatSelector";

export default MainStatSelector;