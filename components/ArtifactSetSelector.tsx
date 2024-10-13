import { PlusCircle, X } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArtifactSet } from "@/types";

interface ArtifactSetSelectorProps {
  artifactSets: ArtifactSet[];
  selectedArtifactSets: ArtifactSet[];
  onChange: (artifactSets: ArtifactSet[]) => void;
}

const ArtifactSetSelector: React.FC<ArtifactSetSelectorProps> = ({ artifactSets, selectedArtifactSets, onChange }) => {
  const handleAddArtifactSetSelector = () => {
    if (selectedArtifactSets.length < 2) {
      onChange([...selectedArtifactSets, { id: "0", name: "", rarities: [], iconUrl: "" }]);
    }
  };

  const handleArtifactSetSelection = (artifactSet: ArtifactSet, index: number) => {
    const newArtifactSetSelections = [...selectedArtifactSets];
    newArtifactSetSelections[index] = artifactSet;
    onChange(newArtifactSetSelections);
  };

  const handleRemoveArtifactSetSelector = (index: number) => {
    const newArtifactSetSelections = selectedArtifactSets.filter((artifactSet, idx) => idx !== index);
    onChange(newArtifactSetSelections);
  };

  return (
    <>
      <Label>Artifact Sets</Label>
      <div className="flex flex-wrap items-center gap-4">
        {selectedArtifactSets.map((artifactSetSelection, index) => (
          <div key={index} className="flex items-center">
            <Select
              value={artifactSetSelection.name}
              onValueChange={(value) =>
                handleArtifactSetSelection(
                  artifactSets.find((artifactSet) => artifactSet.name === value) as ArtifactSet,
                  index
                )
              }
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Select an item">
                  {artifactSetSelection && (
                    <div className="flex items-center">
                      <Image
                        src={artifactSetSelection.iconUrl}
                        alt={artifactSetSelection.name}
                        width={32}
                        height={32}
                        className="mr-2"
                      />
                      {artifactSetSelection.name}
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {artifactSets.map((artifactSet) => (
                  <SelectItem key={artifactSet.name} value={artifactSet.name} className="flex items-center">
                    <div className="flex items-center">
                      <Image src={artifactSet.iconUrl} alt={artifactSet.name} width={32} height={32} className="mr-2" />
                      {artifactSet.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={() => handleRemoveArtifactSetSelector(index)}
              variant="ghost"
              size="icon"
              className="h-9 w-9 ml-2"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove artifact set</span>
            </Button>
          </div>
        ))}
        {selectedArtifactSets.length < 2 && (
          <Button onClick={handleAddArtifactSetSelector} variant="ghost" size="icon" className="h-9 w-9 ml-2">
            <PlusCircle className="h-4 w-4" />
            <span className="sr-only">Add artifact set</span>
          </Button>
        )}
      </div>
    </>
  );
};

export default ArtifactSetSelector;
