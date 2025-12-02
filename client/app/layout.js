import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { UserProvider } from "../context/UserContext"; // adjust path

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0147FF]">
        <UserProvider>
          <Navbar />
          {children}
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
