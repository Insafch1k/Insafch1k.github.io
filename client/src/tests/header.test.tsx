import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { Header } from '../components/header/header';
import { renderWithProviders } from './render-with-providers';
import { AuthorizationStatus } from '../const';
import { makeFakeOffer } from './mocks';

const fakeUserInfo = {
  email: 'test@example.com',
  name: 'Test User',
  avatarUrl: 'https://example.com/avatar.jpg',
  isPro: false,
  token: 'fake-token',
};

describe('Header — неавторизованный пользователь', () => {
  it('отображает ссылку Sign in', () => {
    renderWithProviders(<Header />, {
      storeOverrides: { authorizationStatus: AuthorizationStatus.NoAuth },
    });
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it('не отображает Sign out', () => {
    renderWithProviders(<Header />, {
      storeOverrides: { authorizationStatus: AuthorizationStatus.NoAuth },
    });
    expect(screen.queryByText(/sign out/i)).not.toBeInTheDocument();
  });

  it('при Unknown показывает Sign in', () => {
    renderWithProviders(<Header />, {
      storeOverrides: { authorizationStatus: AuthorizationStatus.Unknown },
    });
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });
});

describe('Header — авторизованный пользователь', () => {
  it('отображает имя пользователя и Sign out', () => {
    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUserInfo,
        offers: [],
      },
    });

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
  });

  it('показывает количество избранных объявлений', () => {
    const fav1 = { ...makeFakeOffer(), isFavorite: true };
    const fav2 = { ...makeFakeOffer(), isFavorite: true };
    const plain = { ...makeFakeOffer(), isFavorite: false };

    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUserInfo,
        offers: [fav1, fav2, plain],
      },
    });

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('содержит ссылку на страницу избранного', () => {
    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUserInfo,
        offers: [],
      },
    });

    const favoritesLink = screen.getByRole('link', { name: /test user/i });
    expect(favoritesLink).toHaveAttribute('href', '/favorites');
  });
});
