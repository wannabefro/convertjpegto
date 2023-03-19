import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "Convert JPEG To",
  description:
    "Effortlessly convert JPEG images to PNG, TIFF, and more with our fast and secure online JPEG converter. We prioritize your privacy - no images are stored on our servers. Try our free JPEG conversion tool today!",
  keywords:
    "JPEG converter, JPEG to PNG, JPEG to WEBP, JPEG to TIFF, image conversion, online image converter, free JPEG converter, no image storage, secure image conversion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-R115XSJMP8"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-R115XSJMP8');
  `}
      </Script>
    </html>
  );
}
