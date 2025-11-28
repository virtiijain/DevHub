import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0147FF]">
         <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
