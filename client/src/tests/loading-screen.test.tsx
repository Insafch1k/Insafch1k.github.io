import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingScreen } from '../components/loading-screen/loading-screen';

describe('LoadingScreen', () => {
  it('отображает текст загрузки', () => {
    render(<LoadingScreen />);
    expect(screen.getByText('Loading ...')).toBeInTheDocument();
  });
});
