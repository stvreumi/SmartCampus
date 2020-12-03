import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import { Button } from '@material-ui/core'
import { useTagValue } from '../../contexts/TagContext'
import FilterDrawer from './FilterDrawer'

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    top: 96,
    right: 24
  },
  grid: {
    position: 'absolute',
    top: 96,
    left: '50%',
    transform: 'translate(-50%, 0)'
  },
  button: {
    background: '#EEEEEE',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '5px'
  },
  missionButton: {
    border: 'solid 1px #707070',
    margin: theme.spacing(1)
  },
  discoveryButton: {
    border: 'solid 1px #707070',
    margin: theme.spacing(1),
    boxSizing: 'content-box',
    width: 16,
    height: 16
  },
  discoveryIcon: {
    width: 16,
    height: 16
  }
}))

function FilterFab() {
  const classes = useStyles()
  const [filterDrawer, setFilterDrawer] = useState(false)
  const closeDrawer = () => {
    setFilterDrawer(false)
  }
  const { filterTags, addFilterTags } = useTagValue()
  const filterInfo = ['無障礙設施', '路障', '排隊情況']
  return (
    <>
      <Box
        width='85%'
        display='flex'
        justifyContent='space-between'
        className={classes.grid}
      >
        {filterInfo.map((item) => {
          return (
            <Button
              variant='contained'
              size='small'
              color={filterTags.indexOf(item) === -1 ? '' : 'primary'}
              onClick={() => addFilterTags(item)}
              disabled
            >
              {item}
            </Button>
          )
        })}
        <Button
          variant='contained'
          size='small'
          onClick={() => setFilterDrawer(true)}
          disabled
        >
          更多
        </Button>
      </Box>
      <FilterDrawer open={filterDrawer} onClose={closeDrawer} />
    </>
  )
}

export default FilterFab
