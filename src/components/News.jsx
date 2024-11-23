import React, { useState, useEffect } from 'react';
import NewsDetailsCard from './NewsDetailsCard';
import { Container, Row, Col, Button } from 'react-bootstrap';

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(24); 
  const [totalPages, setTotalPages] = useState(0);
  const apiNews = import.meta.env.VITE_API_KEY_NEWS;

  useEffect(() => {
    setLoading(true);
    fetch(`http://api.mediastack.com/v1/news?access_key=${apiNews}&limit=${limit}&offset=${(currentPage - 1) * limit}`)
      .then(response => response.json())
      .then(data => {
        setNewsData(data.data);
        setTotalPages(Math.ceil(data.pagination.total / limit));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  }, [currentPage, limit]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h2 className='text-center pt-5 mt-5'>Stay Updated with the Latest News</h2>
      <p className='text-center pb-5 mb-5'>Follow the most important news and updates. Stay informed with the latest stories and developments around the world.</p>

      <div className='text-center mb-5 pb-5'>
        <Button variant="primary" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</Button>
        <span className="mx-3">Page {currentPage} of {totalPages}</span>
        <Button variant="primary" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Button>
      </div>

      <Row>
        {newsData.map((news, index) => (
          <Col key={index} >
            <NewsDetailsCard
              title={news.title}
              text={news.description}
              image={news.image}
              link={news.url}
            />
          </Col>
        ))}
      </Row>

      <div className='text-center mb-5 pb-5'>
        <Button variant="primary" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</Button>
        <span className="mx-3">Page {currentPage} of {totalPages}</span>
        <Button variant="primary" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Button>
      </div>
    </Container>
  );
};

export default News;
