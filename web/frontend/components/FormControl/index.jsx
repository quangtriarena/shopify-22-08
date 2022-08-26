import { Button, RadioButton, Select, Stack, TextField, Thumbnail } from '@shopify/polaris'
import MyDropZoneMultiple from '../MyDropZoneMultiple'
import MyDropZoneSingle from '../MyDropZoneSingle'
import MultipleSelect from '../MultipleSelect'
import { DeleteMinor } from '@shopify/polaris-icons'

function FormControl(props) {
  // console.log('🚀 ~ file: index.jsx ~ line 7 ~ FormControl ~ props', props)

  let label = props.label ? (
    <span>
      {props.label}
      {props.required ? <b style={{ color: 'rgb(220, 53, 69)' }}> *</b> : null}
    </span>
  ) : null

  const renderPreview = (url) => {
    console.log('🚀🚀🚀 ~ renderPreview ~ url', url)

    return (
      <div style={{ position: 'relative', display: 'inline' }}>
        <div style={{ position: 'absolute', top: '0.5em', right: 0, zIndex: 1 }}>
          <Button
            icon={DeleteMinor}
            size="slim"
            plain
            onClick={() => props.onDeleteOriginValue(url)}
          />
        </div>
        <Thumbnail size="large" source={url.src} />
      </div>
    )
  }

  switch (props.type) {
    case 'file':
      return (
        <Stack vertical spacing="extraTight">
          {label && <Stack.Item>{label}</Stack.Item>}
          <Stack.Item>
            {props.allowMultiple ? (
              <MyDropZoneMultiple {...props} files={props.value} />
            ) : (
              <MyDropZoneSingle {...props} file={props.value} />
            )}
          </Stack.Item>

          {props.originValue !== undefined && (
            <Stack spacing="extraTight">
              {typeof props.originValue === 'string' && props.originValue !== '' ? (
                <Stack.Item>{renderPreview(props.originValue)}</Stack.Item>
              ) : Array.isArray(props.originValue) && props.originValue.length > 0 ? (
                props.originValue.map((item, index) => (
                  <Stack.Item key={index}>{renderPreview(item)}</Stack.Item>
                ))
              ) : null}
            </Stack>
          )}
        </Stack>
      )

    case 'select':
      return <Select {...props} label={label || ''} />

    case 'radio':
      return (
        <Stack vertical spacing="extraTight">
          {label && <Stack.Item>{label}</Stack.Item>}
          <Stack.Item>
            <Stack>
              {props.options?.length > 0 &&
                props.options.map((item, index) => (
                  <Stack.Item key={index}>
                    <RadioButton
                      label={item.label}
                      checked={Boolean(item.value === value)}
                      onChange={() => props.onChange?.(item.value)}
                    />
                  </Stack.Item>
                ))}
            </Stack>
          </Stack.Item>
        </Stack>
      )

    case 'multiple-select':
      return <MultipleSelect {...props} label={label || ''} />

    default:
      // text
      return <TextField {...props} label={label || ''} />
  }
}

export default FormControl
