import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { Row, Col, Spin, Card, Form, Input, Button, Radio } from 'antd';

export default function Home() {
  const initialFormData = Object.freeze({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    cardType: "",
    cardNumber: null,
  });

  const [formData, updateFormData] = useState({});
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: formData }),
  };

  const [data, setData] = useState([]);
  async function getData() {
    const res = await fetch('api/getCustomers');
    const newData = await res.json();
    console.log({ newData });
    setData(newData);
  }

  async function addCustomer() {
    await fetch("/api/newCustomer", requestOptions)
      .then(() => getData())
      .catch((e) => console.log(e));
  }


  const handleSubmit = () => {
    addCustomer();
  };
  const onFinishFailed = () => {
    message.error('Submit failed!');
  };
  
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => { 
    getData();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Reactjs, Nextjs & Faunadb !!
        </h1>
        <hr/>
        <Row>
          {data.length > 0 ? (
            data.map((d) => (
              <Col span={8} key={d.data.telephone}>
                <Card bordered={false}>
                  <h2>{d.data.firstName} {d.data.lastName}</h2>
                  <p>Phone: {d.data.telephone}</p>
                  <p>{d.data.creditCard.network}: {d.data.creditCard.number}</p>
                </Card>
              </Col>
            ))
        ) : (
          <Spin />
        )}
        </Row>
        <Row>
          <Col>
            <Form
              name="basic"
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              onFinish={handleSubmit}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="First Name"
                rules={[{ required: true, message: 'Please input your firstName!' }]}
                 
              >
                <Input onChange={handleChange} name="firstName" />
              </Form.Item>
              <Form.Item
                
                label="Last Name"
                rules={[{ required: true, message: 'Please input your lastName!' }]}
              >
                <Input  onChange={handleChange} name="lastName"/>
              </Form.Item>
              <Form.Item
                label="Street"
              >
                <Input onChange={handleChange} name="streetAddress"/>
              </Form.Item>
              <Form.Item
                label="city"
              >
                <Input onChange={handleChange} name="city"/>
              </Form.Item>
              <Form.Item
                label="state"
              >
                <Input onChange={handleChange} name="state"/>
              </Form.Item>
              <Form.Item
                label="zipCode"
              >
                <Input onChange={handleChange} name="zipCode"/>
              </Form.Item>
               <Form.Item
                label="telephone"
                rules={[{ required: true, message: 'Please input your phoneNumber!' }]}
              >
                <Input onChange={handleChange} name="phoneNumber"/>
              </Form.Item>
              <Form.Item
                 label="Card network" >
                <Radio.Group value={formData} name="cardType">
                  <Radio.Button onChange={handleChange} key={1} value="visa">Visa</Radio.Button>
                  <Radio.Button onChange={handleChange} key={2} value="masterCard">MasterCard</Radio.Button>
                  <Radio.Button onChange={handleChange} key={3} value="amex">Amex</Radio.Button>
                </Radio.Group>
              </Form.Item>
               <Form.Item
                label="Card number"
              >
                <Input onChange={handleChange} name="cardNumber"/>
              </Form.Item>
              <Form.Item
                wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </main>

      <footer className={styles.footer}>
        Powered by{' '}Duong-TT
      </footer>
    </div>
  )
}
