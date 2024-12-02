import { useExerciseStore } from '#entities/exercise';
import { useDebouncedCallback } from '#shared/lib/react/hooks/useDebouncedCallback.ts';
import { useInput } from '#shared/lib/react/hooks/useInput.ts';
import { Input } from 'antd';
import { type ChangeEvent, useEffect } from 'react';

export function SearchBar() {
  const { queryParams, setQueryParams } = useExerciseStore((state) => state);
  const debouncedSetQueryParams = useDebouncedCallback(setQueryParams, 300);

  const [search, setSearch] = useInput(queryParams.search);

  // biome-ignore lint/correctness/useExhaustiveDependencies(setSearch):
  useEffect(() => {
    setSearch(queryParams.search);
  }, [queryParams.search]);

  const handleSearchChange = ({
    target
  }: ChangeEvent<HTMLInputElement>): void => {
    setSearch(target.value);
    debouncedSetQueryParams({ search: target.value });
  };

  return (
    <Input
      role="search"
      placeholder="Search exercises..."
      allowClear={true}
      style={{ marginBottom: 16 }}
      value={search}
      onChange={handleSearchChange}
    />
  );
}
