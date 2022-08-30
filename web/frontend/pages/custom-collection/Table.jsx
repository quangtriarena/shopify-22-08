import React from 'react'
import PropTypes from 'prop-types'
import { ActionList, Button, DataTable, Popover, Stack } from '@shopify/polaris'
import { useState } from 'react'
import { MobileVerticalDotsMajor, ImagesMajor } from '@shopify/polaris-icons'

Table.propTypes = {
  items: PropTypes.array,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
}

Table.defaultProps = {
  items: [],
  onEdit: () => null,
  onDelete: () => null,
}

function Table({ onDelete, onEdit, items }) {
  const [selected, setSelected] = useState(null)

  let rows = []
  rows = items?.map((item, index) => [
    index + 1,
    <div style={{ maxWidth: 300, whiteSpace: 'normal' }}>
      <Stack spacing="tight" wrap={false}>
        <Stack.Item>
          <p>{item.title}</p>
        </Stack.Item>
      </Stack>
    </div>,
    <div style={{ maxWidth: 300, whiteSpace: 'normal' }}>
      <Stack spacing="tight" wrap={false}>
        <Stack.Item>
          <p>{item.handle}</p>
        </Stack.Item>
      </Stack>
    </div>,

    <Popover
      active={item.id === selected?.id}
      activator={
        <Button
          onClick={() => setSelected(selected?.id === item.id ? null : item)}
          icon={MobileVerticalDotsMajor}
          outline
        />
      }
      onClose={() => setSelected(null)}
    >
      <ActionList
        actionRole="menuitem"
        items={[
          {
            content: 'Preview',
            onAction: () => {
              setSelected(null)
            },
          },
          {
            content: 'Edit',
            onAction: () => {
              onEdit(item)
              setSelected(null)
            },
          },
          {
            content: 'Delete',
            onAction: () => {
              onDelete(item)
              setSelected(null)
            },
          },
        ]}
      />
    </Popover>,
  ])

  return (
    <DataTable
      columnContentTypes={['text', 'text', 'text', 'text']}
      headings={['No.', 'Name', 'Description', 'Action']}
      rows={rows}
    />
  )
}

export default Table
