import React from 'react'
import SubmitionApi from '../../apis/submition'

function index(props) {
  const handleCallApi = async () => {
    try {
      let res = await SubmitionApi.submit()

      console.log('SubmitionApi res :>> ', res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>test api</h1>
      <button onClick={handleCallApi}>Tets Api created</button>
    </div>
  )
}

export default index
