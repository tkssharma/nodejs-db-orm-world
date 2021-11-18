
# [Nestjs + Mongodb + Graphql]  
![enter image description here](https://res.cloudinary.com/practicaldev/image/fetch/s--AEXRsCQG--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/5ysrutus0pu7ux580d5s.png)  
  
> ### [Nestjs + Graphql] codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.  
  
This codebase was created to demonstrate a fully fledged fullstack application built with **Nestjs + Graphql** including CRUD operations, authentication, routing, pagination, and more.  
  
  
# Screenshots  
  
**create user**  
  
<img src="https://raw.githubusercontent.com/ramzitannous/medium-graphql-nestjs/master/images/1.png" width="800" height="400"/>  
  
**JWT login**  
  
<img src="https://raw.githubusercontent.com/ramzitannous/medium-graphql-nestjs/master/images/7.png" width="800" height="400"/>  
  
**add article to favorite**  
  
<img src="https://raw.githubusercontent.com/ramzitannous/medium-graphql-nestjs/master/images/8.png" width="800" height="400"/>  
  
**create article**  
  
<img src="https://raw.githubusercontent.com/ramzitannous/medium-graphql-nestjs/master/images/2.png" width="800" height="400"/>  
  
**get all articles and comments with pagination**  
  
<img src="https://raw.githubusercontent.com/ramzitannous/medium-graphql-nestjs/master/images/3.png" width="800" height="400"/>  
  
**add comment to article**  
  
<img src="https://raw.githubusercontent.com/ramzitannous/medium-graphql-nestjs/master/images/4.png" width="800" height="400"/>  
  
  
# How it works  
  
A medium like backend server using nestjs with Graphql and mongodb as presitance layer.  
  
**Packages**  
  
 1. `@nestjs/config`: Configuration module with .env support for nestjs  
 2. `@nestjs/jwt`: Support JWT authentication for nestjs  
 3. `@nestjs/mongoose`: support [mongoose](https://mongoosejs.com/) (Mongodb ORM) for nestjs  
 4. `@nestjs/passport`: Nodejs authentication module that supports multiple strategies  
 5. `@nestjs/graphql`: Add Graphql support for nestjs  
 6. `graphql-subscriptions`; Add subscription with websockets for graphql  
 7. `dataloader`: support graphql batch loading  
 8. `graphql-upload`: add file upload to graphql
  
**Why Dataloader ?**  
  
[Dataloader](https://github.com/graphql/dataloader) is used to solve the popular **N+1** problem, by batching requests and making one rquest to the database to fetch multiple objects, instead of **N** queries, this will optimize the graphql queries significantly, more about the problem can be found [here](https://medium.com/the-marcy-lab-school/what-is-the-n-1-problem-in-graphql-dd4921cb3c1a)  

**Graphql Upload**

graphql file upload was done by `graphql-upload` node package

**Graphql Schema**

full graphql schema can be found at [schema.gql](https://github.com/ramzitannous/medium-graphql-nestjs/blob/master/src/schema.gql)
   
**Graphql Subscription**  

subscription is done using `graphql-subscriptions`, 2 events can be subscribed:  
  
**1. when article created**  
<img src="https://raw.githubusercontent.com/ramzitannous/medium-graphql-nestjs/master/images/5.png" width="800" height="400"/>  
  
**2. when a new comment added**  
<img src="https://raw.githubusercontent.com/ramzitannous/medium-graphql-nestjs/master/images/6.png" width="800" height="400"/>  
  
# Getting started  
  
 1. add `.env` file with fallowing values:   
    `SERVER_PORT=3000`             
    `MONGODB_URI=mongodb://localhost:27017/medium`   
    `DEBUG=true`  
    `SECRET_KEY=secret-key`
    `UPLOAD_PATH=./static`

  2. `yarn install`  
 3. `yarn start`  
 4. Head to `http://localhost:3000/graphql` to check graphql playground.
