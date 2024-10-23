# MARKUS BIKE CUSTOMIZER
This project give you the oportunity to customize your own bike.

## Table of Contents
1. [Description](#description)
2. [Installation](#installation)
3. [Implementatiotn](#implementation)



## Description
This website features a bike shop where you can customize your own bicycle. Depending on the parts you choose, you'll be able to see the price of each component in real time, as well as the total cost of all the selected parts. Users can select frames, wheels, handlebars, batteries, motors, and paints to create a unique bike tailored to their preferences.

## Example
For instance, if you select a carbon frame and lightweight wheels, you will see the total price update automatically. This interactive experience allows you to experiment with different combinations until you find the perfect fit for their cycling needs.

## Installation
To set up and run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/bejabeja/bikes-customizer
   cd markus-bikes
   ```


2. First, install all necessary dependencies:

   ```bash
   npm install
   ```

3. Now run the development server:
   
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

4. Access the application:

Once process are running, you can access the application in your browser at [http://localhost:3000](http://localhost:3000)



## Implementation

This project is set up using Next.js.
The goal was to separate the frontend from the backend, which is why there is an `api` folder inside the `app` directory containing everything related to the backend. The idea behind this is that if you want to migrate the backend elsewhere or use a different language, or if you already have your own backend and only need the frontend, the migration process would be smoother.

In this case, I have used a JSON file for the data, although it is organized as if it were tables. You can see that the folder structure is divided into controllers, services, and infrastructure. I’ve chosen this layered architecture to make the project scalable and easier to manage in the future. When we decide to introduce a database, the transition will be smoother and more straightforward. For me, this organization provides clarity when working on a project, making it easier to find what I'm looking for.

Right now, there is only a BikeService and a BikeRepository, and their names follow the Single Responsibility Principle. For example, if we were to introduce user management features, the next files would be UserService, containing the methods related to users, and UserRepository, handling the database calls related to users.

In terms of the frontend structure, since this is an App Router application, the routes of the web app are separated into folders within the app directory. In this case, we have the main page, the Home, and a folder named Customizer, which contains the route for the bike customizer page. In case you need to create a new route, just create a new folder inside App that contains a page.jsx .All components, as well as hooks and other utilities, are located in the src folder.



## Enjoy!

Have fun customizing your bike! Any feedback is welcome.


