import Link from "next/link";


export const metadata = {
    title: "Eazotel Privacy Policy",
    description: "Learn how Eazotel collects, uses, stores, and protects user and business data across Meta, WhatsApp Business, and Google integrations.",
    alternates: {
      canonical: "https://eazotel.com/privacy-policy",
      languages: {
        "en-US": "https://eazotel.com/privacy-policy",
      },
    },
    openGraph: {
      title: "Eazotel Privacy Policy",
      description: "Learn how Eazotel collects, uses, stores, and protects user and business data across Meta, WhatsApp Business, and Google integrations.",
      url: "https://eazotel.com/privacy-policy",
      siteName: "Eazotel",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Eazotel Privacy Policy",
      description: "Learn how Eazotel collects, uses, stores, and protects user and business data across Meta, WhatsApp Business, and Google integrations.",
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

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="max_width mx-auto space-y-10 text-gray-800">
        {/* HEADER */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold">Eazotel Privacy Policy</h1>
          <p className="text-sm text-gray-600">Last updated: 24 October 2025</p>
        </header>

        {/* INTRODUCTION */}
        <section>
          <p>
            This Privacy Policy describes how{" "}
            <strong>Eazotel Technologies Private Limited</strong>
            (&#34;Eazotel&#34;, &#34;we&#34;, &#34;us&#34;, or &#34;our&#34;)
            collects, uses, stores, and protects information when you access or
            use our website, dashboard, WhatsApp Business integrations, Meta
            (Facebook) integrations, and Google APIs including Google Business
            Profile.
          </p>
        </section>

        {/* INFORMATION COLLECTED */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            1. Information We Collect
          </h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>Names, email addresses, and phone numbers</li>
            <li>Hotel or business profile information</li>
            <li>WhatsApp Business phone numbers connected by you</li>
            <li>Meta Page and Business Manager identifiers</li>
            <li>Google Business Profile identifiers</li>
            <li>Authentication credentials and access tokens</li>
            <li>IP address, device information, and usage logs</li>
          </ul>
          <p className="mt-2 font-medium">
            We do not intentionally collect sensitive personal information.
          </p>
        </section>

        {/* HOW WE USE DATA */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>Provide hotel communication and management services</li>
            <li>Enable WhatsApp Business messaging automation</li>
            <li>Manage Meta Page messaging and integrations</li>
            <li>Sync and manage Google Business Profile data</li>
            <li>Provide customer support</li>
            <li>Ensure platform security and prevent fraud</li>
            <li>Comply with legal and regulatory obligations</li>
          </ul>
        </section>

        {/* DATA SHARING */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">3. Data Sharing</h2>
          <p>We may share information only with:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Meta Platforms (Facebook & WhatsApp Business APIs)</li>
            <li>Google APIs (OAuth & Google Business Profile)</li>
            <li>Cloud hosting and infrastructure providers</li>
            <li>Legal authorities when required by law</li>
          </ul>
          <p className="mt-2 font-semibold">
            We do not sell, rent, or trade personal information.
          </p>
        </section>

        {/* WHATSAPP COMPLIANCE */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            4. WhatsApp Business Platform Compliance
          </h2>
          <p>
            Eazotel uses WhatsApp Business Platform APIs strictly for business
            messaging initiated or approved by the business user. Message
            content is processed solely to deliver and manage business
            communications.
          </p>
          <p className="mt-2 font-medium">
            We do not read, sell, or use WhatsApp message content for
            advertising or unrelated purposes.
          </p>
        </section>

        {/* GOOGLE LIMITED USE */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            5. Google API Services – Limited Use Disclosure
          </h2>
          <p>
            Eazotel’s use and transfer of information received from Google APIs
            adheres to the Google API Services User Data Policy, including the
            Limited Use requirements.
          </p>
          <p className="mt-2">
            We access, use, and store Google user data only to provide features
            explicitly requested by the user, such as managing Google Business
            Profile listings. We do not use Google user data for advertising,
            profiling, or resale.
          </p>
        </section>

        {/* META APP DATA USAGE */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            6. Meta App Data Usage
          </h2>
          <p>
            Our application collects business contact information, WhatsApp
            Business identifiers, Meta Page identifiers, and usage data solely
            to enable messaging, automation, analytics, and customer support.
          </p>
          <p className="mt-2 font-medium">
            We do not sell or share data for advertising purposes.
          </p>
        </section>

        {/* DATA RETENTION */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">7. Data Retention</h2>
          <p>
            Personal and business data is retained only while your account is
            active or as required by law. Inactive account data is deleted or
            anonymized within <strong>36 months</strong>.
          </p>
        </section>

        {/* SECURITY */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">8. Data Security</h2>
          <p>
            We implement industry-standard technical and organizational
            safeguards, including encryption, access controls, and secure
            infrastructure.
          </p>
        </section>

        {/* CCPA TABLE */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            9. California Consumer Privacy Act (CCPA)
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Category</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Collected</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["A", "Identifiers", "YES"],
                  ["B", "Customer records information", "YES"],
                  ["C", "Protected characteristics", "NO"],
                  ["D", "Commercial information", "NO"],
                  ["E", "Biometric information", "NO"],
                  ["F", "Internet activity", "YES"],
                  ["G", "Geolocation data", "NO"],
                  ["H", "Audio / visual data", "NO"],
                  ["I", "Professional information", "YES"],
                  ["J", "Education information", "NO"],
                  ["K", "Inferences", "YES"],
                  ["L", "Sensitive personal information", "NO"],
                ].map(([cat, desc, val]) => (
                  <tr key={cat}>
                    <td className="border p-2 font-medium">{cat}</td>
                    <td className="border p-2">{desc}</td>
                    <td className="border p-2">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* USER RIGHTS */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">10. Your Rights</h2>
          <p>
            You may request access, correction, or deletion of your personal or
            business data at any time by contacting us.
          </p>
        </section>

        {/* CONTACT */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">11. Contact Us</h2>
          <p>
            Email:{" "}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="mailto:support@eazotel.com"
              className="text-blue-600"
            >
              support@eazotel.com
            </Link>
          </p>
          <p>
            Website:{" "}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://eazotel.com"
              className="text-blue-600"
            >
              eazotel.com
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
