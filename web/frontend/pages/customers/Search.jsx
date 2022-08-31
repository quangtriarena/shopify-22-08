import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Stack, TextField } from '@shopify/polaris'

Search.propTypes = {}

function Search({ filter, onChange }) {
  const [search, setSearch] = useState(filter.query || '')

  const handleSearch = (value) => {
    setSearch(value)

    if (window.__searchTimeout) {
      clearTimeout(window.__searchTimeout)
    }

    window.__searchTimeout = setTimeout(() => {
      onChange({ ...filter, query: value })
    }, 600)
  }

  return (
    <Stack>
      <Stack.Item fill>
        <div style={{ padding: '0 15px', margin: ' 0  0 15px 0' }}>
          <TextField
            placeholder="search..."
            value={search}
            onChange={(value) => handleSearch(value)}
          />
        </div>
      </Stack.Item>
    </Stack>
  )
}

export default Search
