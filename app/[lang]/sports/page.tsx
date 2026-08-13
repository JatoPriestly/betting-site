import { getMatchesByDate, getAllLeagues } from "../../lib/footballApi";
import { getDictionary } from "../../dictionaries";
import { apiLang } from "../../i18n";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SportsList from "../../components/SportsList";
import { getLeagueMetadata, cleanLeagueName } from "../../lib/leagueUtils";
import { getActivePromos } from "../../lib/promos";
import PromoCodeStrip from "../../components/PromoCodeStrip";

export const dynamic = "force-dynamic";

export default async function SportsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const feedLang = apiLang(lang);


  // Get today's date in YYYYMMDD format
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const dateStr = `${yyyy}${mm}${dd}`;

  // Parallel fetch matches, leagues and promos
  const [fixturesData, allLeagues, activePromos] = await Promise.all([
    getMatchesByDate(dateStr, feedLang),
    getAllLeagues(feedLang),
    getActivePromos(),
  ]);
  const promos = activePromos.slice(0, 5);

  const fixtures = Array.isArray(fixturesData) ? fixturesData : [];
  const leaguesMetadata = Array.isArray(allLeagues) ? allLeagues : [];

  // Create a lookup map from the bulk API leagues
  const leagueMap = leaguesMetadata.reduce((acc: any, league: any) => {
    acc[league.id] = {
      name: league.localizedName || league.name,
      logo: league.logo
    };
    return acc;
  }, {});

  // Group fixtures by league with enriched data
  const enrichedGroupedFixtures = fixtures.reduce((acc: any, match: any) => {
    const leagueId = match.leagueId;
    const metadata = getLeagueMetadata(leagueId, leagueMap);
    
    // Fallback chain: API metadata -> registry -> match object -> "Other Matches"
    let leagueName = metadata?.name
      || match.league?.name
      || match.leagueName
      || "Other Matches";
    leagueName = cleanLeagueName(leagueName);
    const leagueLogo = metadata?.logo || null;

    if (!acc[leagueName]) {
      acc[leagueName] = { matches: [], logo: leagueLogo };
    }

    // Enrich team logos using FotMob pattern
    const enrichedMatch = {
      ...match,
      home: {
        ...match.home,
        logo: match.home?.id ? `https://images.fotmob.com/image_resources/logo/teamlogo/${match.home.id}.png` : null
      },
      away: {
        ...match.away,
        logo: match.away?.id ? `https://images.fotmob.com/image_resources/logo/teamlogo/${match.away.id}.png` : null
      }
    };

    acc[leagueName].matches.push(enrichedMatch);
    return acc;
  }, {});

  const leagueNames = Object.keys(enrichedGroupedFixtures).sort();

  return (
    <>
      <Navbar dict={dict} lang={lang} />
      <main style={{ minHeight: "100vh", background: "var(--navy-deep)", color: "var(--text-primary)", paddingTop: "120px", paddingBottom: "60px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <header style={{ marginBottom: "60px", textAlign: "center" }}>
            <h1 style={{ fontSize: "clamp(2.5rem, 8vw, 4rem)", fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>
              {dict.nav.sports}
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
              {dict.sports.subtitle}
            </p>
            <div style={{ marginTop: "20px" }}>
              <PromoCodeStrip promos={promos.map(p => ({ id: p.id, bookmaker: p.bookmaker, promoCode: p.promoCode, bonusAmount: p.bonusAmount }))} dict={dict} />
            </div>
          </header>

          <SportsList 
            initialLeagues={leagueNames} 
            groupedFixtures={enrichedGroupedFixtures} 
            dict={dict} 
            lang={lang} 
          />
        </div>
        <Footer dict={dict} />
      </main>
    </>
  );
}
