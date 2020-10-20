This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

<<<<<<< HEAD
This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
=======
- Requested services
  - RequestedServices.create(type, status)
  - RequestedServices.list(id)
  - RequestedServices.detail(id)
- Accepted services
- AcceptedServices.create(type, status)
- AcceptedServices.list(id)
- AcceptedServices.detail(id)

- External API
  - API for location
  - API for calendar

<br>

# Server / Backend

## Models

USER model

```javascript
  {
    firtName: { type: String, required: true, maxlength: 20 },
    lastName: { type: String, required: true, maxlength: 20 },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true, minlength: 6 },
    address: { type: String, required: true, maxlength: 30 },
    about: { type: String, maxlength: 200},
    imageUrl: String,
  },
  {
    timestamps: true,
  }
```

PROVIDER model

```javascript
  {
  firtName: { type: String, required: true, maxlength: 20 },
  lastName: { type: String, required: true, maxlength: 20 },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true, minlength: 6 },
  address: { type: String, required: true, maxlength: 30 },
  about: { type: String, maxlength: 200},
  lessonType:{
    type: String,
    enum: [
    "On line",
    "face to face",
      ],
   required: [true],
 },
  imageUrl: String,
  serviceCat: {
    type: String,
    enum: [
      "academic support",
      "informatics",
      "guitar lessons",
      "piano lessons",
      "english lessons",
      "math lessons",
      "baby sitting",
      ],
    required: [true],
  },
  aptitudes: {
    type: String,
    enum: [
      "driving licence",
      "animal lover",
      "first aid",
      "sports",
      ],
    required: [true],
  },
  rate: {
   type: Number,
   required: [true],
},
facebookUrl: String,
{
  timestamps: true,
}
}
```

REQUESTED SERVICE model

```javascript
  {
  userId: { type: mongoose.ObjectId, ref: "User", required: true },
  providerId: { type: mongoose.ObjectId, ref: "Provider", required: true },
  quantity: {
  type: Number, default: 0,
      },
  day: {
   type: Number,
    enum: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
      ],
      },
   month: {
   type: String,
    enum: [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
      ],
      },
    year: {
   type: Number,
    enum: [
      "2020",
      "2021",
      ],
      },
   hours: {
   type: Number,
    enum: [
      "1",
      "2",
      "3",
      "4",
      "5",
      ],
      },
{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
},
},
```

ACCEPTED SERVICE model

```javascript
{
  requestedserviceId: { type: mongoose.ObjectId, ref: "RequestedService", required: true },
  totalPrice: type: number,
{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
},
},
```

SESSION

const{ObjectId}=schema.types.OjectId,
{
userId: {type:ObjectId, ref:"User"},
createdAt: {
type: Date,
default: Date.now(),
index: {expires: 60*1000*60} //One hour
},
},

<br>

## API Endpoints (backend routes)

| HTTP Method | URL                        | Request Body            | Success status | Error Status | Description                                                                                                                     |
| ----------- | -------------------------- | ----------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| GET         | `/auth/session `           | Saved session           | 200            | 404          | Check if user is logged in and return profile page                                                                              |
| POST        | `/auth/signup`             | {name, email, password} | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`              | {username, password}    | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session              |
| POST        | `/auth/logout`             | (empty)                 | 204            | 400          | Logs out the user                                                                                                               |
| GET         | `Provider/profile/list`    |                         |                | 400          | Show series elements                                                                                                            |
| GET         | `Provider/profile/:id`     |                         |                |              | Show specific element                                                                                                           |
| PUT         | `Provider/profile/:id`     |                         | 200            | 400          | Edit specific element                                                                                                           |
| DELETE      | `Provider/profile/:id`     |                         | 201            | 400          | delete element                                                                                                                  |
| GET         | `User/profile/list`        |                         |                | 400          | Show series elements                                                                                                            |
| GET         | `User/profile/:id`         |                         |                |              | Show specific element                                                                                                           |
| PUT         | `User/profile/:id`         |                         | 200            | 400          | Edit specific element                                                                                                           |
| DELETE      | `User/profile/:id`         |                         | 201            | 400          | delete element                                                                                                                  |
| POST        | `/requestedservice/create` |                         | 204            | 400          | Ask for service, and create requested service.                                                                                  |
| GET         | `/requestservice`          |                         | 204            | 400          | Show ask service page                                                                                                           |
| GET         | `/requestedservice/:id`    |                         | 204            | 400          | Show specific requestedservice                                                                                                  |
| GET         | `/requestedservice/list    |                         | 204            | 400          | Show series requestedservice                                                                                                    |
| POST        | `/acceptedservice/create`  |                         | 204            | 400          | Accept for service, and create requested service.                                                                               |
| GET         | `/acceptedservice/:id`     |                         | 204            | 400          | Show specific acceptedservice                                                                                                   |
| GET         | `/acceptedservice/list     |                         | 204            | 400          | Show series acceptedservice                                                                                                     |
| POST        | `/review/create`           |                         | 204            | 400          | create a review                                                                                                                 |
| GET         | `/review/:id`              |                         | 204            | 400          | Show specific review                                                                                                            |
| GET         | `/review/list`             |                         | 204            | 400          | Show series review                                                                                                              |
| DELETE      | `/review/:id`              |                         | 201            | 400          | delete review                                                                                                                   |

<br>

## Links

### Trello

https://trello.com/b/e4Cr0GR6/project-3reactapp-click

### Git

The url to your repository and to your deployed project

[Client repository Link] https://github.com/alejanglez/CLICK-client

[Server repository Link] https://github.com/alejanglez/CLICK-server

[Deployed App Link]

### Slides

The url to your presentation slides/wire frames:
https://www.figma.com/file/Ct8RS0DhspWB4R8swQ0jx7/Project-3-%7C-Click?node-id=0%3A1
>>>>>>> 78c8a6c2ba4e60bd4d1dc248ebc40336d000a977
