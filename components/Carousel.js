import React, { useState, useEffect } from 'react';
import { GraphQLClient } from 'graphql-request'; // Import GraphQLClient
import styles from '../styles/Slider.module.css';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';

const url = 'https://api-ap-south-1.hygraph.com/v2/clfarqru428bv01t88476g9cn/master';

const graphcms = new GraphQLClient(url, {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2ODEzODU2NzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NsZmFycXJ1NDI4YnYwMXQ4ODQ3Nmc5Y24vbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6IjJmYjM3ZGUwLWFjODUtNGE4MC1hOWIxLTI4NjgxMjMxMDEyMyIsImp0aSI6ImNsZ2YxbWM5aDE3amcwMXVsNm05bjc4NngifQ.vIwPkkque6RIg9VdrWJUqqFllEm4PokDJHh0rSafAJsuw60MMWYx617AoWNo0D_ZdGZiErVobHGIb6jFpPGfEkMy7BEopDGRDBQ2dRcON-YGBezA-8Es3yquF8spaYEkxaYKml4Qr0rxnk0jowqnDFvj729F7lXPRb1CIGHmwNSL96-E3NcR4Z666q-TLdojL8wfSuYj_h_squYH88xtvNc5bY9halE3qQodC2tas3OPuICUafPZmbqcdqHIcenb3bPDhLZHPWai-gUUcdpOz_55MMObsKsWsaXxyAdJz6mznyB_gy-ptd9IKP6bv2F8LvnG1sBxXhTiv_Wdh0OaYOP21cgVrx2uhXe0ebg2AZG4utbJ1LPrHtsOraehyC2phtRfvYK7Qd2oClP6ItRaTGt6glPgIBOfgBbv3P_eLA7Sr7IkMNYUpr26ackc1pSx0rr3-dqAFr1vmFUbsD6a_JKm2MYEiQ8gKSZXiE0uW0xTH9cOu6AXoqUAH8Ii6pGW-BcosYkxnn4oXvKdt4ET81ZjH6oGmjc4rk7pXio9udGAVXgyp6gJcNQRp_5aksxLkwdKfNHiuGAeEK7kGeri0D3MrAXfb3g__ghbfRCTfgvjPVIQtldCDslTWPvXsbrOztXTIBNo5Tlxv8d4UTuiZ6DkUdmk9YUJS2Jf8wjEBx8',
  },
});

export default function SliderDemo() {
  const [sliders, setCarouselImages] = useState([]);

  useEffect(() => {
    async function fetchCarouselImages() {
      const query = `{
        carousels {
          id
          text
          carousel {
            url
          }
        }
      }`;

      try {
        const { carousels } = await graphcms.request(query);
        setCarouselImages(carousels);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCarouselImages();
  }, []);

  return (
    <div>
      <Carousel className={styles.slider}>
        {!!sliders &&
          Array.isArray(sliders) &&
          sliders.map((image) => (
            <Carousel.Item key={image.id} className={styles.sliderItem}>
              <Image
                src={image.carousel[0].url}
                className={styles.carouselimg}
                alt={image.text}
                height={600}
                width={1600}
              />
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
}
