import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

/**
 * Example test file to verify testing setup is working.
 * Replace with your actual tests.
 */
describe('Example Test', () => {
	it('should render a simple component', () => {
		const { container } = render(<div>Hello World</div>)
		expect(container.textContent).toBe('Hello World')
	})
})
