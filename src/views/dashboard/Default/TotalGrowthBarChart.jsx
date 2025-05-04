import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

// third party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import useConfig from 'hooks/useConfig';
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

export default function TotalGrowthBarChart({ isLoading, seriesData, categories }) {
  const theme = useTheme();
  const { mode } = useConfig();

  const { primary } = theme.palette.text;
  const darkLight = theme.palette.dark.light;
  const divider = theme.palette.divider;
  const grey500 = theme.palette.grey[500];

  const primary200 = theme.palette.primary[200];
  const primaryDark = theme.palette.primary.dark;
  const secondaryMain = theme.palette.secondary.main;
  const secondaryLight = theme.palette.secondary.light;

  const chartData = {
    type: 'bar',
    height: 480,
    series: seriesData,
    options: {
      chart: {
        id: 'bar-chart',
        stacked: true,
        toolbar: { show: true },
        zoom: { enabled: true }
      },
      plotOptions: {
        bar: { horizontal: false, columnWidth: '50%' }
      },
      xaxis: {
        categories: categories || [],
        labels: {
          style: { colors: primary }
        }
      },
      yaxis: {
        labels: {
          style: { colors: primary }
        }
      },
      grid: { borderColor: divider },
      tooltip: { theme: mode },
      legend: {
        show: true,
        position: 'bottom',
        labels: { useSeriesColors: false, colors: grey500 },
        markers: { width: 16, height: 16, radius: 5 },
        itemMargin: { horizontal: 15, vertical: 8 }
      },
      fill: { type: 'solid' },
      dataLabels: { enabled: false }
    }
  };

  useEffect(() => {
    if (!isLoading) {
      ApexCharts.exec(`bar-chart`, 'updateOptions', chartData.options);
    }
  }, [chartData.options, isLoading]);

  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid size={12}>
              <Typography variant="subtitle2">Rendez-Vous par service</Typography>
            </Grid>
            <Grid size={12}>
              <Chart {...chartData} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
}

TotalGrowthBarChart.propTypes = {
  isLoading: PropTypes.bool,
  seriesData: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired
};
