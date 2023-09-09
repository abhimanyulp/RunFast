
# RunFast

"Runfast" is an innovative online retail platform, inspired by the renowned brand "Finish Line," that showcases a wide range of fashionable and highly sought-after products.


## Deployed Links

https://runfast.netlify.app/  **(Netlify)** \
https://runfast.onrender.com **(Render)** 
## Tech Stack

**Client:** HTML, CSS, JavaScript, Bootstrap

**Server:** Node, Express, MongoDB
## Features


- **Responsive Design**: Accessible on all devices.

- **Login & Signup**: Create and manage accounts easily.

- **Product Sorting & Filtering**: Find products quickly.

- **Cart & Checkout**: Efficiently manage items and complete purchases.

- **Admin Control**: Streamline platform management.
## Authors 

- [@abhimanyulp](https://www.github.com/abhimanyulp)
    - Client: Products, Cart & Checkout Page
    - Server: Login, Logout & Products Routes
- [@THEPRANAYMISHRA](https://github.com/THEPRANAYMISHRA)
    - Client: Landing Page, Login/Signup & Admin Page
    - Server: Cart, Order Routes

## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## API Reference

#### User login

```http
  POST /user/login
```

#### User register

```http
  POST /user/register
```

#### Get all products

```http
  GET /product/data
```


#### Add product

```http
  POST /product/add
```


#### Get user cart

```http
  GET /cart
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user_token` | `string` | **Required**. |

#### Add product to cart

```http
  POST /cart
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user_token` | `string` | **Required**. |
| `productId` | `string` | **Required**. |


