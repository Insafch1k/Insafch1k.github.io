import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NotFoundPage } from '../pages/not-found-page/not-found-page';
import { AppRoute } from '../const';

describe('NotFoundPage', () => {
  const renderPage = () =>
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

  it('отображает заголовок PAGE NOT FOUND', () => {
    renderPage();
    expect(
      screen.getByRole('heading', { level: 1, name: /page not found/i }),
    ).toBeInTheDocument();
  });

  it('ссылка на главную страницу присутствует', () => {
    renderPage();
    expect(
      screen.getByRole('link', { name: /перейдите на главную страницу/i }),
    ).toBeInTheDocument();
  });

  it('ссылка ведет на главную "/"', () => {
    renderPage();
    const link = screen.getByRole('link', {
      name: /перейдите на главную страницу/i,
    });
    expect(link).toHaveAttribute('href', AppRoute.Main);
  });
});
