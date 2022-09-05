import { Card, Stack, TextField } from '@shopify/polaris'
import React, { useEffect, useState } from 'react'
import CustomerApi from '../../apis/customer'
import AppHeader from '../../components/AppHeader'
import Table from '../customers/Table'
import ConfirmDelete from './ConfirmDelete'
import CreateForm from './CreateForm'
import { useSearchParams } from 'react-router-dom'
import qs from 'query-string'
import Search from './Search'

function CustomersPage(props) {
  const { actions, location, navigate } = props

  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [customers, setCustomers] = useState(null)
  const [created, setCreated] = useState(null)
  const [deleted, setDeleted] = useState(null)
  const [count, setCount] = useState(null)

  const getCustomers = async (query) => {
    try {
      actions.showAppLoading()

      let res = await CustomerApi.find(query)
      if (!res.success) throw res.error

      setCustomers(res.data)
    } catch (error) {
      console.log(error)
      actions.showNotify({ message: error.message, error: true })
    } finally {
      actions.hideAppLoading()
    }
  }

  useEffect(() => {
    getCustomers(location.search)
  }, [location.search])

  const getCustomersCount = async () => {
    try {
      actions.showAppLoading()

      let res = await CustomerApi.count()
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
    getCustomersCount()
  }, [])

  const handleDelete = async (deleted) => {
    console.log('🚀🚀🚀 ~ handleDelete ~ deleted', deleted)
  }

  const handleFilter = (filter) => {
    let params = qs.parse(location.search) || {}

    if ('query' in filter) {
      if (filter.query) {
        params = { ...params, query: `${filter.query}` }
      } else {
        delete params.query
      }
    }

    setSearchParams(params)
  }

  const handleSubmit = async (formData) => {
    try {
      actions.showAppLoading()
      let data = {}

      Object.keys(formData)
        .filter((key) => !['country', 'address'].includes(key))
        .forEach((key) => (data[key] = formData[key].value))

      data['addresses'] = [
        {
          country: formData['country'].value,
          address1: formData['address'].value,
        },
      ]

      let res = null

      if (created.id) {
        // mode edit
      } else {
        // mode add
        res = await CustomerApi.create(data)
      }

      if (!res.success) throw res.error

      console.log('res.data :>> ', res.data)

      actions.showNotify({ message: created.id ? 'Saved' : 'Created' })

      setCreated(null)

      getCustomers(location.search)
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
        title="Customer"
        primaryActions={[
          {
            label: 'Add customer',
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

        {/* search query */}
        <Search filter={qs.parse(location.search)} onChange={(filter) => handleFilter(filter)} />
        <Table
          {...props}
          items={customers?.customers}
          onEdit={(item) => setCreated(item)}
          onDelete={(item) => setDeleted(item)}
        />
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

export default CustomersPage
