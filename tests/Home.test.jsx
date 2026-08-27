import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../src/pages/Home';

describe('Home Landing Page Component', () => {
  it('renders key headings and CTA buttons accurately', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText(/Learning that/i)).toBeInTheDocument();
    expect(screen.getByText(/Adapts to You./i)).toBeInTheDocument();
    expect(screen.getByText(/Built for the way/i)).toBeInTheDocument();
    expect(screen.getByText(/Social Studies/i)).toBeInTheDocument();
    expect(screen.getByText(/History/i)).toBeInTheDocument();
    expect(screen.getByText(/A full curriculum,/i)).toBeInTheDocument();
    expect(screen.getByText(/Free for everyone./i)).toBeInTheDocument();
  });
});
