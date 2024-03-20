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

export type { Container, DBGetQueryFilter }
