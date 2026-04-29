"use client";

import { cleanLeagueName } from "../lib/leagueUtils";

interface LiveMatchCardProps {
  match: any;
  metadata: any;
}

export default function LiveMatchCard({ match, metadata }: LiveMatchCardProps) {
  const leagueId = match.leagueId;
  const homeName = match.home?.name || match.teams?.home?.name || "Home";
  const awayName = match.away?.name || match.teams?.away?.name || "Away";
  const homeScore = match.home?.score ?? match.goals?.home ?? 0;
  const awayScore = match.away?.score ?? match.goals?.away ?? 0;
  const elapsed = match.status?.liveTime?.short || match.status?.elapsed || "0'";
  
  let leagueName = metadata?.name || match.league?.name || match.leagueName || (leagueId ? `League ${leagueId}` : "Live Match");
  leagueName = cleanLeagueName(leagueName);
  
  const homeLogo = match.home?.id ? `https://images.fotmob.com/image_resources/logo/teamlogo/${match.home.id}.png` : null;
  const awayLogo = match.away?.id ? `https://images.fotmob.com/image_resources/logo/teamlogo/${match.away.id}.png` : null;

  return (
    <div style={{ 
      background: "linear-gradient(145deg, #0a0a0a 0%, #050505 100%)", 
      borderRadius: "20px", 
      padding: "32px", 
      border: "1px solid #111",
      position: "relative",
      overflow: "hidden",
      transition: "transform 0.3s ease",
    }}>
      {/* Match Header */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px", fontSize: "0.85rem", color: "#444", fontWeight: "800", textTransform: "uppercase" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {metadata?.logo && (
            <img src={metadata.logo} alt="" style={{ width: "16px", height: "16px", objectFit: "contain" }} />
          )}
          <span>{leagueName}</span>
        </div>
        <span style={{ color: "#ff4444", background: "rgba(255,0,0,0.1)", padding: "2px 8px", borderRadius: "4px" }}>{elapsed}</span>
      </div>

      {/* Teams & Score */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ width: "70px", height: "70px", background: "#111", borderRadius: "50%", margin: "0 auto 12px", border: "1px solid #222", display: "flex", alignItems: "center", justifyItems: "center", overflow: "hidden", padding: "10px" }}>
            {homeLogo ? (
              <img src={homeLogo} alt={homeName} style={{ width: "100%", height: "100%", objectFit: "contain" }} onError={(e) => (e.currentTarget.style.display = "none")} />
            ) : (
              <div style={{ width: "100%", height: "100%", background: "#222" }}></div>
            )}
          </div>
          <span style={{ display: "block", fontSize: "1rem", fontWeight: "800", textTransform: "uppercase", color: "#fff" }}>{homeName}</span>
        </div>
        
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "3rem", fontWeight: "900", letterSpacing: "4px", color: "#fff" }}>
            {homeScore}<span style={{ color: "#333", margin: "0 8px" }}>:</span>{awayScore}
          </div>
        </div>

        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ width: "70px", height: "70px", background: "#111", borderRadius: "50%", margin: "0 auto 12px", border: "1px solid #222", display: "flex", alignItems: "center", justifyItems: "center", overflow: "hidden", padding: "10px" }}>
            {awayLogo ? (
              <img src={awayLogo} alt={awayName} style={{ width: "100%", height: "100%", objectFit: "contain" }} onError={(e) => (e.currentTarget.style.display = "none")} />
            ) : (
              <div style={{ width: "100%", height: "100%", background: "#222" }}></div>
            )}
          </div>
          <span style={{ display: "block", fontSize: "1rem", fontWeight: "800", textTransform: "uppercase", color: "#fff" }}>{awayName}</span>
        </div>
      </div>

      {/* Match Info */}
      <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid #111", textAlign: "center" }}>
        <button style={{ 
          background: "rgba(255,255,255,0.05)", 
          color: "#fff", 
          border: "1px solid #222", 
          padding: "12px 24px", 
          borderRadius: "9999px", 
          fontWeight: "800", 
          fontSize: "0.75rem", 
          cursor: "pointer", 
          width: "100%", 
          textTransform: "uppercase",
          transition: "all 0.2s"
        }}>
          View Live Stats
        </button>
      </div>
    </div>
  );
}
