# Image Classification Web App

### using hugging face api

Web app using next js 15 and hugging face api for pretrained image classification model.

## Features

-   **Classify Images**: Users can upload images by browsing their folders or through drag and drop. Image will be classified using hugging face api and user will be shown the most probable class with the respective score.

## Demo

<!-- -- to be added -->

## Setup Instructions

1. Clone the repository:
2. Install the dependencies
    ```
    npm install
    ```
3. Create .env folder in the root folder

4. Add your access token of hugging face api in variable "NEXT_PUBLIC_HUGGING_FACE_API_ACCESS_TOKEN"

5. Start the dev server

    ```
    npm run dev
    ```

6. Access the application at http://localhost:3000.

## Technologies Used

-   Next.js 15
-   React
-   Tailwind CSS
-   TypeScript
-   Hugging Face for image classification
