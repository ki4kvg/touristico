import { z } from 'zod';

export const SEARCH_TOUR = {
  SEARCH_VALUE_ID: 'searchValue',
  SELECTED_OBJECT_ID: 'selectedValue',
} as const;

export const searchPricesFormSchema = z.object({
  [SEARCH_TOUR.SEARCH_VALUE_ID]: z.string().min(1, 'Будь ласка, введіть інформацію для пошуку'),
  [SEARCH_TOUR.SELECTED_OBJECT_ID]: z
    .object({
      countryId: z.union([z.string(), z.number()]),
    })
    .optional(),
});

export type SearchPricesFormValues = z.infer<typeof searchPricesFormSchema>;
