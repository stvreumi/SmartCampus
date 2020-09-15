import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import useTagList from '../hooks/useTagList'
import useMissionList from '../hooks/useMissionList'
import { tagStatus } from '../constants/tagData'

export const TagContext = React.createContext({
  tags: [],
  activeTag: null,
  activeTagId: null,
  setActiveTagId: () => {},
  resetActiveTag: () => {},
  missionList: [],
  categoryList: [],
  updateTagList: () => {},
  refetch: () => {}
})

export const TagContextProvider = ({ children }) => {
  const { tags, updateTagList, refetch } = useTagList()
  const { missionList } = useMissionList()
  // ! TEMP: 之後會串接 API 拿category列表？
  const categoryList = [
    {
      id: 1,
      name: '校園設施'
    },
    {
      id: 2,
      name: '校園問題'
    },
    {
      id: 3,
      name: '校園狀態'
    }
  ]

  const [activeTagId, setActiveTagId] = useState(null)
  const resetActiveTag = () => setActiveTagId(null)
  const activeTag = findTagById(activeTagId, tags)
  const [filterTags, setFilterTags] = useState([])
  const addFilterTags = (tag) => {
    console.log(tag)
    if (filterTags.indexOf(tag) !== -1) {
      const newTags = [...filterTags]
      console.log(newTags, 'new')
      newTags.splice(newTags.indexOf(tag), 1)
      setFilterTags(newTags)
    } else {
      setFilterTags([...filterTags, tag])
      console.log(filterTags)
    }
  }
  const contextValues = {
    tags,
    activeTag,
    activeTagId,
    setActiveTagId,
    resetActiveTag,
    missionList,
    categoryList,
    updateTagList,
    refetch,
    filterTags,
    addFilterTags
  }

  return (
    <TagContext.Provider value={contextValues}>{children}</TagContext.Provider>
  )
}
TagContextProvider.propTypes = {
  children: PropTypes.any
}
TagContextProvider.defaultProps = {
  children: null
}

export const useTagValue = () => useContext(TagContext)

function findTagById(id, tags) {
  if (!id || !tags || tags.length === 0) return null
  const targetTag = tags.find((tag) => tag.id === id)
  return targetTag || null
}
