import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import axios from 'axios'

// material-ui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

// project imports
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

export default function PopularCard({ isLoading }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const token = localStorage.getItem('token')
  const [topClients, setTopClients] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8000/api/top_clients/', {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(res => {
      setTopClients(res.data);
      console.log(topClients)
    });
  }, []);
  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid size={12}>
                <Grid container sx={{ alignContent: 'center', justifyContent: 'space-between' }}>
                  <Grid>
                    <Typography variant="h4">Top clients</Typography>
                  </Grid>
                  <Grid>


                  </Grid>
                </Grid>
              </Grid>
              <Grid size={12} sx={{ mt: -1 }}>
                {/* <BajajAreaChartCard /> */}
              </Grid>
              <Grid size={12}>
                {topClients.map((client) => (
                  <>
                    <Grid container direction="column">
                      <Grid>
                        <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                          <Grid>
                            <Typography variant="subtitle1" color="inherit">
                              {client.nom}
                            </Typography>
                          </Grid>
                          <Grid>
                            <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                              <Grid>
                                <Typography variant="subtitle1" color="inherit">
                                  {client.points_fidelite}
                                </Typography>
                              </Grid>
                              <Grid>
                                <Avatar
                                  variant="rounded"
                                  sx={{
                                    width: 16,
                                    height: 16,
                                    borderRadius: '5px',
                                    bgcolor: 'success.light',
                                    color: 'success.dark',
                                    ml: 2
                                  }}
                                >
                                  <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                </Avatar>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid>
                        <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                          10% Profit
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider sx={{ my: 1.5 }} />
                  </>
                ))}

              </Grid>
            </Grid>
          </CardContent>

        </MainCard>
      )}
    </>
  );
}

PopularCard.propTypes = { isLoading: PropTypes.bool };
