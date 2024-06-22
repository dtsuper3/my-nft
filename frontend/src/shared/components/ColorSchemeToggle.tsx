'use client';

import { Button, Group, rem, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

export function ColorSchemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <Button
      size='compact-md'
      radius={"md"}
      variant='outline'
      color='gray'      
      onClick={() => setColorScheme(colorScheme === "light" ? "dark" : "light")}>
      {
        colorScheme === "dark" ?
          <IconSun style={{ width: rem(22), height: rem(18) }} stroke={1.5} />
          :
          <IconMoon style={{ width: rem(22), height: rem(24) }} stroke={1.5} />
      }
    </Button>
  );
}