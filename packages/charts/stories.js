import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { action } from '@storybook/addon-actions'

import Legend from './src/Legend'
import Chart, { ChartWithFilters } from './src/Chart'
import PieChart, { PieChartWithFilters } from './src/PieChart'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Charts', module)

const click = action('click')

const wrapperStyle = {
  width: '100%',
  height: '500px',
  display: 'flex',
  flexDirection: 'row',
  position: 'relative',
  justifyContent: 'center'
}
const wrapperLegend = {
  width: '25%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  justifyContent: 'center'
}

const pieData = {
  title: 'Pie Data',
  dataItems: [
    { label: 'Cats', value: 35, color: '', className: '', disabled: false },
    { label: 'Dogs', value: 40, color: '', className: '', disabled: false },
    { label: 'Birds', value: 55, color: '', className: '', disabled: false },
    { label: 'Cats1', value: 35, color: '', className: '', disabled: false },
    { label: 'Dogs1', value: 40, color: '', className: '', disabled: false },
    { label: 'Birds1', value: 55, color: '', className: '', disabled: false },
    { label: 'Cats2', value: 35, color: '', className: '', disabled: false },
    { label: 'Dogs2', value: 40, color: '', className: '', disabled: false },
    { label: 'Birds2', value: 55, color: '', className: '', disabled: false },
    { label: 'Lions2', value: 35, color: '', className: '', disabled: false }
  ]
}

const lineData = [
  {
    className: 'className',
    color: null,
    label: 'Line 1',
    disabled: false,
    dataItems: [{ x: new Date('May 23 2017').getTime(), y: 5 }, { x: new Date('May 29 2017').getTime(), y: 2 }, { x: new Date('May 31 2017').getTime(), y: 2 }, { x: new Date('June 13 2017').getTime(), y: 2 }]
  },
  {
    className: 'className',
    color: null,
    label: 'Line 2',
    disabled: false,
    dataItems: [{ x: new Date('May 23 2017').getTime(), y: 3 }, { x: new Date('May 29 2017').getTime(), y: 8 }, { x: new Date('May 31 2017').getTime(), y: 1 }, { x: new Date('June 13 2017').getTime(), y: 2 }]
  }
]

const barData = [
  {
    className: 'className',
    color: null,
    label: 'Bar Group 1',
    disabled: false,
    dataItems: [{ x: 'January', y: 3 }, { x: 'February', y: 4 }, { x: 'March', y: 1 }, { x: 'April', y: 2 }, { x: 'May', y: 5 }]
  },
  {
    className: 'className',
    color: null,
    label: 'BarGroup 2',
    disabled: false,
    dataItems: [{ x: 'January', y: 2 }, { x: 'February', y: 8 }, { x: 'March', y: 0 }, { x: 'April', y: 4 }, { x: 'May', y: 7 }]
  },
  {
    className: 'className',
    color: null,
    label: 'Bar Group 1',
    disabled: false,
    dataItems: [{ x: 'January', y: 3 }, { x: 'February', y: 4 }, { x: 'March', y: 1 }, { x: 'April', y: 2 }, { x: 'May', y: 5 }]
  },
  {
    className: 'className',
    color: null,
    label: 'BarGroup 2',
    disabled: false,
    dataItems: [{ x: 'January', y: 2 }, { x: 'February', y: 8 }, { x: 'March', y: 0 }, { x: 'April', y: 4 }, { x: 'May', y: 7 }]
  },
  {
    className: 'className',
    color: null,
    label: 'Bar Group 1',
    disabled: false,
    dataItems: [{ x: 'January', y: 3 }, { x: 'February', y: 4 }, { x: 'March', y: 1 }, { x: 'April', y: 2 }, { x: 'May', y: 5 }]
  },
  {
    className: 'className',
    color: null,
    label: 'BarGroup 2',
    disabled: false,
    dataItems: [{ x: 'January', y: 2 }, { x: 'February', y: 8 }, { x: 'March', y: 0 }, { x: 'April', y: 4 }, { x: 'May', y: 7 }]
  },
  {
    className: 'className',
    color: null,
    label: 'Bar Group 1',
    disabled: false,
    dataItems: [{ x: 'January', y: 3 }, { x: 'February', y: 4 }, { x: 'March', y: 1 }, { x: 'April', y: 2 }, { x: 'May', y: 5 }]
  },
  {
    className: 'className',
    color: null,
    label: 'Bar Group 1',
    disabled: false,
    dataItems: [{ x: 'January', y: 3 }, { x: 'February', y: 4 }, { x: 'March', y: 1 }, { x: 'April', y: 2 }, { x: 'May', y: 5 }]
  },
  {
    className: 'className',
    color: null,
    label: 'Bar Group 1',
    disabled: false,
    dataItems: [{ x: 'January', y: 3 }, { x: 'February', y: 4 }, { x: 'March', y: 1 }, { x: 'April', y: 2 }, { x: 'May', y: 5 }]
  },
  {
    className: 'className',
    color: null,
    label: 'Bar Group 1',
    disabled: false,
    dataItems: [{ x: 'January', y: 3 }, { x: 'February', y: 4 }, { x: 'March', y: 1 }, { x: 'April', y: 2 }, { x: 'May', y: 5 }]
  },
  {
    className: 'className',
    color: null,
    label: 'Bar Group 1',
    disabled: false,
    dataItems: [{ x: 'January', y: 3 }, { x: 'February', y: 4 }, { x: 'March', y: 1 }, { x: 'April', y: 2 }, { x: 'May', y: 5 }]
  },
  {
    className: 'className',
    color: null,
    label: 'Bar Group 1',
    disabled: false,
    dataItems: [{ x: 'January', y: 3 }, { x: 'February', y: 4 }, { x: 'March', y: 1 }, { x: 'April', y: 2 }, { x: 'May', y: 5 }]
  },
  {
    className: 'className',
    color: null,
    label: 'Bar Group 1',
    disabled: false,
    dataItems: [{ x: 'January', y: 3 }, { x: 'February', y: 4 }, { x: 'March', y: 1 }, { x: 'April', y: 2 }, { x: 'May', y: 5 }]
  },
  {
    className: 'className',
    color: null,
    label: 'Bar Group 1',
    disabled: false,
    dataItems: [{ x: 'January', y: 3 }, { x: 'February', y: 4 }, { x: 'March', y: 1 }, { x: 'April', y: 2 }, { x: 'May', y: 5 }]
  },
  {
    className: 'className',
    color: null,
    label: 'Bar Group 1',
    disabled: false,
    dataItems: [{ x: 'January', y: 3 }, { x: 'February', y: 4 }, { x: 'March', y: 1 }, { x: 'April', y: 2 }, { x: 'May', y: 5 }]
  },
  {
    className: 'className',
    color: null,
    label: 'Bar Group 1',
    disabled: false,
    dataItems: [{ x: 'January', y: 3 }, { x: 'February', y: 4 }, { x: 'March', y: 1 }, { x: 'April', y: 2 }, { x: 'May', y: 5 }]
  },
  {
    className: 'className',
    color: null,
    label: 'Bar Group 1',
    disabled: false,
    dataItems: [{ x: 'January', y: 3 }, { x: 'February', y: 4 }, { x: 'March', y: 1 }, { x: 'April', y: 2 }, { x: 'May', y: 5 }]
  },
  {
    className: 'className',
    color: null,
    label: 'Bar Group 1',
    disabled: false,
    dataItems: [{ x: 'January', y: 3 }, { x: 'February', y: 4 }, { x: 'March', y: 1 }, { x: 'April', y: 2 }, { x: 'May', y: 5 }]
  }
]

// Stories

const labelProps = {
  value: 10
}

addStory('Bar Chart', readme, () => (
  <div style={wrapperStyle}>
    <Chart
      domainPadding={{x: 10}}
      data={barData}
      type='bar'
    />
  </div>
))

addStory('Bar Chart With Filters', readme, () => (
  <div>
    <h2>Bar chart with filters. Legend on the top</h2>
    <div style={wrapperStyle}>
      <ChartWithFilters
        domainPadding={{x: 10}}
        legendPosition='top'
        data={barData}
        type='bar'
      />
    </div>
    <h2>Bar chart with filters. Legend at the bottom</h2>
    <div style={wrapperStyle}>
      <ChartWithFilters
        domainPadding={{x: 10}}
        legendPosition='bottom'
        data={barData}
        type='bar'
      />
    </div>
    <h2>Bar chart with filters. Legend on the left side</h2>
    <div style={wrapperStyle}>
      <ChartWithFilters
        domainPadding={{x: 10}}
        legendPosition='left'
        data={barData}
        type='bar'
      />
    </div>
    <h2>Bar chart with filters. Legend on the right side</h2>
    <div style={wrapperStyle}>
      <ChartWithFilters
        domainPadding={{x: 10}}
        legendPosition='right'
        data={barData}
        type='bar'
      />
    </div>
  </div>
))

addStory('Line Chart', readme, () => (
  <div style={wrapperStyle}>
    <Chart
      data={lineData}
      xAxisTitle='XAxis'
      yAxisTitle='yAxis'
      timeSeries
      zoomable
    />
  </div>
))

addStory('Line Chart with filters', readme, () => (
  <div>
    <h2>Line chart with filters. Legend on the top</h2>
    <div style={wrapperStyle}>
      <ChartWithFilters
        data={lineData}
        xAxisTitle='XAxis'
        yAxisTitle='yAxis'
        timeSeries
        zoomable
      />
    </div>
    <h2>Line chart with filters. Legend at the bottom</h2>
    <div style={wrapperStyle}>
      <ChartWithFilters
        data={lineData}
        xAxisTitle='XAxis'
        yAxisTitle='yAxis'
        legendPosition='bottom'
        timeSeries
        zoomable
      />
    </div>
    <h2>Line chart with filters. Legend on the left side</h2>
    <div style={wrapperStyle}>
      <ChartWithFilters
        data={lineData}
        xAxisTitle='XAxis'
        yAxisTitle='yAxis'
        legendPosition='left'
        timeSeries
        zoomable
      />
    </div>
    <h2>Line chart with filters. Legend on the right side</h2>
    <div style={wrapperStyle}>
      <ChartWithFilters
        data={lineData}
        xAxisTitle='XAxis'
        yAxisTitle='yAxis'
        legendPosition='right'
        timeSeries
        zoomable
      />
    </div>
  </div>
))

addStory('Pie Chart', readme, () => (
  <div style={wrapperStyle}>
    <PieChart
      data={pieData}
      labelProps={labelProps}
      padding={70}
      showLabels
    />
  </div>
))

addStory('Pie Chart with filters', readme, () => (

  <div>
    <h2>Pie chart with filters. Legend on the top</h2>
    <div style={wrapperStyle}>
      <PieChartWithFilters
        data={pieData}
        labelProps={labelProps}
      />
    </div>
    <h2>Pie chart with filters. Legend at the bottom</h2>
    <div style={wrapperStyle}>
      <PieChartWithFilters
        data={pieData}
        labelProps={labelProps}
        legendPosition='bottom'
      />
    </div>
    <h2>Pie chart with filters. Legend on the left side</h2>
    <div style={wrapperStyle}>
      <PieChartWithFilters
        data={pieData}
        labelProps={labelProps}
        legendPosition='left'
      />
    </div>
    <h2>Pie chart with filters. Legend on the right side</h2>
    <div style={wrapperStyle}>
      <PieChartWithFilters
        data={pieData}
        labelProps={labelProps}
        legendPosition='right'
      />
    </div>
  </div>
))

addStory('Legend', readme, () => (
  <div style={wrapperLegend}>
    <h2>Default legend</h2>
    <Legend
      dataItems={pieData.dataItems}
    />
    <h2>Horizontal legend</h2>
    <Legend
      dataItems={pieData.dataItems}
      direction='horizontal'
    />
    <h2>Scrollable legend</h2>
    <Legend
      dataItems={pieData.dataItems}
      style={{ height: '200px' }}
    />
    <h2>Legend with onClick handler</h2>
    <Legend
      dataItems={pieData.dataItems}
      onClick={click}
    />
    <h2>Horizontal legend with onClick handler</h2>
    <Legend
      dataItems={pieData.dataItems}
      onClick={click}
      direction='horizontal'
    />
    <h2>Legend with onClick handler</h2>
    <Legend
      dataItems={pieData.dataItems}
      onClick={click}
      direction='horizontal'
    />
  </div>
))
