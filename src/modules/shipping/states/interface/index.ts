import { StateListCountry } from '../../countries/interface';

interface State {
  id: number;
  name: string;
  is_active: number;
  created_at: Date;
  country: StateListCountry;
}

interface CountryListState {
  id: number;
  name: string;
  country: StateListCountry;
}

export { State, CountryListState };
