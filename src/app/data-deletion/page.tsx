import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Deletion Request | Eazotel",
  description:
    "Request deletion of your personal or business data from Eazotel. Instructions for Meta, WhatsApp Business, and Google API users.",
  alternates: {
    canonical: "https://eazotel.com/data-deletion",
    languages: {
      "en-US": "https://eazotel.com/data-deletion",
    },
  },
  openGraph: {
    title: "Data Deletion Request | Eazotel",
    description:
      "Request deletion of your personal or business data from Eazotel. Instructions for Meta, WhatsApp Business, and Google API users.",
    url: "https://eazotel.com/data-deletion",
    siteName: "Eazotel",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Deletion Request | Eazotel",
    description:
      "Request deletion of your personal or business data from Eazotel. Instructions for Meta, WhatsApp Business, and Google API users.",
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

export default function DataDeletion() {
  const dataDeletion = {
    app_name: "Eazotel",
    last_updated: "2025-10-24",
    support_email: "support@eazotel.com",
    description:
      "This page explains how users can request deletion of their personal or business data from Eazotel.",
    platforms: [
      "Meta (Facebook & WhatsApp Business Platform)",
      "Google APIs (OAuth, Google Business Profile)",
    ],
    timeline: "30 days",
  };

  return (
    <div className="min-h-screen bg-white p-5">
      <div className="max_width mx-auto text-gray-800">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-semibold">Data Deletion Request</h1>
          <p className="mt-2 text-sm text-gray-600">
            Last updated: {dataDeletion.last_updated}
          </p>
        </header>

        {/* Introduction */}
        <section className="mb-6">
          <p>
            {dataDeletion.app_name} respects your privacy and your right to
            request deletion of personal or business data associated with your
            use of our platform. This page explains how you can request deletion
            of data collected through our website, applications, and integrated
            third-party platforms.
          </p>
        </section>

        {/* Platforms */}
        <section className="mb-6">
          <h2 className="text-xl font-medium">Platforms Covered</h2>
          <ul className="mt-3 list-disc list-inside space-y-1">
            {dataDeletion.platforms.map((platform, index) => (
              <li key={index}>{platform}</li>
            ))}
          </ul>
        </section>

        {/* How to Request */}
        <section className="mb-6">
          <h2 className="text-xl font-medium">How to Request Data Deletion</h2>
          <ol className="mt-3 list-decimal list-inside space-y-2">
            <li>
              Send an email to{" "}
              <a
                href={`mailto:${dataDeletion.support_email}`}
                className="text-blue-600 underline"
              >
                {dataDeletion.support_email}
              </a>
            </li>
            <li>
              Use the subject line: <strong>“Data Deletion Request”</strong>
            </li>
            <li>
              Include your registered email address, business name, and the
              platform you connected (Meta or Google).
            </li>
          </ol>
        </section>

        {/* Timeline */}
        <section className="mb-6">
          <h2 className="text-xl font-medium">Deletion Timeline</h2>
          <p className="mt-2">
            Once your request is verified, we will process data deletion within{" "}
            <strong>{dataDeletion.timeline}</strong>. You will receive a
            confirmation once the process is completed.
          </p>
        </section>

        {/* What Is Deleted */}
        <section className="mb-6">
          <h2 className="text-xl font-medium">What Data Is Deleted</h2>
          <ul className="mt-3 list-disc list-inside space-y-1">
            <li>Business contact information</li>
            <li>Connected Meta Pages and WhatsApp identifiers</li>
            <li>Google Business Profile identifiers</li>
            <li>Authentication tokens and integration data</li>
          </ul>
        </section>

        {/* Retention */}
        <section className="mb-6">
          <h2 className="text-xl font-medium">Data Retention Exceptions</h2>
          <p className="mt-2">
            Certain information may be retained where required by law, for
            security, audit, or compliance purposes, such as billing records or
            system logs. Retained data is securely stored and access is
            restricted.
          </p>
        </section>

        <section className="mt-8 border-t pt-4 text-sm text-gray-600">
          <p>{dataDeletion.description}</p>
        </section>
      </div>
    </div>
  );
}
