# Cryptonite Crypto Dashboard

Welcome to the Cryptonite Crypto Dashboard! This comprehensive application provides real-time information and analytics on various cryptocurrencies. Below is a detailed overview of the features, pages, and technologies used in this project.

## Key Features/ Implementations
- **Dark/Light Mode**: Users can toggle between dark and light themes. The selected theme is stored in local storage, ensuring the user's choice persists even after refreshing the page.
- **Search Suggestions**: As users type in the search bar, relevant coin suggestions are displayed using debouncing.
- **Drag and Drop**: Users can drag and drop coins into the watchlist side panel to add them.
- **Responsive Design**: The application is designed to be fully responsive, with the navbar positioned at the bottom on mobile devices for easy navigation.
- **Animations**: Smooth animations are implemented across all pages to enhance user experience.
- **Caching**: All API responses are cached on the client side with an expiry time of 5 minutes to optimize performance.
- **Error Handling**: Toast notifications are provided in case of errors while fetching data.
- **Loading Skeleton**: A loading skeleton is shown when the page loads to enhance the user experience.

## Screenshots:

<div align="center">
  <img src="https://github.com/user-attachments/assets/46ef7f11-a51a-4a1c-8334-368043900141" width="45%"/>
  <img src="https://github.com/user-attachments/assets/c664652e-9dc6-409f-9b4d-d64c8b70828b" width="45%"/>
</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/92f92663-547b-4816-ad3a-528b0040a304" width="45%"/>
  <img src="https://github.com/user-attachments/assets/6d36f1e6-9735-484d-85bc-0f5e7eca80d9" width="45%"/>
</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/5b0f6db6-0d47-48bc-9db7-f15ebe785e74" width="45%"/>
  <img src="https://github.com/user-attachments/assets/91365a77-93b8-483d-923c-24fa6c0bd655" width="45%"/>
</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/22d32c74-9c59-4de5-ad68-789ceca86111" width="45%"/>
  <img src="https://github.com/user-attachments/assets/5fed9a6d-fe73-4aa6-9f3c-d5a292ca85f4" width="45%"/>
</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/eda54d24-a675-475e-b3bc-36442e563895" width="45%"/>
  <img src="https://github.com/user-attachments/assets/4a114d49-020b-4793-80cd-71fcad6e41b7" width="45%"/>
</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/72426074-d7e5-4697-9dee-79a6504362bc" height="225px"/>
  <img src="https://github.com/user-attachments/assets/13555c5b-7842-45fc-8479-82bfb78087f0" height="225px"/>
  <img src="https://github.com/user-attachments/assets/b123c9b5-4222-41ca-9318-271013246253" height="225px"/>
  <img src="https://github.com/user-attachments/assets/50fe3bc3-95c3-474f-b265-3cf4f6faf616" height="225px"/>
  <img src="https://github.com/user-attachments/assets/f891c4f4-ad6d-4a34-a9b5-3a0f78c4fca6" width="45%"/>
</div>

## Pages

- `Home Page`
   - **Graph**: Displays the market cap of Bitcoin, Ethereum, and Litecoin over the past year.
   - **Company Holdings**: Information about companies holding Bitcoin and Ethereum.

- `Trending Page`
   - **Trending Coins**: Displays information about the currently trending coins.

- `Explore Page`
   - **Paginated View**: Allows users to view details of the top coins with pagination (20 coins per page).

- `Watchlist Page`
   - **Watchlist Management**: Displays coins added by the user to his watchlist.
      - Users can add a maximum of 15 coins at a time.
      - The watchlist is also available in the side panel, where users can drag and drop coins to add them.
      - Once the watchlist size reaches 15 coins, the oldest coins start getting deleted from the back.
      - Watchlist coins are stored in local storage.

- `Custom Coin Page`
   - **Dynamic Routing**: Displays details of a particular coin based on the coin ID from the URL parameter.
   - **Line Chart**: Shows the price variation of the coin over the past year.
   - **Fundamental Information**: Provides key details and a description of the coin.

## Technology Stack

   - `Framework`
      - **Next.js**: React framework for server-side rendering and static site generation.

- `Styling`
   - **Tailwind CSS**: Utility-first CSS framework for rapid UI development.

- `State Management`
   - **Zustand**: Small, fast, and scalable state management solution for React.

- `Charts`
   - **Recharts**: A composable charting library built on React components.

- `Animations`
   - **Framer Motion**: A production-ready motion library for React.

- `Notifications`
   - **React Hot Toast**: Easy-to-use and customizable toast notifications for React.

- `API`
   - **CoinGecko API**: Free API for cryptocurrency data.

## Deployment
  - The application is deployed at: [https://cryptonite-crypto-dashboard.vercel.app/](https://cryptonite-crypto-dashboard.vercel.app/)

## Setup and Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/vishalchaurasia10/cryptonite.git
   cd cryptonite
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the development server:**
   ```sh
   npm run dev
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```
