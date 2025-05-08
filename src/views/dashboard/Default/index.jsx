import React, { useEffect, useState } from 'react';
import axios from 'axios'

// material-ui
import Grid from '@mui/material/Grid2';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from '../../../ui-component/cards/TotalIncomeDarkCard';
import TotalIncomeLightCard from '../../../ui-component/cards/TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';

import { gridSpacing } from 'store/constant';

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';

// ==============================|| DEFAULT DASHBOARD ||============================== //

export default function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const [totalClients, setTotalClients] = useState();
  const [revenusParService, setRevenusParService] = useState([]);
  const [topServices, setTopServices] = useState([]);
 
  const [categories, setCategories] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
 

  useEffect(() => {
    setLoading(false);
    axios.get('http://localhost:8000/api/total_clients/', {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(res => {
      setTotalClients(res.data.total_clients);
    });
    axios.get('http://localhost:8000/api/revenus_par_service/', {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(res => {
      setRevenusParService(res.data);
    });

    axios.get('http://localhost:8000/api/top_services/', {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(res => {
      const data = res.data;

      // Extraire les noms de services pour l'axe X
      const serviceNames = data.map(item => item.service);

      // Extraire les valeurs pour la série
      const rendezVousCounts = data.map(item => item.nombre_rendezvous);

      // Préparer les données au format ApexCharts
      setCategories(serviceNames);
      setSeriesData([
        {
          name: 'Nombre de rendez-vous',
          data: rendezVousCounts
        }
      ]);

      setLoading(false);
    })
    .catch((error) => {
      console.error('Erreur API :', error);
      setLoading(false);
    });
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid size={12}>
        <Grid container spacing={gridSpacing}>
          <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
            <EarningCard isLoading={isLoading} />
          </Grid>
          <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
            <TotalOrderLineChartCard isLoading={isLoading} />
          </Grid>
          <Grid size={{ lg: 4, md: 12, sm: 12, xs: 12 }}>
            <Grid container spacing={gridSpacing}>
              <Grid size={{ sm: 6, xs: 12, md: 6, lg: 12 }}>
                <TotalIncomeDarkCard isLoading={isLoading} />
              </Grid>
              <Grid size={{ sm: 6, xs: 12, md: 6, lg: 12 }}>
                <TotalIncomeLightCard
                  {...{
                    isLoading: isLoading,
                    total: totalClients,
                    label: 'Total clients',
                    icon: <StorefrontTwoToneIcon fontSize="inherit" />
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={12}>
        <Grid container spacing={gridSpacing}>
          <Grid size={{ xs: 12, md: 8 }}>
            <TotalGrowthBarChart isLoading={isLoading} categories={categories}
      seriesData={seriesData}/>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
