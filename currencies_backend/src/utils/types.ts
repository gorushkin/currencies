export type Currency = 'TRY' | 'USD' | 'RUB' | 'NZD' | 'EUR';

export type ErrorResponse = {
  ValCurs: {
    _text: string;
  };
};

export interface CurResponse {
  ValCurs: {
    _text?: string;
    Valute: {
      CharCode: {
        _text: Currency;
      };
      Name: {
        _text: string;
      };
      Value: {
        _text: string;
      };
      Nominal: {
        _text: string;
      };
    }[];
  };
}

export type Rate = {
  code: Currency;
  rate: number;
};

export type Currencies = Record<Currency, Rate[]>;
