import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { CitiesCard } from '../components/cities-card/cities-card';
import { renderWithProviders } from './render-with-providers';
import { makeFakeOffer } from './mocks';
import { AuthorizationStatus } from '../const';

describe('CitiesCard', () => {
  it('заголовок объявления отображается на карточке', () => {
    const offer = { ...makeFakeOffer(), title: 'Unique Loft Title' };
    renderWithProviders(<CitiesCard offer={offer} />, {
      storeOverrides: { authorizationStatus: AuthorizationStatus.Auth },
    });
    expect(screen.getByText('Unique Loft Title')).toBeInTheDocument();
  });

  it('цена объявления присутствует в разметке', () => {
    const offer = { ...makeFakeOffer(), price: 333 };
    renderWithProviders(<CitiesCard offer={offer} />, {
      storeOverrides: { authorizationStatus: AuthorizationStatus.NoAuth },
    });
    expect(screen.getByText('€333')).toBeInTheDocument();
  });

  it('метка Premium отображается при isPremium = true', () => {
    const offer = { ...makeFakeOffer(), isPremium: true };
    renderWithProviders(<CitiesCard offer={offer} />, {
      storeOverrides: { authorizationStatus: AuthorizationStatus.NoAuth },
    });
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('метка Premium отсутствует при isPremium = false', () => {
    const offer = { ...makeFakeOffer(), isPremium: false };
    renderWithProviders(<CitiesCard offer={offer} />, {
      storeOverrides: { authorizationStatus: AuthorizationStatus.NoAuth },
    });
    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('ссылка на объявление содержит id в href (/offer/id)', () => {
    const offer = { ...makeFakeOffer(), id: 'offer-test-42', title: 'Card Title X' };
    renderWithProviders(<CitiesCard offer={offer} />, {
      storeOverrides: { authorizationStatus: AuthorizationStatus.NoAuth },
    });
    expect(screen.getByRole('link', { name: 'Card Title X' })).toHaveAttribute(
      'href',
      '/offer/offer-test-42',
    );
  });
});
