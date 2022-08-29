import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Card, Stack } from '@shopify/polaris'
import AppHeader from '../../components/AppHeader'
import FormControl from '../../components/FormControl'

CreateForm.propTypes = {}

const initFormData = {
  first_name: {
    type: 'text',
    label: 'First Name',
    value: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required!'],
      minlength: [2, 'Too short!'],
      maxlength: [200, 'Too long!'],
    },
    error: '',
  },

  last_name: {
    type: 'text',
    label: 'Last Name',
    value: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required!'],
      minlength: [2, 'Too short!'],
      maxlength: [200, 'Too long!'],
    },
    error: '',
  },

  email: {
    type: 'email',
    label: 'Email',
    value: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required!'],
    },
    error: '',
  },

  phone: {
    type: 'text',
    label: 'Phone Number',
    value: '',
    required: true,
    validate: {
      trim: true,
      maxlength: [11, 'Too long!'],
    },
    error: '',
  },

  addresses: {
    type: 'text',
    label: 'Address',
    value: [],
    required: true,
    validate: {
      trim: true,
      maxlength: [11, 'Too long!'],
    },
    error: '',
  },
}

function CreateForm(props) {
  const { actions, created, onDiscard, onSubmit } = props

  const [formData, setFormData] = useState(initFormData)

  const handleChange = (name, value) => {
    let _formData = JSON.parse(JSON.stringify(formData))

    _formData[name] = { ..._formData[name], value, error: '' }

    setFormData(_formData)
  }

  return (
    <Stack vertical alignment="fill">
      <AppHeader
        {...props}
        title={created.id ? 'Update customer' : 'Add customer'}
        onBack={onDiscard}
      />

      <Card sectioned>
        <Stack>
          <Stack.Item fill>
            <FormControl
              {...formData['first_name']}
              onChange={(value) => handleChange('first_name', value)}
            />
          </Stack.Item>

          <Stack.Item fill>
            <FormControl
              {...formData['last_name']}
              onChange={(value) => handleChange('last_name', value)}
            />
          </Stack.Item>
        </Stack>

        <Stack>
          <Stack.Item fill>
            <FormControl
              {...formData['email']}
              onChange={(value) => handleChange('email', value)}
            />
          </Stack.Item>

          <Stack.Item fill>
            <FormControl
              {...formData['phone']}
              onChange={(value) => handleChange('phone', value)}
            />
          </Stack.Item>
        </Stack>
      </Card>

      <Card sectioned>
        <Stack></Stack>
      </Card>
    </Stack>
  )
}

export default CreateForm
