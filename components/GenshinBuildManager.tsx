// remove this as it's broken up
'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PencilIcon, XIcon } from 'lucide-react'
import Image from 'next/image'

const characters = [
  { id: 1, name: 'Albedo', element: 'Geo', weaponType: 'Sword' },
  { id: 2, name: 'Zhongli', element: 'Geo', weaponType: 'Polearm' },
  { id: 3, name: 'Ningguang', element: 'Geo', weaponType: 'Catalyst' },
  { id: 4, name: 'Alhaitham', element: 'Dendro', weaponType: 'Sword' },
  { id: 5, name: 'Nahida', element: 'Dendro', weaponType: 'Catalyst' },
  { id: 6, name: 'Tighnari', element: 'Dendro', weaponType: 'Bow' },
  { id: 7, name: 'Diluc', element: 'Pyro', weaponType: 'Claymore' },
  { id: 8, name: 'Hu Tao', element: 'Pyro', weaponType: 'Polearm' },
  { id: 9, name: 'Klee', element: 'Pyro', weaponType: 'Catalyst' },
]

const weapons = {
  Sword: ['Mistsplitter Reforged', 'Aquila Favonia', 'The Black Sword'],
  Claymore: ['Wolf\'s Gravestone', 'Serpent Spine', 'Prototype Archaic'],
  Polearm: ['Staff of Homa', 'Deathmatch', 'The Catch'],
  Bow: ['Thundering Pulse', 'The Stringless', 'Prototype Crescent'],
  Catalyst: ['Lost Prayer to the Sacred Winds', 'The Widsith', 'Mappa Mare'],
}

const artifactSets = ['Gladiator\'s Finale', 'Wanderer\'s Troupe', 'Noblesse Oblige', 'Viridescent Venerer']
const artifactTypes = ['Flower', 'Plume', 'Sands', 'Goblet', 'Circlet']
const mainStats = {
  Flower: ['HP'],
  Plume: ['ATK'],
  Sands: ['HP%', 'ATK%', 'DEF%', 'Energy Recharge', 'Elemental Mastery'],
  Goblet: ['HP%', 'ATK%', 'DEF%', 'Elemental Mastery', 'Pyro DMG', 'Hydro DMG', 'Cryo DMG', 'Electro DMG', 'Anemo DMG', 'Geo DMG', 'Dendro DMG', 'Physical DMG'],
  Circlet: ['HP%', 'ATK%', 'DEF%', 'Elemental Mastery', 'CRIT Rate', 'CRIT DMG', 'Healing Bonus'],
}
const subStats = ['HP', 'HP%', 'ATK', 'ATK%', 'DEF', 'DEF%', 'Energy Recharge', 'Elemental Mastery', 'CRIT Rate', 'CRIT DMG']
const domains = ['Clear Pool and Mountain Cavern', 'Valley of Remembrance', 'Hidden Palace of Zhou Formula']

interface Artifact {
  type: string;
  set: string;
  mainStat: string;
  subStats: string[];
  rarity: number;
}

interface Character {
  id: number;
  name: string;
  element: string;
  weaponType: string;
  weapon: string;
  artifacts: Artifact[];
  desiredMainStats: { [key: string]: string };
  desiredSubStats: string[];
  focused: boolean;
}

export default function GenshinBuildManager() {
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([])
  const [editModeCharacters, setEditModeCharacters] = useState<number[]>([])

  const addCharacter = (characterId: string) => {
    const character = characters.find(c => c.id === parseInt(characterId, 10))
    if (character && !selectedCharacters.some(c => c.id === character.id)) {
      setSelectedCharacters([...selectedCharacters, {
        ...character,
        weapon: '',
        artifacts: [],
        desiredMainStats: {},
        desiredSubStats: [],
        focused: true
      }])
      setEditModeCharacters([...editModeCharacters, character.id])
    }
  }

  const removeCharacter = (id: number) => {
    setSelectedCharacters(selectedCharacters.filter(char => char.id !== id))
    setEditModeCharacters(editModeCharacters.filter(charId => charId !== id))
  }

  const updateCharacter = (id: number, updates: Partial<Character>) => {
    setSelectedCharacters(selectedCharacters.map(char => 
      char.id === id ? { ...char, ...updates } : char
    ))
  }

  const toggleFocus = (id: number) => {
    setSelectedCharacters(selectedCharacters.map(char =>
      char.id === id ? { ...char, focused: !char.focused } : char
    ))
  }

  const toggleEditMode = (id: number) => {
    setEditModeCharacters(editModeCharacters.includes(id)
      ? editModeCharacters.filter(charId => charId !== id)
      : [...editModeCharacters, id]
    )
  }

  const updateDesiredMainStat = (charId: number, artifactType: string, stat: string) => {
    updateCharacter(charId, {
      desiredMainStats: {
        ...selectedCharacters.find(c => c.id === charId)?.desiredMainStats,
        [artifactType]: stat
      }
    })
  }

  const toggleDesiredSubStat = (charId: number, stat: string) => {
    const character = selectedCharacters.find(c => c.id === charId)
    if (character) {
      const newDesiredSubStats = character.desiredSubStats.includes(stat)
        ? character.desiredSubStats.filter(s => s !== stat)
        : [...character.desiredSubStats, stat]
      updateCharacter(charId, { desiredSubStats: newDesiredSubStats })
    }
  }

  const recommendArtifacts = (character: Character) => {
    // This is a simplified recommendation logic
    const recommendedArtifacts: Artifact[] = []

    artifactTypes.forEach(type => {
      const mainStat = character.desiredMainStats[type] || mainStats[type as keyof typeof mainStats][0]
      const subStats = character.desiredSubStats.slice(0, 4) // Take up to 4 desired sub stats
      recommendedArtifacts.push({
        type,
        set: artifactSets[0], // For simplicity, always recommend the first set
        mainStat,
        subStats,
        rarity: 5 // Always recommend 5-star artifacts
      })
    })

    return recommendedArtifacts
  }

  const getPrioritizedDomains = () => {
    const focusedCharacters = selectedCharacters.filter(char => char.focused)
    const domainCounts = domains.reduce((acc, domain) => ({ ...acc, [domain]: 0 }), {})
    
    focusedCharacters.forEach(char => {
      // This is a simplified logic. In a real app, you'd have more complex matching
      domainCounts['Clear Pool and Mountain Cavern']++
    })

    return Object.entries(domainCounts)
      .sort(([,a], [,b]) => b - a)
      .map(([domain]) => domain)
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Genshin Impact Build Manager</h1>
      
      {selectedCharacters.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Welcome to Genshin Impact Build Manager</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Start by adding characters to your account:</p>
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              {characters.map(char => (
                <Button
                  key={char.id}
                  onClick={() => addCharacter(char.id.toString())}
                  className="mb-2 w-full justify-start"
                  variant="outline"
                >
                  <Image
                    src={`/placeholder.svg?height=40&width=40`}
                    alt={char.name}
                    width={40}
                    height={40}
                    className="mr-2 rounded-full"
                  />
                  {char.name} ({char.element}) - {char.weaponType}
                </Button>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="mb-4">
            <Select onValueChange={addCharacter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Add a character" />
              </SelectTrigger>
              <SelectContent>
                {characters
                  .filter(char => !selectedCharacters.some(c => c.id === char.id))
                  .map(char => (
                    <SelectItem key={char.id} value={char.id.toString()}>
                      <div className="flex items-center">
                        <Image
                          src={`/placeholder.svg?height=30&width=30`}
                          alt={char.name}
                          width={30}
                          height={30}
                          className="mr-2 rounded-full"
                        />
                        {char.name} ({char.element}) - {char.weaponType}
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {selectedCharacters.map(char => (
              <Card key={char.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Image
                        src={`/placeholder.svg?height=50&width=50`}
                        alt={char.name}
                        width={50}
                        height={50}
                        className="mr-2 rounded-full"
                      />
                      {char.name} ({char.element})
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`focus-${char.id}`}
                        checked={char.focused}
                        onCheckedChange={() => toggleFocus(char.id)}
                      />
                      <Label htmlFor={`focus-${char.id}`}>Focused</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleEditMode(char.id)}
                      >
                        {editModeCharacters.includes(char.id) ? <XIcon size={16} /> : <PencilIcon size={16} />}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeCharacter(char.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {editModeCharacters.includes(char.id) ? (
                    <>
                      <div className="mb-4">
                        <Label htmlFor={`weapon-${char.id}`}>Weapon ({char.weaponType})</Label>
                        <Select
                          value={char.weapon}
                          onValueChange={(value) => updateCharacter(char.id, { weapon: value })}
                        >
                          <SelectTrigger id={`weapon-${char.id}`}>
                            <SelectValue placeholder={`Select a ${char.weaponType}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {weapons[char.weaponType as keyof typeof weapons].map(weapon => (
                              <SelectItem key={weapon} value={weapon}>
                                <div className="flex items-center">
                                  <Image
                                    src={`/placeholder.svg?height=30&width=30`}
                                    alt={weapon}
                                    width={30}
                                    height={30}
                                    className="mr-2"
                                  />
                                  {weapon}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="mb-4">
                        <Label>Desired Main Stats</Label>
                        {artifactTypes.map(type => (
                          <div key={type} className="mb-2">
                            <Label htmlFor={`mainstat-${char.id}-${type}`}>{type}</Label>
                            <Select
                              value={char.desiredMainStats[type] || ''}
                              onValueChange={(value) => updateDesiredMainStat(char.id, type, value)}
                            >
                              <SelectTrigger id={`mainstat-${char.id}-${type}`}>
                                <SelectValue placeholder={`Select ${type} main stat`} />
                              </SelectTrigger>
                              <SelectContent>
                                {mainStats[type as keyof typeof mainStats].map(stat => (
                                  <SelectItem key={stat} value={stat}>{stat}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        ))}
                      </div>

                      <div>
                        <Label>Desired Sub Stats</Label>
                        <div className="flex flex-wrap gap-2">
                          {subStats.map(stat => (
                            <div key={stat} className="flex items-center">
                              <Checkbox
                                id={`substat-${char.id}-${stat}`}
                                checked={char.desiredSubStats.includes(stat)}
                                onCheckedChange={() => toggleDesiredSubStat(char.id, stat)}
                              />
                              <Label htmlFor={`substat-${char.id}-${stat}`} className="ml-2">{stat}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <strong className="mr-2">Weapon:</strong>
                        {char.weapon ? (
                          <>
                            <Image
                              src={`/placeholder.svg?height=30&width=30`}
                              alt={char.weapon}
                              width={30}
                              height={30}
                              className="mr-2"
                            />
                            {char.weapon}
                          </>
                        ) : (
                          'Not set'
                        )}
                      </div>
                      <p><strong>Desired Main Stats:</strong></p>
                      <ul className="list-disc list-inside">
                        {Object.entries(char.desiredMainStats).map(([type, stat]) => (
                          <li key={type}>{type}: {stat}</li>
                        ))}
                      </ul>
                      <p><strong>Desired Sub Stats:</strong> {char.desiredSubStats.join(', ') || 'None set'}</p>
                      <div>
                        <strong>Recommended Artifacts:</strong>
                        <ul className="list-disc list-inside">
                          {recommendArtifacts(char).map((artifact, index) => (
                            <li key={index} className="flex items-center mb-2">
                              <Image
                                src={`/placeholder.svg?height=30&width=30`}
                                alt={artifact.type}
                                width={30}
                                height={30}
                                className="mr-2"
                              />
                              {artifact.type}: {artifact.mainStat} (Main), {artifact.subStats.join(', ')} (Sub)
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Prioritized Domains</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside">
                {getPrioritizedDomains().map((domain, index) => (
                  <li key={domain} className="mb-2 flex items-center">
                    <Image
                      src={`/placeholder.svg?height=30&width=30`}
                      alt={domain}
                      width={30}
                      height={30}
                      className="mr-2"
                    />
                    {domain}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}