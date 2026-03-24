import { describe, it, expect } from 'vitest';
import { getCity, getOffersByCity, sortOffersByType } from '../utils';
import { makeFakeOffer } from './mocks';
import { SortOffersType, CITIES_LOCATION } from '../const';

describe('getCity', () => {
  it('возвращает данные города из шести допустимых', () => {
    const amsterdam = getCity('Amsterdam');
    expect(amsterdam.name).toBe('Amsterdam');
  });

  it('для неизвестного имени возвращает город по умолчанию (Paris)', () => {
    const fallback = getCity('UnknownCity');
    expect(fallback.name).toBe('Paris');
  });
});

describe('getOffersByCity', () => {
  it('возвращает только объявления указанного города', () => {
    const paris = CITIES_LOCATION[0];
    const cologne = CITIES_LOCATION[1];
    const parisOffer = { ...makeFakeOffer(), city: paris };
    const cologneOffer = { ...makeFakeOffer(), city: cologne };

    const result = getOffersByCity('Paris', [parisOffer, cologneOffer]);

    expect(result).toHaveLength(1);
    expect(result[0].city.name).toBe('Paris');
  });

  it('возвращает пустой массив, если город не найден среди объявлений', () => {
    const offers = [makeFakeOffer(), makeFakeOffer()];
    expect(getOffersByCity('Tokyo', offers)).toHaveLength(0);
  });

  it('возвращает пустой массив при пустом списке предложений', () => {
    expect(getOffersByCity('Paris', [])).toEqual([]);
  });

  it('возвращает пустой массив при undefined имени города', () => {
    expect(getOffersByCity(undefined, [makeFakeOffer()])).toEqual([]);
  });
});

describe('sortOffersByType', () => {
  it('сортирует от дешёвых к дорогим (PriceToHigh)', () => {
    const offers = [
      { ...makeFakeOffer(), price: 300 },
      { ...makeFakeOffer(), price: 100 },
      { ...makeFakeOffer(), price: 200 },
    ];

    const result = sortOffersByType([...offers], SortOffersType.PriceToHigh);

    expect(result[0].price).toBe(100);
    expect(result[2].price).toBe(300);
  });

  it('сортирует от дорогих к дешёвым (PriceToLow)', () => {
    const offers = [
      { ...makeFakeOffer(), price: 100 },
      { ...makeFakeOffer(), price: 300 },
    ];

    const result = sortOffersByType([...offers], SortOffersType.PriceToLow);

    expect(result[0].price).toBe(300);
  });

  it('сортирует по рейтингу (Top rated first)', () => {
    const offers = [
      { ...makeFakeOffer(), rating: 3 },
      { ...makeFakeOffer(), rating: 5 },
      { ...makeFakeOffer(), rating: 4 },
    ];

    const result = sortOffersByType([...offers], SortOffersType.TopRated);

    expect(result[0].rating).toBe(5);
    expect(result[2].rating).toBe(3);
  });

  it('Popular не меняет порядок относительно входного списка', () => {
    const a = { ...makeFakeOffer(), price: 300, rating: 1 };
    const b = { ...makeFakeOffer(), price: 100, rating: 5 };
    const offers = [a, b];
    const result = sortOffersByType([...offers], SortOffersType.Popular);
    expect(result[0].id).toBe(a.id);
    expect(result[1].id).toBe(b.id);
  });

  it('не изменяет исходный массив (ссылка и порядок элементов)', () => {
    const offers = [
      { ...makeFakeOffer(), price: 100 },
      { ...makeFakeOffer(), price: 200 },
    ];

    const copy = [...offers];

    sortOffersByType(offers, SortOffersType.PriceToHigh);

    expect(offers).toEqual(copy);
  });

  it('корректно работает при пустом массиве', () => {
    expect(sortOffersByType([], SortOffersType.PriceToHigh)).toEqual([]);
    expect(sortOffersByType([], SortOffersType.TopRated)).toEqual([]);
  });
});
