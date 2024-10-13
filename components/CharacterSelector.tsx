"use client";

import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button"; // Import your button component
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Character } from "@/types";

interface CharacterSelectorProps {
  characters: Character[];
  onAdd: (character: Character) => void;
}

const CharacterSelector: React.FC<CharacterSelectorProps> = ({ characters, onAdd }) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character>();

  const handleCharacterSelection = (characterId: string) => {
    const character = characters.find((character) => character.id === characterId);
    setSelectedCharacter(character);
  };

  const handleAddBuild = () => {
    if (selectedCharacter) {
      onAdd(selectedCharacter);
      setSelectedCharacter(undefined);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center">
        <Select onValueChange={handleCharacterSelection} value={selectedCharacter?.id || ""}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Add a character" />
          </SelectTrigger>
          <SelectContent>
            {characters.map((character) => (
              <SelectItem key={character.id} value={character.id}>
                <div className="flex items-center">
                  <Image
                    src={character.iconUrl}
                    alt={character.name}
                    width={30}
                    height={30}
                    className="mr-2 rounded-full"
                  />
                  {character.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={handleAddBuild}
          variant="ghost"
          size="icon"
          className="h-9 w-9 flex items-center justify-center ml-2"
        >
          <PlusCircle className="h-4 w-4" />
          <span className="sr-only">Add build</span>
        </Button>
      </div>
    </div>
  );
};

export default CharacterSelector;
