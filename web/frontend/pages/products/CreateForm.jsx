import PropTypes from 'prop-types'
import { Button, Card, Checkbox, DisplayText, Stack, TextField } from '@shopify/polaris'
import { useEffect, useState } from 'react'
import AppHeader from '../../components/AppHeader'
import FormValidate from '../../helpers/formValidate'
import FormControl from '../../components/FormControl'
import OptionForm from './OptionForm'
import { useRef } from 'react'

CreateForm.propTypes = {
  created: PropTypes.object,
  onDiscard: PropTypes.func,
  onSubmit: PropTypes.func,
}

CreateForm.defaultProps = {
  created: {},
  onDiscard: () => null,
  onSubmit: () => null,
}

const optionFormData = {
  name: {
    type: 'text',
    label: 'Option name',
    value: '',
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required!'],
      minlength: [2, 'Too short!'],
      maxlength: [200, 'Too long!'],
    },
  },
  values: {
    type: 'text',
    label: 'Option values',
    value: '',
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required!'],
      minlength: [1, 'Too short!'],
      maxlength: [100, 'Too long!'],
    },
  },
}

let initOptionFormData = Array.from([
  // { name: 'Size', values: 's,m,l' },
  // { name: 'Color', values: 'red,black,yellow' },
  // { name: 'Material', values: 'gold,sliver' },
  { name: '', values: '' },
]).map((item) => ({
  name: { ...optionFormData.name, value: item.name },
  values: { ...optionFormData.values, value: item.values },
}))

const initFormData = {
  title: {
    type: 'text',
    label: 'Title',
    value: '',
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required!'],
      minlength: [2, 'Too short!'],
      maxlength: [200, 'Too long!'],
    },
    focused: true,
  },
  body_html: {
    type: 'text',
    label: 'images',
    value: [],
    error: '',
    validate: {},
  },

  images: {
    type: 'file',
    label: 'Images Products',
    value: [],
    originValue: [],
    error: '',
    validate: {},
    allowMultiple: true,
  },

  options: null,
}

function CreateForm(props) {
  const { actions, created, onDiscard, onSubmit } = props

  const [formData, setFormData] = useState(initFormData)

  useEffect(() => {}, [formData])

  useEffect(() => {
    let _formData = JSON.parse(JSON.stringify(initFormData))

    /**
     * test
     */
    _formData.title.value = `Sample product - ${new Date().toString()}`
    _formData.body_html.value = `Sample product`

    if (created.id) {
      Array.from(['title', 'body_html']).map(
        (key) => (_formData[key] = { ..._formData[key], value: created[key] || '' }),
      )
    }

    setFormData(_formData)
  }, [])

  const handleChange = (name, value) => {
    let _formData = JSON.parse(JSON.stringify(formData))

    Array.from(['images']).forEach((key) => (_formData[key] = formData[key]))
    _formData[name] = { ..._formData[name], value, error: '' }

    setFormData(_formData)
  }

  const handleSubmit = () => {
    try {
      let _formData = { ...formData }

      delete _formData.options

      const { valid, data } = FormValidate.validateForm(_formData)

      _formData = { ...formData, ...data }

      if (valid) {
        _formData['images'] = formData['images']
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
        title={created.id ? 'Update product' : 'Add product'}
        onBack={onDiscard}
      />

      <Card sectioned>
        <Stack vertical alignment="fill">
          <FormControl {...formData['title']} onChange={(value) => handleChange('title', value)} />
          <FormControl
            {...formData['body_html']}
            onChange={(value) => handleChange('body_html', value)}
          />

          <FormControl
            {...formData['images']}
            onChange={(value) => handleChange('images', value)}
          />
        </Stack>
      </Card>

      <Card>
        <Card.Section>
          <Stack vertical>
            <DisplayText size="small">Options</DisplayText>
            <Checkbox
              label="This product has options, like size or color"
              checked={Boolean(formData['options'])}
              onChange={() => {
                let _formData = JSON.parse(JSON.stringify(formData))

                Array.from(['images']).forEach((key) => (_formData[key] = formData[key]))

                if (formData['options']) {
                  _formData['options'] = null
                } else {
                  _formData['options'] = initOptionFormData
                }
                setFormData(_formData)
              }}
            />
          </Stack>
        </Card.Section>
        {formData['options'] &&
          formData['options'].map((item, index) => (
            <Card.Section key={index}>
              <OptionForm
                formData={item}
                onChange={(value) => {
                  let _formData = JSON.parse(JSON.stringify(formData))

                  Array.from(['images']).forEach((key) => (_formData[key] = formData[key]))

                  _formData['options'][index] = value

                  // check has empty option
                  if (!_formData['options'].filter((item) => item['name'].value === '').length) {
                    _formData['options'].push({ ...optionFormData })
                  }

                  setFormData(_formData)
                }}
              />
            </Card.Section>
          ))}
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
