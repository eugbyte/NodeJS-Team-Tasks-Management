# NodeJS-Team-Tasks-Management

## Using the app
* Users must signin before the feautures of the website can be used
* Try out with the following account
  * username: MarkFromSales@outlook.com 
  * password: 123

## Features
* This is a tasks management app created using NodeJS.
  * Express framework, MongoDB and Mongoose.
* Users can create their own tasks
* Users can update and delete only their own tasks, but not tasks of other users
* Users can 'complete' their tasks, which will be reflected in their User History

## Main concepts used
* MVC framework
  * User Model, Task Model
* CRUD w.r.t the Task
  * MongoDB, Mongoose
  * Each User's Tasks are Embedded in each User
  * References (population) w.r.t completed Tasks of each User
* Authentication
  * Route protection - Users can update, delete and complete only their own tasks, but not the tasks of other users
  * Using sessions and cookies to authenticate users

