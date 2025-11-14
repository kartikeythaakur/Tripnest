import React from "react";
import Footer from '../Components/Footer'

const AboutUsPage = () => {
  return (
    <div
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
        color: "#0f172a",
        lineHeight: 1.6,
        backgroundColor: "#f8fafc",
      }}
    >
      {/* HERO */}
      <section
        style={{
          position: "relative",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 6%",
          backgroundImage:
            "linear-gradient(180deg, rgba(2,6,23,0.55), rgba(2,6,23,0.35)), url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=60')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 980 }}>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(1.6rem, 3.6vw, 2.6rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            About TripNest
          </h1>
          <p
            style={{
              marginTop: 12,
              fontSize: "clamp(0.95rem, 1.6vw, 1.125rem)",
              opacity: 0.95,
            }}
          >
            We help travellers discover beautiful stays and local experiences —
            simple booking, honest hosts and unforgettable trips.
          </p>

          <div
            style={{
              marginTop: 20,
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                background: "linear-gradient(90deg, #2563eb 0%, #1e40af 100%)",
                color: "white",
                border: "none",
                padding: "10px 18px",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 15,
                boxShadow: "0 6px 18px rgba(30,58,138,0.18)",
              }}
            >
              Explore Stays
            </button>
            <button
              style={{
                background: "transparent",
                color: "white",
                border: "1px solid rgba(255,255,255,0.16)",
                padding: "10px 18px",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              Our Story
            </button>
          </div>
        </div>
      </section>

      {/* MISSION & VALUES */}
      <section
        style={{
          padding: "48px 6%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 24,
          alignItems: "start",
        }}
      >
        <div
          style={{
            background: "white",
            padding: 22,
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
          }}
        >
          <h2 style={{ marginTop: 0, color: "#0f172a" }}>Our Mission</h2>
          <p style={{ marginBottom: 0, color: "#374151" }}>
            To make travel effortless by connecting guests with thoughtfully
            curated stays, reliable hosts and local experiences — all with a
            simple, friendly booking flow.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gap: 12,
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          }}
        >
          {[
            { title: "Trust", text: "Verified hosts & transparent pricing" },
            { title: "Simplicity", text: "Book in a few clicks" },
            { title: "Quality", text: "Handpicked stays & support" },
            { title: "Local", text: "Experiences that feel authentic" },
          ].map((v) => (
            <div
              key={v.title}
              style={{
                background: "white",
                padding: 18,
                borderRadius: 10,
                boxShadow: "0 6px 18px rgba(15,23,42,0.04)",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <strong style={{ color: "#1e40af" }}>{v.title}</strong>
              <span style={{ color: "#475569", fontSize: 14 }}>{v.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK STATS */}
      <section
        style={{
          padding: "24px 6%",
          display: "flex",
          gap: 16,
          justifyContent: "center",
          alignItems: "stretch",
          flexWrap: "wrap",
        }}
      >
        {[
          { label: "Years", value: "6+" },
          { label: "Properties", value: "1,200+" },
          { label: "Bookings", value: "50K+" },
          { label: "Cities", value: "85+" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              minWidth: 160,
              flex: "1 1 140px",
              background: "white",
              padding: 18,
              borderRadius: 10,
              textAlign: "center",
              boxShadow: "0 6px 18px rgba(15,23,42,0.04)",
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 700, color: "#0f172a" }}>
              {s.value}
            </div>
            <div style={{ color: "#64748b", marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* TEAM */}
      <section
        style={{
          padding: "48px 6%",
          display: "grid",
          gap: 20,
        }}
      >
        <h3 style={{ margin: 0, color: "#0f172a", textAlign: "center" }}>
          Meet the Team
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
            alignItems: "stretch",
            marginTop: 12,
          }}
        >
          {[
            {
              name: "Aisha Verma",
              role: "CEO",
              img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=60",
            },
            {
              name: "Rohit Kumar",
              role: "Product",
              img: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=400&q=60",
            },
            {
              name: "Meera Joshi",
              role: "Engineering",
              img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=60",
            },
            {
              name: "Siddharth",
              role: "Operations",
              img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=400&q=60",
            },
          ].map((m) => (
            <div
              key={m.name}
              style={{
                background: "white",
                padding: 18,
                borderRadius: 12,
                boxShadow: "0 8px 24px rgba(15,23,42,0.04)",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "4px solid rgba(37,99,235,0.12)",
                  boxShadow: "0 6px 18px rgba(2,6,23,0.06)",
                }}
              >
                <img
                  src={m.img}
                  alt={m.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ fontWeight: 700, color: "#0f172a" }}>{m.name}</div>
              <div style={{ color: "#64748b", fontSize: 14 }}>{m.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "36px 6%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "linear-gradient(90deg,#ecfeff,#f0f9ff)",
            padding: 22,
            borderRadius: 12,
            display: "flex",
            gap: 16,
            alignItems: "center",
            width: "100%",
            maxWidth: 980,
            boxShadow: "0 10px 30px rgba(2,6,23,0.04)",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div style={{ minWidth: 260 }}>
            <div style={{ fontWeight: 700, color: "#065f46" }}>
              Build better travel experiences with us
            </div>
            <div style={{ color: "#065f46", opacity: 0.9 }}>
              Partner with TripNest — hosts, photographers and local guides
              welcome.
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <button
              style={{
                background: "#10b981",
                color: "white",
                border: "none",
                padding: "10px 16px",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Become a Host
            </button>
            <button
              style={{
                background: "transparent",
                color: "#065f46",
                border: "2px solid rgba(6,95,70,0.12)",
                padding: "10px 16px",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

     <Footer/>
    </div>
  );
};

export default AboutUsPage;
