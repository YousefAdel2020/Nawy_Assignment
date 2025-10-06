
// API Configuration
export const API_CONFIG = {
  URL: process.env.API_URL ,
  STATIC_URL: process.env.STATIC_URL,
} as const

// Pagination Configuration
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE: parseInt(process.env.DEFAULT_PAGE || '1', 10),
  DEFAULT_TAKE: parseInt(process.env.DEFAULT_TAKE || '10', 10),
  MAX_TAKE: parseInt(process.env.MAX_TAKE || '50', 10),
} as const

// Filter Configuration
export const FILTER_CONFIG = {
  DEFAULT_SORT_BY: 'createdAt' as const,
  DEFAULT_SORT_DIRECTION: 'DESC' as const,
} as const

// UI Configuration
export const UI_CONFIG = {
  ITEMS_PER_PAGE_OPTIONS: [10, 20, 30, 50],
  DEBOUNCE_DELAY: parseInt(process.env.DEBOUNCE_DELAY || '300', 10),
} as const
