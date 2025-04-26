# Routify

## An application that allows parents/students to access bus information from school districts.

This project is made for RidgeHacks 2025 by **Tharun Naguleswaran, Dhruv Rakhade, Anshuman Roy, and Shubham Roy-Choudhury**

## Table of Contents

- [Routify](#routify)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Functionality](#functionality)
  - [How We Built It](#how-we-built-it)
  - [Challenges Faced](#challenges-faced)
  - [Accomplishments](#accomplishments)
  - [What we learned](#what-we-learned)
  - [Extensibility](#extensibility)
  - [Sources](#sources)
 
## Introduction
Routify is an application designed to provide students, parents, and school districts with real-time updates regarding bus transportation information, primarily targeting elementary and middle schools. Through our double-encrypted login system connected to the school’s portal, we maximize security to prevent potential data breaches or trafficking cases. School districts report incidents of route delays, status updates, and bus location to mitigate the lack of transparency regarding safe transportation to parents.

## Functionality
School is a fundamental part of every child's life, providing them with new academic, social, and extracurricular challenges to nurture their skills and build their future. However, one challenge that should not be present is transportation, particularly regarding safety. According to [NYC Open Data](https://data.cityofnewyork.us/Transportation/Bus-Breakdown-and-Delays/ez4e-fazm/data_preview), published by the city of New York government and agencies, there have been roughly 300,000 reported incidents of New York school buses being delayed within the last four years. In our eyes, this number is way too large, with hundreds of thousands of families possibly worrying about their children’s safety. Routify, our new application, will fix this by allowing students, parents, and schools alike to inform and receive real-time information regarding real-time school bus updates. 

## Key Features
- Double encryption login system, utilizing District ID, and parent+student ID/email.
- Bus Incident Reporting System, where parents will be alerted of road delays, accidents, etc.
- Information of buses at certain schools, with real-time location updates through OpenStreetMap
- Integration with VoltSchool, a database including information of students and their transportation.
- Bus Driver Contact Information.


## How We Built It

We built Routify and its corresponding API, Voltwide, using a wide array of libraries and coding languages, which really expanded our knowledge throughout the project, and aimed to give a wide ground of functionality for the app. For the frontend, we used HTML, CSS, and Javascript. For the backend, we used Supabase and SvelteKit to store our API, and JavaScript for the main backend. 

## Challenges Faced

One major challenge we ran into was regarding a database that would contain the data pushed to Routify. Routify was designed to utilize a pre-existing database, like PowerSchool or Genesis, containing information about schools, students, and their buses. We designed VoltSchool, a similar database, containing information that would be accessed by Routify, to make the app functional. VoltSchool may be utilized as an alternative by schools who may not already have one of those two implemented.
## Accomplishments

We’re very proud of our VoltSchool application and its API, which syncs data between itself and Routify. We can use a similar method to integrate PowerSchool or Genesis with Routify, using different school districts’ already existing student data. We built both applications from scratch, requiring intensive focus and coordination between our entire team to ultimately craft our final product. 

## What we Learned

We learned lots from the completion of our Routify. For one, we learned the true extent of the issue we faced as children regarding school bus transportation. We never knew that upwards of 300,000 buses, each with plenty of kids, would all be affected by some sort of traffic or other delay. In addition, our teamwork skills grew tremendously. Although the four of us had been a team in previous competitions, Routify is our best work to date and required an intense level of collaboration and communication to be successful.
## Extensibility

We intend to further maximize the potential of Routify in the future through the incorporation of various school district portals and bus systems Routify can be set up to be compatible with school districts globally, in addition to New Jersey. To achieve this, we plan to leverage partnerships with other governmental education branches, spreading our mission. In addition, we plan to extend Routify to include real-time traffic information. This would alleviate work from the school’s perspective, as traffic and other delays would be automatically signaled through our system, and the schools would not have to report them manually.



Routify, Take the "Route" of Safety!

