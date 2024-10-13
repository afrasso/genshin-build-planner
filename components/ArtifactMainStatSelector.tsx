import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArtifactType, Stat } from "@/types";
import { MAIN_STATS_BY_ARTIFACT_TYPE } from "./constants";

interface ArtifactMainStatSelectorProps {
  artifactType: ArtifactType;
  selectedStat: Stat;
  onChange: (stat: Stat) => void;
}

const ArtifactMainStatSelector: React.FC<ArtifactMainStatSelectorProps> = ({
  artifactType,
  selectedStat,
  onChange,
}) => {
  return (
    <div className="mb-2">
      <Label>{artifactType}</Label>
      <Select value={selectedStat?.toString() || ""} onValueChange={(value) => onChange(value as Stat)}>
        <SelectTrigger>
          <SelectValue placeholder={`Select ${artifactType.toLocaleLowerCase()} main stat`} />
        </SelectTrigger>
        <SelectContent>
          {MAIN_STATS_BY_ARTIFACT_TYPE[artifactType].map((stat) => (
            <SelectItem key={stat.toString()} value={stat.toString()}>
              {stat.toString()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ArtifactMainStatSelector;
