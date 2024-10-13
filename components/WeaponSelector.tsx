import Image from "next/image";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Weapon } from "@/types";

interface WeaponSelectorProps {
  weapons: Weapon[];
  selectedWeapon: Weapon | undefined;
  onChange: (selectedWeapon: Weapon) => void;
}

const WeaponSelector: React.FC<WeaponSelectorProps> = ({ weapons, selectedWeapon, onChange }) => {
  return (
    <div className="mb-4">
      <Label>Weapon</Label>
      <Select
        value={selectedWeapon?.name}
        onValueChange={(value) => onChange(weapons.find((weapon) => weapon.name === value) as Weapon)}
      >
        <SelectTrigger>
          <SelectValue placeholder={"Select a weapon"} />
        </SelectTrigger>
        <SelectContent>
          {weapons.map((weapon) => (
            <SelectItem key={weapon.id} value={weapon.name}>
              <div className="flex items-center">
                <Image src={weapon.iconUrl} alt={weapon.name} width={32} height={32} className="mr-2" />
                {weapon.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default WeaponSelector;
