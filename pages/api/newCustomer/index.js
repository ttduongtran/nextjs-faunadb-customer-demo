const faunadb = require('faunadb');

const secret = process.env.FAUNADB_SECRET_KEY;
const q = faunadb.query;
const client = new faunadb.Client({ secret });

module.exports = async (req, res) => {
  const formData = req.body.data;
  console.log(formData);
  
  try {
    const dbs = await client.query(
      q.Create(
        q.Collection("customers"),
        {
          data: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: {
              street: formData.streetAddress,
              city: formData.city,
              state: formData.state,
              zipCode: formData.zipCode,
            },
            telephone: formData.phoneNumber,
            creditCard: {
              network: formData.cardType,
              number: formData.cardNumber,
            },
          },
        }
      )
    );
    console.log(dbs.data)
    res.status(200).json(dbs.data);
  } catch (error) {
    console.log({error})
    res.status(500).json({error: error.message});
  }
};