const fs = require('fs');

const leagues1 = JSON.parse(fs.readFileSync('test_all_leagues_ultimate.json', 'utf8'));
const leagues2 = JSON.parse(fs.readFileSync('test_all_leagues_with_countries.json', 'utf8'));

const registry = {};

if (leagues1.response && Array.isArray(leagues1.response.leagues)) {
    leagues1.response.leagues.forEach(league => {
        registry[league.id] = {
            name: league.localizedName || league.name,
            logo: league.logo,
            ccode: league.ccode
        };
    });
}

if (leagues2.response && Array.isArray(leagues2.response.leagues)) {
    leagues2.response.leagues.forEach(country => {
        if (Array.isArray(country.leagues)) {
            country.leagues.forEach(league => {
                registry[league.id] = {
                    name: league.localizedName || league.name,
                    logo: league.logo,
                    ccode: league.ccode || country.ccode
                };
            });
        }
    });
}

// Write the registry
fs.writeFileSync('leagueRegistry.json', JSON.stringify(registry, null, 2));
console.log(`Registry created with ${Object.keys(registry).length} leagues.`);
