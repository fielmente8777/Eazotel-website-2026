import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Eazotel Terms & Conditions",
  description:
    "Review the Terms and Conditions governing use of the Eazotel platform, integrations, and services.",
  alternates: {
    canonical: "https://eazotel.com/terms-of-service",
    languages: {
      "en-US": "https://eazotel.com/terms-of-service",
    },
  },
  openGraph: {
    title: "Eazotel Terms & Conditions",
    description:
      "Review the Terms and Conditions governing use of the Eazotel platform, integrations, and services.",
    url: "https://eazotel.com/terms-of-service",
    siteName: "Eazotel",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eazotel Terms & Conditions",
    description:
      "Review the Terms and Conditions governing use of the Eazotel platform, integrations, and services.",
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
export default function Terms() {
  const terms = {
    policy_type: "Terms and Conditions",
    app_name: "Eazotel",
    last_updated: "2025-10-24",
    policy_url: "https://eazotel.com/terms-of-service",
    description:
      "These Terms and Conditions govern access to and use of the Eazotel platform, applications, and integrations.",
    content: {
      introduction:
        'These Terms and Conditions ("Terms") govern your access to and use of the Eazotel website, dashboard, applications, and integrations, including Meta (Facebook), WhatsApp Business Platform, and Google APIs (collectively, the "Services"). Eazotel Technologies Private Limited ("Eazotel", "we", "us", or "our") provides these Services exclusively for business and professional use.',

      acceptance:
        "By accessing or using Eazotel’s Services, you confirm that you are authorized to act on behalf of a business entity and agree to be bound by these Terms, our Privacy Policy, and all applicable laws and platform policies.",

      eligibility:
        "You must be at least 18 years old and legally capable of entering into binding agreements to use the Services. The Services are intended solely for businesses, hotels, and authorized representatives.",

      user_responsibilities: [
        "Comply with all applicable laws, regulations, and third-party platform policies, including Meta, WhatsApp Business Platform, and Google API policies",
        "Ensure you have lawful consent to connect phone numbers, Meta Pages, WhatsApp accounts, and Google Business Profiles",
        "Use the Services only for legitimate business communications",
        "Maintain the confidentiality of your login credentials",
        "Refrain from misuse, reverse engineering, scraping, or unauthorized access",
      ],

      third_party_services:
        "Eazotel integrates with third-party platforms such as Meta (Facebook & WhatsApp) and Google. Your use of these services is also governed by their respective terms and policies. Eazotel is not responsible for changes, suspensions, or actions taken by third-party platforms.",

      intellectual_property:
        "All content, software, trademarks, logos, and intellectual property associated with the Services are owned by or licensed to Eazotel. You are granted a limited, non-exclusive, non-transferable right to use the Services solely for your internal business purposes.",

      service_availability:
        "We strive to maintain reliable service availability; however, we do not guarantee uninterrupted or error-free operation. The Services may be temporarily unavailable due to maintenance, updates, or factors beyond our control.",

      limitations:
        "To the maximum extent permitted by law, Eazotel shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of business, revenue, data, or reputation, arising from or related to your use of the Services.",

      indemnification:
        "You agree to indemnify and hold harmless Eazotel from any claims, damages, losses, or expenses arising out of your use of the Services, violation of these Terms, or breach of any third-party rights.",

      termination:
        "We may suspend or terminate access to the Services at any time if you violate these Terms, applicable laws, or platform policies. Upon termination, your right to use the Services will immediately cease.",

      changes:
        "We may update these Terms from time to time. Continued use of the Services after changes become effective constitutes acceptance of the revised Terms.",

      governing_law:
        "These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.",

      contact: {
        email: "support@eazotel.com",
        website: "https://eazotel.com",
      },
    },
  };
  return (
    <div>
      <div className="min-h-screen p-5 bg-white">
        <div className="max_width mx-auto text-gray-800">
          <header className="mb-6">
            <h1 className="text-3xl font-semibold">
              {terms.app_name} — Terms & Conditions
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Last updated: {terms.last_updated}
            </p>
          </header>

          <Section title="Introduction" text={terms.content.introduction} />
          <Section
            title="Acceptance of Terms"
            text={terms.content.acceptance}
          />
          <Section title="Eligibility" text={terms.content.eligibility} />

          <section className="mb-6">
            <h2 className="text-xl font-medium">User Responsibilities</h2>
            <ul className="mt-3 list-disc list-inside space-y-1">
              {terms.content.user_responsibilities.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <Section
            title="Third-Party Services"
            text={terms.content.third_party_services}
          />
          <Section
            title="Intellectual Property"
            text={terms.content.intellectual_property}
          />
          <Section
            title="Service Availability"
            text={terms.content.service_availability}
          />
          <Section
            title="Limitation of Liability"
            text={terms.content.limitations}
          />
          <Section
            title="Indemnification"
            text={terms.content.indemnification}
          />
          <Section title="Termination" text={terms.content.termination} />
          <Section title="Changes to Terms" text={terms.content.changes} />
          <Section title="Governing Law" text={terms.content.governing_law} />

          <section className="mb-6">
            <h2 className="text-xl font-medium">Contact Us</h2>
            <ul className="mt-3 space-y-1">
              <li>
                <strong>Email:</strong>{" "}
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`mailto:${terms.content.contact.email}`}
                  className="text-blue-600 underline"
                >
                  {terms.content.contact.email}
                </Link>
              </li>
              <li>
                <strong>Website:</strong>{" "}
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={terms.content.contact.website}
                  className="text-blue-600 underline"
                >
                  {terms.content.contact.website}
                </Link>
              </li>
            </ul>
          </section>

          <section className="mt-6 border-t pt-4 text-sm text-gray-600">
            <p>{terms.description}</p>
          </section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, text }: { title: string; text: string }) {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-medium">{title}</h2>
      <p className="mt-2">{text}</p>
    </section>
  );
}
