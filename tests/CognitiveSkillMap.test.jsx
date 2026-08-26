import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CognitiveSkillMap from '../src/components/CognitiveSkillMap';

describe('CognitiveSkillMap Component', () => {
  it('renders radar canvas title and skill dimensions', () => {
    render(<CognitiveSkillMap />);
    expect(screen.getByText('Interactive AI Cognitive Skill-Map')).toBeInTheDocument();
    expect(screen.getByText('Speed')).toBeInTheDocument();
    expect(screen.getByText('Memory')).toBeInTheDocument();
    expect(screen.getByText('Quantitative Logic')).toBeInTheDocument();
    expect(screen.getByText('Literacy')).toBeInTheDocument();
    expect(screen.getByText('Empathy')).toBeInTheDocument();
  });
});
