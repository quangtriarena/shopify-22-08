import React from 'react'
import PropTypes from 'prop-types'
import { Stack } from '@shopify/polaris'
import AppHeader from '../../components/AppHeader'
import { useState } from 'react'
import CreateFrom from './CreateFrom'
import Table from './Table'
import { useEffect } from 'react'
import CustomCollectionApi from '../../apis/customCollection'
import ConfirmDelete from '../customers/ConfirmDelete'

CustomCollection.propTypes = {}

function CustomCollection(props) {
  const { actions, location, navigate } = props

  const [created, setCreated] = useState(null)
  const [deleted, setDeleted] = useState(null)
  const [collections, setCollections] = useState(null)

  const getCollections = async (query) => {
    try {
      actions.showAppLoading()

      let res = await CustomCollectionApi.find(query)

      console.log('🚀🚀🚀 ~ getCollections ~ res', res)

      if (!res.success) throw res.error

      setCollections(res.data)
    } catch (error) {
      console.log(error)
      actions.showNotify({ message: error.message, error: true })
    } finally {
      actions.hideAppLoading()
    }
  }

  useEffect(() => {
    getCollections(location.search)
  }, [location.search])

  const handleSubmit = async (formData) => {
    try {
      actions.showAppLoading()

      let data = {}
      Object.keys(formData).forEach((key) => (data[key] = formData[key].value))

      let res = null

      if (created.id) {
        // update
        res = await CustomCollectionApi.update(created.id, data)
      } else {
        res = await CustomCollectionApi.create(data)
      }

      if (!res.success) throw res.error

      console.log('res.data :>> ', res.data)

      actions.showNotify({ message: created.id ? 'Saved' : 'Created' })

      setCreated(null)

      getCollections(location.search)
    } catch (error) {
      console.log(error)
      actions.showNotify({ message: error.message, error: true })
    } finally {
      actions.hideAppLoading()
    }
  }

  const handleDelete = async (deleted) => {
    try {
      let res = null

      res = await CustomCollectionApi.delete(deleted.id)

      if (!res.success) throw res.error

      setDeleted(null)

      getCollections(location.search)
    } catch (error) {
      console.log(error)
      actions.showNotify({ message: error.message, error: true })
    }
  }

  if (created) {
    return (
      <CreateFrom
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
        title="Custom Collection"
        primaryActions={[
          {
            label: 'Add custom collection',
            primary: true,
            onClick: () => setCreated({}),
            // onClick: () => navigate('/products/new'),
          },
        ]}
        onBack={() => navigate('/')}
      />

      <Table
        items={collections?.custom_collections}
        onDelete={(item) => setDeleted(item)}
        onEdit={(item) => setCreated(item)}
      />

      {deleted && (
        <ConfirmDelete onDiscard={() => setDeleted(null)} onSubmit={() => handleDelete(deleted)} />
      )}
    </Stack>
  )
}

export default CustomCollection
