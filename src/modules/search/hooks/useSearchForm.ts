import { useCallback, useEffect, useState } from 'react';
import { resolveOptionsThunk } from '../store/search.thunks';
import { selectSearchOptions, selectSearchIsLoading, selectSearchType } from '../store/search.selectors';
import { setSearchType, setSelected } from '../store/search.slice';
import useDebounce from '@/hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import type { NormalizedGeoItem } from '@/modules/search/dto/search.dto.ts';

export const useSearchTour = () => {
  const dispatch = useAppDispatch();
  const options = useAppSelector(selectSearchOptions);
  const isLoading = useAppSelector(selectSearchIsLoading);
  const currentSearchType = useAppSelector(selectSearchType);

  const [isOpen, setIsOpen] = useState(false);
  const [searchField, setSearchField] = useState('');
  const [selectedItem, setSelectedItem] = useState<NormalizedGeoItem | null>(null);
  const debouncedValue = useDebounce(searchField, 300);

  useEffect(() => {
    const currentType = selectedItem ? selectedItem.type : undefined;

    dispatch(
      resolveOptionsThunk({
        isOpen,
        searchValue: debouncedValue,
        searchType: currentType,
      }),
    );
  }, [dispatch, isOpen, debouncedValue, currentSearchType]);

  const selectOption = useCallback(
    (item: any) => {
      dispatch(setSelected({ countryId: item.countryId }));
      dispatch(setSearchType(item.type));
      setSearchField(item.name);
      setSelectedItem(item);
      setIsOpen(false);
    },
    [dispatch],
  );

  const clear = useCallback(() => {
    setSearchField('');
    setSelectedItem(null);
    dispatch(setSelected(null));
    dispatch(setSearchType(undefined));
  }, [dispatch]);

  const handleInputChange = useCallback(
    (value: string) => {
      setSearchField(value);

      if (selectedItem) {
        setSelectedItem(null);
        dispatch(setSearchType(undefined));
        dispatch(setSelected(null));
      }
    },
    [dispatch, selectedItem],
  );

  return {
    isOpen,
    setIsOpen,
    searchField,
    setSearchField,
    debouncedValue,
    options,
    isLoading,
    selectOption,
    clear,
    handleInputChange,
  };
};
