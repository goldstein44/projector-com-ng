// frontend/tests/unit/ProductCard.test.tsx
import { render } from '@testing-library/react';
import ProductCard from '../../src/components/ProductCard';

test('renders ProductCard', () => {
  const { getByText } = render(<ProductCard name="Test" slug="test" image="" price={100} lumens={3000} resolution="1080p" hdmi={true} vga={false} />);
  expect(getByText('Test')).toBeInTheDocument();
});
