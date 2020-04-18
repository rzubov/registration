## Prerequisites
> docker-compose up -d

> npm install -g sequelize-cli pg

## Feature implemented list
- Docker environment
- migrations for registration table
- sequalize model
- register GET, POST endpoint, register-confirmation endpoint
- registration email
- REDIS for get users endpoint
- crypt password on postgresql side
- password validation, email validation
- requests limit be ip

##TODO
- Code Cleanup
- Contractual adjustments, responses adjustments
- Error Messages Localization?
- Better errors handling
- API tests



##Examples
```
POST http://localhost:5050/user/register

{
    "email": "email@example.com",
    "password": "password.",
    "phone":"5553535"
}
```

```
GET http://localhost:5050/users

{
    "email": "email@example.com",
    "password": "password.",
    "phone":"5553535"
}
```


