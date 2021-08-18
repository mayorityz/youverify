# api documentation

---begin with yarn install
---set up .env according to .env.example

### ENDPOINTS.

###### products (create new product)

----/api/v1/product/createproduct
-----params : { productId : string, title : string, amount : string, desc : string }

###### orders (create new order)

----/api/v1/order/neworder
-----params : { customerId : string, productId : string, amount : string, orderId : string }

###### customer (create new customer)

----/api/v1/customer/newcustomer
-----params : { username : string, email : string, password : string, firstname : string, lastname : string }

Mayowa Abiodun
