import React, { useState, useRef } from 'react'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Input } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import CreateIcon from '@material-ui/icons/Create'
import StorefrontIcon from '@material-ui/icons/Storefront'
import BusinessIcon from '@material-ui/icons/Business'
import ApartmentIcon from '@material-ui/icons/Apartment'
import DescriptionIcon from '@material-ui/icons/Description'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import {
  useMissionValue,
  MissionStep
} from '../../../../contexts/MissionContext'
import ImageUpload from '../../ImageUpload'
import { facilitySubType } from '../../../../constants/missionInfo'
import PicturePreview from './PicturePreview'

function MissionStep3() {
  const {
    selectedMissionId,
    handleSetSelectedMissionId,
    selectedSubOptionId,
    setSelectedSubOptionId,
    moreDescriptionText,
    handleChangeMoreDescriptionText,
    handleSetStep,
    textLocation,
    handleChangeTextLocation,
    previewImages,
    setPreviewImages
  } = useMissionValue()
  const [locationFocus, setLocationFocus] = useState(true)
  const focusInput = useRef(null)
  const { target = [] } =
    facilitySubType.find(
      (facility) => facility.subTypeName === selectedMissionId
    ) || {}
  return (
    <Grid container spacing={3}>
      {/* * ==================== 1.經緯度標註 ==================== */}
      <Grid container item xs={12} justify='space-between' direction='row'>
        <Box
          display='flex'
          flexDirection='row'
          alignItems='center'
          width='70vw'
          justifyContent='flex-start'
        >
          <LocationOnIcon style={{ color: 'FDCC4F', marginRight: '5px' }} />
          <Typography>將座標放在要標註的位置。</Typography>
        </Box>
        <IconButton
          size='small'
          onClick={() => handleSetStep(MissionStep.PlaceFlagOnMap)}
        >
          <CreateIcon fontSize='small' style={{ color: '#E2E2E2' }} />
        </IconButton>
      </Grid>

      {/* * ==================== 2.地點資訊 ==================== */}
      <Grid container item xs={12} justify='space-between' direction='row'>
        <Box
          display='flex'
          flexDirection='row'
          alignItems='center'
          width='70vw'
          justifyContent='flex-start'
        >
          <StorefrontIcon style={{ color: 'FDCC4F', marginRight: '5px' }} />
          <Input
            id='standard-basic'
            ref={focusInput}
            disableUnderline={locationFocus}
            style={{ width: '70vw' }}
            placeholder='輸入地點名稱'
            value={textLocation}
            onChange={handleChangeTextLocation}
            onFocus={() => {
              setLocationFocus(false)
            }}
            onBlur={() => {
              setLocationFocus(true)
            }}
          />
        </Box>
        <IconButton
          size='small'
          onClick={() => {
            focusInput.current.click()
          }}
        >
          <CreateIcon fontSize='small' style={{ color: '#E2E2E2' }} />
        </IconButton>
      </Grid>

      {/* * ==================== 設施類型選擇 ==================== */}
      <Grid container item xs={12} direction='row'>
        <BusinessIcon style={{ color: 'FDCC4F', marginRight: '5px' }} />
        <Typography>設施類型</Typography>
      </Grid>
      {facilitySubType.map((facility) => (
        <Grid key={facility.subTypeName} item xs={4}>
          <Button
            variant='contained'
            fullWidth
            size='small'
            color={
              selectedMissionId === facility.subTypeName ? 'primary' : 'default'
            }
            onClick={() => handleSetSelectedMissionId(facility.subTypeName)}
          >
            {facility.subTypeName}
          </Button>
        </Grid>
      ))}
      {/* * ==================== 具體設施子類別 ==================== */}
      <Grid container item xs={12} direction='row'>
        <ApartmentIcon style={{ color: 'FDCC4F', marginRight: '5px' }} />
        <Typography>具體設施</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {target.map((discovery) => (
            <Grid id={discovery.targetName} item xs={4}>
              <Button
                variant='contained'
                fullWidth
                size='small'
                color={
                  selectedSubOptionId === discovery.targetName
                    ? 'primary'
                    : 'default'
                }
                onClick={() => setSelectedSubOptionId(discovery.targetName)}
              >
                {discovery.targetName}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid container item xs={12} direction='row'>
        <DescriptionIcon style={{ color: 'FDCC4F', marginRight: '5px' }} />
        <TextField
          name='moreDescriptionText'
          multiline
          id='standard-basic'
          style={{ width: '80vw' }}
          placeholder='詳細說明'
          value={moreDescriptionText}
          onChange={handleChangeMoreDescriptionText}
        />
      </Grid>

      {/* * ==================== 7.上傳照片 ==================== */}
      <Grid container item xs={12} direction='row' alignItems='center'>
        <AddAPhotoIcon style={{ color: 'FDCC4F', marginRight: '15px' }} />
        <ImageUpload
          setPreviewImages={setPreviewImages}
          previewImages={previewImages}
        />
      </Grid>
      {/* <Grid container item xs={12} direction='row' alignItems='center'>
        <img src={previewImages} />
      </Grid> */}
      <PicturePreview
        previewImages={previewImages}
        setPreviewImages={setPreviewImages}
      />
    </Grid>
  )
}

export default MissionStep3
