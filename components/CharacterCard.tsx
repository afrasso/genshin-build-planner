"use client";

import { Check, PencilIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArtifactSet, ArtifactType, Build, DesiredStat, Stat, Weapon } from "@/types";

import ArtifactSetSelector from "./ArtifactSetSelector";
import WeaponSelector from "./WeaponSelector";
import ArtifactMainStatSelector from "./ArtifactMainStatSelector";
import DesiredStatsSelector from "./DesiredStatsSelector";

interface CharacterCardProps {
  build: Build;
  weapons: Weapon[];
  artifactSets: ArtifactSet[];
  editModeBuilds: string[];
  onUpdate: (characterKey: string, updates: Partial<Build>) => void;
  onRemove: (characterKey: string) => void;
  onToggleEditMode: (characterKey: string) => void;
  onUpdateDesiredMainStat: (characterKey: string, type: string, value: string) => void;
  onToggleDesiredSubStat: (characterKey: string, stat: string) => void;
  recommendArtifacts: (build: Build) => { type: string; mainStat: string; subStats: string[] }[];
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  build,
  weapons,
  artifactSets,
  editModeBuilds,
  onUpdate,
  onRemove,
  onToggleEditMode,
  onToggleDesiredSubStat,
  recommendArtifacts,
}) => {
  const updateWeapon = (weapon: Weapon) => {
    onUpdate(build.character.id, { weapon });
  };

  const updateArtifactSets = (artifactSets: ArtifactSet[]) => {
    onUpdate(build.character.id, { artifactSets });
  };

  const updateArtifactMainStat = (artifactType: ArtifactType, stat: Stat) => {
    build.desiredMainStats[artifactType] = stat;
    onUpdate(build.character.id, { desiredMainStats: build.desiredMainStats });
  };

  const updateDesiredStats = (desiredStats: DesiredStat[]) => {
    onUpdate(build.character.id, { desiredStats });
  };

  return (
    <Card>
      <span>{JSON.stringify(build)}</span>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src={build.character.iconUrl}
              alt={build.character.name}
              width={50}
              height={50}
              className="mr-2 rounded-full"
            />
            {build.character.name}
          </div>
          <div className="flex items-center space-x-2">
            {editModeBuilds.includes(build.character.id) ? (
              <Button
                variant="outline"
                size="sm"
                className="bg-green-500 hover:bg-green-600"
                onClick={() => onToggleEditMode(build.character.id)}
              >
                <Check size={16} className="text-white" />
              </Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => onToggleEditMode(build.character.id)}>
                <PencilIcon size={16} />
              </Button>
            )}
            {!editModeBuilds.includes(build.character.id) ? (
              <Button variant="destructive" size="sm" onClick={() => onRemove(build.character.id)}>
                Delete
                <span className="sr-only">Remove</span>
              </Button>
            ) : (
              <div />
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {editModeBuilds.includes(build.character.id) ? (
          <>
            <WeaponSelector weapons={weapons} selectedWeapon={build.weapon} onChange={updateWeapon}></WeaponSelector>
            <ArtifactSetSelector
              artifactSets={artifactSets}
              selectedArtifactSets={build.artifactSets}
              onChange={updateArtifactSets}
            />
            <div className="mb-4">
              <Label>Desired Main Stats</Label>
              {[ArtifactType.SANDS, ArtifactType.GOBLET, ArtifactType.CIRCLET].map((artifactType) => (
                <ArtifactMainStatSelector
                  key={artifactType}
                  artifactType={artifactType}
                  selectedStat={build.desiredMainStats[artifactType]}
                  onChange={(stat) => updateArtifactMainStat(artifactType, stat)}
                />
              ))}
            </div>

            <div>
              <DesiredStatsSelector desiredStats={build.desiredStats} onChange={updateDesiredStats} />
            </div>
          </>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center">
              <strong className="mr-2">Weapon:</strong>
              {build.weapon ? (
                <>
                  <Image src={build.weapon.iconUrl} alt={build.weapon.name} width={30} height={30} className="mr-2" />
                  {build.weapon.name}
                </>
              ) : (
                "Not set"
              )}
            </div>
            <p>
              <strong>Desired Main Stats:</strong>
            </p>
            <ul className="list-disc list-inside">
              {Object.entries(build.desiredMainStats).map(([type, stat]) => (
                <li key={type}>
                  {type}: {stat}
                </li>
              ))}
            </ul>
            <p>
              <strong>Desired Sub Stats:</strong> {build.desiredSubStats.join(", ") || "None set"}
            </p>
            <div>
              <strong>Recommended Artifacts:</strong>
              <ul className="list-disc list-inside">
                {recommendArtifacts(build).map((artifact, index) => (
                  <li key={index} className="flex items-center mb-2">
                    <Image
                      src={`/placeholder.svg?height=30&width=30`}
                      alt={artifact.type}
                      width={30}
                      height={30}
                      className="mr-2"
                    />
                    {artifact.type}: {artifact.mainStat} (Main), {artifact.subStats.join(", ")} (Sub)
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CharacterCard;
