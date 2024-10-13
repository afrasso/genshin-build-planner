import { loadYaml } from "@/utils/yamlLoader";
import { ArtifactSet, Character, Weapon } from "@/types";
import BuildManagerView from "./BuildManagerView";

export default function GenshinBuildManager() {
  const characters: Character[] = loadYaml<Character[]>("characters.yaml");
  const weapons: Weapon[] = loadYaml<Weapon[]>("weapons.yaml");
  const artifactSets: ArtifactSet[] = loadYaml<ArtifactSet[]>("artifactSets.yaml");

  return <BuildManagerView characters={characters} weapons={weapons} artifactSets={artifactSets} />;
}
