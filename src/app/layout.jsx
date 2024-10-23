import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Markus Bikes",
  description: "Customize your bike",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Providers>
          {children}
        </Providers>
      </body>

    </html>
  );
}
