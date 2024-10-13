import { PlusCircle, X } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DesiredStat, Stat } from "@/types";
import { Input } from "./ui/input";

interface DesiredStatsSelectorProps {
  desiredStats: DesiredStat[];
  onChange: (desiredStats: DesiredStat[]) => void;
}

const DesiredStatsSelector: React.FC<DesiredStatsSelectorProps> = ({ desiredStats, onChange }) => {
  const handleAddDesiredStat = () => {
    onChange([...desiredStats, { stat: undefined, value: 0 } as DesiredStat]);
  };

  const handleUpdateDesiredStatStat = (stat: Stat, index: number) => {
    const updatedDesiredStats = [...desiredStats];
    updatedDesiredStats[index].stat = stat;
    onChange(updatedDesiredStats);
  };

  const handleUpdateDesiredStatValue = (value: number, index: number) => {
    const updatedDesiredStats = [...desiredStats];
    updatedDesiredStats[index].value = value;
    onChange(updatedDesiredStats);
  };

  const handleRemoveDesiredStat = (index: number) => {
    const newDesiredStats = desiredStats.filter((desiredStat, idx) => idx !== index);
    onChange(newDesiredStats);
  };

  return (
    <>
      <Label>Desired Stats</Label>
      <div className="flex flex-wrap items-center gap-4">
        {desiredStats.map((desiredStat, index) => (
          <div key={index} className="flex items-center">
            <Select
              value={desiredStat.stat?.toString()}
              onValueChange={(stat) => handleUpdateDesiredStatStat(stat as Stat, index)}
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Select a stat">
                  {<div className="flex items-center">{desiredStat?.stat || ""}</div>}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Object.values(Stat).map((stat) => (
                  <SelectItem key={stat} value={stat} className="flex items-center">
                    <div className="flex items-center">{stat}</div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              step="0.1"
              value={desiredStat.value?.toFixed(1)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const newValue = parseFloat(e.target.value) || 0;
                handleUpdateDesiredStatValue(newValue, index);
              }}
            />
            <Button onClick={() => handleRemoveDesiredStat(index)} variant="ghost" size="icon" className="h-9 w-9 ml-2">
              <X className="h-4 w-4" />
              <span className="sr-only">Remove desired stat</span>
            </Button>
          </div>
        ))}
        <Button onClick={handleAddDesiredStat} variant="ghost" size="icon" className="h-9 w-9 ml-2">
          <PlusCircle className="h-4 w-4" />
          <span className="sr-only">Add desired stat</span>
        </Button>
      </div>
    </>
  );
};

export default DesiredStatsSelector;
