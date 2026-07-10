import { Product } from '../models/product.model';

export const PRODUCT_MOCK_DATA: Product[] = [
  {
    id: 'PRD-001',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with USB receiver',
    category: 'Accessories',
    price: 590,
    stockQuantity: 25,
    status: 'Active',
    createdDate: '2026-07-01T09:00:00',
    updatedDate: '2026-07-01T09:00:00'
  },
  {
    id: 'PRD-002',
    name: 'Wireless Keyboard',
    description: 'Slim wireless keyboard with quiet keys',
    category: 'Accessories',
    price: 890,
    stockQuantity: 18,
    status: 'Active',
    createdDate: '2026-07-01T10:00:00',
    updatedDate: '2026-07-01T10:00:00'
  },
  {
    id: 'PRD-003',
    name: 'Gaming Mouse',
    description: 'RGB gaming mouse with adjustable DPI settings',
    category: 'Accessories',
    price: 1290,
    stockQuantity: 12,
    status: 'Active',
    createdDate: '2026-07-01T11:00:00',
    updatedDate: '2026-07-03T14:30:00'
  },
  {
    id: 'PRD-004',
    name: 'Laptop Stand',
    description: 'Aluminum adjustable laptop stand for desks',
    category: 'Accessories',
    price: 750,
    stockQuantity: 0,
    status: 'Out of Stock',
    createdDate: '2026-07-02T08:45:00',
    updatedDate: '2026-07-04T08:15:00'
  },
  {
    id: 'PRD-005',
    name: 'USB-C Docking Station',
    description: 'Multi-port docking station with HDMI and Ethernet',
    category: 'Computer',
    price: 3290,
    stockQuantity: 6,
    status: 'Active',
    createdDate: '2026-07-02T09:30:00',
    updatedDate: '2026-07-05T13:20:00'
  },
  {
    id: 'PRD-006',
    name: 'Mechanical Keyboard',
    description: 'Hot-swappable mechanical keyboard with backlight',
    category: 'Computer',
    price: 2590,
    stockQuantity: 14,
    status: 'Active',
    createdDate: '2026-07-02T10:15:00',
    updatedDate: '2026-07-05T16:00:00'
  },
  {
    id: 'PRD-007',
    name: 'Office Monitor 24',
    description: '24-inch full HD monitor for office productivity',
    category: 'Computer',
    price: 4490,
    stockQuantity: 9,
    status: 'Active',
    createdDate: '2026-07-02T11:00:00',
    updatedDate: '2026-07-06T09:30:00'
  },
  {
    id: 'PRD-008',
    name: 'Office Monitor 27',
    description: '27-inch IPS monitor with ergonomic stand',
    category: 'Computer',
    price: 6990,
    stockQuantity: 3,
    status: 'Inactive',
    createdDate: '2026-07-02T13:40:00',
    updatedDate: '2026-07-06T11:20:00'
  },
  {
    id: 'PRD-009',
    name: 'Smartphone Case Pro',
    description: 'Shockproof smartphone case with matte finish',
    category: 'Mobile',
    price: 390,
    stockQuantity: 35,
    status: 'Active',
    createdDate: '2026-07-03T08:20:00',
    updatedDate: '2026-07-03T08:20:00'
  },
  {
    id: 'PRD-010',
    name: 'Smartphone Case Lite',
    description: 'Transparent lightweight smartphone case',
    category: 'Mobile',
    price: 250,
    stockQuantity: 42,
    status: 'Active',
    createdDate: '2026-07-03T09:10:00',
    updatedDate: '2026-07-03T09:10:00'
  },
  {
    id: 'PRD-011',
    name: 'Wireless Earbuds',
    description: 'Noise-isolating earbuds with charging case',
    category: 'Mobile',
    price: 1890,
    stockQuantity: 0,
    status: 'Out of Stock',
    createdDate: '2026-07-03T10:50:00',
    updatedDate: '2026-07-06T17:15:00'
  },
  {
    id: 'PRD-012',
    name: 'Tablet Stand',
    description: 'Foldable tablet stand for meetings and study',
    category: 'Mobile',
    price: 490,
    stockQuantity: 16,
    status: 'Inactive',
    createdDate: '2026-07-03T13:25:00',
    updatedDate: '2026-07-07T08:45:00'
  },
  {
    id: 'PRD-013',
    name: 'Air Purifier',
    description: 'Compact air purifier suitable for small rooms',
    category: 'Home Appliance',
    price: 5590,
    stockQuantity: 8,
    status: 'Active',
    createdDate: '2026-07-04T09:00:00',
    updatedDate: '2026-07-07T10:10:00'
  },
  {
    id: 'PRD-014',
    name: 'Robot Vacuum Mini',
    description: 'Entry-level robot vacuum with scheduled cleaning',
    category: 'Home Appliance',
    price: 8990,
    stockQuantity: 4,
    status: 'Active',
    createdDate: '2026-07-04T10:35:00',
    updatedDate: '2026-07-08T09:25:00'
  },
  {
    id: 'PRD-015',
    name: 'Electric Kettle',
    description: '1.7L stainless steel electric kettle',
    category: 'Home Appliance',
    price: 1190,
    stockQuantity: 20,
    status: 'Active',
    createdDate: '2026-07-04T14:10:00',
    updatedDate: '2026-07-04T14:10:00'
  },
  {
    id: 'PRD-016',
    name: 'Label Printer',
    description: 'Portable label printer for office organization',
    category: 'Office Equipment',
    price: 2790,
    stockQuantity: 5,
    status: 'Active',
    createdDate: '2026-07-05T08:30:00',
    updatedDate: '2026-07-08T14:40:00'
  },
  {
    id: 'PRD-017',
    name: 'Document Scanner',
    description: 'Duplex document scanner for office paperwork',
    category: 'Office Equipment',
    price: 7490,
    stockQuantity: 2,
    status: 'Inactive',
    createdDate: '2026-07-05T09:25:00',
    updatedDate: '2026-07-08T16:10:00'
  },
  {
    id: 'PRD-018',
    name: 'Desk Lamp Pro',
    description: 'LED desk lamp with adjustable brightness levels',
    category: 'Office Equipment',
    price: 1390,
    stockQuantity: 0,
    status: 'Out of Stock',
    createdDate: '2026-07-05T11:45:00',
    updatedDate: '2026-07-09T09:05:00'
  },
  {
    id: 'PRD-019',
    name: 'USB Flash Drive 128GB',
    description: 'High-speed USB 3.0 flash drive with 128GB capacity',
    category: 'Accessories',
    price: 420,
    stockQuantity: 28,
    status: 'Active',
    createdDate: '2026-07-05T15:15:00',
    updatedDate: '2026-07-09T11:45:00'
  },
  {
    id: 'PRD-020',
    name: 'Webcam HD',
    description: '1080p webcam with built-in microphone',
    category: 'Electronics',
    price: 2190,
    stockQuantity: 11,
    status: 'Active',
    createdDate: '2026-07-06T09:00:00',
    updatedDate: '2026-07-10T08:30:00'
  }
];
