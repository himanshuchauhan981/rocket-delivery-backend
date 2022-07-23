import { CountryListState } from '../../states/interface';

interface City {
  id: number;
  name: string;
  is_active: number;
  created_at: Date;
  state: CountryListState;
}

export { City };
