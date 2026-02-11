export const productGradients = [
  'linear-gradient(135deg, #647DEE 0%, #7F53AC 100%)',
  'linear-gradient(135deg, #F54EA2 0%, #FF7676 100%)',
  'linear-gradient(135deg, #43CBFF 0%, #9708CC 100%)',
  'linear-gradient(135deg, #F6D365 0%, #FDA085 100%)',
  'linear-gradient(135deg, #89F7FE 0%, #66A6FF 100%)',
  'linear-gradient(135deg, #8EC5FC 0%, #E0C3FC 100%)',
]

export const formatPrice = (value) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)

export const getStockInfo = (produto) => {
  if (!produto.ativo) {
    return { label: 'Indisponivel', className: 'badge badge-muted', icon: 'X' }
  }

  if (produto.estoque === 0) {
    return { label: 'Sem estoque', className: 'badge badge-danger', icon: '!' }
  }

  if (produto.estoque < 10) {
    return {
      label: `Apenas ${produto.estoque} unidades`,
      className: 'badge badge-warning',
      icon: '!',
    }
  }

  return {
    label: `${produto.estoque} unidades`,
    className: 'badge badge-success',
    icon: 'OK',
  }
}

const API_BASE_URL = import.meta.env.VITE_API_URL ?? ''

const buildUrl = (path, params = {}) => {
  const base = API_BASE_URL.replace(/\/$/, '')
  const url = `${base}${path}`
  const query = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return
    query.set(key, value)
  })

  const queryString = query.toString()
  return queryString ? `${url}?${queryString}` : url
}

export const fetchProducts = async ({ search, category, sort, availability }) => {
  const url = buildUrl('/api/produtos', {
    nome: search?.trim() || undefined,
    categoria: category && category !== 'all' ? category : undefined,
    sort: sort || undefined,
    disponivel: availability,
  })

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Erro ao carregar produtos.')
  }

  return response.json()
}

export const fetchCategories = async () => {
  const url = buildUrl('/api/produtos/categorias')
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Erro ao carregar categorias.')
  }

  return response.json()
}

const jsonRequest = (method, url, payload) =>
  fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: payload ? JSON.stringify(payload) : undefined,
  })

export const createProduct = async (payload) => {
  const url = buildUrl('/api/produtos')
  const response = await jsonRequest('POST', url, payload)

  if (!response.ok) {
    throw new Error('Erro ao criar produto.')
  }

  return response.json()
}

export const updateProduct = async (id, payload) => {
  const url = buildUrl(`/api/produtos/${id}`)
  const response = await jsonRequest('PUT', url, payload)

  if (!response.ok) {
    throw new Error('Erro ao atualizar produto.')
  }
}

export const deleteProduct = async (id) => {
  const url = buildUrl(`/api/produtos/${id}`)
  const response = await fetch(url, { method: 'DELETE' })

  if (!response.ok) {
    throw new Error('Erro ao excluir produto.')
  }
}
