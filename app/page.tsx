
export default function Home() {
  return (
    <main
      style={{
        height: "100vh",
        backgroundColor: "red",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>Noiszerd</h1>

      <p style={{ marginBottom: "2rem", opacity: 0.7 }}>Broadcasting sound.</p>

      <button
        style={{
          padding: "1rem 2rem",
          fontSize: "1.2rem",
          backgroundColor: "white",
          color: "black",
          border: "none",
          cursor: "pointer",
        }}
      >
        Play
      </button>
    </main>
  );
}
