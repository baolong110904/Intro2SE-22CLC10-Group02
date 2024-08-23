import React from "react";

const DocumentCard = ({ title, link }) => {
  return (
    <div style={styles.cardContainer}>
      <div style={styles.card}>
        <img
          src="https://img.icons8.com/ios-filled/50/000000/document--v1.png"
          alt="Document Icon"
          style={styles.icon}
        />
        <a href={link} style={styles.link} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      </div>
    </div>
  );
};

const styles = {
  cardContainer: {
    margin: "15px 0",
  },
  card: {
    display: "flex",
    alignItems: "center",
    padding: "15px",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  cardHovered: {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
  icon: {
    width: "50px",
    height: "50px",
    marginRight: "15px",
  },
  link: {
    textDecoration: "none",
    color: "#0b6dff",
    fontSize: "18px",
    fontWeight: "bold",
    transition: "color 0.3s ease",
  },
};

export default DocumentCard;
