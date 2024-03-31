"use client";

import { ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { ListFilterAtom } from "@/atom/ListFilters";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAtom } from "jotai";
import Image from "next/image";
import Constitution from "./icon/Constitution";
import InnerForce from "./icon/InnerForce";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const TRAINING_LIST: { name: TrainingType; max: number }[] = [
  { name: "Constitution", max: 21 },
  { name: "Muscle Strength Manual", max: 20 },
  { name: "Nine Yin Manual", max: 20 },
  { name: "Nine Yang Manual", max: 20 },
  { name: "Violet Mist Art", max: 12 },
  { name: "Northern Profound Art", max: 12 },
  { name: "Toad Stance", max: 12 },
];

const getTrainingIcon = (training: TrainingType) => {
  switch (training) {
    case "Constitution":
      return <Constitution className="h-8 w-12" />;
    default:
      const formattedName = training.toLowerCase().replace(/\s/g, "_");

      return (
        <Image
          src={`/training/${formattedName}.webp`}
          alt={training}
          height={32}
          width={48}
          className="h-8 object-contain"
        />
      );
  }
};

export function TrainingSelector() {
  const [open, setOpen] = React.useState(false);
  const [{ training }, setListFilter] = useAtom(ListFilterAtom);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        role="combobox"
        aria-expanded={open}
        className="w-72 justify-between"
        noIcon
      >
        <InnerForce className="h-5 w-5" />
        Training
        <ChevronsUpDown className="ml-auto h-4 w-4 opacity-60 transition-[opacity] group-data-[state=open]:opacity-100" />
      </PopoverTrigger>
      <PopoverContent align="start" className="flex w-96 flex-col gap-4 p-3">
        {TRAINING_LIST.map(({ name, max }) => (
          <Label
            key={name}
            className="flex h-8 w-full items-center justify-end gap-2 text-sm font-medium"
          >
            {getTrainingIcon(name)}
            {name}

            <Input
              value={training[name][0]}
              onChange={(e) => {
                const value = Number(e.target.value);

                if (Number.isNaN(value)) return;

                setListFilter((prev) => ({
                  ...prev,
                  training: {
                    ...prev.training,
                    [name]: [value, prev.training[name][1]],
                  },
                }));
              }}
              onBlur={() => {
                let value = training[name][0];
                const maxValue = training[name][1];
                if (value < 0) value = 0;
                if (value > maxValue) value = maxValue;

                if (Number.isNaN(value)) return;

                setListFilter((prev) => ({
                  ...prev,
                  training: {
                    ...prev.training,
                    [name]: [value, prev.training[name][1]],
                  },
                }));
              }}
              defaultValue={0}
              className="h-8 w-10 px-1 text-center"
              wrapperClass="ml-auto"
            />
            <Input
              value={training[name][1]}
              onChange={(e) => {
                const value = Number(e.target.value);

                if (Number.isNaN(value)) return;

                setListFilter((prev) => ({
                  ...prev,
                  training: {
                    ...prev.training,
                    [name]: [prev.training[name][0], value],
                  },
                }));
              }}
              onBlur={() => {
                let value = training[name][1];
                const minValue = training[name][0];
                if (value < minValue) value = minValue;
                if (value > max) value = max;

                if (Number.isNaN(value)) return;

                setListFilter((prev) => ({
                  ...prev,
                  training: {
                    ...prev.training,
                    [name]: [prev.training[name][0], value],
                  },
                }));
              }}
              defaultValue={max}
              className="h-8 w-10 px-1 text-center"
            />
          </Label>
        ))}
      </PopoverContent>
    </Popover>
  );
}
