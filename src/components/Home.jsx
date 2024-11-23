import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CardDetails from './CardDetails';
import weather from '../assets/weather.jpg';
import currencies from '../assets/currencies.jpg';
import newsImage from '../assets/newsImage.jpg';


const Home = () => {
  const cardsData = [
   
    {
      title: 'Weather',
      text: 'Want to know the weather before heading out? See the latest forecast here!',
      imgSrc: weather,
      link: '/weather'
    },
    {
      title: 'Currencies',
      text: 'Check the latest exchange rates for your favorite currencies.',
      imgSrc: currencies,
      link: '/currency'
    },
    {
      title: 'News',
      text: 'Get the latest updates on global and local news.',
      imgSrc: newsImage, 
      link: '/news'
      
    }
  ];


  const fullText = "G.T real-time data with Today’s-Data! Track weather, news, currencies, and more – all in one place. Stay updated, stay ahead!"
  const [displayedText, setDisplayedText] = useState('');
  const [currentColor, setCurrentColor] = useState('black'); // اللون الافتراضي

  const colors = [
    '#ff5733', '#33ff57', '#3357ff', '#ff33a1', '#a133ff',  // ألوان أساسية
    '#f39c12', '#e74c3c', '#8e44ad', '#16a085', '#f1c40f',  // ألوان إضافية
    '#e67e22', '#2ecc71', '#1abc9c', '#9b59b6', '#34495e',  // ألوان مميزة
    '#f39c12', '#d35400', '#2980b9', '#8e44ad', '#2c3e50',  // ألوان متدرجة
    '#e74c3c', '#9a5a96', '#16a085', '#2ecc71', '#3498db'   // ألوان باردة
  ];
  
  useEffect(() => {
    let index = 0;
    let colorIndex = 0;

    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(index));

        // تغيير اللون بناءً على الحرف أو الكلمة
        if (fullText.charAt(index) === ' ' || fullText.charAt(index) === ',') {
          colorIndex = (colorIndex + 1) % colors.length; // تغيير اللون كلما ظهرت مسافة أو فاصلة
        }

        setCurrentColor(colors[colorIndex]); // تعيين اللون الجديد
        index++;
      } else {
        clearInterval(interval); // إيقاف التوقيت بعد الانتهاء من الكتابة
      }
    }, 200); // سرعة الكتابة

    return () => clearInterval(interval); // تنظيف التوقيت عند انتهاء الاستخدام
  }, []); // استخدام [] للتنفيذ مرة واحدة

  return (
    <Container className='mt-5 home'>
      <h1 className='text-center' style={{ color: currentColor }}>
        {displayedText}
      </h1>
      <Row>
        {cardsData.map((card, index) => (
          <Col key={index}>
            <CardDetails
              title={card.title}
              text={card.text}
              imgSrc={card.imgSrc}
              link={card.link}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
