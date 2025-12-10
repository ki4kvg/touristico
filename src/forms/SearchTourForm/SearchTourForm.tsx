import styles from './SearchTourForm.module.scss';
import Button from '@/components/Button/Button.tsx';
import IconLabel from '@/components/IconLabel/IconLabel.tsx';
import { CityIcon, HotelIcon } from '@/assets';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import DropdownInput from '@/components/Dropdown/DropdownInput.tsx';
import { useSearchTour } from '@/modules/search/hooks/useSearchForm.ts';
import type { NormalizedGeoItem } from '@/modules/search/dto/search.dto.ts';
import * as React from 'react';

const SEARCH_TOUR = {
  SEARCH_VALUE_ID: 'searchValue',
  SELECTED_OBJECT_ID: 'selectedValue',
} as const;

const formSchema = z.object({
  [SEARCH_TOUR.SEARCH_VALUE_ID]: z.string().min(1, 'Будь ласка, введіть інформацію для пошуку'),
  [SEARCH_TOUR.SELECTED_OBJECT_ID]: z
    .object({
      countryId: z.union([z.string(), z.number()]),
    })
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function SearchTourForm() {
  const { isOpen, setIsOpen, options, isLoading, selectOption, handleInputChange, searchField, clear } =
    useSearchTour();

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    criteriaMode: 'all',
  });

  const handleClickInput = () => {
    setIsOpen(true);
  };

  const handleSelectOption = (option: NormalizedGeoItem) => {
    selectOption(option);
    setValue(SEARCH_TOUR.SEARCH_VALUE_ID, option.name);
    setValue(SEARCH_TOUR.SELECTED_OBJECT_ID, {
      countryId: option.type === 'country' ? option.id : option.countryId,
    });
    setIsOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    handleInputChange(value);
    setValue(SEARCH_TOUR.SEARCH_VALUE_ID, value);
  };

  const handleClear = () => {
    clear();
    setValue(SEARCH_TOUR.SEARCH_VALUE_ID, '');
  };

  const renderIcon = (item: NormalizedGeoItem) => {
    if (item.type === 'hotel') return <HotelIcon />;
    if (item.type === 'city') return <CityIcon />;
    return <img src={item.icon} alt="flag" width={24} />;
  };

  const onSubmit = async (form: FormValues) => {
    try {
      //TODO in next task
      console.log('Form values', form);
    } catch (error) {
      console.error(error, 'Error starting search');
    }
  };

  const onInvalid = (errors: any) => console.error('onInvalid', errors);

  return (
    <div className={styles.wrapper}>
      <p>Форма пошуку турів</p>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <DropdownInput
          isShown={isOpen}
          isLoading={isLoading}
          value={searchField}
          handleClear={handleClear}
          onClick={handleClickInput}
          onChange={handleChange}
          id={SEARCH_TOUR.SEARCH_VALUE_ID}
          error={!!errors[SEARCH_TOUR.SEARCH_VALUE_ID]}
          helperText={errors[SEARCH_TOUR.SEARCH_VALUE_ID]?.message}
        >
          {options.map((item) => (
            <IconLabel
              key={item.id}
              onClick={() => handleSelectOption(item)}
              icon={renderIcon(item)}
              label={item.name}
            />
          ))}
        </DropdownInput>
        <Button color="primary" type="submit">
          Знайти
        </Button>
      </form>
    </div>
  );
}
