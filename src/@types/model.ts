interface Container {
  id: number
  barcode: string
  color?: string
  description?: string
  dimensions?: string
  images: string
  locale?: string
  material?: string
  name: string
  parent: number
  qrCode?: string
  sku: string
  state: string
  tags?: string
  unitOfMeasure?: string
  createdAt?: string
  updatedAt?: string
}

interface DBGetQueryFilter {
  sortBy: Array<string>
  itemsPerPage?: number
  sortDesc?: Array<string>
  page?: number
}

interface Product {
  id: number
  productAttributes: Array<string>
  barcode: string
  brand?: string
  categories?: string
  color?: string
  container?: string
  cost?: number
  description?: string
  dimensions?: string
  images: string | File
  locale: string
  material?: string
  name: string
  parent: number
  price?: number
  qrCode?: string
  quantity: number
  serial?: string
  sku: string
  slug: string
  state: string
  status: string
  tags: Array<string>
  type: string
  unitOfMeasure?: string
  warehouse?: string
  createdAt?: string
  updatedAt?: string
}

export type { Container, DBGetQueryFilter, Product }
