import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ActionList, Button, DataTable, Popover, Stack } from '@shopify/polaris'
import { MobileVerticalDotsMajor, ImagesMajor } from '@shopify/polaris-icons'

Table.propTypes = {
  items: PropTypes.array,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
}

Table.defaultProps = {
  items: undefined,
  onEdit: () => null,
  onDelete: () => null,
}

function Table({ items, onEdit, onDelete }) {
  const [selected, setSelected] = useState(null)

  let rows = []
  if (items?.length > 0) {
    rows = items.map((item, index) => [
      index + 1,
      <div style={{ maxWidth: 300, whiteSpace: 'normal' }}>
        <Stack spacing="tight" wrap={false}>
          <Stack.Item>
            <p>{`${item.first_name} ${item.last_name}`}</p>
          </Stack.Item>
          <Stack.Item>
            <p>1</p>
          </Stack.Item>
        </Stack>
      </div>,
      <div style={{ maxWidth: 300, whiteSpace: 'normal' }}>
        <Stack spacing="tight" wrap={false}>
          <Stack.Item>
            <p>{item.email}</p>
          </Stack.Item>
        </Stack>
      </div>,
      <div style={{ maxWidth: 300, whiteSpace: 'normal' }}>
        <Stack spacing="tight" wrap={false}>
          {item.addresses.map((item, index) => (
            <Stack.Item>{`${item?.address1 || item?.address2} ${item.city} ${
              item.country
            }`}</Stack.Item>
          ))}
        </Stack>
      </div>,
      <div style={{ maxWidth: 300, whiteSpace: 'normal' }}>
        <Stack spacing="tight" wrap={false}>
          <Stack.Item>
            <p>{item.orders_count} order</p>
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
            // {
            //   content: 'Delete',
            //   onAction: () => {
            //     onDelete(item)
            //     setSelected(null)
            //   },
            // },
          ]}
        />
      </Popover>,
    ])
  }

  return (
    <DataTable
      headings={['No.', 'Customer name', 'Email subscription', 'Location', 'Orders', 'Action']}
      columnContentTypes={['text', 'text', 'text', 'text', 'text', 'text']}
      rows={rows}
      footerContent={items ? (items?.length > 0 ? undefined : 'Have no data') : 'loading..'}
    />
  )
}

export default Table
