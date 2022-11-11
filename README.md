
## API Reference for Node Authentication

#### Signup

```http
  POST /signup
```
### JSON body:
```
{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@doe.com",
    "password": "qwerty123"
}
```

#### Signin

```http
  POST /signin
```
### JSON body:
``` 
{
    "email": "john@doe.com",
    "password": "qwerty123"
}
```




