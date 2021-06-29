import { useMemo } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import moment from 'moment'

export const GET_TAG_DETAIL_QUERY = gql`
  query getTagDetail($id: ID!) {
    tag(tagId: $id) {
      id
      createTime
      lastUpdateTime
      imageUrl
      status {
        numberOfUpVote
        hasUpVote
      }
      createUser {
        displayName
      }
    }
  }
`

export const generateTime = (time) => {
  return moment(time).format('YYYY-MM-DD h:mm')
}

const tagDetailInitial = {
  id: null,
  createTime: '',
  lastUpdateTime: '',
  imageUrl: [],
  status: {
    numberOfUpVote: null,
    hasUpVote: null
  },
  createUser: {
    displayName: ''
  }
}

function useTagDetail() {
  // const [tagDetail, setTagDetail] = useState(null)
  const [getTagDetail, { data: { tag = {} } = {} }] = useLazyQuery(
    GET_TAG_DETAIL_QUERY,
    {
      fetchPolicy: 'no-cache'
    }
  )
  const tagDetail = useMemo(
    () => ({
      ...tagDetailInitial,
      ...tag,
      newCreateTime: generateTime(tag.createTime) || '0',
      newLastUpdateTime: generateTime(tag.lastUpdateTime) || '0',
    }),
    [tag]
  )
  return { tagDetail, getTagDetail }
}

export default useTagDetail
