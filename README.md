This closes #7592

### Scribr

<img width="1440" alt="Screen Shot 2022-04-23 at 5 26 10 AM" src="https://user-images.githubusercontent.com/18396169/164873428-1e3b9d6e-765e-4961-8c63-78b9c4d45fa1.png">

### Contributors

Full Name: Lucas Gompou
email: gompoulucas@gmail.com
Author link: https://www.section.io/engineering-education/authors/lucas-gompou/

### Materials

Github Link:

Video:

### Description

Scribr is an on-premise, confluence-like app allowing its users to document and record every bit of information. it also has a blogging entry to allow your team to broadcast Infos.

It has a next-generation live WYSIWYG editor allowing to record highly structured and formatted data
A tree-like organizational structure of the documents to easily access your data.
And beautiful responsible for cross-platform support.

### Stack

The entire application is built using the Next.js Framework. it leverages the api routes feature of the framework for an integrated backend api that communicates with a Mongo Atlas cloud database. It uses the NextAuth library for social authentication via github.

### Deployement

My first plan wasn't a monolith application. I went with a microservice architecture with the following services:
the client (frontend spa), a document API, and a user API. all calls to the backend services go through another service acting as a reverse proxy (API Gateway). to redirect the traffic based on the path in the base API endpoint. but I switched gear when I wasn't able to able to publish my reverse proxy service as a LoadBalancer service type in my k8s cluster. Hence I refactored the app into a very simplified version, stripping a lot of complexity to seamlessly deploy the application.  
the deployment process on KEI is too much of a hassle besides the limitation mentioned above.

Also my original domain got suspended so I has to buy a brand new domain for the deployment. Hence we can't test the app right now because the DNS is still replicating.

PS: sorry for the typos my brain is almost dead at the of writing this
