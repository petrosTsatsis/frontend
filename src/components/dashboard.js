import React, { Component } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js
import SoftwareLicenceService from '../services/softwareLicenseService';
import Tooltip from './tooltip';

class Dashboard extends Component {
  componentDidMount() {
    this.fetchActiveLicenses();
  }

  fetchActiveLicenses() {
    SoftwareLicenceService.getLicenses()
      .then(response => {
        const allLicenses = response.data;

        const activeLicenses = allLicenses.filter(license => license.status === 'active');

        const expirationMonths = activeLicenses.map(license => {
          const expirationDateParts = license.expirationDate.split('-');
          const expirationDate = new Date(expirationDateParts[2], expirationDateParts[1] - 1, expirationDateParts[0]);
          if (isNaN(expirationDate.getTime())) {
            console.error(`Invalid expiration date for license ${license.id}: ${license.expirationDate}`);
            return null; 
          }

          return expirationDate.toLocaleString('default', { month: 'long' });
        });

        
        const validExpirationMonths = expirationMonths.filter(month => month !== null);

        console.log("Expiration Months:", validExpirationMonths);

        
        this.renderChart(activeLicenses);
      })
      .catch(error => {
        console.error("Error fetching licenses:", error);
      });
  }

  renderChart(licenses) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const expirationMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dataPoints = licenses.map(license => {
      const expirationDateParts = license.expirationDate.split('-');
      const expirationDate = new Date(expirationDateParts[2], expirationDateParts[1] - 1, expirationDateParts[0]);
      const monthIndex = expirationDate.getMonth();

      return { x: monthIndex + 1, y: license.id.toString() }; 
    });

    const groupedData = dataPoints.reduce((acc, dataPoint) => {
      const { x, y } = dataPoint;
      acc[x] = acc[x] || [];
      acc[x].push(y);
      return acc;
    }, {});

    const flattenedData = expirationMonths.map((month, index) => {
      const licensesInMonth = (groupedData[index + 1] || []);
      console.log(`Month: ${month}, Licenses: ${licensesInMonth.join(', ')}`);
      return licensesInMonth.map(license => ({ x: month, y: license }));
    }).flat();

    const uniqueLicenseIds = Array.from(new Set(flattenedData.map(dataPoint => dataPoint.y))).sort((a, b) => b - a);

    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'License Expiration',
          data: flattenedData,
          borderColor: 'rgb(18, 13, 30)',
          borderWidth: 5,
        }],
      },
      options: {
        layout: {
          
          padding: {
            left: 20, 
            right: 20, 
            top: 20, 
            bottom: 20, 
          },
        },
        scales: {
          y: { 
            type: 'category', 
          position: 'left',
          offset: false,
          labels: uniqueLicenseIds,
          ticks: {
            fontColor: 'white',
            color: 'white',
          },
          },
          x: {
            type: 'category',
            position: 'bottom',
            offset: true,
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            ticks: {
              fontColor: 'white',
              color: 'white'
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const dataPoint = flattenedData[context.dataIndex];
            const licenseId = dataPoint.y;
            const license = licenses.find(license => license.id === parseInt(licenseId));
            const expirationDate = license.expirationDate;
            return `License: ${license.name}, Expiration Date: ${expirationDate}`;
              },
            },
          },
        },
      },
    });
  }

  render() {
    return (
      <div className="dashboard-container">
        <div className="dashboard-box">
          <h3 style={{ marginLeft: '250px', color: 'white' }}>Software Licenses Dashboard</h3>
          
          <Tooltip >
            <canvas className="my-4 w-100" id="myChart" style={{ maxWidth: '1200px', maxHeight: '500px', width: '100%', height: '500px' }}></canvas>
          </Tooltip>
        </div>
      </div>
    );
  }
}

export default Dashboard;