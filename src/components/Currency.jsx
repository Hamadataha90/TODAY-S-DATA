import React, { useState, useEffect } from 'react';
import { Col, Container, Dropdown,Spinner, Form, InputGroup, Row, SplitButton } from 'react-bootstrap';
import { FaExchangeAlt } from 'react-icons/fa';

const Currency = () => {
  // Define two API keys for currency conversion
  const apiCurrency1 = import.meta.env.VITE_API_KEY_CURRENCY_1;
  const apiCurrency2 = import.meta.env.VITE_API_KEY_CURRENCY_2;

  // List of available currencies

  const [currencies, setCurrencies] = useState([
    'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 
    'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 
    'BSD', 'BTN', 'BWP', 'BYN', 'BZD', 'CAD', 'CDF', 'CHF', 'CLP', 'CNY', 
    'COP', 'CRC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 
    'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'FOK', 'GBP', 'GEL', 'GGP', 'GHS', 
    'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 
    'IDR', 'ILS', 'IMP', 'INR', 'IQD', 'IRR', 'ISK', 'JEP', 'JMD', 'JOD', 
    'JPY', 'KES', 'KGS', 'KHR', 'KID', 'KMF', 'KRW', 'KWD', 'KYD', 'KZT', 
    'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 
    'MMK', 'MNT', 'MOP', 'MRU', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 
    'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 
    'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 
    'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLE', 'SLL', 'SOS', 'SRD', 
    'SSP', 'STN', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 
    'TTD', 'TVD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'UYU', 'UZS', 'VES', 
    'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMW', 
    'ZWL'
  ]);
  
  
  // State to track selected currencies
  const [selectedCurrencies, setSelectedCurrencies] = useState(['USD', 'EGP']);
  
  // State for the input amount
  const [amount, setAmount] = useState(1);
  
  // State for the converted amount
  const [convertedAmount, setConvertedAmount] = useState(0);
  
  // Loading state for the API request
  const [loading, setLoading] = useState(false);
  
  // Error state for handling failed API requests
  const [error, setError] = useState(null);

  // State to track the current API being used
  const [currentAPI, setCurrentAPI] = useState(apiCurrency1); // Start with API 1

  // Function to fetch currency data
  const fetchCurrencies = async () => {
    setLoading(true); // Start loading
    setError(null); // Reset error

    try {
      const currencyList = currencies.join(',');
      const response = await fetch(`https://apilayer.net/api/live?access_key=${currentAPI}&currencies=${currencyList}&source=${selectedCurrencies[0]}&format=1`);

      // If the response is not OK, throw an error
      if (!response.ok) {
        throw new Error(`Failed to fetch with API: ${currentAPI}`);
      }

      const data = await response.json();

      // Check if the response is successful
      if (!data.success) {
        throw new Error('Failed to fetch currency data');
      }

      // Get the conversion rate for the selected currencies
      const rate = data.quotes[`${selectedCurrencies[0]}${selectedCurrencies[1]}`];
      if (rate) {
        const converted = (amount * rate).toFixed(2); // Calculate converted amount
        setConvertedAmount(converted);
      } else {
        throw new Error('Conversion rate not found');
      }
    } catch (err) {
      console.error('Error fetching currency data:', err);
      setError(err.message || 'Failed to fetch data');

      // If there's an error, switch to the other API
      if (currentAPI === apiCurrency1) {
        setCurrentAPI(apiCurrency2); // Switch to API 2
      } else {
        setCurrentAPI(apiCurrency1); // Switch back to API 1 if API 2 fails
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Run fetchCurrencies whenever amount, selectedCurrencies, or currentAPI changes
  useEffect(() => {
    fetchCurrencies();
  }, [amount, selectedCurrencies, currentAPI]);

  // Swap the selected currencies
  const handleSwap = () => {
    if (selectedCurrencies.length === 2) {
      setSelectedCurrencies([selectedCurrencies[1], selectedCurrencies[0]]);
    }
  };


  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5 p-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }


  return (
    <Container className='pt-5'>
      <h1 className='p-5 text-center'>Currency Converter</h1>
      {loading && <p>Loading...</p>} {/* Show loading text while fetching data */}
      {error && <p>{error}</p>} {/* Show error message if fetching fails */}
      <Row>
        <Col xs={12} md={5}>
          <InputGroup className="mb-3">
            <SplitButton
              variant="outline-secondary"
              title={selectedCurrencies[0]}
              id="segmented-button-dropdown-1"
              onSelect={(eventKey) => setSelectedCurrencies([eventKey, selectedCurrencies[1]])}
            >
              <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {currencies.map((currency) => (
                  <Dropdown.Item key={currency} eventKey={currency}>
                    {currency}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </SplitButton>
            <Form.Control
              aria-label="Text input with dropdown button"
              value={amount}
              onChange={(e) => setAmount(e.target.value)} // Update the amount
            />
          </InputGroup>
        </Col>

        <Col xs={12} md={2} className="text-center convert-icon">
          <FaExchangeAlt style={{ fontSize: '40px', cursor: 'pointer', color: '#007bff' }} onClick={handleSwap} />
        </Col>

        <Col xs={12} md={5}>
          <InputGroup className="mb-3">
            <SplitButton
              variant="outline-secondary"
              title={selectedCurrencies[1]}
              id="segmented-button-dropdown-2"
              onSelect={(eventKey) => setSelectedCurrencies([selectedCurrencies[0], eventKey])}
            >
              <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {currencies.map((currency) => (
                  <Dropdown.Item key={currency} eventKey={currency}>
                    {currency}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </SplitButton>
            <Form.Control
              value={convertedAmount} // Display the converted amount
              aria-label="Converted amount"
              readOnly
            />
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default Currency;
