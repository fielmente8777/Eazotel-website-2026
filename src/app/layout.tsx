import Whatsapp from "@/components/ContactButton/WhatsApp";
import Footer from "@/components/footers/Footer";
import { NavBar } from "@/components/navbars";
import { AppProvider } from "@/contextApi/AppContext";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Sofia_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "./styles.scss";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const sofiaSans = Sofia_Sans({
  variable: "--font-sofia-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eazotel",
  description: "Eazotel: Best Hotel Booking & Hospitality Management Software",
  openGraph: {
    title: "Eazotel",
    description:
      "Eazotel: Best Hotel Booking & Hospitality Management Software",
    url: "https://eazotel.com",
    siteName: "Eazotel",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/org-img.png",
        width: 800,
        height: 600,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${sofiaSans.variable} antialiased`}
      suppressHydrationWarning={true}
    >
      <head>
        {/* <Salesiq /> */}
        {/* <Script id="zsiqscript" strategy="lazyOnload">
          {`
          window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}`}
        </Script>
        <Script
          id="zsiqscript"
          strategy="lazyOnload"
          src="https://salesiq.zohopublic.in/widget?wc=siq3e552165893c13042e1d199f6774a60161bf7e2d236cee20afeec12690605bbe60e273bf1bbc69d76802e696c96db5df"
          defer
        ></Script> */}
        {/* <script>
          {`window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}`}
        </script>
        <script
          id="zsiqscript"
          src="https://salesiq.zohopublic.in/widget?wc=siq3e552165893c13042e1d199f6774a60161bf7e2d236cee20afeec12690605bbe60e273bf1bbc69d76802e696c96db5df"
          defer
        ></script> */}

        <script type="text/javascript" id="zsiqchat">
          {`var $zoho = $zoho || {};
            $zoho.salesiq = $zoho.salesiq || {
              widgetcode: "siq3e552165893c13042e1d199f6774a60161bf7e2d236cee20afeec12690605bbe60e273bf1bbc69d76802e696c96db5df",
              values: {},
              ready: function(){}
            };
            var d = document;
            s = d.createElement("script");
            s.type = "text/javascript";
            s.id = "zsiqscript";
            s.defer = true;
            s.src = "https://salesiq.zoho.in/widget";
            t = d.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(s, t);`}
        </script>
        {/* microsoft clarity */}
        <Script type="text/javascript" id="clarity" strategy="lazyOnload">
          {` (function (c, l, a, r, i, t, y) {
              c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
              t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
              y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
            })(window, document, "clarity", "script", "jldrjn7dn7"); `}
        </Script>
        {/* google analytics */}
        <Script
          async
          id="google-analytics"
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=AW-16640924730"
        ></Script>
        <Script id="google-analytics-config" strategy="lazyOnload">
          {` window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());

            gtag('config', 'AW-16640924730');`}
        </Script>
        {/* google tag manager */}
        <Script id="google-tag-manager" strategy="lazyOnload">
          {`(function (w, d, s, l, i) {
            w[l] = w[l] || []; w[l].push({
              'gtm.start':
                new Date().getTime(), event: 'gtm.js'
            }); var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
          })(window, document, 'script', 'dataLayer', 'GTM-WQ5LPRNM');`}
        </Script>
      </head>
      <body>
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WQ5LPRNM"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* <!-- End Google Tag Manager (noscript) --> */}
        <AppProvider>
          <NavBar />
          {children}
          <Footer />
          <Whatsapp />
        </AppProvider>
      </body>
    </html>
  );
}
