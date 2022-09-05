import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Button, Card, Stack } from '@shopify/polaris'
import AppHeader from '../../components/AppHeader'
import FormControl from '../../components/FormControl'
import countryList from '../../helpers/contries'
import FormValidate from '../../helpers/formValidate'

CreateForm.propTypes = {
  onChange: PropTypes.func,
  onDiscard: PropTypes.func,
  onSubmit: PropTypes.func,
}

CreateForm.defaultProps = {
  onChange: () => null,
  onDiscard: () => null,
  onSubmit: () => null,
}

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
      maxlength: [15, 'Too long!'],
    },
    error: '',
  },

  country: {
    type: 'select',
    label: 'Country/region',
    value: 'Viet Nam',
    options: countryList.map((country) => ({
      label: country.name,
      value: country.name,
    })),
    validate: {},
    error: '',
  },

  address: {
    type: 'text',
    label: 'Address',
    value: '',
    validates: {},
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

  const handleSubmit = () => {
    try {
      let _formData = { ...formData }

      const { valid, data } = FormValidate.validateForm(_formData)

      _formData = { ...formData, ...data }

      if (valid) {
        onSubmit(_formData)
      } else {
        setFormData(_formData)
        throw new Error('Invalid form data')
      }
    } catch (error) {
      console.log(error)
      actions.showNotify({ error: true, message: error.message })
    }
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
        <Stack vertical>
          <Stack.Item fill>
            <FormControl
              {...formData['country']}
              onChange={(value) => handleChange('country', value)}
            />
          </Stack.Item>

          <Stack.Item>
            <FormControl
              {...formData['address']}
              onChange={(value) => handleChange('address', value)}
            />
          </Stack.Item>
        </Stack>
      </Card>

      <Stack distribution="trailing">
        <Button onClick={onDiscard}>Discard</Button>
        <Button primary onClick={handleSubmit}>
          {created.id ? 'Save' : 'Add'}
        </Button>
      </Stack>
    </Stack>
  )
}

export default CreateForm
