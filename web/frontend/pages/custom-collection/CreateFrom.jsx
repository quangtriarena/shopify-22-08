import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Button, Stack } from '@shopify/polaris'
import FormControl from '../../components/FormControl'
import AppHeader from '../../components/AppHeader'
import FormValidate from '../../helpers/formValidate'

CreateFrom.propTypes = {
  created: PropTypes.object,
  onDiscard: PropTypes.func,
  onSubmit: PropTypes.func,
}

CreateFrom.defaultProps = {
  created: {},
  onDiscard: () => null,
  onSubmit: () => null,
}

const initFormData = {
  title: {
    type: 'text',
    value: '',
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required'],
      minlength: [2, 'Too short!'],
      maxlength: [200, 'Too long!'],
    },
    focused: true,
  },
}

function CreateFrom(props) {
  console.log('🚀🚀🚀 ~ CreateFrom ~ props', props)
  const { actions, created, onDiscard, onSubmit } = props
  const [formData, setFormData] = useState(initFormData)

  useEffect(() => {
    // fake data
    // formData['title'].value = 'apples'

    if (created.id) {
      console.log('🚀🚀🚀 ~ useEffect ~ created', created)

      // update
      let _formData = JSON.parse(JSON.stringify(formData))

      Array.from(['title']).map(
        (key) => (_formData[key] = { ..._formData[key], value: created[key] || '' }),
      )

      setFormData(_formData)
    }
  }, [])

  const handleChange = (name, value) => {
    let _formData = JSON.parse(JSON.stringify(formData))

    _formData[name] = { ..._formData[name], value, error: '' }

    setFormData(_formData)
  }

  const handleSubmit = () => {
    try {
      const { valid, data } = FormValidate.validateForm(formData)

      if (valid) {
        onSubmit(data)
      } else {
        setFormData(data)

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
        title={created.id ? 'update collection' : 'Add new collection'}
        onBack={onDiscard}
      />

      <FormControl {...formData['title']} onChange={(value) => handleChange('title', value)} />

      <Stack distribution="trailing">
        <Button onClick={onDiscard}>Discard</Button>
        <Button primary onClick={handleSubmit}>
          {created.id ? 'Save' : 'Add'}
        </Button>
      </Stack>
    </Stack>
  )
}

export default CreateFrom
