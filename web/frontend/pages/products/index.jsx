import { Card, Pagination, Stack } from '@shopify/polaris'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductApi from '../../apis/product'
import UploadApi from '../../apis/upload'
import AppHeader from '../../components/AppHeader'
import { generateVariantsFromOptions } from './actions'
import ConfirmDelete from './ConfirmDelete'
import CreateForm from './CreateForm'
import Table from './Table'

function ProductsPage(props) {
  const { actions, location, navigate } = props

  const [searchParams, setSearchParams] = useSearchParams()

  const [products, setProducts] = useState(null)
  const [count, setCount] = useState(null)
  const [created, setCreated] = useState(null)
  const [deleted, setDeleted] = useState(null)

  const getProducts = async (query) => {
    try {
      actions.showAppLoading()

      let res = await ProductApi.find(query)
      if (!res.success) throw res.error

      setProducts(res.data)
    } catch (error) {
      console.log(error)
      actions.showNotify({ message: error.message, error: true })
    } finally {
      actions.hideAppLoading()
    }
  }

  useEffect(() => {
    getProducts(location.search)
  }, [location.search])

  const getProductsCount = async () => {
    try {
      actions.showAppLoading()

      let res = await ProductApi.count()
      if (!res.success) throw res.error

      setCount(res.data.count)
    } catch (error) {
      console.log(error)
      actions.showNotify({ message: error.message, error: true })
    } finally {
      actions.hideAppLoading()
    }
  }

  useEffect(() => {
    getProductsCount()
  }, [])

  const handleSubmit = async (formData) => {
    console.log('🚀🚀🚀 ~ handleSubmit ~ formData', formData)

    try {
      actions.showAppLoading()
      let options = []

      if (formData['options']) {
        options = formData['options']
          .filter((item) => item.name.value && item.values.value)
          .map((item) => ({
            name: item.name.value,
            values: item['values'].value.split(',').filter((item) => item),
          }))
      }

      if (formData['images'].value.length) {
        let images = await UploadApi.upload(formData['images'].value)

        if (!images.success) {
          actions.showNotify({ error: true, message: images.error.message })
        }

        formData['images'].value = [...images.data]
      }

      let data = {}

      Object.keys(formData)
        .filter((key) => !['images', 'options'].includes(key))
        .forEach((key) => (formData[key].value ? (data[key] = formData[key].value) : null))

      if (formData['images'].value.length) {
        data['images'] = formData['images'].value

        data['images'] = data['images'].map((item) => ({
          attachment: item.content,
        }))

        if (formData['imageUrl'].value) {
          let dataSrc = {
            src: formData['imageUrl'].value,
          }
          data['images'] = [...data['images'], dataSrc]
        }
      } else {
        data['images'] = []
      }

      if (options.length) {
        data.options = options
        data.variants = generateVariantsFromOptions(options)

        delete data.price
        delete data.compare_at_price
      } else {
        data.options = [
          {
            name: 'Title',
            values: ['Default Title'],
          },
        ]
        data.variants = [
          {
            option1: 'Default Title',
            price: formData['price'].value,
            compare_at_price: formData['compare_at_price'].value,
          },
        ]
      }

      console.log('111.🚀 ~ file: index.jsx ~ line 117 ~ handleSubmit ~ data', data)

      let res = null

      if (created.id) {
        // update
        data['images'] = formData['images'].originValue.map((item) => ({
          id: item.id,
        }))

        data['convertImage'] = formData['images'].value.map((item) => ({
          attachment: item.content,
        }))

        data['images'] = [...data['images'], ...data['convertImage']]

        if (formData['imageUrl'].value.length) {
          data['images'] = [...data, { src: formData['imageUrl'].value }]
        }

        delete data.convertImage

        res = await ProductApi.update(created.id, data)
      } else {
        // create
        res = await ProductApi.create(data)
      }
      if (!res.success) throw res.error

      console.log('res.data :>> ', res.data)

      actions.showNotify({ message: created.id ? 'Saved' : 'Created' })

      setCreated(null)

      getProducts(location.search)
    } catch (error) {
      console.log(error)
      actions.showNotify({ message: error.message, error: true })
    } finally {
      actions.hideAppLoading()
    }
  }

  const handleDelete = async (deleted) => {
    try {
      actions.showAppLoading()

      let res = await ProductApi.delete(deleted.id)
      if (!res.success) throw res.error

      actions.showNotify({ message: 'Deleted' })

      getProducts(location.search)
    } catch (error) {
      console.log(error)
      actions.showNotify({ message: error.message, error: true })
    } finally {
      actions.hideAppLoading()
    }
  }

  if (created) {
    return (
      <CreateForm
        {...props}
        created={created}
        onDiscard={() => setCreated(null)}
        onSubmit={(formData) => handleSubmit(formData)}
      />
    )
  }

  return (
    <Stack vertical alignment="fill">
      <AppHeader
        {...props}
        title="Products"
        primaryActions={[
          {
            label: 'Add product',
            primary: true,
            onClick: () => setCreated({}),
            // onClick: () => navigate('/products/new'),
          },
        ]}
        onBack={() => navigate('/')}
      />

      <Card>
        <Card.Section>
          <div>Total items: {count || 'loading..'}</div>
        </Card.Section>
        <Table
          {...props}
          items={products?.products}
          onEdit={(item) => setCreated(item)}
          onDelete={(item) => setDeleted(item)}
        />
        {products?.products?.length > 0 && (
          <Card.Section>
            <Stack distribution="center">
              <Stack.Item>
                <Pagination
                  hasPrevious={products.pageInfo.hasPrevious}
                  onPrevious={() =>
                    setSearchParams({ pageInfo: products.pageInfo.previousPageInfo })
                  }
                  hasNext={products.pageInfo.hasNext}
                  onNext={() => setSearchParams({ pageInfo: products.pageInfo.nextPageInfo })}
                />
              </Stack.Item>
            </Stack>
          </Card.Section>
        )}
      </Card>

      {deleted && (
        <ConfirmDelete
          onDiscard={() => setDeleted(null)}
          onSubmit={() => {
            handleDelete(deleted)
            setDeleted(null)
          }}
        />
      )}
    </Stack>
  )
}

export default ProductsPage
