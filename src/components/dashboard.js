import React, { Component } from 'react';
import Chart from 'chart.js/auto';
import SoftwareLicenceService from '../services/softwareLicenseService';
import SslCertificateService from '../services/sslCertificateService';
import Tooltip from './tooltip';

class Dashboard extends Component {
  componentDidMount() {
    this.fetchActiveLicenses();
    this.fetchActiveCertificates();
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

        console.log("License Expiration Months:", validExpirationMonths);

        this.renderLicenseChart(activeLicenses);
      })
      .catch(error => {
        console.error("Error fetching licenses:", error);
      });
  }

  fetchActiveCertificates() {
    SslCertificateService.getCertificates()
      .then(response => {
        const allCertificates = response.data;

        const activeCertificates = allCertificates.filter(cert => cert.status === 'active');

        const expirationMonths = activeCertificates.map(cert => {
          const expirationDateParts = cert.expirationDate.split('-');
          const expirationDate = new Date(expirationDateParts[2], expirationDateParts[1] - 1, expirationDateParts[0]);
          if (isNaN(expirationDate.getTime())) {
            console.error(`Invalid expiration date for certificate ${cert.id}: ${cert.expirationDate}`);
            return null;
          }

          return expirationDate.toLocaleString('default', { month: 'long' });
        });

        const validExpirationMonths = expirationMonths.filter(month => month !== null);

        console.log("Certificate Expiration Months:", validExpirationMonths);

        this.renderCertificateChart(activeCertificates);
      })
      .catch(error => {
        console.error("Error fetching certificates:", error);
      });
  }

  renderLicenseChart(licenses) {
    const ctx = document.getElementById('licenseChart').getContext('2d');
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

    const licenseChart = new Chart(ctx, {
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

  renderCertificateChart(certificates) {
    const ctx = document.getElementById('certificateChart').getContext('2d');
    const expirationMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dataPoints = certificates.map(cert => {
      const expirationDateParts = cert.expirationDate.split('-');
      const expirationDate = new Date(expirationDateParts[2], expirationDateParts[1] - 1, expirationDateParts[0]);
      const monthIndex = expirationDate.getMonth();

      return { x: monthIndex + 1, y: cert.id.toString() };
    });

    const groupedData = dataPoints.reduce((acc, dataPoint) => {
      const { x, y } = dataPoint;
      acc[x] = acc[x] || [];
      acc[x].push(y);
      return acc;
    }, {});

    const flattenedData = expirationMonths.map((month, index) => {
      const certificatesInMonth = (groupedData[index + 1] || []);
      console.log(`Month: ${month}, Certificates: ${certificatesInMonth.join(', ')}`);
      return certificatesInMonth.map(cert => ({ x: month, y: cert }));
    }).flat();

    const uniqueCertificateIds = Array.from(new Set(flattenedData.map(dataPoint => dataPoint.y))).sort((a, b) => b - a);

    const certificateChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Certificate Expiration',
          data: flattenedData,
          borderColor: 'rgb(129, 72, 144)',
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
            labels: uniqueCertificateIds,
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
                const certificateId = dataPoint.y;
                const certificate = certificates.find(cert => cert.id === parseInt(certificateId));
                const expirationDate = certificate.expirationDate;
                return `Certificate: ${certificate.type}, Expiration Date: ${expirationDate}`;
              },
            },
          },
        },
      },
    });
  }

  render() {
    return (
      <div className="dashboard-containers">
        <div className="dashboard-box" style={{ marginTop: '50px' }}>
          <h3 style={{ marginLeft: '450px', color: 'white' }}>Software Licenses Dashboard</h3>
          <Tooltip>
            <canvas className="my-4 w-100" id="licenseChart" style={{ maxWidth: '1200px', maxHeight: '500px', width: '100%', height: '500px' }}></canvas>
          </Tooltip>
        </div>
        <div className="dashboard-box" style={{ marginTop: '100px' }}>
          <h3 style={{ marginLeft: '430px', color: 'white' }}>SSL Certificates Dashboard</h3>
          <Tooltip>
            <canvas className="my-4 w-100" id="certificateChart" style={{ maxWidth: '1200px', maxHeight: '500px', width: '100%', height: '500px' }}></canvas>
          </Tooltip>
        </div>
      </div>
    );
  }
}

export default Dashboard;