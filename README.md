# Cryptonite Crypto Dashboard

Welcome to the Cryptonite Crypto Dashboard! This comprehensive application provides real-time information and analytics on various cryptocurrencies. Below is a detailed overview of the features and pages available in this project.

## Pages

### Home Page
- **Graph**: Displays the market cap of Bitcoin, Ethereum, and Litecoin over the past year.
- **Company Holdings**: Information about companies holding Bitcoin and Ethereum.

### Trending Page
- **Trending Coins**: Displays information about the currently trending coins.

### Explore Page
- **Paginated View**: Allows users to view details of the top coins with pagination (20 coins per page).

### Watchlist Page
- **Watchlist Management**: Displays coins added to the user's watchlist.
  - Users can add a maximum of 15 coins at a time.
  - The watchlist is also available in the side panel, where users can drag and drop coins to add them.
  - Once the watchlist size reaches 15 coins, the oldest coins start getting deleted from the back.
  - Watchlist coins are stored in local storage.

### Custom Coin Page
- **Dynamic Routing**: Displays details of a particular coin based on the coin ID from the URL parameter.
- **Line Chart**: Shows the price variation of the coin over the past year.
- **Fundamental Information**: Provides key details and a description of the coin.

## Features
- **Caching**: All API responses are cached on the client side with an expiry time.
- **Error Handling**: Toast notifications are provided in case of errors while fetching data.
- **Loading Skeleton**: A loading skeleton is shown when the page loads to enhance the user experience.
- **Drag and Drop**: Users can drag and drop coins into the watchlist side panel to add them.

## Technology Stack

### Framework
- **Next.js**: React framework for server-side rendering and static site generation.

### Styling
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.

### State Management
- **Zustand**: Small, fast, and scalable state management solution for React.

### Charts
- **Recharts**: A composable charting library built on React components.

### Animations
- **Framer Motion**: A production-ready motion library for React.

### Notifications
- **React Hot Toast**: Easy-to-use and customizable toast notifications for React.

### API
- **CoinGecko API**: Free API for cryptocurrency data.

## Deployment
The application is deployed at: [https://cryptonite-crypto-dashboard.vercel.app/](https://cryptonite-crypto-dashboard.vercel.app/)

## Getting Started
To run the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/cryptonite-crypto-dashboard.git
   cd cryptonite-crypto-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000).

## Contributing
We welcome contributions! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.

---

Thank you for using the Cryptonite Crypto Dashboard! We hope this tool helps you stay informed about the cryptocurrency market. If you have any questions or feedback, please feel free to reach out.