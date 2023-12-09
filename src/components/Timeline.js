import React, { useEffect, useState } from "react";
import { Chrono } from "react-chrono";
import { Link} from "react-router-dom";
import softwareService from "../services/softwareService";
import customerService from "../services/customerService";
import purchaseService from "../services/purchaseService";
import softwareLicenseService from "../services/softwareLicenseService";
import sslCertificateService from "../services/sslCertificateService";


const linkStyle = {
  color: "#c770f0",
  textDecoration: "none",
  fontSize: '1.5rem'
};



const Timeline = () => {
  const [latestSoftware, setLatestSoftware] = useState(null);
  const [latestCustomer, setLatestCustomer] = useState(null);
  const [latestPurchase, setLatestPurchase] = useState(null);
  const [latestSslCertificate, setLatestSslCertificate] = useState(null);
  const [latestLicense, setLatestLicense] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const softwareResponse = await softwareService.getAllSoftware();
        const customerResponse = await customerService.getAllCustomers();
        const purchaseResponse = await purchaseService.getAllPurchases();
        const certificateResponse = await sslCertificateService.getCertificates();
        const licenseResponse = await softwareLicenseService.getLicenses();

        const softwareList = softwareResponse.data;
        const customerList = customerResponse.data;
        const purchaseList = purchaseResponse.data;
        const certificateList = certificateResponse.data;
        const licenseList = licenseResponse.data;

        if (softwareList.length > 0) {
          const latestSoftwareItem = softwareList.reduce(
            (prev, current) => (prev.id > current.id ? prev : current)
          );

          setLatestSoftware({
            id: latestSoftwareItem.id,  
            date: `${latestSoftwareItem.registrationDate}`,
            subtitle: `${latestSoftwareItem.name}, ${latestSoftwareItem.version}, ${latestSoftwareItem.category}`,
          });
        } else {
          console.warn("No software data found.");
        }

        if (customerList.length > 0) {
          const latestCustomerItem = customerList.reduce(
            (prev, current) => (prev.id > current.id ? prev : current)
          );
        
          setLatestCustomer({
            id: latestCustomerItem.id,
            date: `${latestCustomerItem.registrationDate}`,
            subtitle: `${latestCustomerItem.fname}, ${latestCustomerItem.lname}, ${latestCustomerItem.email}`
          });
        } else {
          console.warn("No customer data found.");
        }

        if (purchaseList.length > 0) {
          const latestPurchaseItem =purchaseList.reduce(
            (prev, current) => (prev.id > current.id ? prev : current)
          );
  
          setLatestPurchase({
            id: latestPurchaseItem.id,
            date: `${latestPurchaseItem.registrationDate}`,
            subtitle: `${latestPurchaseItem.purchaseDate}, ${latestPurchaseItem.price}`,
          });
        } else {
          console.warn("No purchase data found.");
        }

        if (certificateList.length > 0) {
          const latestCertificateItem =certificateList.reduce(
            (prev, current) => (prev.id > current.id ? prev : current)
          );
  
          setLatestSslCertificate({
            id: latestCertificateItem.id,
            date: `${latestCertificateItem.registrationDate}`,
            subtitle: `${latestCertificateItem.type}, ${latestCertificateItem.status},${latestCertificateItem.issuer}`
          });
        } else {
          console.warn("No certificate data found.");
        }

        if (licenseList.length > 0) {
          const latestLicenseItem =licenseList.reduce(
            (prev, current) => (prev.id > current.id ? prev : current)
          );
  
          setLatestLicense({
            id: latestLicenseItem.id,
            date: `${latestLicenseItem.registrationDate}`,
            subtitle: `${latestLicenseItem.status}, ${latestLicenseItem.status}, ${latestLicenseItem.activationDate}`,
          });
        } else {
          console.warn("No certificate data found.");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  if (loading) {
    return <p>Loading...</p>;
  }
  
  const timelineItems = [
    
    latestSoftware && {
      title: latestSoftware.date,
      cardTitle: (
        <Link to={`/Software`} style={linkStyle}>
          Software
        </Link>
      ),
      cardSubtitle: (
        <div  className="subtitleColor" >
          <div>
            <strong style={{color: '#c770f0' }}>Name:</strong> {latestSoftware.subtitle.split(', ')[0]}
          </div>
          <div>
            <strong>Version:</strong> {latestSoftware.subtitle.split(', ')[1]}
          </div>
          <div style={{paddingBottom:10}}>
            <strong>Category:</strong> {latestSoftware.subtitle.split(', ')[2]}
          </div>
          <Link className="btn btn-outline-light timeline" to={`/Software/${latestSoftware.id}`}>
            View more
          </Link>
        </div>
      ),
    },
    latestCustomer && {
      title: latestCustomer.date,
      cardTitle: (
        <Link to={`/Customers`} style={linkStyle}>
          Customers
        </Link>
      ),
      cardSubtitle: (
        <div  className="subtitleColor" >
          <div>
            <strong style={{color: '#c770f0' }}>First Name:</strong> {latestCustomer.subtitle.split(', ')[0]}
          </div>
          <div>
            <strong>Last Name:</strong> {latestCustomer.subtitle.split(', ')[1]}
          </div>
          <div style={{paddingBottom:10}}>
            <strong>Email:</strong> {latestCustomer.subtitle.split(', ')[2]}
          </div>
          <Link className="btn btn-outline-light timeline" to={`/Customers/${latestCustomer.id}`}>
            View more
          </Link>
        </div>
      ),
    },
    latestPurchase && {
      title: latestPurchase.date,
      cardTitle: (
        <Link to={`/Purchases`} style={linkStyle}>
          Purchases
        </Link>
      ),
      cardSubtitle: (
        <div  className="subtitleColor" >
          <div>
            <strong style={{color: '#c770f0' }}>Purchase Date:</strong> {latestPurchase.subtitle.split(', ')[0]}
          </div>
          <div style={{paddingBottom:10}}>
            <strong>Price in USD:</strong> {latestPurchase.subtitle.split(', ')[1]}
          </div>
          <Link className="btn btn-outline-light timeline" to={`/Purchases/${latestPurchase.id}`}>
            View more
          </Link>
        </div>
      ),
    },
    latestSslCertificate && {
      title: latestSslCertificate.date,
      cardTitle: (
        <Link to={`/SslCertificates`} style={linkStyle}>
          SslCertificates
        </Link>
      ),
      cardSubtitle: (
        <div  className="subtitleColor" >
          <div>
            <strong style={{color: '#c770f0' }}>Type:</strong> {latestSslCertificate.subtitle.split(', ')[0]}
          </div>
          <div>
            <strong>Status:</strong> {latestSslCertificate.subtitle.split(', ')[1]}
          </div>
          <div style={{paddingBottom:10}}>
            <strong>Issuer:</strong> {latestSslCertificate.subtitle.split(', ')[2]}
          </div>
          <Link className="btn btn-outline-light timeline" to={`/SslCertificates/${latestSslCertificate.id}`}>
            View more
          </Link>
        </div>
      ),
    },
    latestLicense && {
      title: latestLicense.date,
      cardTitle: (
        <Link to={`/SoftwareLicenses`} style={linkStyle}>
          Software Licenses
        </Link>
      ),
      cardSubtitle: (
        <div  className="subtitleColor" >
          <div>
            <strong style={{color: '#c770f0' }}>Name:</strong> {latestLicense.subtitle.split(', ')[0]}
          </div>
          <div>
            <strong>Status:</strong> {latestLicense.subtitle.split(', ')[1]}
          </div>
          <div style={{paddingBottom:10}}>
            <strong>Activation Date:</strong> {latestLicense.subtitle.split(', ')[2]}
          </div>
          <Link className="btn btn-outline-light timeline" to={`/softwareLicenses/${latestLicense.id}`}>
            View more
          </Link>
        </div>
      ),
    },
  ].filter(Boolean);

  return (
    <>
      {timelineItems.length > 0 ? (
        <Chrono items={timelineItems} mode="VERTICAL" />
      ) : (
        <div style={{ boxShadow: '1px 1px 4px 5px rgba(129, 72, 144, 0.561)', display: 'flex', justifyContent: 'center',
         borderRadius: '50px', marginTop:20 }}>
          <p style={{ textAlign: 'center', margin: 8}}>No additions in the timeline yet.</p>
        </div>
      )}
    </>
  );
};

export default Timeline;