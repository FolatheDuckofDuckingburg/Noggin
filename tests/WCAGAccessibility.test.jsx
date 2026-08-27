import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SpellingBee from '../src/components/games/SpellingBee';

describe('WCAG Accessibility Features', () => {
  it('includes aria-label on speech button for screen readers', async () => {
    render(<SpellingBee />);
    const listenBtn = await screen.findByRole('button', { name: /listen to word/i });
    expect(listenBtn).toBeInTheDocument();
  });
});
