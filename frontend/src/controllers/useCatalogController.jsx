import { useEffect, useState } from 'react'
import {
  createProduct,
  deleteProduct,
  fetchCategories,
  fetchProducts,
  updateProduct,
} from '../models/productModel.jsx'

const sortOptions = [
  { value: 'recent', label: 'Ordenar: Mais Recentes', api: '-datacadastro' },
  { value: 'nameAsc', label: 'Ordenar: Nome (A-Z)', api: 'nome' },
  { value: 'nameDesc', label: 'Ordenar: Nome (Z-A)', api: '-nome' },
  { value: 'priceAsc', label: 'Ordenar: Preco (menor)', api: 'preco' },
  { value: 'priceDesc', label: 'Ordenar: Preco (maior)', api: '-preco' },
  { value: 'stockAsc', label: 'Ordenar: Estoque (menor)', api: 'estoque' },
  { value: 'stockDesc', label: 'Ordenar: Estoque (maior)', api: '-estoque' },
]

const getApiSort = (value) =>
  sortOptions.find((option) => option.value === value)?.api ?? '-datacadastro'

const availabilityOptions = [
  { value: 'all', label: 'Disponibilidade: Todos', api: undefined },
  { value: 'available', label: 'Disponibilidade: Disponiveis', api: true },
  { value: 'out', label: 'Disponibilidade: Sem estoque', api: false },
]

const getApiAvailability = (value) =>
  availabilityOptions.find((option) => option.value === value)?.api

const emptyForm = {
  nome: '',
  descricao: '',
  preco: '',
  estoque: '',
  categoria: '',
  imagemUrl: '',
  ativo: true,
}

const validateForm = (data) => {
  const errors = {}
  const nome = data.nome.trim()
  const descricao = data.descricao.trim()
  const categoria = data.categoria.trim()
  const imagemUrl = data.imagemUrl.trim()
  const precoValue = Number(data.preco)
  const estoqueValue = Number(data.estoque)

  if (!nome) {
    errors.nome = 'Nome e obrigatorio.'
  } else if (nome.length > 100) {
    errors.nome = 'Nome deve ter no maximo 100 caracteres.'
  }

  if (descricao && descricao.length > 500) {
    errors.descricao = 'Descricao deve ter no maximo 500 caracteres.'
  }

  if (data.preco === '' || Number.isNaN(precoValue) || precoValue <= 0) {
    errors.preco = 'Preco deve ser maior que 0.'
  }

  if (
    data.estoque === '' ||
    Number.isNaN(estoqueValue) ||
    estoqueValue < 0 ||
    !Number.isInteger(estoqueValue)
  ) {
    errors.estoque = 'Estoque nao pode ser negativo e deve ser inteiro.'
  }

  if (!categoria) {
    errors.categoria = 'Categoria e obrigatoria.'
  } else if (categoria.length > 80) {
    errors.categoria = 'Categoria deve ter no maximo 80 caracteres.'
  }

  if (imagemUrl && imagemUrl.length > 2048) {
    errors.imagemUrl = 'URL da imagem muito longa.'
  } else if (imagemUrl) {
    try {
      new URL(imagemUrl)
    } catch (err) {
      errors.imagemUrl = 'URL da imagem invalida.'
    }
  }

  return errors
}

export const useCatalogController = () => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [availability, setAvailability] = useState('all')
  const [sort, setSort] = useState('recent')
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState(emptyForm)
  const [formErrors, setFormErrors] = useState({})
  const [formStatus, setFormStatus] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleteStatus, setDeleteStatus] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let isActive = true

    const loadCategories = async () => {
      try {
        const data = await fetchCategories()
        if (isActive) setCategories(data)
      } catch (err) {
        if (isActive) setCategories([])
      }
    }

    loadCategories()

    return () => {
      isActive = false
    }
  }, [])

  const refreshCategories = async () => {
    try {
      const data = await fetchCategories()
      setCategories(data)
    } catch (err) {
      setCategories([])
    }
  }

  const refreshProducts = async () => {
    setError('')
    setIsLoading(true)

    try {
      const data = await fetchProducts({
        search,
        category,
        sort: getApiSort(sort),
        availability: getApiAvailability(availability),
      })
      setProducts(data)
    } catch (err) {
      setError('Nao foi possivel carregar os produtos. Verifique a API.')
      setProducts([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let isActive = true
    setError('')
    setIsLoading(true)

    const handle = setTimeout(async () => {
      try {
        const data = await fetchProducts({
          search,
          category,
          sort: getApiSort(sort),
          availability: getApiAvailability(availability),
        })

        if (isActive) setProducts(data)
      } catch (err) {
        if (isActive) {
          setError('Nao foi possivel carregar os produtos. Verifique a API.')
          setProducts([])
        }
      } finally {
        if (isActive) setIsLoading(false)
      }
    }, 250)

    return () => {
      isActive = false
      clearTimeout(handle)
    }
  }, [search, category, sort, availability])

  const handleOpenCreate = () => {
    setEditingProduct(null)
    setFormData(emptyForm)
    setFormErrors({})
    setFormStatus('')
    setIsFormOpen(true)
  }

  const handleOpenEdit = (produto) => {
    setEditingProduct(produto)
    setFormData({
      nome: produto.nome ?? '',
      descricao: produto.descricao ?? '',
      preco: produto.preco !== undefined && produto.preco !== null ? String(produto.preco) : '',
      estoque:
        produto.estoque !== undefined && produto.estoque !== null
          ? String(produto.estoque)
          : '',
      categoria: produto.categoria ?? '',
      imagemUrl: produto.imagemUrl ?? '',
      ativo: produto.ativo ?? true,
    })
    setFormErrors({})
    setFormStatus('')
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingProduct(null)
    setFormErrors({})
    setFormStatus('')
  }

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setFormErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const handleSubmitForm = async () => {
    const errors = validateForm(formData)
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setIsSaving(true)
    setFormStatus('')

    const payload = {
      nome: formData.nome.trim(),
      descricao: formData.descricao.trim() || null,
      preco: Number(formData.preco),
      estoque: Number(formData.estoque),
      categoria: formData.categoria.trim(),
      imagemUrl: formData.imagemUrl.trim() || null,
      ativo: Boolean(formData.ativo),
    }

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, payload)
      } else {
        await createProduct(payload)
      }
      handleCloseForm()
      await refreshProducts()
      await refreshCategories()
    } catch (err) {
      setFormStatus(
        editingProduct
          ? 'Nao foi possivel atualizar o produto.'
          : 'Nao foi possivel criar o produto.',
      )
    } finally {
      setIsSaving(false)
    }
  }

  const handleOpenDelete = (produto) => {
    setDeleteTarget(produto)
    setDeleteStatus('')
  }

  const handleCloseDelete = () => {
    setDeleteTarget(null)
    setDeleteStatus('')
  }

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return
    setIsDeleting(true)
    setDeleteStatus('')

    try {
      await deleteProduct(deleteTarget.id)
      handleCloseDelete()
      await refreshProducts()
      await refreshCategories()
    } catch (err) {
      setDeleteStatus('Nao foi possivel excluir o produto.')
    } finally {
      setIsDeleting(false)
    }
  }

  return {
    search,
    category,
    availability,
    sort,
    categories,
    sortOptions,
    availabilityOptions,
    products,
    isLoading,
    error,
    isFormOpen,
    editingProduct,
    formData,
    formErrors,
    formStatus,
    isSaving,
    deleteTarget,
    deleteStatus,
    isDeleting,
    onSearchChange: (value) => setSearch(value),
    onCategoryChange: (value) => setCategory(value),
    onAvailabilityChange: (value) => setAvailability(value),
    onSortChange: (value) => setSort(value),
    onOpenCreate: handleOpenCreate,
    onOpenEdit: handleOpenEdit,
    onCloseForm: handleCloseForm,
    onFormChange: handleFormChange,
    onSubmitForm: handleSubmitForm,
    onOpenDelete: handleOpenDelete,
    onCloseDelete: handleCloseDelete,
    onConfirmDelete: handleConfirmDelete,
  }
}
