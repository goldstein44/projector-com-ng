// frontend/__tests__/index.test.tsx
import '@testing-library/jest-dom'; // gives us toBeInTheDocument, toHaveAttribute, etc
import { render, screen } from '@testing-library/react';
import Home, { getServerSideProps } from '../pages/index'; // updated path
import { GetServerSidePropsContext } from 'next';
import AxiosMockAdapter from 'axios-mock-adapter';
import axios from 'axios';

describe('Home Component', () => {
  const mockProducts = [
    { id: '1', name: 'Projector A', slug: 'projector-a', image: '/images/projector-a.jpg', price: 150000 },
    { id: '2', name: 'Projector B', slug: 'projector-b', image: '/images/projector-b.jpg', price: 200000 },
  ];

  const mockRentals = [
    { id: '1', name: 'Rental Projector A', slug: 'rental-projector-a', image: '/images/rental-a.jpg', price_per_day: 15000 },
    { id: '2', name: 'Rental Projector B', slug: 'rental-projector-b', image: '/images/rental-b.jpg', price_per_day: 20000 },
  ];

  it('renders homepage with data', () => {
    render(<Home featuredProducts={mockProducts} featuredRentals={mockRentals} />);

    // Irresistible Offer
    expect(screen.getByText('Get a Bright, Reliable Projector — Exactly When You Need It')).toBeInTheDocument();
    expect(screen.getByText('Same-day delivery in Lekki/Ajah')).toBeInTheDocument();
    expect(screen.getByText('₦15,000/day')).toBeInTheDocument();
    expect(screen.getByText('Rent Now')).toBeInTheDocument();
    expect(screen.getByText('Buy Now')).toBeInTheDocument();
    expect(screen.getByText('WhatsApp Us')).toBeInTheDocument();

    // Featured Products
    expect(screen.getByText('Featured Projectors for Sale')).toBeInTheDocument();
    expect(screen.getByText('Projector A')).toBeInTheDocument();
    expect(screen.getByText('₦150000')).toBeInTheDocument();

    // Featured Rentals
    expect(screen.getByText('Featured Projectors for Rent')).toBeInTheDocument();
    expect(screen.getByText('Rental Projector A')).toBeInTheDocument();
    expect(screen.getByText('₦15000/day')).toBeInTheDocument();

    // Why Choose Us
    expect(screen.getByText('Why Choose Projector.online?')).toBeInTheDocument();
    expect(screen.getByText('High Quality')).toBeInTheDocument();
    expect(screen.getByText('Book on WhatsApp')).toHaveAttribute('href', 'https://wa.me/yourwhatsappnumber');
    expect(screen.getByText('Book Online')).toHaveAttribute('href', '/rental');
    expect(screen.getByText('Call Us to Book')).toHaveAttribute('href', 'tel:+2348012345678');
  });

  it('renders homepage with no data', () => {
    render(<Home featuredProducts={[]} featuredRentals={[]} />);

    expect(screen.getByText('No featured products available at the moment')).toBeInTheDocument();
    expect(screen.getByText('No featured rentals available at the moment')).toBeInTheDocument();
  });
});

describe('getServerSideProps', () => {
  let mockAxios: AxiosMockAdapter;

  beforeEach(() => {
    mockAxios = new AxiosMockAdapter(axios);
    process.env.NEXT_PUBLIC_BACKEND_URL = 'http://localhost:8000/api/';
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('fetches data successfully', async () => {
    mockAxios.onGet('http://localhost:8000/api/products/?limit=3').reply(200, [
      { id: '1', name: 'Projector A', slug: 'projector-a', image: '/images/projector-a.jpg', price: 150000 },
    ]);
    mockAxios.onGet('http://localhost:8000/api/rentals/?limit=3').reply(200, [
      { id: '1', name: 'Rental Projector A', slug: 'rental-projector-a', image: '/images/rental-a.jpg', price_per_day: 15000 },
    ]);

    const context = {} as GetServerSidePropsContext;
    const result = await getServerSideProps(context);

    expect(result).toEqual({
      props: {
        featuredProducts: [{ id: '1', name: 'Projector A', slug: 'projector-a', image: '/images/projector-a.jpg', price: 150000 }],
        featuredRentals: [{ id: '1', name: 'Rental Projector A', slug: 'rental-projector-a', image: '/images/rental-a.jpg', price_per_day: 15000 }],
      },
    });
  });

  it('handles API failure', async () => {
    mockAxios.onGet('http://localhost:8000/api/products/?limit=3').reply(500);
    mockAxios.onGet('http://localhost:8000/api/rentals/?limit=3').reply(500);

    const context = {} as GetServerSidePropsContext;
    const result = await getServerSideProps(context);

    expect(result).toEqual({
      props: {
        featuredProducts: [],
        featuredRentals: [],
      },
    });
  });
});