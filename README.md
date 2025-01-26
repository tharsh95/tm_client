# Frontend Setup for Local Development

## Prerequisites
Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Setup to Run in Local

### 1. Clone the repository
Clone the repository to your local machine using the command below:

```bash
git clone <repository-url>
cd <project-directory>
```

```bash
npm install
```

### Create a .env file and paste the follwoing keys and value accordingly
```bash
VITE_BE_URL="http://localhost:3000/api/v1"
VITE_CLOUDINARY_URL=
VITE_CLOUDINARY_PRESET=
VITE_CLOUDINARY_CLOUD_NAME=
```
### Start the frontend
```bash
npm run dev
```
Access in browser
```bash
http://localhost:5173
```
