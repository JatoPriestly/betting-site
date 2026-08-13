import { getLiveMatches, getAllLeagues } from "../../lib/footballApi";
import { getDictionary } from "../../dictionaries";
import { apiLang } from "../../i18n";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import { getLeagueMetadata, cleanLeagueName } from "../../lib/leagueUtils";
import LiveMatchCard from "../../components/LiveMatchCard";
import { getActivePromos } from "../../lib/promos";
import PromoCodeStrip from "../../components/PromoCodeStrip";


export const dynamic = "force-dynamic";

export default async function LivePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const feedLang = apiLang(lang);

  // Parallel fetch live matches, leagues and promos
  const [matchesData, allLeagues, activePromos] = await Promise.all([
    getLiveMatches(feedLang),
    getAllLeagues(feedLang),
    getActivePromos()
  ]);
  const promos = activePromos.slice(0, 5);


  const matches = Array.isArray(matchesData) ? matchesData : [];
  const leaguesMetadata = Array.isArray(allLeagues) ? allLeagues : [];

  // Create a lookup map for leagues
  const leagueMap = leaguesMetadata.reduce((acc: any, league: any) => {
    acc[league.id] = {
      name: league.localizedName || league.name,
      logo: league.logo
    };
    return acc;
  }, {});

  // Group live matches by league
  const groupedLiveMatches = matches.reduce((acc: any, match: any) => {
    const leagueId = match.leagueId;
    const metadata = getLeagueMetadata(leagueId, leagueMap);
    let leagueName = metadata?.name || match.league?.name || match.leagueName || dict.live.other_matches;
    leagueName = cleanLeagueName(leagueName);
    const leagueLogo = metadata?.logo || null;

    if (!acc[leagueName]) {
      acc[leagueName] = { matches: [], logo: leagueLogo };
    }

    acc[leagueName].matches.push({ ...match, metadata });
    return acc;
  }, {});

  const leagueNames = Object.keys(groupedLiveMatches).sort();

  return (
    <>
      <Navbar dict={dict} lang={lang} />
      <main style={{ minHeight: "100vh", background: "var(--navy-deep)", color: "var(--text-primary)", paddingTop: "120px", paddingBottom: "60px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <header style={{ marginBottom: "60px", textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(2.5rem, 8vw, 4rem)", fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>
            {dict.nav.live}
          </h1>
          <div style={{ display: "inline-block", padding: "8px 20px", background: "rgba(255,0,0,0.1)", border: "1px solid rgba(255,0,0,0.3)", borderRadius: "9999px", color: "#ff4444", fontWeight: "700", fontSize: "0.9rem" }}>
            ● {dict.live.now}
          </div>
          <PromoCodeStrip promos={promos.map(p => ({ id: p.id, bookmaker: p.bookmaker, promoCode: p.promoCode, bonusAmount: p.bonusAmount }))} dict={dict} />
        </header>


        {matches.length === 0 ? (
          <div style={{ textAlign: "center", padding: "100px 0", background: "rgba(255,255,255,0.02)", borderRadius: "24px", border: "1px solid var(--border)" }}>
            <p style={{ color: "var(--text-muted)", fontSize: "1.2rem" }}>{dict.live.empty}</p>
            <Link href={`/${lang}/sports`} style={{ color: "#fff", textDecoration: "underline", marginTop: "20px", display: "inline-block" }}>
              {dict.live.view_upcoming}
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
            {leagueNames.map((leagueName) => {
              const { matches: leagueMatches, logo: leagueLogo } = groupedLiveMatches[leagueName];
              
              return (
                <section key={leagueName}>
                  <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "16px", 
                    marginBottom: "32px",
                    paddingBottom: "16px",
                    borderBottom: "1px solid var(--border)"
                  }}>
                    {leagueLogo && (
                      <img src={leagueLogo} alt="" style={{ width: "32px", height: "32px", objectFit: "contain" }} />
                    )}
                    <h2 style={{ fontSize: "1.8rem", fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {leagueName}
                    </h2>
                    <span style={{ 
                      background: "#ff4444", 
                      color: "#fff", 
                      padding: "2px 10px", 
                      borderRadius: "6px", 
                      fontSize: "0.7rem", 
                      fontWeight: "900" 
                    }}>
                      {dict.live.badge}
                    </span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: "24px" }}>
                    {leagueMatches.map((match: any, matchIdx: number) => (
                      <LiveMatchCard
                        key={matchIdx}
                        match={match}
                        metadata={match.metadata}
                        dict={dict}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
      <Footer dict={dict} />
    </main>
    </>
  );
}
