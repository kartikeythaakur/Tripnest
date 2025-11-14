import React from "react";
// import { FaPhoneAlt, FaEnvelope, FaQuestionCircle } from "react-icons/fa";
// import { MdHelpOutline } from "react-icons/md";
import Footer from '../Components/Footer';

const Help = () => {
  // Styles for hover states
  const cardStyle = {
    backgroundColor: "#ffffff",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    borderRadius: "1rem",
    padding: "1.5rem",
    transition: "box-shadow 0.3s ease",
  };

  const cardHoverStyle = {
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  };

  const buttonStyle = {
    marginTop: "1.5rem",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    paddingTop: "0.75rem",
    paddingBottom: "0.75rem",
    borderRadius: "0.75rem",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    transition: "background-color 0.3s ease",
    border: "none",
    cursor: "pointer",
  };

  const buttonHoverStyle = {
    backgroundColor: "#1d4ed8",
  };

  const linkStyle = {
    color: "#2563eb",
    fontWeight: "500",
    textDecoration: "none",
  };

  const linkHoverStyle = {
    textDecoration: "underline",
  };

  return (
    <>
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: "linear-gradient(to bottom, #ffffff, #eff6ff)",
        color: "#1f2937",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
        paddingTop: "3rem",
        paddingBottom: "3rem",
      }}
    >
      {/* Header */}
      <div style={{ maxWidth: "56rem", textAlign: "center" }}>
        {/* <MdHelpOutline style={{ fontSize: '3rem', color: '#2563eb', margin: '0 auto 1rem' }} /> */}
        <h1
          style={{
            fontSize: "1.875rem",
            lineHeight: "2.25rem",
            fontWeight: "700",
            marginBottom: "0.75rem",
          }}
        >
          How can we help you?
        </h1>
        <p
          style={{
            color: "#4b5563",
            fontSize: "1.125rem",
            lineHeight: "1.75rem",
          }}
        >
          We're here to make your booking experience smooth and easy. Find
          answers to your questions or reach out to our team.
        </p>
      </div>

      {/* This <style> tag is necessary to handle the responsive grid */}
      <style>
        {`
          .help-grid-container {
            width: 100%;
            max-width: 64rem;
            margin-top: 3rem;
            display: grid;
            grid-template-columns: repeat(1, minmax(0, 1fr));
            gap: 2rem;
          }
          @media (min-width: 640px) {
            .help-grid-container {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }
          @media (min-width: 1024px) {
            .help-grid-container {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }
          }
        `}
      </style>

      {/* Help Cards */}
      <div className="help-grid-container">
        {/* FAQ Section */}
        <div
          style={cardStyle}
          onMouseOver={(e) =>
            (e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.boxShadow = cardStyle.boxShadow)
          }
        >
          {/* <FaQuestionCircle style={{ color: '#2563eb', fontSize: '2.25rem', marginBottom: '0.75rem' }} /> */}
          <h2
            style={{
              fontSize: "1.25rem",
              lineHeight: "1.75rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
            }}
          >
            Frequently Asked Questions
          </h2>
          <p style={{ color: "#4b5563", marginBottom: "1rem" }}>
            Have questions about bookings, cancellations, or payments?
          </p>
          <a
            href="#faq"
            style={linkStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.textDecoration =
                linkHoverStyle.textDecoration)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.textDecoration = linkStyle.textDecoration)
            }
          >
            Read FAQs →
          </a>
        </div>

        {/* Contact Support */}
        <div
          style={cardStyle}
          onMouseOver={(e) =>
            (e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.boxShadow = cardStyle.boxShadow)
          }
        >
          {/* <FaPhoneAlt style={{ color: '#16a34a', fontSize: '2.25rem', marginBottom: '0.75rem' }} /> */}
          <h2
            style={{
              fontSize: "1.25rem",
              lineHeight: "1.75rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
            }}
          >
            Contact Support
          </h2>
          <p style={{ color: "#4b5563", marginBottom: "1rem" }}>
            Our support team is available 24/7 for your assistance.
          </p>
          <p style={{ fontWeight: "500", color: "#1f2937" }}>
            📞 +91 98765 43210
          </p>
        </div>

        {/* Email Section */}
        <div
          style={cardStyle}
          onMouseOver={(e) =>
            (e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.boxShadow = cardStyle.boxShadow)
          }
        >
          {/* <FaEnvelope style={{ color: '#7c3aed', fontSize: '2.25rem', marginBottom: '0.75rem' }} /> */}
          <h2
            style={{
              fontSize: "1.25rem",
              lineHeight: "1.75rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
            }}
          >
            Email Us
          </h2>
          <p style={{ color: "#4b5563", marginBottom: "1rem" }}>
            Have a specific issue or feedback? Send us an email.
          </p>
          <p style={{ fontWeight: "500", color: "#1f2937" }}>
            📧 support@tripnest.com
          </p>
        </div>
      </div>

      {/* Bottom Message */}
      <div
        style={{
          marginTop: "4rem",
          textAlign: "center",
          maxWidth: "42rem",
        }}
      >
        <p
          style={{
            color: "#374151",
            fontSize: "1.125rem",
            lineHeight: "1.75rem",
          }}
        >
          Still need help? Don’t worry — we’ve got you covered. Reach out
          anytime and we’ll get back to you as soon as possible.
        </p>
        <button
          style={buttonStyle}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor =
              buttonHoverStyle.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)
          }
        >
          Chat with Support
        </button>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default Help;