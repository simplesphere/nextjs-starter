import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

/**
 * Example test file to verify testing setup is working.
 * Replace with your actual tests.
 */
describe('Example Test', () => {
	it('should render a simple component', () => {
		render(<div>Hello World</div>)
		expect(screen.getByText('Hello World')).toBeInTheDocument()
	})
})
