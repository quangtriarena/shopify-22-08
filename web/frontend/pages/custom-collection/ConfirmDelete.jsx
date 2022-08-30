import React from 'react'
import PropTypes from 'prop-types'
import { Modal, TextContainer } from '@shopify/polaris'

ConfirmDelete.propTypes = {
  onDiscard: PropTypes.func,
  onSubmit: PropTypes.func,
}

ConfirmDelete.defaultProps = {
  onDiscard: () => null,
  onSubmit: () => null,
}

function ConfirmDelete({ onDiscard, onSubmit }) {
  return (
    <div style={{ height: '500px' }}>
      <Modal
        open={true}
        onClose={onDiscard}
        title="Are you sure want to delete?"
        secondaryActions={[
          {
            content: 'Discard',
            onAction: onDiscard,
          },
          {
            content: 'Delete now',
            onAction: onSubmit,
            destructive: true,
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <p>This cannot be undone.</p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  )
}

export default ConfirmDelete
