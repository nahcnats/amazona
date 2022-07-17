import * as React from 'react';
import type { NextPage } from 'next';
import Layout from '../components/Layout';
import Products from '../components/Product';

const Home: NextPage = () => {
    return (
        <Layout>
            <Products />
        </Layout>
  );
};

export default Home;