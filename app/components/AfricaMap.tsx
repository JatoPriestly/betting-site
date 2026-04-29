"use client";

import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

// World atlas remains the most stable source
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const licensedCountries = [
  "Nigeria", "Ghana", "Kenya", "Uganda", "Tanzania", 
  "Zambia", "Cameroon", "Senegal", "Ethiopia", 
  "Democratic Republic of the Congo", "Ivory Coast",
  "Zimbabwe", "Rwanda", "Malawi", "Burundi", "Mozambique",
  "Angola", "Morocco", "Egypt", "South Africa", "Côte d'Ivoire"
];

const AfricaMap = ({ dict }: { dict: any }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{ height: "400px" }}></div>;

  return (
    <div style={{ 
      width: "100%", 
      padding: "40px 0",
      color: "#FFFFFF",
      textAlign: "center"
    }}>
      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          {dict.map.title}
        </h2>
        <p style={{ color: "#666", fontSize: "0.9rem", marginTop: "8px" }}>
          {dict.map.subtitle}
        </p>
      </div>
      
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "1200px" }}>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 180,
              center: [20, 5]
            }}
            width={800}
            height={500}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const name = geo.properties.name;
                  const isLicensed = licensedCountries.some(c => name.includes(c) || c.includes(name));
                  
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={isLicensed ? "#FFFFFF" : "#080808"}
                      stroke={isLicensed ? "#FFFFFF" : "#1a1a1a"}
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none", transition: "all 0.3s" },
                        hover: { fill: "#fff", outline: "none", cursor: "pointer" },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>
      </div>

      <div style={{ 
        marginTop: "20px", 
        display: "flex", 
        justifyContent: "center", 
        gap: "30px",
        flexWrap: "wrap"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "12px", height: "12px", background: "#fff", borderRadius: "2px" }}></div>
          <span style={{ fontSize: "0.7rem", fontWeight: "800", color: "#444", letterSpacing: "0.1em" }}>{dict.map.active}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "12px", height: "12px", background: "#080808", border: "1px solid #1a1a1a", borderRadius: "2px" }}></div>
          <span style={{ fontSize: "0.7rem", fontWeight: "800", color: "#444", letterSpacing: "0.1em" }}>{dict.map.upcoming}</span>
        </div>
      </div>
    </div>
  );
};

export default AfricaMap;
