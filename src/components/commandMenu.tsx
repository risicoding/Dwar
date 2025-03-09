'use client';
import { Plus } from 'lucide-react';
import { GiPin } from 'react-icons/gi';

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useState } from 'react';
import { api } from '@/trpc/react';

export const CommandMenu = () => {
  const [value, setValue] = useState<string | undefined>();

  return (
    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
      <CommandInput
        value={value}
        onValueChange={setValue}
        placeholder="Type a command or search..."
      />
      <CommandList>
        <CommandGroup heading="Actions">
          <CommandItem>
            <Plus />
            <span>Create a entry</span>
            <span>{value}</span>
          </CommandItem>
          <CommandItem>
            <GiPin className="size-2" />
            <span>DID</span>
          </CommandItem>
          <CommandItem>
            <GiPin className="size-2" />
            <span>WILL</span>
          </CommandItem>
          <CommandItem>
            <GiPin className="size-2" />
            <span>ACHIEVED</span>
          </CommandItem>
          <CommandItem>
            <GiPin className="size-2" />
            <span>REGRET</span>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Entries">
          <CommandItem>Yesterday</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
