# Hospital Management System Demo

## Tech Stack

•	Front end - React (Version - 18.2.0)
•	Backend - Node.js (Version – 20.11.0)
•	Server - Express.js (Version 4.18.2)
•	Database - MySQL (Version 8.0)
•	Testing – JEST (Version 29.7)

## Software Architecture 

We made optimal use of the Layered Architecture by identifying the layers and then designing our software architecture as per these atomic layers, so that the layers are able to work independently and perform a single task.

Our identified layers were:
1.	Database Layer – MySQL Database
We are storing our data in a relational database (MySQL) and have designed our data schema with the same.

2.	Connection Layer – MySQL Connection with software 
Established our MySQL connection with the backend of software using MySQL user credentials.

3.	Data Extraction Layer – MySQL2 module in NodeJS for data extraction
We are extracting and interacting with our database by performing CRUD operations on it through our software backend with this layer. We are making use of the MySQL2 module in Node JS for it.

4.	Mapping Layer – server routes, Express JS
For mapping and handling our server routes, we are making use of Express.js.

5.	Business Rules – User roles, who gets to see what
We are making use of User Roles. It is responsible for redirecting patients, healthcare providers, and admin to their specific dashboard after login.

6.	Content Layer – reusable React components
Our content layer is comprised of several reusable React components. It includes components showing information of healthcare providers and other reusable react components.

7.	View Layer – React front end
Our view layer is responsible for our front end. It is designed with React. It reflects how our system looks and feels through a digital screen.


8.	Security – Server routes blocked as per role-allowance
We have restricted our server routes as per the user’s role. E.g. only the provider can see the provider dashboard and not the patient. 
 
9.	Error Handling – Wrong credentials error handling
If wrong credentials or wrong security answer is provided on login / password reset page respectively, we handle the error for wrong credentials.

10.	Message Layer – Alerts
If there are any errors like in the above layer, we show an Alert Message on the screen for same.

11.	Hosted Layer – Local system as host
We are using our local system as a host for hosting this web application.

12.	Persistence Layer – local storage
We are using our local system storage for the storage of files and logs. 

## Micro-services

1. Database Service – Ran locally with MySQL​
2. API/Server Service – Express.js server with a mysql2 connection to the database / ran on own port with error handling​
3. View/Content Service – react.js app ran on its own port that can call the API with error handling.​

## Facade

### Objective:​ Enhance scalability and maintainability by integrating an additional server layer.​

Current Architecture:​ Single server handling data queries directly.​

Introduction of a Facade Server: A new server will be added to act as an intermediary.​
- It receives requests from clients.​
- It abstracts the complexity of the system.​

Existing Server Transformation: 
- The current server will solely focus on querying and processing data.​
- It acts as a data provider to the facade server.​

### Workflow:​

Client Request: Initiated by the client to the facade server.​
Facade Server: Routes the request to the existing server.​
Data Server: Performs data retrieval and processing.​
Response Relay: The existing server sends the processed data back to the facade server.​
Client Delivery: The facade server delivers the result to the client.​

### Benefits:​

Decoupled Architecture: Isolates the data processing layer from the client.​
Enhanced Performance: Load distribution leads to improved response times.​
Scalability: Easier to add new servers or services in the future.​

​

## Database Design 
ER Diagram:
![image](https://github.com/user-attachments/assets/b1dde789-7a1f-4cd5-a0e0-2fca81f8ac46)

## Screen UI Design

![image](https://github.com/user-attachments/assets/54638837-aa93-4eeb-954e-b09c40d0b458)

![image](https://github.com/user-attachments/assets/57d87e10-5717-4f99-8b63-18a778f9c603)

![image](https://github.com/user-attachments/assets/e4a48ac8-6d71-424d-bcd0-92f81c0c20d4)

![image](https://github.com/user-attachments/assets/b162d863-0140-447c-a330-b6ac1234e7c8)

