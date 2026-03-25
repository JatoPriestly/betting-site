"use client";

import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

// Free, simplified TopoJSON map of the world
const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

// The countries we are highlighting (Stake, 1xBet, Betway overlap)
const highlightedCountries = [
  // Core / Americas / Asia
  "Canada", "Mexico", "Argentina", "India",
  // Africa Core & South
  "Nigeria", "South Africa", "Zambia", "Zimbabwe", "Mozambique", "Angola", "Namibia", "Botswana",
  // CEMAC
  "Cameroon", "Central African Rep.", "Chad", "Eq. Guinea", "Gabon", "Congo",
  // Francophone
  "Côte d'Ivoire", "Senegal", "Benin", "Burkina Faso", "Mali", "Guinea", "Togo", "Niger", "Dem. Rep. Congo", "Madagascar"
];

// Map TopoJSON abbreviations to gorgeous display names
const displayNames: Record<string, string> = {
  "Central African Rep.": "Central African Republic",
  "Eq. Guinea": "Equatorial Guinea",
  "Congo": "Republic of the Congo",
  "Dem. Rep. Congo": "DR Congo",
  "Côte d'Ivoire": "Ivory Coast"
};

export default function WorldMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{ minHeight: "400px" }} />;

  return (
    <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
      <ComposableMap
        projectionConfig={{ scale: 140 }}
        width={800}
        height={400}
        style={{ width: "100%", height: "auto" }}
      >
        <ZoomableGroup center={[0, 0]} zoom={1} minZoom={1} maxZoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const geoName = geo.properties.name || geo.properties.NAME || geo.properties.admin || "";
                const isHighlighted = highlightedCountries.includes(geoName);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isHighlighted ? "var(--lime)" : "rgba(255,255,255,0.1)"}
                    stroke="rgba(0,0,0,0.5)"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: {
                        fill: isHighlighted ? "var(--lime-hover)" : "rgba(255,255,255,0.2)",
                        outline: "none",
                        cursor: isHighlighted ? "pointer" : "default"
                      },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      <div style={{ marginTop: "1rem", display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", fontSize: "0.825rem", color: "var(--text-home-muted)", lineHeight: "1.4" }}>
        {highlightedCountries.map(country => (
          <span key={country} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--lime)", display: "inline-block" }}></span>
            {displayNames[country] || country}
          </span>
        ))}
      </div>
    </div>
  );
}
