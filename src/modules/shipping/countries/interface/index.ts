interface Country {
  id: number;
  name: string;
  iso_code: string;
  is_active: number;
}

interface StateListCountry {
  id: number;
  name: string;
}

export { Country, StateListCountry };
