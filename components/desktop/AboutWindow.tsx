"use client"

export default function AboutWindow() {
  return (
    <div style={styles.container}>
      <div style={styles.photoWrapper}>
      <img src="/about.JPG" alt="Robel" style={styles.photo} />
      </div>

      <div style={styles.bio}>
        <p style={styles.name}>ROBEL HAILEMICHAEL</p>
        <p style={styles.location}>// 51.5074° N, 0.1278° W — LONDON, ENGLAND</p>

        <div style={styles.divider} />

        <p style={styles.text}>
          He was not supposed to be found.
        </p>
        <p style={styles.text}>
          Operating under the signal <span style={styles.highlight}>SOMEWHEREINLONDON</span> — a designation chosen not for poetry, but for precision. London is a node. A convergence point. Those who understand the architecture of power know that certain cities are not just cities. They are transmission towers.
        </p>
        <p style={styles.text}>
          Robel creates at the intersection of sound and image — music that does not ask for your attention but takes it, artwork that does not decorate walls but encodes them. His productions circulate under <span style={styles.highlight}>FXDED</span> — a name that acknowledges what most refuse to: that everything you were told was permanent has already been erased.
        </p>
        <p style={styles.text}>
          The work is not for everyone. It was never meant to be. Mass appeal is a control mechanism. What Robel builds is for those who have already started asking the questions they were told not to ask.
        </p>
        <p style={styles.text}>
          Music. Visual art. Digital architecture. Three disciplines that appear separate until you understand they are three frequencies of the same signal.
        </p>
        <p style={styles.text}>
          You found this page. That is either a coincidence — or it isn't.
        </p>

        <div style={styles.divider} />

        <p style={styles.footer}>
          ACTIVE :: LONDON :: {new Date().getFullYear()} :: SIGNAL ONGOING
        </p>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    overflowY: "auto",
    gap: "16px",
    padding: "8px",
  },
  photoWrapper: {
    width: "140px",
    height: "140px",
    border: "2px solid #39ff14",
    boxShadow: "0 0 20px rgba(57,255,20,0.4)",
    overflow: "hidden",
    flexShrink: 0,
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "grayscale(100%) contrast(1.5) brightness(0.9) sepia(100%) hue-rotate(70deg) saturate(10)",
  },
  bio: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "100%",
  },
  name: {
    color: "#39ff14",
    fontSize: "1rem",
    fontFamily: "'Courier New', monospace",
    fontWeight: "bold",
    letterSpacing: "0.2em",
    textShadow: "0 0 10px rgba(57,255,20,0.8)",
    textAlign: "center",
  },
  location: {
    color: "#1a7a0a",
    fontSize: "0.7rem",
    fontFamily: "'Courier New', monospace",
    letterSpacing: "0.1em",
    textAlign: "center",
  },
  divider: {
    width: "100%",
    height: "1px",
    backgroundColor: "#1a7a0a",
  },
  text: {
    color: "#39ff14",
    fontSize: "0.75rem",
    fontFamily: "'Courier New', monospace",
    lineHeight: "1.8",
    letterSpacing: "0.03em",
    opacity: 0.9,
  },
  highlight: {
    color: "#39ff14",
    fontWeight: "bold",
    textShadow: "0 0 8px rgba(57,255,20,1)",
  },
  footer: {
    color: "#1a7a0a",
    fontSize: "0.65rem",
    fontFamily: "'Courier New', monospace",
    letterSpacing: "0.15em",
    textAlign: "center",
  },
}