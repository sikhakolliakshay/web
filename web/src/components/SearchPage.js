import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Table, Select, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import './SearchPage.css';

const { Search } = Input;
const { Option } = Select;

function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      // If no userId is found in localStorage, redirect to the login page
      navigate('/');
    }
  }, [navigate]);

  const handleSearch = () => {
    setLoading(true);
    setError('');

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/v1/users/search`, {
        params: {
          'filter.text': query,
        },
      })
      .then((response) => {
        let allResults = response.data.data;

        // Filter results based on search query
        allResults = allResults.filter(profile =>
          profile.firstName.toLowerCase().includes(query.toLowerCase()) ||
          profile.lastName.toLowerCase().includes(query.toLowerCase()) ||
          profile.phone.includes(query) ||
          profile.accountNumber.includes(query)
        );

        // Filter results based on selected category
        if (category) {
          allResults = allResults.filter(profile => profile.type === category);
        }

        setResults(allResults);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch search results');
        setLoading(false);
        console.error('Error fetching search results:', error);
      });
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Account Number',
      dataIndex: 'accountNumber',
      key: 'accountNumber',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Academy Name',
      dataIndex: 'academy_name',
      key: 'academy_name',
    },
    {
      title: 'Company Name',
      dataIndex: 'company_name',
      key: 'company_name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
  ];

  return (
    <div className="search-page-container">
      <header>
        <h1>Search Users</h1>
        <div className="search-bar">
          <Select
            placeholder="Select category"
            style={{ width: 200, marginRight: 16 }}
            onChange={(value) => setCategory(value)}
            value={category}
          >
            <Option value="">All</Option>
            <Option value="PLAYER">Player</Option>
            <Option value="ACADEMY">Academy</Option>
            <Option value="AGENT">Agent</Option>
            <Option value="REFEREE">Referee</Option>
            <Option value="GUARDIAN">Guardian</Option>
            <Option value="COACH">Coach</Option>
          </Select>
          <Search
            placeholder="Enter search criteria"
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={handleSearch}
            onChange={(e) => setQuery(e.target.value)}
            style={{ color: '#000' }}
          />
          <Button
            type="primary"
            onClick={handleSearch}
            loading={loading}
            className="search-button"
          >
            Search
          </Button>
        </div>
      </header>
      <main>
        {error && <p className="error-message">{error}</p>}
        <Table
          dataSource={results}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </main>
    </div>
  );
}

export default SearchPage;
