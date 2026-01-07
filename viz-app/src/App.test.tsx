import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
    it('renders without crashing', () => {
        render(<App />);
        // Check for the main title or a known element
        expect(screen.getByText(/Tema 1: Introducción/i)).toBeInTheDocument();
    });
});
