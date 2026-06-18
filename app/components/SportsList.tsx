"use client";

import { useState } from "react";
import { Search, ChevronDown, ExternalLink, ShieldCheck } from "lucide-react";

interface SportsListProps {
  initialLeagues: string[];
  groupedFixtures: any;
  dict: any;
  lang: string;
}

const PLATFORMS = [
  { id: "betpawa", name: "Betpawa", color: "#00ff00", url: "https://www.betpawa.com" },
  { id: "melbet", name: "Melbet", color: "#f5a623", url: "https://www.melbet.com" },
  { id: "1xbet", name: "1xbet", color: "#007bff", url: "https://bit.ly/3oNcJaS" }
];

export default function SportsList({ initialLeagues, groupedFixtures, dict, lang }: SportsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState(PLATFORMS[0]);
  const [isPlatformOpen, setIsPlatformOpen] = useState(false);

  // Filter fixtures based on search query
  const filteredLeagues = initialLeagues.filter(leagueName => {
    const { matches } = groupedFixtures[leagueName];
    const matchesMatch = matches.some((match: any) => {
      const homeName = (match.home?.name || match.teams?.home?.name || "").toLowerCase();
      const awayName = (match.away?.name || match.teams?.away?.name || "").toLowerCase();
      return homeName.includes(searchQuery.toLowerCase()) || awayName.includes(searchQuery.toLowerCase());
    });
    return leagueName.toLowerCase().includes(searchQuery.toLowerCase()) || matchesMatch;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* Search & Filter Bar */}
      <div style={{ 
        display: "flex", 
        flexWrap: "wrap", 
        gap: "16px", 
        background: "var(--navy)", 
        padding: "16px", 
        borderRadius: "24px", 
        border: "1px solid var(--border)",
        alignItems: "center",
        position: "sticky",
        top: "100px",
        zIndex: 10,
        backdropFilter: "blur(10px)"
      }}>
        {/* Search Input */}
        <div style={{ flex: 1, position: "relative", minWidth: "250px" }}>
          <Search size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input 
            type="text" 
            placeholder={dict.sports.search_placeholder} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: "100%", 
              background: "var(--navy-deep)", 
              border: "1px solid var(--border)", 
              padding: "12px 16px 12px 48px", 
              borderRadius: "16px", 
              color: "#fff",
              fontSize: "0.95rem",
              outline: "none",
              transition: "border-color 0.3s"
            }}
          />
        </div>

        {/* Platform Selector */}
        <div style={{ position: "relative", minWidth: "200px" }}>
          <div 
            onClick={() => setIsPlatformOpen(!isPlatformOpen)}
            style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between", 
              background: "var(--navy-deep)", 
              border: "1px solid var(--border)", 
              padding: "12px 20px", 
              borderRadius: "16px", 
              cursor: "pointer",
              userSelect: "none"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: selectedPlatform.color }}></div>
              <span style={{ fontWeight: "700", fontSize: "0.9rem" }}>{selectedPlatform.name}</span>
            </div>
            <ChevronDown size={16} style={{ transition: "transform 0.3s", transform: isPlatformOpen ? "rotate(180deg)" : "none" }} />
          </div>

          {isPlatformOpen && (
            <div style={{ 
              position: "absolute", 
              top: "calc(100% + 8px)", 
              left: 0, 
              right: 0, 
              background: "var(--navy-light)", 
              border: "1px solid var(--border)", 
              borderRadius: "16px", 
              overflow: "hidden", 
              zIndex: 20,
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)"
            }}>
              {PLATFORMS.map((platform) => (
                <div 
                  key={platform.id}
                  onClick={() => {
                    setSelectedPlatform(platform);
                    setIsPlatformOpen(false);
                  }}
                  style={{ 
                    padding: "14px 20px", 
                    cursor: "pointer", 
                    transition: "background 0.2s",
                    background: selectedPlatform.id === platform.id ? "rgba(255,255,255,0.05)" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                  }}
                >
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: platform.color }}></div>
                  <span style={{ fontWeight: "600", color: selectedPlatform.id === platform.id ? "#fff" : "var(--text-muted)" }}>{platform.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Fixtures List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
        {filteredLeagues.length === 0 ? (
          <div style={{ textAlign: "center", padding: "100px 0", background: "var(--navy)", borderRadius: "24px", border: "1px solid var(--border)" }}>
            <p style={{ color: "var(--text-muted)", fontSize: "1.2rem" }}>{dict.sports.no_fixtures}</p>
          </div>
        ) : (
          filteredLeagues.map((leagueName) => {
            const { matches, logo: leagueLogo } = groupedFixtures[leagueName];
            const filteredMatches = matches.filter((match: any) => {
              const homeName = (match.home?.name || match.teams?.home?.name || "").toLowerCase();
              const awayName = (match.away?.name || match.teams?.away?.name || "").toLowerCase();
              return leagueName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                     homeName.includes(searchQuery.toLowerCase()) || 
                     awayName.includes(searchQuery.toLowerCase());
            });

            if (filteredMatches.length === 0) return null;

            return (
              <section key={leagueName}>
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between",
                  marginBottom: "24px",
                  paddingBottom: "12px",
                  borderBottom: "1px solid var(--border)"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    {leagueLogo && (
                      <img 
                        src={leagueLogo} 
                        alt={leagueName} 
                        style={{ width: "32px", height: "32px", objectFit: "contain" }}
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                    )}
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {leagueName}
                    </h2>
                  </div>
                  <span style={{ 
                    background: "var(--navy-light)", 
                    padding: "4px 12px", 
                    borderRadius: "9999px", 
                    fontSize: "0.75rem", 
                    fontWeight: "800",
                    color: "var(--text-muted)"
                  }}>
                    {filteredMatches.length} {dict.sports.games_count}
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {filteredMatches.map((match: any, index: number) => {
                    const homeName = match.home?.name || "Home";
                    const awayName = match.away?.name || "Away";
                    const homeLogo = match.home?.logo;
                    const awayLogo = match.away?.logo;
                    const matchTime = match.time || "TBD";
                    const status = match.status?.reason?.short || "NS";

                    return (
                      <div 
                        key={index} 
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "var(--navy-light)";
                          e.currentTarget.style.borderColor = "var(--cyan)";
                          e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "var(--navy)";
                          e.currentTarget.style.borderColor = "var(--border)";
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                        style={{ 
                          background: "var(--navy)", 
                          borderRadius: "20px", 
                          padding: "24px 32px", 
                          border: "1px solid var(--border)",
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "24px",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          position: "relative"
                        }}
                      >
                        {/* Time */}
                        <div style={{ width: "100px" }}>
                          <div style={{ fontSize: "1.1rem", fontWeight: "900", color: "#fff" }}>
                            {matchTime.split(' ').pop()}
                          </div>
                          <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "800", marginTop: "4px" }}>
                            {status}
                          </div>
                        </div>

                        {/* Matchup */}
                        <div style={{ flex: 1, minWidth: "300px", display: "flex", alignItems: "center", justifyContent: "center", gap: "24px" }}>
                          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "12px" }}>
                            <span style={{ fontSize: "1.2rem", fontWeight: "800", textAlign: "right" }}>{homeName}</span>
                            {homeLogo && (
                              <img 
                                src={homeLogo} 
                                alt={homeName} 
                                style={{ width: "32px", height: "32px", objectFit: "contain" }}
                                onError={(e) => (e.currentTarget.style.display = "none")}
                              />
                            )}
                          </div>
                          
                          <div style={{ 
                            width: "44px", 
                            height: "44px", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center", 
                            background: "var(--navy-surface)", 
                            borderRadius: "50%",
                            fontSize: "0.75rem",
                            fontWeight: "900",
                            color: "var(--text-muted)",
                            border: "1px solid var(--border)"
                          }}>
                            VS
                          </div>

                          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "12px" }}>
                            {awayLogo && (
                              <img 
                                src={awayLogo} 
                                alt={awayName} 
                                style={{ width: "32px", height: "32px", objectFit: "contain" }}
                                onError={(e) => (e.currentTarget.style.display = "none")}
                              />
                            )}
                            <span style={{ fontSize: "1.2rem", fontWeight: "800", textAlign: "left" }}>{awayName}</span>
                          </div>
                        </div>

                        {/* Bet Action */}
                        <div style={{ width: "200px", display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
                          <button 
                            onClick={() => window.open(selectedPlatform.url, '_blank')}
                            style={{ 
                              background: selectedPlatform.color, 
                              color: "#000", 
                              border: "none", 
                              padding: "12px 24px", 
                              borderRadius: "16px", 
                              fontWeight: "900", 
                              fontSize: "0.85rem", 
                              cursor: "pointer",
                              transition: "all 0.2s",
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              width: "100%",
                              justifyContent: "center"
                            }}
                          >
                            {dict.sports.bet_now} {selectedPlatform.name.toUpperCase()}
                            <ExternalLink size={14} />
                          </button>
                          <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: "700" }}>
                            <ShieldCheck size={10} /> {dict.sports.secure}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })
        )}
      </div>
    </div>
  );
}
