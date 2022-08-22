import { Card, Stack, Button, DisplayText, Tooltip } from '@shopify/polaris'
import SubmitionApi from '../apis/submition'
import CurrentPlanBanner from '../components/CurrentPlanBanner/CurrentPlanBanner'
import UniqueCode from '../components/UniqueCode'
import { useEffect, useState } from 'react'
import PackagesTable from '../components/PackagesTable'
import { RefreshMinor } from '@shopify/polaris-icons'
import AppHeader from '../components/AppHeader'
import Intro from '../components/Intro'

export default function HomePage(props) {
  const { actions, storeSetting, location, navigate } = props

  const handleSubmit = async () => {
    console.log('handleSubmit')
    try {
      actions.showAppLoading()

      let res = await SubmitionApi.submit()
      if (!res.success) throw res.error

      console.log('res.data :>> ', res.data)

      actions.showNotify({ message: 'Submition successful' })
    } catch (error) {
      actions.showNotify({ message: error.message, error: true })
    } finally {
      actions.hideAppLoading()
    }
  }

  return (
    <Stack vertical alignment="fill">
      <AppHeader
        {...props}
        title="Home"
        primaryActions={[
          {
            label: 'Contact us',
            onClick: () => navigate('/support'),
            primary: true,
          },
        ]}
      />

      <CurrentPlanBanner {...props} />

      <Intro />

      {/* <Button onClick={handleSubmit}>Submit test</Button> */}
    </Stack>
  )
}
