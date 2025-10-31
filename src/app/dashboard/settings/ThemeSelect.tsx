'use client';

import { Select, SelectItem } from '@tremor/react';
import { useTheme } from 'next-themes';

export const ThemeSelect = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Select
      value={theme}
      onChange={(e) => {
        const newTheme = e as unknown as string;
        setTheme(newTheme);
      }}
    >
      <SelectItem value="light">Light</SelectItem>
      <SelectItem value="dark">Dark</SelectItem>
    </Select>
  );
};
