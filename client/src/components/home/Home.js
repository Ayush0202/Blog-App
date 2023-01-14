import { Grid } from '@mui/material'
import React from 'react'

// component import
import Banner from '../banner/Banner'
import Categories from './Categories'


const Home = () => {
  return (
    <>
      <Banner />

      <Grid container>
        <Grid item lg={2} sm={2} xs={12}>
          <Categories />
        </Grid>

        <Grid item lg={10} sm={10} xs={12}>
          SPACE FOR POSTS
        </Grid>
      </Grid>
      
    </>
  )
}

export default Home