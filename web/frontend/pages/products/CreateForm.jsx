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
    label: 'Description',
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

  imageUrl: {
    type: 'text',
    label: 'Images Products Src',
    placeholder: 'please input src, https://...',
    value: '',
    originValue: '',
    error: '',
    validate: {},
  },

  status: {
    type: 'select',
    label: 'status',
    options: [
      {
        label: 'ACTIVE',
        value: 'active',
      },
      {
        label: 'DRAFT',
        value: 'draft',
      },
      {
        label: 'ARCHIVED',
        value: 'archived',
      },
    ],
    value: 'active',
    validate: {},
  },

  price: {
    type: 'number',
    label: 'Price',
    value: 0,
    error: '',
    validate: {},
  },

  compare_at_price: {
    type: 'number',
    label: 'Compare At Price',
    value: 0,
    error: '',
    validate: {},
  },

  metafields_global_title_tag: {
    type: 'text',
    label: 'title SEO',
    value: '',
    validate: {
      minlength: [50, 'Too short!'],
      maxlength: [300, 'Too long!'],
    },
  },

  metafields_global_description_tag: {
    type: 'text',
    label: 'description SEO',
    value: '',
    validate: {
      minlength: [50, 'Too short!'],
      maxlength: [500, 'Too long!'],
    },
  },

  options: null,
}

function CreateForm(props) {
  const { actions, created, onDiscard, onSubmit } = props

  const [formData, setFormData] = useState(initFormData)

  useEffect(() => {
    // console.log('🚀 ~ file: CreateForm.jsx ~ line 101 ~ CreateForm ~ formData', formData)
  }, [formData])

  useEffect(() => {
    let _formData = JSON.parse(JSON.stringify(initFormData))

    /**
     * test
     */
    _formData.title.value = `Sample product - ${new Date().toString()}`
    _formData.body_html.value = `Sample product`

    if (created.id) {
      console.log('🚀🚀🚀 ~ useEffect ~ created', created)
      Array.from(['title', 'body_html', 'status']).map(
        (key) => (_formData[key] = { ..._formData[key], value: created[key] || '' }),
      )

      Array.from(['price', 'compare_at_price']).map(
        (key) => (_formData[key] = { ..._formData[key], value: created.variants[0][key] || '' }),
      )

      Array.from(['images']).map(
        (key) => (_formData[key] = { ..._formData[key], originValue: created[key] || [] }),
      )
    }

    setFormData(_formData)
  }, [])

  const handleChange = (name, value) => {
    let _formData = JSON.parse(JSON.stringify(formData))
    // console.log('🚀 ~ file: CreateForm.jsx ~ line 136 ~ handleChange ~ _formData', _formData)

    Array.from(['images']).forEach((key) => (_formData[key] = formData[key]))

    _formData[name] = { ..._formData[name], value, error: '' }

    setFormData(_formData)
  }

  const handleSubmit = () => {
    try {
      let _formData = { ...formData }

      console.log('🚀🚀🚀 ~ handleSubmit ~ _formData', _formData)

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

  console.log('formData', formData)

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

          <Stack>
            <Stack.Item fill>
              <FormControl
                {...formData['images']}
                onChange={(value) => handleChange('images', value)}
                onDeleteOriginValue={(value) => {
                  // console.log('🚀🚀🚀 ~ onDeleteOriginValue ~ value', value)

                  let _formData = JSON.parse(JSON.stringify(formData))

                  _formData['images'] = {
                    ..._formData['images'],
                    originValue: _formData['images'].originValue.filter(
                      (item) => item.id !== value.id,
                    ),
                  }

                  Array.from(['images']).forEach(
                    (key) => (_formData[key].value = formData[key].value),
                  )

                  setFormData(_formData)
                }}
              />
            </Stack.Item>
            <Stack.Item fill>
              <FormControl
                {...formData['imageUrl']}
                onChange={(value) => handleChange('imageUrl', value)}
              />
            </Stack.Item>
          </Stack>

          <Stack>
            <Stack.Item fill>
              <FormControl
                {...formData['status']}
                onChange={(value) => handleChange('status', value)}
              />
            </Stack.Item>
            <Stack.Item fill></Stack.Item>
          </Stack>

          <Stack>
            <Stack.Item fill>
              <FormControl
                {...formData['price']}
                onChange={(value) => handleChange('price', value)}
              />
            </Stack.Item>
            <Stack.Item fill>
              <FormControl
                {...formData['compare_at_price']}
                onChange={(value) => handleChange('compare_at_price', value)}
              />
            </Stack.Item>
          </Stack>
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

      <Card>
        <Card.Section>
          <Stack vertical>
            <DisplayText size="small">SEO</DisplayText>
            <FormControl
              {...formData['metafields_global_title_tag']}
              onChange={(value) => handleChange('metafields_global_title_tag', value)}
            />
            <FormControl
              {...formData['metafields_global_description_tag']}
              onChange={(value) => handleChange('metafields_global_description_tag', value)}
            />
          </Stack>
        </Card.Section>
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
