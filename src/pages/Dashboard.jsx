import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Sidebar from '../Component/Sidebar';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Heading, Spinner } from '@chakra-ui/react';

const Dashboard = () => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/cart/all', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCartData(response.data);
      calculateStats(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch cart data');
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    let revenue = 0;
    let orders = 0;

    data.forEach(cart => {
      revenue += cart.totalAmount;
      orders += 1;
    });

    setTotalRevenue(revenue);
    setTotalOrders(orders);
  };

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
              <Spinner size="xl" />
            </Box>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Box p={5}>
              <Text color="red.500">{error}</Text>
            </Box>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <Box p={5}>
            <Heading mb={5}>Dashboard</Heading>

            {/* Stats Cards */}
            <Box mb={6} display="flex" gap={4}>
              <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md" bg="orange.50">
                <Text fontSize="lg" fontWeight="bold">Total Orders</Text>
                <Text fontSize="2xl">{totalOrders}</Text>
              </Box>
              <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md" bg="green.50">
                <Text fontSize="lg" fontWeight="bold">Total Revenue</Text>
                <Text fontSize="2xl">${totalRevenue.toFixed(2)}</Text>
              </Box>
            </Box>

            {/* Cart Table */}
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Order ID</Th>
                    <Th>User</Th>
                    <Th>Products</Th>
                    <Th>Total Amount</Th>
                    <Th>Date</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cartData.map((cart) => (
                    <Tr key={cart._id}>
                      <Td>{cart._id}</Td>
                      <Td>{cart.userId}</Td>
                      <Td>
                        {cart.items.map((item, index) => (
                          <Text key={index}>
                            {item.product.name} x {item.quantity}
                          </Text>
                        ))}
                      </Td>
                      <Td>${cart.totalAmount.toFixed(2)}</Td>
                      <Td>{new Date(cart.createdAt).toLocaleDateString()}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Box>
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 