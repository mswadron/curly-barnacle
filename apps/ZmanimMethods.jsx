const { useState, useMemo } = React;

/*
  Zmanim: One Zman, Every Method
  Fully client-side. NOAA / Jean Meeus solar engine ported from KosherJava
  (github.com/KosherJava/zmanim, LGPL), validated to the minute against
  Hebcal's published output. No network calls.

  Sources: classical refs link to Sefaria. Degree figures follow the
  derivation in Yisrael Vehazmanim (R' Y.D. Harfenes) as implemented in
  KosherJava (the sun's depression angle matching the minute figure in
  Yerushalayim at the equinox). Practical halacha: follow your rav and
  local luach. These are calculated approximations.
*/

const SEF = "https://www.sefaria.org/";

// ---------- solar engine (NOAA, fixed 0.8333 radius+refraction, matches Hebcal) ----------
const RAD = Math.PI / 180, toDeg = (r) => r / RAD;
const sinD = (d) => Math.sin(d * RAD), cosD = (d) => Math.cos(d * RAD), tanD = (d) => Math.tan(d * RAD);
const asinD = (x) => Math.asin(x) / RAD;
const SR = 16 / 60, REFR = 34 / 60;
const EARTH_R = 6371.0088; // km, KosherJava IUGG mean radius

function julianDay(y, m, d) {
  if (m <= 2) { y -= 1; m += 12; }
  const a = Math.floor(y / 100), b = 2 - a + Math.floor(a / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + b - 1524.5;
}
const jc = (jd) => (jd - 2451545.0) / 36525.0;
const meanLong = (t) => { let L = 280.46646 + t * (36000.76983 + 0.0003032 * t); return ((L % 360) + 360) % 360; };
const meanAnom = (t) => 357.52911 + t * (35999.05029 - 0.0001537 * t);
const ecc = (t) => 0.016708634 - t * (0.000042037 + 0.0000001267 * t);
const eqCtr = (t) => { const m = meanAnom(t); return sinD(m) * (1.914602 - t * (0.004817 + 0.000014 * t)) + sinD(2 * m) * (0.019993 - 0.000101 * t) + sinD(3 * m) * 0.000289; };
const appLong = (t) => { const o = 125.04 - 1934.136 * t; return meanLong(t) + eqCtr(t) - 0.00569 - 0.00478 * sinD(o); };
const meanObliq = (t) => { const s = 21.448 - t * (46.815 + t * (0.00059 - t * 0.001813)); return 23.0 + (26.0 + s / 60.0) / 60.0; };
const obliqCorr = (t) => { const o = 125.04 - 1934.136 * t; return meanObliq(t) + 0.00256 * cosD(o); };
const declination = (t) => asinD(sinD(obliqCorr(t)) * sinD(appLong(t)));
const eqTime = (t) => {
  let e = obliqCorr(t), L = meanLong(t), ec = ecc(t), m = meanAnom(t), y = tanD(e / 2); y *= y;
  const eot = y * sinD(2 * L) - 2 * ec * sinD(m) + 4 * ec * y * sinD(m) * cosD(2 * L) - 0.5 * y * y * sinD(4 * L) - 1.25 * ec * ec * sinD(2 * m);
  return toDeg(eot) * 4.0;
};
const hourAngle = (lat, dec, zen, isSet) => { const r = cosD(zen) / (cosD(lat) * cosD(dec)) - tanD(lat) * tanD(dec); let ha = Math.acos(r); return isSet ? -ha : ha; };
function solarNoonUTC(jd, lon) { let t = jc(jd + lon / 360.0), eot = eqTime(t), sn = lon * 4 - eot; for (let i = 0; i < 2; i++) { const nt = jc(jd + sn / 1440.0); eot = eqTime(nt); sn = 720 + lon * 4 - eot; } return sn; }
function riseSetUTC(jd, lat, lon, zen, isSet) {
  const noon = solarNoonUTC(jd, lon); let t = jc(jd + noon / 1440.0);
  let eot = eqTime(t), dec = declination(t), ha = hourAngle(lat, dec, zen, isSet), tU = 720 + 4 * (lon - toDeg(ha)) - eot;
  const nt = jc(jd + tU / 1440.0); eot = eqTime(nt); dec = declination(nt); ha = hourAngle(lat, dec, zen, isSet);
  return 720 + 4 * (lon - toDeg(ha)) - eot;
}
function solarEvent(y, m, d, lat, lon, zenith, isSet) {
  const min = riseSetUTC(julianDay(y, m, d), lat, -lon, zenith, isSet);
  if (Number.isNaN(min)) return null;
  return new Date(Date.UTC(y, m - 1, d) + min * 60000);
}

// geometric depression of the sun (degrees below the horizon) at a given instant
function sunDepression(dt, lat, lon) {
  if (!dt || isNaN(dt)) return null;
  const u = new Date(dt);
  const fday = (u.getUTCHours() + (u.getUTCMinutes() + u.getUTCSeconds() / 60) / 60) / 24;
  const t = jc(julianDay(u.getUTCFullYear(), u.getUTCMonth() + 1, u.getUTCDate()) + fday);
  const decl = declination(t), eot = eqTime(t);
  let ha = (fday * 1440 + eot + 4 * lon) / 4 - 180;
  ha = ((ha + 180) % 360 + 360) % 360 - 180;
  const cz = sinD(lat) * sinD(decl) + cosD(lat) * cosD(decl) * cosD(ha);
  return Math.acos(Math.max(-1, Math.min(1, cz))) / RAD - 90;
}

const acosD = (x) => Math.acos(Math.max(-1, Math.min(1, x))) / RAD;
const atan2D = (y, x) => Math.atan2(y, x) / RAD;
const norm = (a) => ((a % 360) + 360) % 360;
const COMPASS = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
const compass = (a) => COMPASS[Math.round(norm(a) / 22.5) % 16];

// sun azimuth (from north, clockwise) at an instant
function sunAzimuth(dt, lat, lon) {
  if (!dt || isNaN(dt)) return null;
  const u = new Date(dt);
  const fday = (u.getUTCHours() + (u.getUTCMinutes() + u.getUTCSeconds() / 60) / 60) / 24;
  const t = jc(julianDay(u.getUTCFullYear(), u.getUTCMonth() + 1, u.getUTCDate()) + fday);
  const dc = declination(t), eot = eqTime(t);
  let ha = (fday * 1440 + eot + 4 * lon) / 4 - 180; ha = norm(ha + 180) - 180;
  const sinAlt = sinD(lat) * sinD(dc) + cosD(lat) * cosD(dc) * cosD(ha);
  const alt = asinD(Math.max(-1, Math.min(1, sinAlt)));
  let az = acosD((sinD(dc) - sinAlt * sinD(lat)) / (cosD(alt) * cosD(lat)));
  if (Math.sin(ha * RAD) > 0) az = 360 - az;
  return az;
}

// Schlyter geocentric moon -> equatorial coords + ecliptic longitudes
function moonPos(dt) {
  const u = new Date(dt);
  const fday = (u.getUTCHours() + (u.getUTCMinutes() + u.getUTCSeconds() / 60) / 60) / 24;
  const d = julianDay(u.getUTCFullYear(), u.getUTCMonth() + 1, u.getUTCDate()) + fday - 2451543.5;
  const ws = 282.9404 + 4.70935e-5 * d, Ms = norm(356.047 + 0.9856002585 * d), Ls = norm(ws + Ms);
  const N = norm(125.1228 - 0.0529538083 * d), inc = 5.1454, w = norm(318.0634 + 0.1643573223 * d), a = 60.2666, e = 0.0549, M = norm(115.3654 + 13.0649929509 * d);
  let E = M + (180 / Math.PI) * e * sinD(M) * (1 + e * cosD(M));
  for (let k = 0; k < 3; k++) E = E - (E - (180 / Math.PI) * e * sinD(E) - M) / (1 - e * cosD(E));
  const xv = a * (cosD(E) - e), yv = a * Math.sqrt(1 - e * e) * sinD(E);
  const r0 = Math.hypot(xv, yv), v = norm(atan2D(yv, xv));
  const xe = r0 * (cosD(N) * cosD(v + w) - sinD(N) * sinD(v + w) * cosD(inc));
  const ye = r0 * (sinD(N) * cosD(v + w) + cosD(N) * sinD(v + w) * cosD(inc));
  const ze = r0 * sinD(v + w) * sinD(inc);
  let lon = norm(atan2D(ye, xe)), lat = atan2D(ze, Math.hypot(xe, ye));
  const Lm = norm(N + w + M), D_ = norm(Lm - Ls), F = norm(Lm - N);
  lon += -1.274 * sinD(M - 2 * D_) + 0.658 * sinD(2 * D_) - 0.186 * sinD(Ms) - 0.059 * sinD(2 * M - 2 * D_)
       - 0.057 * sinD(M - 2 * D_ + Ms) + 0.053 * sinD(M + 2 * D_) + 0.046 * sinD(2 * D_ - Ms) + 0.041 * sinD(M - Ms)
       - 0.035 * sinD(D_) - 0.031 * sinD(M + Ms) - 0.015 * sinD(2 * F - 2 * D_) + 0.011 * sinD(M - 4 * D_);
  lat += -0.173 * sinD(F - 2 * D_) - 0.055 * sinD(M - F - 2 * D_) - 0.046 * sinD(M + F - 2 * D_) + 0.033 * sinD(F + 2 * D_) + 0.017 * sinD(2 * M + F);
  const r = r0 - 0.58 * cosD(M - 2 * D_) - 0.46 * cosD(2 * D_);
  const ecl = 23.4393 - 3.563e-7 * d;
  const xg = cosD(lon) * cosD(lat), yg = sinD(lon) * cosD(lat), zg = sinD(lat);
  const yq = yg * cosD(ecl) - zg * sinD(ecl), zq = yg * sinD(ecl) + zg * cosD(ecl);
  const ra = norm(atan2D(yq, xg)), dec = atan2D(zq, Math.hypot(xg, yq));
  const Esu = Ms + (180 / Math.PI) * 0.016709 * sinD(Ms) * (1 + 0.016709 * cosD(Ms));
  const sunLon = norm(atan2D(Math.sqrt(1 - 0.016709 * 0.016709) * sinD(Esu), cosD(Esu) - 0.016709) + ws);
  return { ra, dec, r, lon, sunLon, Ls };
}
function moonAltAz(dt, lat, lon) {
  const m = moonPos(dt), u = new Date(dt);
  const ut = u.getUTCHours() + (u.getUTCMinutes() + u.getUTCSeconds() / 60) / 60;
  const LST = norm(norm(m.Ls + 180) + ut * 15.04107 + lon);
  const HA = norm(LST - m.ra + 180) - 180;
  const sinAlt = sinD(lat) * sinD(m.dec) + cosD(lat) * cosD(m.dec) * cosD(HA);
  const alt = asinD(Math.max(-1, Math.min(1, sinAlt)));
  const mpar = asinD(1 / m.r);
  let az = acosD((sinD(m.dec) - sinAlt * sinD(lat)) / (cosD(alt) * cosD(lat)));
  if (Math.sin(HA * RAD) > 0) az = 360 - az;
  return { alt: alt - mpar * cosD(alt), az };
}
function moonEvents(y, mo, da, lat, lon) {
  const h0 = -0.833; let rise = null, set = null, riseAz = null, setAz = null, prev = null;
  for (let min = 0; min <= 1440; min += 10) {
    const dt = new Date(Date.UTC(y, mo - 1, da) + min * 60000);
    const cur = moonAltAz(dt, lat, lon); cur.dt = dt;
    if (prev) {
      if (prev.alt < h0 && cur.alt >= h0 && !rise) { const f = (h0 - prev.alt) / (cur.alt - prev.alt); const t = new Date(prev.dt.getTime() + f * 600000); rise = t; riseAz = moonAltAz(t, lat, lon).az; }
      if (prev.alt >= h0 && cur.alt < h0 && !set) { const f = (h0 - prev.alt) / (cur.alt - prev.alt); const t = new Date(prev.dt.getTime() + f * 600000); set = t; setAz = moonAltAz(t, lat, lon).az; }
    }
    prev = cur;
  }
  return { rise, set, riseAz, setAz };
}
function moonIllum(y, mo, da) {
  const m = moonPos(new Date(Date.UTC(y, mo - 1, da, 12)));
  let e = norm(m.lon - m.sunLon); if (e > 180) e = 360 - e;
  return (1 - cosD(e)) / 2;
}

// molad (Dershowitz-Reingold); Jerusalem local mean time -> instant
const HEBREW_EPOCH = -1373427, JER_MEAN_H = 35.2354 / 15;
function moladData(hMonth, hYear) {
  const y = hMonth < 7 ? hYear + 1 : hYear;
  const me = (hMonth - 7) + Math.floor((235 * y - 234) / 19);
  const rd = HEBREW_EPOCH - 876 / 25920 + me * (29 + 13753 / 25920);
  const frac = rd - Math.floor(rd);
  // traditional: hours/chalakim measured from 6 PM (Jerusalem mean)
  let fromEve = frac * 24 + 6; if (fromEve >= 24) fromEve -= 24;
  const h = Math.floor(fromEve), totCh = Math.round((fromEve - h) * 1080), m = Math.floor(totCh / 18), ch = totCh - m * 18;
  return { date: new Date((rd - 719163) * 86400000 - JER_MEAN_H * 3600000), h, m, ch };
}
const HEB_MONTHS = { Tishri: 7, Heshvan: 8, Kislev: 9, Tevet: 10, Shevat: 11, Adar: 12, "Adar I": 12, "Adar II": 13, Nisan: 1, Iyar: 2, Sivan: 3, Tamuz: 4, Av: 5, Elul: 6 };
function hebrewMonthYear(y, m, d) {
  const parts = new Intl.DateTimeFormat("en-u-ca-hebrew", { year: "numeric", month: "long", day: "numeric" }).formatToParts(new Date(Date.UTC(y, m - 1, d, 12)));
  const o = {}; for (const p of parts) o[p.type] = p.value;
  return { month: o.month, monthIdx: HEB_MONTHS[o.month] != null ? HEB_MONTHS[o.month] : 7, year: parseInt(o.year, 10) };
}

// --- star visibility during twilight ---
// depression(deg) at which a star of apparent magnitude m first becomes visible:
//   dep = A + B * (m + extinction).  Regression from a published twilight-visibility model.
const STAR_K = 0.28, STAR_A = 2.47, STAR_B = 1.23;
const airmass = (alt) => (alt < 3 ? 12 : 1 / (sinD(alt) + 0.025 * Math.exp(-11 * sinD(alt))));
const starDepression = (mag, alt) => STAR_A + STAR_B * (mag + STAR_K * (airmass(alt) - 1));
const limitingMag = (dep) => (dep - STAR_A) / STAR_B; // faintest mag for a zenith star at this depression
function starAltAz(dt, lat, lon, raH, decDeg) {
  const u = new Date(dt);
  const ut = u.getUTCHours() + (u.getUTCMinutes() + u.getUTCSeconds() / 60) / 60;
  const jd = julianDay(u.getUTCFullYear(), u.getUTCMonth() + 1, u.getUTCDate()) + ut / 24;
  const T = (jd - 2451545) / 36525;
  const g = norm(280.46061837 + 360.98564736629 * (jd - 2451545) + 0.000387933 * T * T - T * T * T / 38710000);
  const LST = norm(g + lon), HA = norm(LST - raH * 15 + 180) - 180;
  const sinAlt = sinD(lat) * sinD(decDeg) + cosD(lat) * cosD(decDeg) * cosD(HA);
  const alt = asinD(sinAlt);
  let az = acosD((sinD(decDeg) - sinAlt * sinD(lat)) / (cosD(alt) * cosD(lat)));
  if (Math.sin(HA * RAD) > 0) az = 360 - az;
  return { alt, az };
}
// brightest stars: [name, RA hours, Dec deg, visual magnitude] (J2000)
const BRIGHT_STARS = [
  ["Sirius", 6.752, -16.716, -1.46], ["Canopus", 6.399, -52.696, -0.74], ["Arcturus", 14.261, 19.182, -0.05],
  ["Vega", 18.616, 38.784, 0.03], ["Capella", 5.278, 45.998, 0.08], ["Rigel", 5.242, -8.202, 0.13],
  ["Procyon", 7.655, 5.225, 0.34], ["Betelgeuse", 5.919, 7.407, 0.5], ["Achernar", 1.629, -57.237, 0.46],
  ["Altair", 19.846, 8.868, 0.77], ["Aldebaran", 4.599, 16.509, 0.85], ["Antares", 16.49, -26.432, 1.09],
  ["Spica", 13.42, -11.161, 0.97], ["Pollux", 7.755, 28.026, 1.14], ["Fomalhaut", 22.961, -29.622, 1.16],
  ["Deneb", 20.69, 45.28, 1.25], ["Regulus", 10.139, 11.967, 1.35], ["Castor", 7.577, 31.888, 1.58],
  ["Polaris", 2.53, 89.264, 1.98], ["Hamal", 2.119, 23.462, 2.0], ["Alphecca", 15.578, 26.715, 2.22],
];
// order in which named stars first clear naked-eye visibility for this date/place (dusk) or last fade (dawn)
function starsTonight(y, m, d, lat, lon, isDusk) {
  const seen = {}, out = [];
  for (let dep = 0.5; dep <= 18; dep += 0.5) {
    const t = solarEvent(y, m, d, lat, lon, 90 + dep, isDusk);
    if (!t) continue;
    for (const [name, ra, de, mag] of BRIGHT_STARS) {
      if (seen[name]) continue;
      const { alt } = starAltAz(t, lat, lon, ra, de);
      if (alt <= 2) continue;
      if (dep >= starDepression(mag, alt)) { seen[name] = 1; out.push({ name, mag, dep, alt: Math.round(alt) }); }
    }
  }
  return out;
}

// physical data: spectral type, Yerkes luminosity class, parallax (mas), interferometric angular diameter (mas), effective temperature (K)
const STAR_PHYS = {
  Sirius: ["A1", "V", 379.21, 5.99, 9940], Canopus: ["F0", "II", 10.55, 6.9, 7400], Arcturus: ["K0", "III", 88.83, 21.0, 4286],
  Vega: ["A0", "V", 130.23, 3.28, 9602], Capella: ["G3", "III", 76.2, 8.9, 4970], Rigel: ["B8", "Ia", 3.78, 2.6, 12100],
  Procyon: ["F5", "IV", 284.56, 5.4, 6530], Betelgeuse: ["M1", "Ia", 5.95, 45.0, 3500], Achernar: ["B6", "V", 23.39, 1.9, 15000],
  Altair: ["A7", "V", 194.95, 3.3, 7550], Aldebaran: ["K5", "III", 48.94, 20.6, 3900], Antares: ["M1.5", "Iab", 5.89, 41.0, 3660],
  Spica: ["B1", "III", 12.44, 0.9, 22400], Pollux: ["K0", "III", 96.54, 8.0, 4666], Fomalhaut: ["A3", "V", 130.08, 2.1, 8590],
  Deneb: ["A2", "Ia", 2.29, 2.4, 8525], Regulus: ["B8", "IV", 41.13, 1.4, 12460], Castor: ["A1", "V", 64.12, 1.6, 10286],
  Polaris: ["F7", "Ib", 7.54, 3.1, 6015], Hamal: ["K1", "III", 49.56, 6.8, 4480], Alphecca: ["A0", "V", 43.46, 0.7, 9700],
};
const LUM_CLASS = { Ia: "supergiant", Iab: "supergiant", Ib: "supergiant", II: "bright giant", III: "giant", IV: "subgiant", V: "main-sequence dwarf" };
// derive distance, radius (solar) and luminosity (solar) from parallax + interferometry + temperature
function starPhysics(name) {
  const p = STAR_PHYS[name]; if (!p) return null;
  const [spec, lc, plx, theta, Teff] = p;
  const d = 1000 / plx;          // parsecs (from parallax)
  const ly = d * 3.26156;        // light-years
  const R = 0.1075 * theta * d;  // solar radii (angular diameter x distance)
  const L = R * R * Math.pow(Teff / 5772, 4); // solar luminosities (R^2 T^4)
  return { spec, lc, plx, theta, Teff, d, ly, R, L, klass: LUM_CLASS[lc] || lc };
}
// naked-eye cumulative star count over the whole sky to magnitude m, and fraction of a pristine sky
const skyCount = (m) => Math.pow(10, 0.644 + 0.506 * Math.min(m, 6.7));
const SKY_TOTAL = skyCount(6.5);
const limMagPop = (dep) => 6.7 * (1 - Math.exp(-Math.max(0, dep) / 5.2)); // population completeness model
const skyPct = (dep) => Math.min(100, (skyCount(limMagPop(dep)) / SKY_TOTAL) * 100);
// satellites stay sunlit until Earth's shadow reaches their altitude
const SAT_DEP = (h) => Math.acos(6371 / (6371 + h)) * 180 / Math.PI; // ISS ~20.3, Starlink ~23

// ---------- location presets ----------
const LOCATIONS = [
  { id: "jerusalem", name: "Jerusalem", lat: 31.7683, lon: 35.2137, tz: "Asia/Jerusalem", elev: 754 },
  { id: "lakewood", name: "Lakewood, NJ", lat: 40.0978, lon: -74.2176, tz: "America/New_York", elev: 13 },
  { id: "newyork", name: "New York, NY", lat: 40.7128, lon: -74.006, tz: "America/New_York", elev: 10 },
  { id: "losangeles", name: "Los Angeles, CA", lat: 34.0522, lon: -118.2437, tz: "America/Los_Angeles", elev: 93 },
  { id: "london", name: "London, UK", lat: 51.5074, lon: -0.1278, tz: "Europe/London", elev: 11 },
];

// ---------- context + helpers ----------
function makeCtx(y, m, d, lat, lon, elev) {
  const sr = solarEvent(y, m, d, lat, lon, 90 + SR + REFR, false);
  const ss = solarEvent(y, m, d, lat, lon, 90 + SR + REFR, true);
  const elevAdj = elev > 0 ? toDeg(Math.acos(EARTH_R / (EARTH_R + elev / 1000))) : 0;
  const srVis = solarEvent(y, m, d, lat, lon, 90 + SR + REFR + elevAdj, false);
  const ssVis = solarEvent(y, m, d, lat, lon, 90 + SR + REFR + elevAdj, true);
  const dR = (deg) => solarEvent(y, m, d, lat, lon, 90 + deg, false);
  const dS = (deg) => solarEvent(y, m, d, lat, lon, 90 + deg, true);
  const addMin = (dt, mn) => new Date(dt.getTime() + mn * 60000);
  const dayMs = ss && sr ? ss - sr : 0;
  const prop = (a, b, hours) => new Date(a.getTime() + (b - a) * (hours / 12));
  return { sr, ss, srVis, ssVis, elev, elevAdj, dR, dS, addMin, prop, dayMs };
}

const TYPES = {
  degrees: { label: "Degrees", color: "#E9B949" },
  fixed: { label: "Fixed minutes", color: "#C97B3C" },
  zmaniyos: { label: "Zmaniyos", color: "#6FA8A0" },
  horizon: { label: "Horizon", color: "#9B8FD6" },
};

// each item: { label, type, ref, url?, calc }
// url is a Sefaria path (e.g. "Shulchan_Arukh,_Orach_Chayim.58.1") or a full http(s) URL.
const Q = {
  alos4mil: "מֵעֲלוֹת הַשַּׁחַר עַד הָנֵץ הַחַמָּה אַרְבַּעַת מִילִין",
  rt4mil: "מִשְּׁקִיעַת הַחַמָּה וְעַד צֵאת הַכּוֹכָבִים אַרְבַּעַת מִילִין",
  bhs: "שִׁעוּר בֵּין הַשְּׁמָשׁוֹת... שְׁלֹשָׁה רִבְעֵי מִיל",
  shma3: "וְגוֹמְרָהּ עַד הָנֵץ הַחַמָּה, רַבִּי יְהוֹשֻׁעַ אוֹמֵר עַד שָׁלֹשׁ שָׁעוֹת",
  tfilla4: "תְּפִלַּת הַשַּׁחַר עַד חֲצוֹת, רַבִּי יְהוּדָה אוֹמֵר עַד אַרְבַּע שָׁעוֹת",
  plag: "תְּפִלַּת הַמִּנְחָה עַד הָעֶרֶב, רַבִּי יְהוּדָה אוֹמֵר עַד פְּלַג הַמִּנְחָה",
  miyakir: "מִשֶּׁיִּרְאֶה אֶת חֲבֵרוֹ רָחוֹק אַרְבַּע אַמּוֹת וְיַכִּירֶנּוּ",
  vasikin: "וָתִיקִין הָיוּ גּוֹמְרִין אוֹתָהּ עִם הָנֵץ הַחַמָּה",
  netz: "הָנֵץ הַחַמָּה, פֵּירוּשׁ יְצִיאַת הַחַמָּה, כְּמוֹ הֵנֵצוּ הָרִמּוֹנִים",
  shkia: "מִתְּחִלַּת הַשְּׁקִיעָה שֶׁאֵין הַשֶּׁמֶשׁ נִרְאֵית עַל הָאָרֶץ",
};

const CONCEPTS = [
  {
    id: "sundial", title: "Sundial", sub: "All the day's zmanim, one opinion at a time",
    basis: { ref: "Shulchan Arukh OC 233:1", url: "Shulchan_Arukh,_Orach_Chayim.233.1" },
    items: [],
  },
  {
    id: "alos", title: "Alot HaShachar", sub: "Dawn / start of the MGA day",
    basis: { ref: "Pesachim 94a; Shulchan Arukh OC 89:1", url: "Pesachim.94a" },
    items: [
      { label: "72 min before sunrise", type: "fixed", eq: "N \u2212 4M, M = 18 \u2192 72", d: "Four mil from dawn to sunrise, a mil walked in 18 minutes: 4 \u00D7 18 = 72.", dq: Q.alos4mil, ref: "4 mil at 18-min mil. SA OC 459:2; Rama OC 261:1", url: "Shulchan_Arukh,_Orach_Chayim.459.2", calc: (c) => c.addMin(c.sr, -72) },
      { label: "90 min before sunrise", type: "fixed", eq: "N \u2212 4M, M = 22.5 \u2192 90", d: "The same four-mil dawn, a mil reckoned at 22.5 minutes: 4 \u00D7 22.5 = 90.", dq: Q.alos4mil, ref: "22.5-min mil (Beur Halacha OC 459); Tukachinsky luach", url: "Shulchan_Arukh,_Orach_Chayim.459.2", calc: (c) => c.addMin(c.sr, -90) },
      { label: "96 min before sunrise", type: "fixed", eq: "N \u2212 4M, M = 24 \u2192 96", d: "The same four mil, a mil at 24 minutes: 4 \u00D7 24 = 96.", dq: Q.alos4mil, ref: "24-min mil reckoning (Beur Halacha OC 459)", url: "Shulchan_Arukh,_Orach_Chayim.459.2", calc: (c) => c.addMin(c.sr, -96) },
      { label: "120 min before sunrise", type: "fixed", eq: "N \u2212 120 (fixed stringency)", d: "A two-hour stringency held by some, well before the four-mil dawn (read as a longer or larger-mil span).", ref: "Stringency adopted by some (Yereim-influenced)", calc: (c) => c.addMin(c.sr, -120) },
      { label: "72 zmaniyos before sunrise", type: "zmaniyos", eq: "N \u2212 D/10 (= 4M proportional)", d: "The four-mil dawn read as a fraction of the day, not fixed clock minutes: one-tenth of the daylight before sunrise, so it lengthens in summer and shortens in winter.", dq: Q.alos4mil, ref: "GRA-proportional 72 min (Biur HaGra)", calc: (c) => new Date(c.sr.getTime() - c.dayMs / 10) },
      { label: "90 zmaniyos before sunrise", type: "zmaniyos", eq: "N \u2212 D\u00D7(90/720)", d: "The same proportional reading at the 90-minute figure: one-eighth of the daylight before sunrise.", dq: Q.alos4mil, ref: "GRA-proportional 90 min", calc: (c) => new Date(c.sr.getTime() - (c.dayMs * 90) / 720) },
      { label: "16.1 deg", type: "degrees", eq: "\u03B8 = 16.1\u00B0 (\u2248 72 min, Yerushalayim equinox)", d: "Not a duration but the sun's depression: at the Yerushalayim equinox the 72-minute dawn falls when the sun is 16.1\u00B0 below the horizon, so this matches 72 there and rescales by place and season.", ref: "Sun 16.1 deg below = 72 min, Yerushalayim equinox (Yisrael Vehazmanim)", calc: (c) => c.dR(16.1) },
      { label: "18 deg", type: "degrees", eq: "\u03B8 = 18\u00B0", d: "A round stringent depression near the 72-to-90-minute dawn, widely used as a fixed-angle alos.", ref: "Common stringent degree (Yisrael Vehazmanim)", calc: (c) => c.dR(18) },
      { label: "19.8 deg", type: "degrees", eq: "\u03B8 = 19.8\u00B0 (\u2248 90 min, Yerushalayim equinox)", d: "The depression that matches the 90-minute dawn at the Yerushalayim equinox.", ref: "= 90 min equiv; Yerushalayim minhag / Tukachinsky 20 deg", calc: (c) => c.dR(19.8) },
      { label: "26 deg", type: "degrees", eq: "\u03B8 = 26\u00B0 (\u2248 120 min)", d: "The depression matching the 120-minute dawn.", ref: "= 120 min equivalent", calc: (c) => c.dR(26) },
      { label: "Baal HaTanya 16.9 deg", type: "degrees", eq: "\u03B8 = 16.9\u00B0 (Shulchan Arukh HaRav)", d: "The depression Shulchan Arukh HaRav gives for alos.", ref: "Shulchan Arukh HaRav OC 89", url: "Shulchan_Arukh_HaRav,_Orach_Chayim.89", calc: (c) => c.dR(16.9) },
    ],
  },
  {
    id: "misheyakir", title: "Misheyakir", sub: "Earliest talis and tefillin",
    basis: { ref: "Mishnah Berakhot 1:2; Shulchan Arukh OC 18:3, 30:1", url: "Mishnah_Berakhot.1.2" },
    items: [
      { label: "11.5 deg", type: "degrees", eq: "\u03B8 = 11.5\u00B0 (recognition light)", d: "The Mishnah fixes misheyakir by recognition, telling an acquaintance apart at four amos. 11.5\u00B0 is the depression commonly equated to that first usable light.", dq: Q.miyakir, ref: "Common degree reckoning (Yisrael Vehazmanim)", calc: (c) => c.dR(11.5) },
      { label: "11 deg", type: "degrees", eq: "\u03B8 = 11\u00B0", d: "A slightly brighter-light (later) reading of the same recognition threshold.", dq: Q.miyakir, ref: "Degree variant", calc: (c) => c.dR(11) },
      { label: "10.2 deg", type: "degrees", eq: "\u03B8 = 10.2\u00B0", d: "A more stringent, darker and earlier reading of the recognition threshold.", dq: Q.miyakir, ref: "Stringent degree variant", calc: (c) => c.dR(10.2) },
      { label: "60 min before sunrise", type: "fixed", eq: "N \u2212 60 (fixed)", d: "A fixed sixty minutes before sunrise, the Yerushalayim luach practice.", ref: "Tukachinsky, Luach Eretz Yisrael; Kaf HaChaim OC 18:18", url: "Kaf_HaChayim_on_Shulchan_Arukh,_Orach_Chayim.18.18", calc: (c) => c.addMin(c.sr, -60) },
      { label: "36 min before sunrise", type: "fixed", eq: "N \u2212 36 (fixed, observed)", d: "R' Moshe Feinstein's observed 35 to 40 minutes before sunrise.", ref: "Igros Moshe OC 4:6 (35-40 min, observed)", calc: (c) => c.addMin(c.sr, -36) },
    ],
  },
  {
    id: "netz", title: "HaNetz HaChamah", sub: "Sunrise",
    basis: { ref: "Berakhot 9b (vasikin); Shulchan Arukh OC 58:1, 89:1", url: "Shulchan_Arukh,_Orach_Chayim.58.1" },
    note: "These diverge mainly at altitude. At sea level the three nearly coincide; Jerusalem (754 m) opens a gap of a few minutes.",
    items: [
      { label: "Sea level (mishor)", type: "horizon", eq: "N at \u03B8 = 0.833\u00B0 (upper limb, sea-level horizon)", d: "Geometric sunrise at a flat sea-level horizon: the sun's upper limb at the apparent horizon, the 0.833\u00B0 the engine uses.", dq: Q.netz, ref: "Geometric sunrise at the sea-level horizon; the reckoning most luchos use for zmanim", calc: (c) => c.sr },
      { label: "Visible (elevation-adjusted)", type: "horizon", eq: "N adjusted for horizon dip from elevation", d: "Netz hanir'eh, sunrise as actually seen from the location's height; higher ground sees the sun sooner.", dq: Q.vasikin, ref: "Netz hanir'eh; sunrise as seen from the location's altitude (KosherJava elevation adjustment)", calc: (c) => c.srVis },
      { label: "Netz amiti (Baal HaTanya)", type: "horizon", eq: "\u03B8 = 1.583\u00B0 (center below geometric horizon)", d: "Baal HaTanya's true sunrise, the sun's center 1.583\u00B0 below the geometric horizon.", ref: "Shulchan Arukh HaRav OC 58; sun's center 1.583 deg below the horizon", url: "Shulchan_Arukh_HaRav,_Orach_Chayim.58", calc: (c) => c.dR(1.583) },
    ],
  },
  {
    id: "shma", title: "Sof Zman Krias Shema", sub: "3 proportional hours into the day",
    basis: { ref: "Mishnah Berakhot 1:2; Shulchan Arukh OC 58:1", url: "Shulchan_Arukh,_Orach_Chayim.58.1" },
    note: "All are zmaniyos. The tag shows how the day is bounded.",
    items: [
      { label: "Gra (sunrise to sunset)", type: "zmaniyos", eq: "N + 3H, H = (S\u2212N)/12", d: "Three proportional hours, the day measured sunrise to sunset.", dq: Q.shma3, ref: "Biur HaGra, SA OC 58:1", url: "Shulchan_Arukh,_Orach_Chayim.58.1", calc: (c) => c.prop(c.sr, c.ss, 3) },
      { label: "MGA, day bounded 72 min", type: "fixed", eq: "A + 3H, H = (T\u2212A)/12; A = N\u221272, T = S+72", d: "Three proportional hours of a day stretched from the 72-minute dawn to the 72-minute nightfall, so each hour is longer.", dq: Q.shma3, ref: "Magen Avraham OC 58 (alos 72 to tzeis 72)", url: "Shulchan_Arukh,_Orach_Chayim.58.1", calc: (c) => c.prop(c.addMin(c.sr, -72), c.addMin(c.ss, 72), 3) },
      { label: "MGA, day bounded 90 min", type: "fixed", eq: "A + 3H; A = N\u221290, T = S+90", d: "The same, with the day running from the 90-minute dawn to the 90-minute nightfall.", dq: Q.shma3, ref: "MGA with 90-min day; Tukachinsky (Yerushalayim)", calc: (c) => c.prop(c.addMin(c.sr, -90), c.addMin(c.ss, 90), 3) },
      { label: "MGA, day bounded 16.1 deg", type: "degrees", eq: "A + 3H; A,T at \u03B8 = 16.1\u00B0", d: "The same MGA day, bounded by the 16.1\u00B0 dawn and dusk instead of fixed minutes.", ref: "Degree-bounded MGA day (Yisrael Vehazmanim)", calc: (c) => c.prop(c.dR(16.1), c.dS(16.1), 3) },
      { label: "MGA, day bounded 18 deg", type: "degrees", eq: "A + 3H; A,T at \u03B8 = 18\u00B0", d: "The same, with the day bounded by 18\u00B0 dawn and dusk.", ref: "Degree-bounded MGA day", calc: (c) => c.prop(c.dR(18), c.dS(18), 3) },
      { label: "MGA, day bounded 19.8 deg", type: "degrees", eq: "A + 3H; A,T at \u03B8 = 19.8\u00B0", d: "The same, day bounded by 19.8\u00B0 (the 90-minute equivalent).", ref: "Yerushalayim / Tukachinsky (= 90 min)", calc: (c) => c.prop(c.dR(19.8), c.dS(19.8), 3) },
      { label: "Baal HaTanya", type: "zmaniyos", eq: "A + 3H; A,T at \u03B8 = 1.583\u00B0", d: "Three proportional hours of a day measured from netz amiti to shkia amiti (1.583\u00B0).", ref: "Shulchan Arukh HaRav OC 58 (netz amiti to shkiah amiti, 1.583 deg)", url: "Shulchan_Arukh_HaRav,_Orach_Chayim.58", calc: (c) => c.prop(c.dR(1.583), c.dS(1.583), 3) },
    ],
  },
  {
    id: "tfilla", title: "Sof Zman Tefilla", sub: "4 proportional hours into the day",
    basis: { ref: "Shulchan Arukh OC 89:1", url: "Shulchan_Arukh,_Orach_Chayim.89.1" },
    note: "All are zmaniyos. The tag shows how the day is bounded.",
    items: [
      { label: "Gra (sunrise to sunset)", type: "zmaniyos", eq: "N + 4H, H = (S\u2212N)/12", d: "Four proportional hours, the day measured sunrise to sunset.", dq: Q.tfilla4, ref: "Biur HaGra, SA OC 89:1", url: "Shulchan_Arukh,_Orach_Chayim.89.1", calc: (c) => c.prop(c.sr, c.ss, 4) },
      { label: "MGA, day bounded 72 min", type: "fixed", eq: "A + 4H, H = (T\u2212A)/12; A = N\u221272, T = S+72", d: "Four proportional hours of a day stretched from the 72-minute dawn to the 72-minute nightfall.", dq: Q.tfilla4, ref: "Magen Avraham OC 89 (alos 72 to tzeis 72)", url: "Shulchan_Arukh,_Orach_Chayim.89.1", calc: (c) => c.prop(c.addMin(c.sr, -72), c.addMin(c.ss, 72), 4) },
      { label: "MGA, day bounded 90 min", type: "fixed", eq: "A + 4H; A = N\u221290, T = S+90", d: "The same, with the day running from the 90-minute dawn to the 90-minute nightfall.", dq: Q.tfilla4, ref: "MGA with 90-min day; Tukachinsky (Yerushalayim)", calc: (c) => c.prop(c.addMin(c.sr, -90), c.addMin(c.ss, 90), 4) },
      { label: "MGA, day bounded 16.1 deg", type: "degrees", eq: "A + 4H; A,T at \u03B8 = 16.1\u00B0", d: "The same MGA day, bounded by the 16.1\u00B0 dawn and dusk.", ref: "Degree-bounded MGA day (Yisrael Vehazmanim)", calc: (c) => c.prop(c.dR(16.1), c.dS(16.1), 4) },
      { label: "MGA, day bounded 19.8 deg", type: "degrees", eq: "A + 4H; A,T at \u03B8 = 19.8\u00B0", d: "The same, day bounded by 19.8\u00B0 (the 90-minute equivalent).", ref: "Yerushalayim / Tukachinsky (= 90 min)", calc: (c) => c.prop(c.dR(19.8), c.dS(19.8), 4) },
      { label: "Baal HaTanya", type: "zmaniyos", eq: "A + 4H; A,T at \u03B8 = 1.583\u00B0", d: "Four proportional hours of a day measured from netz amiti to shkia amiti (1.583\u00B0).", ref: "Shulchan Arukh HaRav OC 89 (netz amiti to shkiah amiti)", url: "Shulchan_Arukh_HaRav,_Orach_Chayim.89", calc: (c) => c.prop(c.dR(1.583), c.dS(1.583), 4) },
    ],
  },
  {
    id: "chatzos", title: "Chatzos HaYom", sub: "Midday \u2014 6 proportional hours",
    basis: { ref: "Shulchan Arukh OC 233:1", url: "Shulchan_Arukh,_Orach_Chayim.233.1" },
    note: "Chatzos is the midpoint of the day \u2014 the sun due south. It is the same instant whether the day is bounded sunrise-to-sunset or by symmetric dawn/dusk, so there is one time.",
    items: [
      { label: "Solar midday (chatzos)", type: "zmaniyos", eq: "N + 6H = (N + S) / 2", d: "The midpoint between sunrise and sunset; the sun is due south. Symmetric dawn/dusk boundings give the same instant.", ref: "Midpoint of the day; Shulchan Arukh OC 233:1", url: "Shulchan_Arukh,_Orach_Chayim.233.1", calc: (c) => c.prop(c.sr, c.ss, 6) },
    ],
  },
  {
    id: "mincha_gedola", title: "Mincha Gedola", sub: "6\u00BD proportional hours \u2014 earliest Mincha",
    basis: { ref: "Berakhot 26b; Shulchan Arukh OC 233:1", url: "Shulchan_Arukh,_Orach_Chayim.233.1" },
    note: "Earliest time for Mincha: half a proportional hour after chatzos. Some reckon the half-hour as a fixed 30 minutes, most as half a sha\u2019ah zmanis.",
    items: [
      { label: "Gra (sunrise to sunset)", type: "zmaniyos", eq: "N + 6.5H, H = (S\u2212N)/12", d: "Half a proportional hour past chatzos, the day measured sunrise to sunset.", ref: "Biur HaGra, SA OC 233:1", url: "Shulchan_Arukh,_Orach_Chayim.233.1", calc: (c) => c.prop(c.sr, c.ss, 6.5) },
      { label: "30 minutes after chatzos (fixed)", type: "fixed", eq: "chatzos + 30 min", d: "Half-hour after midday read as a fixed thirty clock minutes.", ref: "Fixed half-hour reckoning (cf. MB 233)", calc: (c) => c.addMin(c.prop(c.sr, c.ss, 6), 30) },
      { label: "MGA, day bounded 72 min", type: "fixed", eq: "A + 6.5H; A = N\u221272, T = S+72", d: "Half a proportional hour of a day stretched from the 72-minute dawn to the 72-minute nightfall.", ref: "Magen Avraham (alos 72 to tzeis 72)", calc: (c) => c.prop(c.addMin(c.sr, -72), c.addMin(c.ss, 72), 6.5) },
      { label: "MGA, day bounded 90 min", type: "fixed", eq: "A + 6.5H; A = N\u221290, T = S+90", d: "The same, day running from the 90-minute dawn to the 90-minute nightfall.", ref: "MGA with 90-min day", calc: (c) => c.prop(c.addMin(c.sr, -90), c.addMin(c.ss, 90), 6.5) },
      { label: "Baal HaTanya", type: "zmaniyos", eq: "A + 6.5H; A,T at \u03B8 = 1.583\u00B0", d: "Measured from netz amiti to shkia amiti (1.583\u00B0).", ref: "Shulchan Arukh HaRav OC 233", url: "Shulchan_Arukh_HaRav,_Orach_Chayim.233", calc: (c) => c.prop(c.dR(1.583), c.dS(1.583), 6.5) },
    ],
  },
  {
    id: "mincha_ketana", title: "Mincha Ketana", sub: "9\u00BD proportional hours \u2014 preferred Mincha",
    basis: { ref: "Berakhot 26b; Shulchan Arukh OC 233:1", url: "Shulchan_Arukh,_Orach_Chayim.233.1" },
    note: "The preferred time for Mincha: 9.5 proportional hours into the day, 2.5 hours before its end.",
    items: [
      { label: "Gra (sunrise to sunset)", type: "zmaniyos", eq: "N + 9.5H, H = (S\u2212N)/12", d: "Nine and a half proportional hours, the day measured sunrise to sunset.", ref: "Biur HaGra, SA OC 233:1", url: "Shulchan_Arukh,_Orach_Chayim.233.1", calc: (c) => c.prop(c.sr, c.ss, 9.5) },
      { label: "MGA, day bounded 72 min", type: "fixed", eq: "A + 9.5H; A = N\u221272, T = S+72", d: "Nine and a half proportional hours of a 72-minute-bounded day.", ref: "Magen Avraham (alos 72 to tzeis 72)", calc: (c) => c.prop(c.addMin(c.sr, -72), c.addMin(c.ss, 72), 9.5) },
      { label: "MGA, day bounded 90 min", type: "fixed", eq: "A + 9.5H; A = N\u221290, T = S+90", d: "The same with a 90-minute-bounded day.", ref: "MGA with 90-min day", calc: (c) => c.prop(c.addMin(c.sr, -90), c.addMin(c.ss, 90), 9.5) },
      { label: "Baal HaTanya", type: "zmaniyos", eq: "A + 9.5H; A,T at \u03B8 = 1.583\u00B0", d: "Measured from netz amiti to shkia amiti (1.583\u00B0).", ref: "Shulchan Arukh HaRav OC 233", url: "Shulchan_Arukh_HaRav,_Orach_Chayim.233", calc: (c) => c.prop(c.dR(1.583), c.dS(1.583), 9.5) },
    ],
  },
  {
    id: "plag", title: "Plag HaMincha", sub: "10.75 proportional hours into the day",
    basis: { ref: "Berakhot 26b; Shulchan Arukh OC 233:1", url: "Shulchan_Arukh,_Orach_Chayim.233.1" },
    items: [
      { label: "Gra (sunrise to sunset)", type: "zmaniyos", eq: "S \u2212 1.25H, H = (S\u2212N)/12 (= N + 10.75H)", d: "Plag is 1.25 proportional hours before sunset, i.e. 10.75 hours into a sunrise-to-sunset day.", dq: Q.plag, ref: "Biur HaGra, SA OC 233:1", url: "Shulchan_Arukh,_Orach_Chayim.233.1", calc: (c) => c.prop(c.sr, c.ss, 10.75) },
      { label: "MGA, day bounded 72 min", type: "fixed", eq: "T \u2212 1.25H; A = N\u221272, T = S+72", d: "The same 10.75-hour point in a day stretched 72 minutes before dawn and after nightfall.", dq: Q.plag, ref: "Magen Avraham OC 233 (alos 72 to tzeis 72)", url: "Shulchan_Arukh,_Orach_Chayim.233.1", calc: (c) => c.prop(c.addMin(c.sr, -72), c.addMin(c.ss, 72), 10.75) },
      { label: "MGA, day bounded 16.1 deg", type: "degrees", eq: "T \u2212 1.25H; A,T at \u03B8 = 16.1\u00B0", d: "The same 10.75-hour point in a day bounded by the 16.1\u00B0 dawn and dusk.", ref: "Degree-bounded day (Yisrael Vehazmanim)", calc: (c) => c.prop(c.dR(16.1), c.dS(16.1), 10.75) },
      { label: "Baal HaTanya", type: "zmaniyos", eq: "T \u2212 1.25H; A,T at \u03B8 = 1.583\u00B0", d: "The same point in a day measured from netz amiti to shkia amiti (1.583\u00B0).", ref: "Shulchan Arukh HaRav OC 233 (netz amiti to shkiah amiti)", url: "Shulchan_Arukh_HaRav,_Orach_Chayim.233", calc: (c) => c.prop(c.dR(1.583), c.dS(1.583), 10.75) },
    ],
  },
  {
    id: "shkia", title: "Shkiat HaChamah", sub: "Sunset",
    basis: { ref: "Shabbat 34b; Shulchan Arukh OC 261:2", url: "Shulchan_Arukh,_Orach_Chayim.261.2" },
    note: "These diverge mainly at altitude. At sea level the three nearly coincide; Jerusalem (754 m) opens a gap of a few minutes.",
    items: [
      { label: "Sea level (mishor)", type: "horizon", eq: "S at \u03B8 = 0.833\u00B0 (upper limb, sea-level horizon)", d: "Geometric sunset at a flat sea-level horizon: the sun's upper limb at the apparent horizon.", dq: Q.shkia, ref: "Geometric sunset at the sea-level horizon; the reckoning most luchos use", calc: (c) => c.ss },
      { label: "Visible (elevation-adjusted)", type: "horizon", eq: "S adjusted for horizon dip from elevation", d: "Sunset as seen from the location's height; higher ground holds the sun a touch longer.", dq: Q.shkia, ref: "Sunset as seen from the location's altitude (KosherJava elevation adjustment)", calc: (c) => c.ssVis },
      { label: "Shkia amitis (Baal HaTanya)", type: "horizon", eq: "\u03B8 = 1.583\u00B0 (center below geometric horizon)", d: "Baal HaTanya's true sunset, the sun's center 1.583\u00B0 below the geometric horizon.", ref: "Shulchan Arukh HaRav OC 261; sun's center 1.583 deg below the horizon", url: "Shulchan_Arukh_HaRav,_Orach_Chayim.261", calc: (c) => c.dS(1.583) },
    ],
  },
  {
    id: "tzeis", title: "Tzeit HaKochavim", sub: "Nightfall / end of Shabbat",
    basis: { ref: "Shabbat 34b-35a; Shulchan Arukh OC 261:2, 293:2", url: "Shabbat.34b" },
    items: [
      { label: "3.7 deg", type: "degrees", eq: "\u03B8 = 3.7\u00B0 (\u2248 S + \u00BEM, M=18, Yeru equinox)", d: "Geonim: night is three-quarters of a mil after sunset. At the Yerushalayim equinox that 13.5-minute span is the sun about 3.7\u00B0 down.", dq: Q.bhs, ref: "Geonim, 3/4 mil (Shabbat 34b)", url: "Shabbat.34b", calc: (c) => c.dS(3.7) },
      { label: "3.8 deg", type: "degrees", eq: "\u03B8 = 3.8\u00B0 (\u00BE mil variant)", d: "The same three-quarter-mil nightfall, a slightly later variant.", dq: Q.bhs, ref: "Geonim, 3/4 mil variant", url: "Shabbat.34b", calc: (c) => c.dS(3.8) },
      { label: "4.8 deg", type: "degrees", eq: "\u03B8 = 4.8\u00B0", d: "Peninei Halacha's reckoning for nightfall in Eretz Yisrael.", ref: "Peninei Halacha (R' Melamed), Eretz Yisrael", calc: (c) => c.dS(4.8) },
      { label: "5.95 deg", type: "degrees", eq: "\u03B8 = 5.95\u00B0 (\u2248 \u00BEM, M=24)", d: "A three-quarter-mil at a 24-minute mil, the depression matching that longer span.", ref: "Geonim, 24-min equivalent", calc: (c) => c.dS(5.95) },
      { label: "Baal HaTanya 6 deg", type: "degrees", eq: "\u03B8 = 6\u00B0 (Shulchan Arukh HaRav)", d: "The depression Shulchan Arukh HaRav gives for nightfall.", ref: "Shulchan Arukh HaRav OC 261, 293", url: "Shulchan_Arukh_HaRav,_Orach_Chayim.261", calc: (c) => c.dS(6) },
      { label: "7.083 deg (3 medium stars)", type: "degrees", eq: "\u03B8 = 7.083\u00B0 (observed: 3 medium stars)", d: "Defined by three medium stars becoming visible; 7.083\u00B0 is the observed depression at which they appear.", ref: "Dr. B. Cohn luach, Strasbourg 1899", calc: (c) => c.dS(7.083) },
      { label: "8.5 deg (3 small stars)", type: "degrees", eq: "\u03B8 = 8.5\u00B0 (observed: 3 small stars)", d: "Defined by three small stars; the deeper depression at which they appear.", ref: "Ohr Meir (R' Meir Posen)", calc: (c) => c.dS(8.5) },
      { label: "13.5 min", type: "fixed", eq: "S + \u00BEM, M = 18 \u2192 13.5", d: "Three-quarters of a mil at an 18-minute mil: 0.75 \u00D7 18 = 13.5.", dq: Q.bhs, ref: "3/4 mil at 18-min mil. Shabbat 34b; SA OC 261:2", url: "Shulchan_Arukh,_Orach_Chayim.261.2", calc: (c) => c.addMin(c.ss, 13.5) },
      { label: "18 min", type: "fixed", eq: "S + \u00BEM, M = 24 \u2192 18", d: "Three-quarters of a mil at the 24-minute mil (a mil = a third of an hour plus a fifteenth): 0.75 \u00D7 24 = 18. The 24-minute mil is the Magen Avraham, Pri Chadash, Chok Yaakov and Gra.", dq: Q.bhs, ref: "3/4 mil at 24-min mil (MA, Pri Chadash, Chok Yaakov, Gra). Biur Halacha OC 459:2", url: "Biur_Halacha.459.2", calc: (c) => c.addMin(c.ss, 18) },
      { label: "42 min", type: "fixed", eq: "S + 42 (fixed, 3 medium stars)", d: "A fixed span set for three medium stars.", ref: "3 medium stars, fixed", calc: (c) => c.addMin(c.ss, 42) },
      { label: "50 min", type: "fixed", eq: "S + 50 (fixed, Igros Moshe)", d: "R' Moshe Feinstein's practical nightfall for Shema and motzaei Shabbat in the US.", ref: "Igros Moshe (US practice for KS / motzaei Shabbat)", calc: (c) => c.addMin(c.ss, 50) },
      { label: "72 min (Rabbeinu Tam)", type: "fixed", eq: "S + 4M, M = 18 \u2192 72", d: "Rabbeinu Tam: four mil from sunset to true nightfall, a mil at 18 minutes: 4 \u00D7 18 = 72.", dq: Q.rt4mil, ref: "Rabbeinu Tam, 4 mil. Tosafot Shabbat 35a; SA OC 261:2", url: "Shabbat.35a", calc: (c) => c.addMin(c.ss, 72) },
      { label: "90 min (Rabbeinu Tam)", type: "fixed", eq: "S + 4M, M = 22.5 \u2192 90", d: "The same four mil, a mil reckoned at 22.5 minutes: 4 \u00D7 22.5 = 90.", dq: Q.rt4mil, ref: "Rabbeinu Tam, 22.5-min mil", calc: (c) => c.addMin(c.ss, 90) },
      { label: "72 zmaniyos (Rabbeinu Tam)", type: "zmaniyos", eq: "S + D/10 (= 4M proportional)", d: "The four-mil nightfall read proportionally: one-tenth of the daylight after sunset, longer in summer and shorter in winter.", dq: Q.rt4mil, ref: "GRA-proportional Rabbeinu Tam (72 zmaniyos min)", calc: (c) => new Date(c.ss.getTime() + c.dayMs / 10) },
      { label: "Achtel \u2013 1/8 day (Brisk)", type: "zmaniyos", eq: "S + D/8 (= 1.5 zmaniyos hrs)", d: "The Brisker achtel. The surviving four-mil nightfall read against the daytime: four mil of a 32-mil daytime is one-eighth of the day, so tzeis is shkiah plus an eighth of the daylight, 1.5 proportional hours. This is the plain reading of the gemara for tzeis, practiced in Brisk, mostly as zmaniyos. At the Yerushalayim equinox it is 90 minutes; it stretches in summer and contracts in winter.", dq: "\u05DE\u05B4\u05E9\u05B0\u05C1\u05E7\u05B4\u05D9\u05E2\u05B7\u05EA \u05D4\u05B7\u05D7\u05B7\u05DE\u05B8\u05BC\u05D4 \u05D5\u05B0\u05E2\u05B7\u05D3 \u05E6\u05B5\u05D0\u05EA \u05D4\u05B7\u05DB\u05BC\u05D5\u05B9\u05DB\u05B8\u05D1\u05B4\u05D9\u05DD \u05D0\u05B7\u05E8\u05B0\u05D1\u05BC\u05B7\u05E2\u05B7\u05EA \u05DE\u05B4\u05D9\u05DC\u05B4\u05D9\u05DF", ref: "4 mil = 1/8 of the day (Pesachim 94a, R' Yehuda). Brisker practice (oral mesorah)", url: "Pesachim.94a", calc: (c) => new Date(c.ss.getTime() + c.dayMs / 8) },
      { label: "Sekstel \u2013 1/6 day (extreme Brisk)", type: "zmaniyos", eq: "S + D/6 (= 2 zmaniyos hrs)", d: "The sekstel. Shkiah plus a sixth of the daylight, 2 proportional hours, the five-mil nightfall. This is R' Yochanan's reckoning, the abandoned side: the four-mil braisa is a tiyuvta against Rava and Ulla who rested on it. Held by a small faction as an extreme stringency. At the Yerushalayim equinox it is 120 minutes.", dq: "\u05DE\u05B4\u05E9\u05B0\u05C1\u05E7\u05B4\u05D9\u05E2\u05B7\u05EA \u05D4\u05B7\u05D7\u05B7\u05DE\u05B8\u05BC\u05D4 \u05E2\u05B7\u05D3 \u05E6\u05B5\u05D0\u05EA \u05D4\u05B7\u05DB\u05BC\u05D5\u05B9\u05DB\u05B8\u05D1\u05B4\u05D9\u05DD \u05D7\u05B2\u05DE\u05B4\u05E9\u05BC\u05C1\u05D4 \u05DE\u05B4\u05D9\u05DC\u05B4\u05D9\u05DF... \u05D0\u05B6\u05D7\u05B8\u05D3 \u05DE\u05B4\u05E9\u05BC\u05C1\u05E9\u05B8\u05BC\u05D4 \u05D1\u05B7\u05D9\u05BC\u05D5\u05B9\u05DD", ref: "5 mil = 1/6 of the day (Pesachim 94a, R' Yochanan, the abandoned opinion). Small faction, extreme stringency", url: "Pesachim.94a", calc: (c) => new Date(c.ss.getTime() + c.dayMs / 6) },
      { label: "16.1 deg (Rabbeinu Tam)", type: "degrees", eq: "\u03B8 = 16.1\u00B0 (\u2248 72 min, Yeru equinox)", d: "Rabbeinu Tam's nightfall as a depression: 16.1\u00B0 reproduces 72 minutes at the Yerushalayim equinox.", ref: "Rabbeinu Tam, = 72 min equivalent", calc: (c) => c.dS(16.1) },
      { label: "18 deg (Rabbeinu Tam)", type: "degrees", eq: "\u03B8 = 18\u00B0", d: "A stringent fixed-angle Rabbeinu Tam nightfall.", ref: "Rabbeinu Tam, stringent degree", calc: (c) => c.dS(18) },
    ],
  },
];

// verbatim primary sources (Hebrew from Sefaria), with a plain rendering and the variance note
const SOURCES = {
  alos: {
    he: "מֵעֲלוֹת הַשַּׁחַר עַד הָנֵץ הַחַמָּה אַרְבַּעַת מִילִין",
    en: "From dawn until sunrise is four mil.",
    ref: "Pesachim 94a", url: "Pesachim.94a",
    note: "The four-mil span fixes dawn before sunrise. Read as elapsed time it gives 72 or 90 minutes (an 18 or 22.5-minute mil); read as the sun's position it gives the degree figures.",
  },
  misheyakir: {
    he: "מִשֶּׁיִּרְאֶה אֶת חֲבֵרוֹ רָחוֹק אַרְבַּע אַמּוֹת וְיַכִּירֶנּוּ",
    en: "From when one sees an acquaintance four amos away and recognizes him.",
    ref: "Berakhot 9b", url: "Berakhot.9b",
    note: "The benchmark is recognition by available light, not a clock. The differing thresholds (telling blue from white, a friend at four amos) produce the different degree opinions.",
  },
  netz: {
    he: "וָתִיקִין הָיוּ גּוֹמְרִין אוֹתָהּ עִם הָנֵץ הַחַמָּה",
    en: "The vatikin would finish Shema together with sunrise.",
    ref: "Berakhot 9b", url: "Berakhot.9b",
    note: "Sunrise is the anchor. Taking the sea-level horizon, the visible horizon from altitude, or the Baal HaTanya's true sunrise shifts that anchor by a few minutes.",
    def: {
      he: "הָנֵץ הַחַמָּה, פֵּירוּשׁ יְצִיאַת הַחַמָּה, כְּמוֹ הֵנֵצוּ הָרִמּוֹנִים",
      en: "Hanetz hachama means the emergence of the sun, as in the budding of pomegranates.",
      ref: "Shulchan Arukh OC 58:1", url: "Shulchan_Arukh,_Orach_Chayim.58.1",
      note: "Netz is the sun's first emergence, the upper limb breaking the horizon, not the whole disk clearing it. The 0.833\u00B0 depression in the engine is the astronomical rendering of that upper limb at the apparent horizon (about 34' of refraction plus the sun's 16' radius); the source supplies the concept, not the angle. Mishor uses a flat sea-level horizon; netz hanir'eh corrects for the real visible horizon, which elevation or a ridge can move by minutes.",
    },
  },
  shma: {
    he: "וְגוֹמְרָהּ עַד הָנֵץ הַחַמָּה, רַבִּי יְהוֹשֻׁעַ אוֹמֵר עַד שָׁלֹשׁ שָׁעוֹת",
    en: "One finishes it by sunrise; Rabbi Yehoshua says until three hours.",
    ref: "Mishnah Berakhot 1:2", url: "Mishnah_Berakhot.1.2",
    note: "Three hours into the day. The variance is entirely in what bounds the day, sunrise to sunset (Gra) or dawn to nightfall (Magen Avraham), which sets the length of each proportional hour.",
  },
  tfilla: {
    he: "תְּפִלַּת הַשַּׁחַר עַד חֲצוֹת, רַבִּי יְהוּדָה אוֹמֵר עַד אַרְבַּע שָׁעוֹת",
    en: "The morning prayer is until midday; Rabbi Yehuda says until four hours.",
    ref: "Mishnah Berakhot 4:1", url: "Mishnah_Berakhot.4.1",
    note: "Four proportional hours, by the halacha following Rabbi Yehuda. The same day-bounding dispute as Shema drives the spread.",
  },
  plag: {
    he: "תְּפִלַּת הַמִּנְחָה עַד הָעֶרֶב, רַבִּי יְהוּדָה אוֹמֵר עַד פְּלַג הַמִּנְחָה",
    en: "The afternoon prayer is until evening; Rabbi Yehuda says until plag haMincha.",
    ref: "Mishnah Berakhot 4:1", url: "Mishnah_Berakhot.4.1",
    note: "Plag is the midpoint of the last two and a half proportional hours. The day-bound choice moves it on the clock.",
  },
  shkia: {
    he: "מִשֶּׁתִּשְׁקַע הַחַמָּה כָּל זְמַן שֶׁפְּנֵי מִזְרָח מַאֲדִימִין",
    en: "From when the sun sets, as long as the eastern sky is reddening.",
    ref: "Shabbat 34b", url: "Shabbat.34b",
    note: "Sunset opens bein hashmashot. The sea-level, elevation-adjusted, and amiti reckonings differ on the exact instant of that setting.",
    def: {
      he: "מִתְּחִלַּת הַשְּׁקִיעָה שֶׁאֵין הַשֶּׁמֶשׁ נִרְאֵית עַל הָאָרֶץ",
      en: "From the onset of shkia, when the sun is no longer seen upon the earth.",
      ref: "Shulchan Arukh OC 261:2", url: "Shulchan_Arukh,_Orach_Chayim.261.2",
      note: "The Shulchan Arukh defines shkia by visibility, the sun no longer seen upon the earth, which is inherently the visible horizon. Mishor computes it for a flat sea-level horizon; the visible and amiti rows adjust for real elevation and for the Baal HaTanya's true setting. The same passage gives the three-quarter-mil bein hashmashot shiur.",
    },
  },
  tzeis: {
    he: "רַבִּי יוֹסֵי אוֹמֵר בֵּין הַשְּׁמָשׁוֹת כְּהֶרֶף עַיִן, זֶה נִכְנָס וְזֶה יוֹצֵא",
    en: "Rabbi Yossi says bein hashmashot is like the blink of an eye, this one entering and that one leaving.",
    ref: "Shabbat 34b", url: "Shabbat.34b",
    note: "The duration of bein hashmashot is itself disputed (three-quarters of a mil here, against four mil in Pesachim 94a). That gap is the Geonim-versus-Rabbeinu-Tam split behind the tzeis spread.",
  },
};

const FILTERS = [{ id: "all", label: "All" }, { id: "degrees", label: "Degrees" }, { id: "fixed", label: "Fixed min" }, { id: "zmaniyos", label: "Zmaniyos" }, { id: "horizon", label: "Horizon" }];

// scientific twilight bands by sun depression (degrees below horizon)
const TWILIGHT = [
  { name: "Day", range: "sun up", stars: "", lo: -6, hi: 0, color: "#A9C4DD", ink: "#16283A", gloss: "Sun is above the horizon." },
  { name: "Civil twilight", range: "0\u00B0 to 6\u00B0", stars: "brightest stars & planets, to ~mag 1", lo: 0, hi: 6, color: "#D98E45", ink: "#2A1606", gloss: "Horizon clearly visible; brightest stars and planets appear. Most zmanim near sunrise/sunset fall here." },
  { name: "Nautical twilight", range: "6\u00B0 to 12\u00B0", stars: "to ~mag 3-4; constellations fill in", lo: 6, hi: 12, color: "#34568B", ink: "#E0E8F4", gloss: "Sea horizon faint; many stars visible. Misheyakir and the medium-star tzeis fall here." },
  { name: "Astronomical twilight", range: "12\u00B0 to 18\u00B0", stars: "to ~mag 6; sky near full dark", lo: 12, hi: 18, color: "#1B2540", ink: "#C8D2E6", gloss: "Sky nearly fully dark. Alos and the stringent Rabbeinu Tam reckonings fall here." },
  { name: "Night", range: "below 18\u00B0", stars: "all naked-eye stars, to ~mag 6.5", lo: 18, hi: 24, color: "#080C16", ink: "#9FB0C8", gloss: "Full astronomical darkness." },
];
const TWI_TOP = -6, TWI_BOT = 24;
const twiY = (d) => ((Math.max(TWI_TOP, Math.min(TWI_BOT, d)) - TWI_TOP) / (TWI_BOT - TWI_TOP)) * 100;
const MORNING = new Set(["alos", "misheyakir", "netz", "shma", "tfilla"]);
// Proportional-hour daytime zmanim get a sundial, not the twilight graph.
const DAYDIAL = new Set(["shma", "tfilla", "chatzos", "mincha_gedola", "mincha_ketana", "plag"]);

function fmt(dt, tz) {
  if (!dt || isNaN(dt)) return "--";
  const r = new Date(Math.round(dt.getTime() / 60000) * 60000);
  return new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit", hour12: true }).format(r);
}
const spreadMin = (a, b) => Math.round(Math.abs(b - a) / 60000);
const fmt2 = (dt, tz) => (!dt || isNaN(dt)) ? "--" : new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true }).format(dt);
const href = (url) => (url.startsWith("http") ? url : SEF + url);

function SourceLink({ refText, url }) {
  if (url) return <a className="zm-src" href={href(url)} target="_blank" rel="noreferrer">{refText}</a>;
  return <small className="zm-srcplain">{refText}</small>;
}


// Sun-arc sundial, SECTION mode: one arc (the Gra day, twelve shaos zmaniyos).
// Opinions numbered by time (earliest = 1); a shaded wedge spans first to last.
function DayDial({ ctx, concept, loc }) {
  if (!ctx || !ctx.sr || !ctx.ss) return null;
  const tz = loc.tz, sr = ctx.sr, ss = ctx.ss, dayMs = ss - sr;
  const hourMin = Math.round(dayMs / 12 / 60000);
  const HMAP = { shma: 3, tfilla: 4, chatzos: 6, mincha_gedola: 6.5, mincha_ketana: 9.5, plag: 10.75 };
  const NAME = { shma: "Shema", tfilla: "Tefila", chatzos: "Chatzos", mincha_gedola: "Mincha Gedola", mincha_ketana: "Mincha Ketana", plag: "Plag" };
  const focusH = HMAP[concept];
  const clampf = (x) => Math.max(0, Math.min(1, x));

  const arr = [
    { ab: "Gra", s: sr, e: ss, col: "#E9B949" },
    { ab: "MGA 72", s: ctx.addMin(sr, -72), e: ctx.addMin(ss, 72), col: "#C97B3C" },
    { ab: "MGA 90", s: ctx.addMin(sr, -90), e: ctx.addMin(ss, 90), col: "#6FA8A0" },
    { ab: "MGA 16.1°", s: ctx.dR(16.1), e: ctx.dS(16.1), col: "#9B8FD6" },
    { ab: "B'Tanya", s: ctx.dR(1.583), e: ctx.dS(1.583), col: "#D98E45" },
  ].filter((o) => o.s && o.e && !isNaN(o.s) && !isNaN(o.e)).map((o) => {
    const day = o.e - o.s, zt = new Date(o.s.getTime() + focusH * (day / 12));
    return { ...o, zt, frac: clampf((zt - sr) / dayMs) };
  });
  arr.sort((a, b) => a.zt - b.zt);
  const OPS = arr.map((o, i) => ({ ...o, n: i + 1 }));

  const W = 360, H = 200, cx = 180, cy = 184, R = 150;
  const pt = (fr, r) => { const th = Math.PI * (1 - fr); return [cx + r * Math.cos(th), cy - r * Math.sin(th)]; };
  const a0 = pt(0, R), a1 = pt(1, R);
  const arc = `M ${a0[0].toFixed(1)} ${a0[1].toFixed(1)} A ${R} ${R} 0 0 1 ${a1[0].toFixed(1)} ${a1[1].toFixed(1)}`;

  const fracs = OPS.map((o) => o.frac);
  const bp0 = pt(Math.min(...fracs), R), bp1 = pt(Math.max(...fracs), R);
  const wedge = `M ${cx} ${cy} L ${bp0[0].toFixed(1)} ${bp0[1].toFixed(1)} A ${R} ${R} 0 0 1 ${bp1[0].toFixed(1)} ${bp1[1].toFixed(1)} Z`;

  const ts = OPS.map((o) => o.zt.getTime());
  let lo = Math.min(...ts), hi = Math.max(...ts);
  if (hi - lo < 8 * 60000) { const m = (lo + hi) / 2; lo = m - 4 * 60000; hi = m + 4 * 60000; }
  const pd = (hi - lo) * 0.18; lo -= pd; hi += pd;
  const BX = (t) => ((t - lo) / (hi - lo)) * 100;

  return (
    <aside className="zm-twilight">
      <div className="zm-twihead">{NAME[concept]} on the sundial</div>
      <div className="zm-twisub">Sunrise to sunset, twelve <i>shaos zmaniyos</i> (one is {hourMin} min today, Gra). The shaded wedge spans the opinions, numbered by time (earliest = 1).</div>
      <div className="zm-dialwrap">
        <svg viewBox={`0 0 ${W} ${H}`} className="zm-dialsvg" role="img" aria-label={NAME[concept] + " on the sundial"}>
          <line x1={a0[0]} y1={cy} x2={a1[0]} y2={cy} stroke="var(--line)" />
          <path d={wedge} fill="var(--gold)" opacity="0.16" />
          {Array.from({ length: 13 }).map((_, h) => {
            const fr = h / 12, major = h === 0 || h === 6 || h === 12;
            const ip = pt(fr, R), lp = pt(fr, R + 11);
            return (
              <g key={"g" + h}>
                <line x1={cx} y1={cy} x2={ip[0]} y2={ip[1]} stroke="var(--line)" strokeWidth={major ? 1 : 0.5} opacity={major ? 0.5 : 0.2} />
                <text x={lp[0]} y={lp[1] + 3} className="zm-dialhrnum" textAnchor="middle">{h}</text>
              </g>
            );
          })}
          <path d={arc} fill="none" stroke="var(--gold)" strokeWidth="2" opacity="0.55" />
          {OPS.map((o) => {
            const p = pt(o.frac, R);
            return (
              <g key={"m" + o.n}>
                <circle cx={p[0]} cy={p[1]} r="6.5" fill="#0B1A2E" stroke={o.col} strokeWidth="1.5" />
                <text x={p[0]} y={p[1] + 2.6} className="zm-dialbadge" textAnchor="middle" style={{ fontSize: "8px" }}>{o.n}</text>
              </g>
            );
          })}
          <text x={a0[0]} y={cy + 15} className="zm-dialanchor" textAnchor="start">{"נץ " + fmt(sr, tz)}</text>
          <text x={cx} y={pt(0.5, R)[1] - 7} className="zm-dialanchor" textAnchor="middle">{"חצות " + fmt(new Date(sr.getTime() + 6 * (dayMs / 12)), tz)}</text>
          <text x={a1[0]} y={cy + 15} className="zm-dialanchor" textAnchor="end">{fmt(ss, tz) + " שקיעה"}</text>
        </svg>
      </div>
      <div className="zm-sheethead">{NAME[concept]} — side by side</div>
      <div className="zm-sheetsub">Earliest first; each numbered marker matches the dial.</div>
      <div className="zm-sheet">
        {OPS.map((o) => (
          <div className="zm-sheetrow" key={"r" + o.n}>
            <div className="zm-sheetname"><span className="zm-sheetnum" style={{ borderColor: o.col, color: o.col }}>{o.n}</span>{o.ab}</div>
            <div className="zm-sheetbar"><div className="zm-sheettick is-focus" style={{ left: `${BX(o.zt.getTime())}%`, background: o.col }} title={o.ab + " · " + fmt(o.zt, tz)} /></div>
            <div className="zm-sheettime">{fmt(o.zt, tz)}</div>
          </div>
        ))}
      </div>
      <div className="zm-twinote">{NAME[concept]} sits at hour {focusH} of the day; the opinions differ only in which dawn/dusk bounds the day, shifting the clock time a few minutes. Full method details are on the left.</div>
    </aside>
  );
}

// MAIN sundial tab: all of the day's zmanim plotted for ONE opinion at a time.
function MainSundial({ ctx, loc }) {
  if (!ctx || !ctx.sr || !ctx.ss) return null;
  const tz = loc.tz, sr = ctx.sr, ss = ctx.ss;
  const OPS = [
    { ab: "Gra", s: sr, e: ss },
    { ab: "MGA 72", s: ctx.addMin(sr, -72), e: ctx.addMin(ss, 72) },
    { ab: "MGA 90", s: ctx.addMin(sr, -90), e: ctx.addMin(ss, 90) },
    { ab: "MGA 16.1°", s: ctx.dR(16.1), e: ctx.dS(16.1) },
    { ab: "B'Tanya", s: ctx.dR(1.583), e: ctx.dS(1.583) },
  ].filter((o) => o.s && o.e && !isNaN(o.s) && !isNaN(o.e));
  const [oi, setOi] = useState(0);
  const op = OPS[Math.min(oi, OPS.length - 1)];
  const day = op.e - op.s, hourMs = day / 12, hourMin = Math.round(hourMs / 60000);
  const Z = [
    { h: 3, en: "Shema", col: "#E9B949" },
    { h: 4, en: "Tefila", col: "#C97B3C" },
    { h: 6, en: "Chatzos", col: "#F3ECDD" },
    { h: 6.5, en: "Mincha Gedola", col: "#6FA8A0" },
    { h: 9.5, en: "Mincha Ketana", col: "#9B8FD6" },
    { h: 10.75, en: "Plag", col: "#D98E45" },
  ];
  const zt = (h) => new Date(op.s.getTime() + h * hourMs);
  const W = 560, H = 330, cx = 280, cy = 300, R = 250;
  const pt = (fr, r) => { const th = Math.PI * (1 - fr); return [cx + r * Math.cos(th), cy - r * Math.sin(th)]; };
  const a0 = pt(0, R), a1 = pt(1, R);
  const arc = `M ${a0[0].toFixed(1)} ${a0[1].toFixed(1)} A ${R} ${R} 0 0 1 ${a1[0].toFixed(1)} ${a1[1].toFixed(1)}`;
  return (
    <div className="zm-maindial">
      <div className="zm-optabs">
        {OPS.map((o, i) => <button key={o.ab} className={"zm-opt " + (i === oi ? "is-on" : "")} onClick={() => setOi(i)}>{o.ab}</button>)}
      </div>
      <div className="zm-maindialsub">{op.ab} day: {fmt(op.s, tz)} – {fmt(op.e, tz)} · one sha'ah zmanis = {hourMin} min</div>
      <svg viewBox={`0 0 ${W} ${H}`} className="zm-maindialsvg" role="img" aria-label="The day as a sundial">
        <line x1={a0[0]} y1={cy} x2={a1[0]} y2={cy} stroke="var(--line)" />
        {Array.from({ length: 13 }).map((_, h) => {
          const fr = h / 12, major = h === 0 || h === 6 || h === 12;
          const ip = pt(fr, R), lp = pt(fr, R + 13);
          return (
            <g key={"g" + h}>
              <line x1={cx} y1={cy} x2={ip[0]} y2={ip[1]} stroke="var(--line)" strokeWidth={major ? 1 : 0.5} opacity={major ? 0.5 : 0.18} />
              <text x={lp[0]} y={lp[1] + 3} className="zm-dialhrnum" textAnchor="middle">{h}</text>
            </g>
          );
        })}
        <path d={arc} fill="none" stroke="var(--gold)" strokeWidth="2.5" opacity="0.6" />
        {Z.map((z, i) => {
          const fr = z.h / 12, p = pt(fr, R), lp = pt(fr, R - 34 - (i % 2) * 24);
          return (
            <g key={"z" + i}>
              <line x1={cx} y1={cy} x2={p[0]} y2={p[1]} stroke={z.col} strokeWidth="1.2" opacity="0.4" />
              <circle cx={p[0]} cy={p[1]} r="6" fill={z.col} stroke="#0B1A2E" strokeWidth="1.4" />
              <text x={lp[0]} y={lp[1]} className="zm-mdlbl" textAnchor="middle">{z.en}</text>
              <text x={lp[0]} y={lp[1] + 13} className="zm-mdtime" textAnchor="middle">{fmt(zt(z.h), tz)}</text>
            </g>
          );
        })}
        <text x={a0[0]} y={cy + 18} className="zm-dialanchor" textAnchor="start">{"נץ " + fmt(op.s, tz)}</text>
        <text x={cx} y={pt(0.5, R)[1] - 10} className="zm-dialanchor" textAnchor="middle">{"חצות " + fmt(zt(6), tz)}</text>
        <text x={a1[0]} y={cy + 18} className="zm-dialanchor" textAnchor="end">{fmt(op.e, tz) + " שקיעה"}</text>
      </svg>
    </div>
  );
}

function ZmanimMethods() {
  const [locId, setLocId] = useState("newyork");
  const [custom, setCustom] = useState(null);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [concept, setConcept] = useState("tzeis");
  const [filter, setFilter] = useState("all");

  const loc = custom || LOCATIONS.find((l) => l.id === locId);
  const [Y, M, D] = date.split("-").map(Number);
  const ctx = useMemo(() => (loc ? makeCtx(Y, M, D, loc.lat, loc.lon, loc.elev || 0) : null), [Y, M, D, loc]);

  const [moonOpen, setMoonOpen] = useState(false);
  const [openRow, setOpenRow] = useState(null);
  const [methodOpen, setMethodOpen] = useState(false);
  const [selStar, setSelStar] = useState(null);
  const moon = useMemo(() => {
    if (!loc) return null;
    const ev = moonEvents(Y, M, D, loc.lat, loc.lon);
    return { ...ev, illum: moonIllum(Y, M, D) };
  }, [Y, M, D, loc]);
  const molad = useMemo(() => {
    const hy = hebrewMonthYear(Y, M, D);
    return { ...hy, ...moladData(hy.monthIdx, hy.year) };
  }, [Y, M, D]);
  const sunAz = useMemo(() => {
    if (!ctx || !ctx.sr || !ctx.ss) return null;
    return { rise: sunAzimuth(ctx.sr, loc.lat, loc.lon), set: sunAzimuth(ctx.ss, loc.lat, loc.lon) };
  }, [ctx, loc]);
  const stars = useMemo(() => (loc ? starsTonight(Y, M, D, loc.lat, loc.lon, !MORNING.has(concept)) : []), [Y, M, D, loc, concept]);

  const con = CONCEPTS.find((c) => c.id === concept);
  const rows = useMemo(() => {
    if (!ctx) return [];
    return con.items
      .map((it) => { const dt = it.calc(ctx); return { ...it, dt, dep: dt && !isNaN(dt) ? sunDepression(dt, loc.lat, loc.lon) : null }; })
      .filter((r) => r.dt && !isNaN(r.dt))
      .filter((r) => filter === "all" || r.type === filter)
      .sort((a, b) => a.dt - b.dt);
  }, [ctx, con, filter, loc]);

  // lay out the twilight band so every star gets its own line; bands grow to fit their stars
  const twiLayout = useMemo(() => {
    const LINE = 27, PADT = 24, PADB = 12, MINBAND = 62;
    const bands = TWILIGHT.map((b) => ({ ...b, sList: [], tList: [] }));
    const clamp = (d) => Math.max(TWI_TOP, Math.min(TWI_BOT, d));
    const findBand = (d) => bands.find((b) => d >= b.lo && d < b.hi) || bands[bands.length - 1];
    stars.forEach((s) => findBand(clamp(s.dep)).sList.push(s));
    rows.forEach((r, i) => { if (r.dep != null) findBand(clamp(r.dep)).tList.push({ r, i }); });
    bands.forEach((b) => { b.sList.sort((a, c) => a.dep - c.dep); b.tList.sort((a, c) => a.r.dep - c.r.dep); });
    let top = 0;
    bands.forEach((b) => {
      const need = b.sList.length ? PADT + b.sList.length * LINE + PADB : 0;
      const prop = ((b.hi - b.lo) / (TWI_BOT - TWI_TOP)) * 360;
      b.h = Math.max(MINBAND, need, prop);
      b.top = top; top += b.h;
    });
    const total = top;
    // Dawn runs the other way: the sun rises, depression shrinks, sky brightens.
    // Flip the column so Night sits at the top and Day at the bottom, so going down
    // the chart tracks time toward sunrise (the inverse of the dusk view).
    const morning = MORNING.has(concept);
    const fy = (y) => (morning ? total - y : y);
    bands.forEach((b) => {
      b.dispTop = morning ? total - b.top - b.h : b.top;
      b.starY = (k) => fy(b.top + PADT + k * LINE + LINE / 2);
      b.tickY = (d) => fy(b.top + ((Math.max(b.lo, Math.min(b.hi, d)) - b.lo) / (b.hi - b.lo)) * b.h);
    });
    const depToY = (d) => {
      const dd = clamp(d);
      const b = bands.find((x) => dd >= x.lo && dd < x.hi) || bands[bands.length - 1];
      return b.tickY(dd);
    };
    return { bands, total, depToY, morning };
  }, [rows, stars, concept]);

  // precise minutes-after-sunset (dusk) or minutes-before-sunrise (dawn) ruler for this date and place
  const minuteTicks = useMemo(() => {
    if (!ctx) return [];
    const dusk = !MORNING.has(concept);
    const base = dusk ? ctx.ss : ctx.sr;
    if (!base) return [];
    const out = [];
    for (let m = 0; m <= 150; m++) {
      const t = new Date(base.getTime() + (dusk ? 1 : -1) * m * 60000);
      const dep = sunDepression(t, loc.lat, loc.lon);
      if (dep == null) continue;
      if (dep > TWI_BOT) break;
      if (dep < TWI_TOP) continue;
      out.push({ m, dep, y: twiLayout.depToY(dep), major: m % 5 === 0 });
    }
    return out;
  }, [ctx, loc, concept, twiLayout]);

  const tmin = rows.length ? rows[0].dt : null;
  const tmax = rows.length ? rows[rows.length - 1].dt : null;
  const span = tmin && tmax ? tmax - tmin : 0;
  const spanMin = tmin && tmax ? spreadMin(tmin, tmax) : 0;

  const useMyLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      setCustom({ name: "My location", lat: +pos.coords.latitude.toFixed(4), lon: +pos.coords.longitude.toFixed(4), tz: Intl.DateTimeFormat().resolvedOptions().timeZone, elev: pos.coords.altitude || 0 });
    });
  };

  return (
    <div className="zm-root">
      <style>{CSS}</style>

      <header className="zm-head">
        <div>
          <div className="zm-eyebrow">זְמַנִּים · one zman, every method</div>
          <h1 className="zm-title">Where the Opinions Diverge</h1>
          <p className="zm-sub">Same moment in halacha, computed three ways: by degrees below the horizon, by fixed clock minutes, or by zmaniyos (proportional) hours. Pick a zman and watch them spread. Tap a source to open it on Sefaria.</p>
        </div>
        <div className="zm-controls">
          <label className="zm-field"><span>Place</span>
            <select value={custom ? "custom" : locId} onChange={(e) => { if (e.target.value !== "custom") { setCustom(null); setLocId(e.target.value); } }}>
              {LOCATIONS.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
              {custom && <option value="custom">{custom.name}</option>}
            </select>
          </label>
          <label className="zm-field"><span>Day</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          <button className="zm-geo" onClick={useMyLocation}>Use my location</button>
          <button className="zm-geo zm-moonbtn" onClick={() => setMoonOpen((o) => !o)}>{moonOpen ? "Hide" : "Moon & Molad"}</button>
        </div>
      </header>

      {moonOpen && moon && (
        <div className="zm-mooncard">
          <div className="zm-moongrid">
            <div className="zm-moonitem">
              <div className="zm-moonlabel">Moonrise</div>
              <div className="zm-moonval">{moon.rise ? fmt(moon.rise, loc.tz) : "none today"}</div>
              <div className="zm-moondir">{moon.riseAz != null ? `${compass(moon.riseAz)} \u00B7 ${Math.round(moon.riseAz)}\u00B0` : ""}</div>
            </div>
            <div className="zm-moonitem">
              <div className="zm-moonlabel">Moonset</div>
              <div className="zm-moonval">{moon.set ? fmt(moon.set, loc.tz) : "none today"}</div>
              <div className="zm-moondir">{moon.setAz != null ? `${compass(moon.setAz)} \u00B7 ${Math.round(moon.setAz)}\u00B0` : ""}</div>
            </div>
            <div className="zm-moonitem">
              <div className="zm-moonlabel">Illumination</div>
              <div className="zm-moonval">{Math.round(moon.illum * 100)}%</div>
              <div className="zm-moondir">{moon.illum < 0.49 ? "waxing/waning" : "near full"}</div>
            </div>
            <div className="zm-moonitem zm-moonmolad">
              <div className="zm-moonlabel">Molad {molad.month} {molad.year}</div>
              <div className="zm-moonval">{fmt2(molad.date, "Asia/Jerusalem")} <span className="zm-moontz">Jerusalem</span></div>
              <div className="zm-moonval2">{fmt2(molad.date, loc.tz)} <span className="zm-moontz">{loc.name}</span></div>
              <div className="zm-moondir">{molad.h}h {molad.m}m {molad.ch} chalakim after 6 PM (mean)</div>
            </div>
          </div>
          <div className="zm-mooncap">Moon times are approximate (within a few minutes). Molad is the mean lunar conjunction, one instant shown in two zones; direction is the compass bearing on the horizon.</div>
        </div>
      )}

      <div className="zm-conceptbar">
        {CONCEPTS.map((c) => (
          <button key={c.id} className={`zm-ctab ${concept === c.id ? "is-on" : ""}`} onClick={() => setConcept(c.id)}>{c.title}</button>
        ))}
      </div>

      <div className="zm-panel">
        <div className="zm-panelhead">
          <div>
            <h2 className="zm-conname">{con.title}</h2>
            <div className="zm-consub">{con.sub}</div>
            {con.basis && (
              <div className="zm-basis">Basis: <SourceLink refText={con.basis.ref} url={con.basis.url} /></div>
            )}
          </div>
          <div className="zm-filterrow">
            {FILTERS.map((f) => <button key={f.id} className={`zm-fchip ${filter === f.id ? "is-on" : ""}`} onClick={() => setFilter(f.id)}>{f.label}</button>)}
          </div>
        </div>

        {concept === "sundial" ? <MainSundial ctx={ctx} loc={loc} /> : <div className="zm-body">
          <div className="zm-left">
        {(concept === "netz" || concept === "shkia") && sunAz && (
          <div className="zm-dir">
            <span className="zm-dirstrong">
              {concept === "netz"
                ? `Sun rises ${compass(sunAz.rise)} (${Math.round(sunAz.rise)}\u00B0)`
                : `Sun sets ${compass(sunAz.set)} (${Math.round(sunAz.set)}\u00B0)`}
            </span>
            <span className="zm-dirnote"> on the horizon today. It swings toward the north in summer and the south in winter, reaching due {concept === "netz" ? "east" : "west"} at the equinoxes.</span>
          </div>
        )}
        {rows.length > 1 && (
          <div className="zm-summary">
            <span className="zm-spannum">{spanMin}</span>
            <span className="zm-spanunit">min spread</span>
            <span className="zm-spancap">from {fmt(tmin, loc.tz)} ({rows[0].label}) to {fmt(tmax, loc.tz)} ({rows[rows.length - 1].label})</span>
          </div>
        )}

        {rows.length > 1 && (
          <div className="zm-rail">
            {rows.map((r, i) => {
              const pos = span ? ((r.dt - tmin) / span) * 100 : 50;
              return <div key={i} className="zm-railtick" style={{ left: `${pos}%`, background: TYPES[r.type].color }} title={`${r.label} · ${fmt(r.dt, loc.tz)}`} />;
            })}
            <div className="zm-railends"><span>{fmt(tmin, loc.tz)}</span><span>{fmt(tmax, loc.tz)}</span></div>
          </div>
        )}

        {con.note && <div className="zm-note">{con.note}</div>}

        <div className="zm-taphint">Tap any row for how that time is derived</div>

        <div className="zm-list">
          {rows.map((r, i) => {
            const key = `${concept}|${r.label}`;
            const open = openRow === key;
            return (
              <div key={i} id={`zmrow-${i}`} className={`zm-row ${open ? "is-open" : ""}`}>
                <div className="zm-rowtop" onClick={() => setOpenRow(open ? null : key)}>
                  <span className="zm-rownum">{i + 1}</span>
                  <span className="zm-rowtime">{fmt(r.dt, loc.tz)}</span>
                  <span className="zm-rowlabel">{r.label}</span>
                  <span className="zm-tag" style={{ color: TYPES[r.type].color, borderColor: TYPES[r.type].color }}>{TYPES[r.type].label}</span>
                  <span className="zm-rowchev">{open ? "\u2212" : "+"}</span>
                </div>
                {open && (
                  <div className="zm-rowdetail">
                    {r.eq && <div className="zm-roweq"><span className="zm-roweqlab">eq</span>{r.eq}</div>}
                    {r.d && <div className="zm-derivtext">{r.d}</div>}
                    {r.dq && <blockquote className="zm-derivhe" dir="rtl" lang="he">{r.dq}</blockquote>}
                    <div className="zm-derivsrc"><SourceLink refText={r.ref} url={r.url} /></div>
                  </div>
                )}
              </div>
            );
          })}
          {!rows.length && <div className="zm-empty">No methods of this type for this zman.</div>}
        </div>
          </div>

          {DAYDIAL.has(concept) ? <DayDial ctx={ctx} concept={concept} loc={loc} /> : <aside className="zm-twilight">
            <div className="zm-twihead">{MORNING.has(concept) ? "Dawn" : "Dusk"} twilight</div>
            <div className="zm-twisub">Scientific stages by the sun's depression below the horizon{MORNING.has(concept) ? " as it rises" : " as it sets"}.</div>
            <div className="zm-rulercap">{MORNING.has(concept) ? "Minutes before sunrise" : "Minutes after sunset"}, precise for this date and place</div>
            <div className="zm-twichart">
              <div className="zm-minaxis" style={{ height: `${twiLayout.total}px` }}>
                {minuteTicks.map((mt, k) => (
                  <div key={k} className={`zm-mintick ${mt.major ? "is-major" : ""}`} style={{ top: `${mt.y}px` }}>
                    {mt.major && <span className="zm-minlabel">{mt.m}</span>}
                  </div>
                ))}
              </div>
              <div className="zm-twiband" style={{ height: `${twiLayout.total}px` }}>
              {twiLayout.bands.map((b, bi) => {
                const next = twiLayout.bands[bi + 1];
                const bg = next ? `linear-gradient(to ${twiLayout.morning ? "top" : "bottom"}, ${b.color} 0%, ${b.color} 50%, ${next.color} 100%)` : b.color;
                const pctLabel = b.lo < 0 ? "" : (b.hi >= 24 ? "all ~9,000 naked-eye stars" : `~${Math.round(skyPct(b.hi))}% of a pristine sky's stars`);
                return (
                  <div key={bi} className="zm-twizone" style={{ top: `${b.dispTop}px`, height: `${b.h}px`, background: bg, color: b.ink }} title={b.gloss}>
                    <span className="zm-twiname">{b.name} <span className="zm-twirange">{b.range}</span></span>
                    {pctLabel && <span className="zm-twipct">{pctLabel}</span>}
                  </div>
                );
              })}
              {twiLayout.bands.map((b) => b.tList.map(({ r, i }) => (
                <button key={"t" + i} className="zm-twitick" style={{ top: `${b.tickY(r.dep)}px` }}
                  title={`${i + 1}. ${r.label} \u00B7 ${fmt(r.dt, loc.tz)} \u00B7 ${r.dep.toFixed(1)}\u00B0 below`}
                  onClick={() => { setOpenRow(`${concept}|${r.label}`); const el = document.getElementById(`zmrow-${i}`); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); }}>
                  <span className="zm-twinum" style={{ borderColor: TYPES[r.type].color, color: TYPES[r.type].color }}>{i + 1}</span>
                </button>
              )))}
              {twiLayout.bands.map((b) => b.sList.map((s, k) => {
                const showDep = k === 0 || b.sList[k - 1].dep.toFixed(1) !== s.dep.toFixed(1);
                return (
                  <button key={"s" + s.name} className={`zm-starline ${selStar === s.name ? "is-sel" : ""}`} style={{ top: `${b.starY(k)}px` }}
                    title={`${s.name} \u00B7 mag ${s.mag.toFixed(1)} \u00B7 tap for size and luminosity`}
                    onClick={() => setSelStar(selStar === s.name ? null : s.name)}>
                    <span className="zm-starglyph" style={{ fontSize: `${Math.max(8, 14 - s.mag * 1.1)}px`, opacity: Math.max(0.55, 1 - s.mag * 0.1) }}>{"\u2605"}</span>
                    <span className="zm-starline-name">{s.name}</span>
                    <span className="zm-starline-mag">mag {s.mag.toFixed(1)}</span>
                    <span className="zm-starline-dep">{showDep ? `${s.dep.toFixed(1)}\u00B0` : ""}</span>
                  </button>
                );
              }))}
              </div>
            </div>

            {selStar && (() => {
              const ph = starPhysics(selStar);
              if (!ph) return null;
              const fL = (x) => (x >= 1000 ? Math.round(x).toLocaleString() : x.toFixed(1));
              return (
                <div className="zm-stardetail">
                  <div className="zm-stardhead"><span className="zm-stardname">{selStar}</span><button className="zm-stardclose" onClick={() => setSelStar(null)}>{"\u00D7"}</button></div>
                  <div className="zm-stardclass">{ph.spec} {ph.lc} · {ph.klass}</div>
                  <div className="zm-stardgrid">
                    <div className="zm-stardcell"><span className="zm-stardk">Distance</span><span className="zm-stardv">{ph.ly < 100 ? ph.ly.toFixed(1) : Math.round(ph.ly)} ly</span></div>
                    <div className="zm-stardcell"><span className="zm-stardk">Angular size</span><span className="zm-stardv">{ph.theta.toFixed(2)} mas</span></div>
                    <div className="zm-stardcell"><span className="zm-stardk">Temperature</span><span className="zm-stardv">{Math.round(ph.Teff).toLocaleString()} K</span></div>
                    <div className="zm-stardcell"><span className="zm-stardk">Radius</span><span className="zm-stardv">{ph.R.toFixed(1)} {"R\u2609"}</span></div>
                    <div className="zm-stardcell zm-scorecell"><span className="zm-stardk">Luminosity score</span><span className="zm-stardv">{fL(ph.L)} {"L\u2609"}</span></div>
                  </div>
                  <div className="zm-stardmethod">Size from interferometry and parallax: distance d = 1000 / {ph.plx.toFixed(2)} mas = {ph.d.toFixed(1)} pc; radius R = 0.1075 {"\u00D7"} {ph.theta.toFixed(2)} {"\u00D7"} {ph.d.toFixed(1)} = {ph.R.toFixed(1)} {"R\u2609"}. Luminosity score = R² (T / 5772){"\u2074"} = {fL(ph.L)} {"L\u2609"}.</div>
                </div>
              );
            })()}
            <div className="zm-twicap">Each numbered dot is the matching method above, placed by the sun's geometric depression. Tap a number to jump to that row. Daytime zmanim sit at the {twiLayout.morning ? "bottom, at sunrise" : "top, in full day"}.</div>

            {stars.length > 0 && (
              <div className="zm-stars">
                <div className="zm-starshead">Bright stars {MORNING.has(concept) ? "fading at dawn" : "appearing tonight"}, {loc.name}</div>
                {stars.map((s, k) => (
                  <div key={k} className="zm-starrow">
                    <span className="zm-starname">{s.name}</span>
                    <span className="zm-starmag">mag {s.mag.toFixed(1)}</span>
                    <span className="zm-stardep">{s.dep.toFixed(1)}{"\u00B0 "}{s.dep < 6 ? "civil" : s.dep < 12 ? "nautical" : s.dep < 18 ? "astro" : "night"}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="zm-twinote">These bands are the scientific backdrop, not the source of the halachic degrees. The shitot are independent reckonings plotted on top. Only alos 18\u00B0 lands on the astronomical-twilight edge, a numeric coincidence, not a shared definition; 16.1\u00B0, 11.5\u00B0, 8.5\u00B0 and the rest fall between the tiers, and 6\u00B0 and 12\u00B0 have no halachic counterpart.</div>

            <div className="zm-twinote">Star visibility model: a star of magnitude m clears the naked eye when the sun is roughly {STAR_A} + {STAR_B} times (m + extinction) degrees below the horizon, a regression from twilight-visibility observations. Atmospheric extinction (about {STAR_K} mag per airmass) raises the threshold for stars low on the horizon, which is why a bright star near the horizon can appear later than a fainter one overhead. Which stars are up, and their altitude, is computed from sidereal time for your exact date and place; the depression-to-brightness relation itself is location-independent. Assumes a clear, dark, sea-level sky and keen eyesight, so light pollution pushes real visibility later.</div>

            <div className="zm-twinote">Tap a star for its physical size and luminosity. Radius comes from its interferometric angular diameter combined with its parallax distance (R = 0.1075 times angular-diameter-in-mas times distance-in-parsecs), and the luminosity score from R squared times (temperature / 5772) to the fourth. Luminosity classes: V main-sequence dwarf, IV subgiant, III giant, II bright giant, I supergiant. Parallaxes are Hipparcos/Gaia; angular diameters are interferometric (CHARA and similar). Supergiant distances (Deneb, Betelgeuse) carry real uncertainty, so their derived radius and luminosity are first-order.</div>

            <div className="zm-twinote">Dark-sky count: a pristine pre-electric sky shows about 9,000 stars to the naked eye over the whole sky, roughly 2,500 above the horizon at once. The band labels give the share of that total visible at each stage; in bright twilight only a fraction of a percent is out, and the rest emerge by full night.</div>

            <div className="zm-twinote">Satellites, for fun: the ISS (about 420 km) stays sunlit until the sun is about {SAT_DEP(420).toFixed(0)}° down and Starlink (about 550 km) until about {SAT_DEP(550).toFixed(0)}°, so they are catchable from late civil through astronomical twilight, sun roughly 6 to 18° down, lit against a dark sky. Exact pass times need live orbital elements, so check Heavens-Above or NASA Spot the Station for tonight.</div>
          </aside>}
        </div>}

        {SOURCES[concept] && (
          <div className="zm-source">
            <div className="zm-sourcehead">In the words of the source</div>
            <blockquote className="zm-sourcehe" dir="rtl" lang="he">{SOURCES[concept].he}</blockquote>
            <div className="zm-sourceen">{SOURCES[concept].en}</div>
            <a className="zm-sourceref" href={href(SOURCES[concept].url)} target="_blank" rel="noreferrer">{SOURCES[concept].ref}</a>
            <div className="zm-sourcenote">{SOURCES[concept].note}</div>
            {SOURCES[concept].def && (
              <div className="zm-sourcedef">
                <div className="zm-sourcehead">How the sunrise/sunset itself is defined</div>
                <blockquote className="zm-sourcehe" dir="rtl" lang="he">{SOURCES[concept].def.he}</blockquote>
                <div className="zm-sourceen">{SOURCES[concept].def.en}</div>
                <a className="zm-sourceref" href={href(SOURCES[concept].def.url)} target="_blank" rel="noreferrer">{SOURCES[concept].def.ref}</a>
                <div className="zm-sourcenote">{SOURCES[concept].def.note}</div>
              </div>
            )}
          </div>
        )}

        <div className="zm-method">
          <button className="zm-methodtog" onClick={() => setMethodOpen(!methodOpen)}>
            <span>{methodOpen ? "\u2212" : "+"}</span> Method, variables and sources
            <span className="zm-methodhint">{methodOpen ? "" : "the equation language, the mil, and the degrees"}</span>
          </button>
          {methodOpen && (
            <div className="zm-methodbody">
              <div className="zm-methsec">
                <div className="zm-methhd">The variables</div>
                <dl className="zm-vars">
                  <dt>S</dt><dd>Shkiah (sunset): the sun's upper limb at the sea-level horizon, its center 0.833{"\u00B0"} below.</dd>
                  <dt>N</dt><dd>HaNetz (sunrise): the same moment on the morning side.</dd>
                  <dt>mil</dt><dd>A unit of walking. A person walks 40 mil in a day; dawn to sunrise is four to five mil.</dd>
                  <dt>M</dt><dd>The length of one mil in minutes. Disputed: 18 (Shulchan Arukh, l'chatchila; Shulchan Arukh HaRav), 22.5, or 24 (Magen Avraham, Pri Chadash, Chok Yaakov, Gra).</dd>
                  <dt>H</dt><dd>A sha'ah zmanit (proportional hour) = D / 12.</dd>
                  <dt>D</dt><dd>The day-span for proportional zmanim. Gra: N to S. Magen Avraham: alos to tzeis (A to T below).</dd>
                  <dt>A, T</dt><dd>The stretched dawn and nightfall that bound the MGA day (e.g. A = N{"\u2212"}72, T = S+72, or a degree pair).</dd>
                  <dt>{"\u03B8"}</dt><dd>The sun's depression below the horizon, in degrees. A degree zman fires when the sun reaches {"\u03B8"}.</dd>
                </dl>
              </div>

              <div className="zm-methsec">
                <div className="zm-methhd">Where the minutes come from</div>
                <p>The short tzeis and bein hashmashot are <b>three-quarters of a mil</b> after sunset. That fraction is the gemara (Rabbah) and is codified in Shulchan Arukh OC 261:2.</p>
                <blockquote className="zm-methhe" dir="rtl" lang="he">שִׁעוּר בֵּין הַשְּׁמָשׁוֹת... שְׁלֹשָׁה רִבְעֵי מִיל (שבת לד.)</blockquote>
                <p>A mil is a distance, so the fraction only becomes minutes once you fix how long a mil takes. That time is not measured from an amah. It comes from a second gemara, Pesachim 93b, which sets the day's travel:</p>
                <blockquote className="zm-methhe" dir="rtl" lang="he">כַּמָּה מַהֲלַךְ אָדָם בַּיּוֹם — עֲשָׂרָה פַּרְסָאוֹת: מֵעֲלוֹת הַשַּׁחַר וְעַד הָנֵץ הַחַמָּה חֲמֵשֶׁת מִילִין, מִשְּׁקִיעַת הַחַמָּה וְעַד צֵאת הַכּוֹכָבִים חֲמֵשֶׁת מִילִין (פסחים צג:)</blockquote>
                <p>Ten parsaos is forty mil. Read the forty as filling the roughly twelve-hour day and M = 720 / 40 = <b>18</b>. The sugya's own split, though, leaves thirty mil for the daytime (five at dawn, thirty by day, five at dusk), so 720 / 30 = <b>24</b>. A third reading gives 22.5. Hence M is disputed, and the dispute is laid out in Biur Halacha OC 459:2, which calls the long mil a third of an hour plus a fifteenth:</p>
                <blockquote className="zm-methhe" dir="rtl" lang="he">שִׁעוּר מִיל הוּא שְׁלִישׁ שָׁעָה וְחֵלֶק ט"ו מִן הַשָּׁעָה... וּלְכַתְּחִלָּה... מִשֶּׁשָּׁהָה י"ח מִינוּטִין הָוֵי חָמֵץ (ביאור הלכה תנט:ב)</blockquote>
                <p>So tzeis = S + {"\u00BE"}M gives 13.5 (M=18), about 16.9 (M=22.5) or 18 (M=24); Rabbeinu Tam's four-mil nightfall S + 4M gives 72 (M=18) or 90 (M=22.5). Every fixed-minute row above is one of these, except the purely observational spans (42 and 50 minutes), which are set by sight, not by a mil.</p>
              </div>

              <div className="zm-methsec">
                <div className="zm-methhd">How the degrees fit in</div>
                <p>A degree row is not a duration. It fires when the sun's true depression {"\u03B8"} reaches a set angle, which the engine computes exactly for the date and place. The common {"\u03B8"} values were chosen so they reproduce a minute-shiur at the Yerushalayim equinox, for instance 16.1{"\u00B0"} matches 72 minutes and 3.7{"\u00B0"} matches 13.5 there. Away from that latitude and date they part ways: the angle stays fixed to the real sky while the fixed minutes do not, which is the whole reason the two columns disagree in summer and at high latitude. So the {"\u03B8"} = X{"\u00B0"} equation is the primary statement for those rows, and the minute equivalence next to it is only the calibration it was born from.</p>
              </div>

              <div className="zm-methnote">The two gemaras and the Biur Halacha above are quoted verbatim from Sefaria. The 18 / 22.5 / 24 split and its attributions are from Biur Halacha 459:2. The degree-to-minute equivalences are approximate calibrations, not exact identities.</div>
            </div>
          )}
        </div>
      </div>

      <footer className="zm-foot">
        <span>{loc.name} · {loc.lat}, {loc.lon}</span>
        <span>
          Engine ported from <a href="https://github.com/KosherJava/zmanim" target="_blank" rel="noreferrer">KosherJava</a> (LGPL), NOAA / Meeus.
          Degree figures follow Yisrael Vehazmanim. Classical refs link to Sefaria; Igros Moshe and the Tukachinsky luach are cited by sefer.
          For practical halacha follow your rav and local luach.
        </span>
      </footer>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@400;500;700;900&family=Inter:wght@400;500;600;700&display=swap');
.zm-root{--night:#0B1A2E;--panel:#11243B;--parch:#F3ECDD;--muted:#8FA2BC;--gold:#E9B949;--line:rgba(243,236,221,.12);
  background:var(--night);color:var(--parch);font-family:'Inter',system-ui,sans-serif;min-height:100vh;
  padding:28px clamp(16px,4vw,48px) 0;box-sizing:border-box;-webkit-font-smoothing:antialiased;}
.zm-root *{box-sizing:border-box;}
.zm-head{max-width:1080px;margin:0 auto 22px;display:flex;flex-wrap:wrap;gap:24px;justify-content:space-between;align-items:flex-end;}
.zm-eyebrow{font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:8px;}
.zm-title{font-family:'Frank Ruhl Libre',serif;font-weight:900;font-size:clamp(30px,4.5vw,46px);line-height:1;margin:0 0 10px;letter-spacing:-.01em;}
.zm-sub{margin:0;color:var(--muted);font-size:14.5px;line-height:1.55;max-width:56ch;}
.zm-controls{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-end;}
.zm-field{display:flex;flex-direction:column;gap:6px;}
.zm-field span{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);}
.zm-field select,.zm-field input{background:rgba(243,236,221,.06);color:var(--parch);border:1px solid var(--line);border-radius:8px;padding:9px 12px;font-size:14px;font-family:inherit;min-width:148px;}
.zm-geo{background:transparent;color:var(--gold);border:1px solid rgba(233,185,73,.4);border-radius:8px;padding:9px 14px;font-size:13px;font-family:inherit;cursor:pointer;height:fit-content;}
.zm-geo:hover{background:rgba(233,185,73,.1);}
.zm-conceptbar{max-width:1080px;margin:0 auto 16px;display:flex;flex-wrap:wrap;gap:8px;}
.zm-ctab{background:rgba(243,236,221,.04);border:1px solid var(--line);color:var(--parch);border-radius:9px;padding:8px 15px;font-size:14px;font-family:inherit;cursor:pointer;transition:all .15s;}
.zm-ctab:hover{border-color:rgba(233,185,73,.4);}
.zm-ctab.is-on{background:var(--gold);border-color:var(--gold);color:var(--night);font-weight:600;}
.zm-panel{max-width:1080px;margin:0 auto;background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:22px clamp(16px,3vw,28px);}
.zm-panelhead{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap;margin-bottom:16px;}
.zm-conname{font-family:'Frank Ruhl Libre',serif;font-weight:700;font-size:26px;margin:0;line-height:1.1;}
.zm-consub{color:var(--muted);font-size:13.5px;margin-top:3px;}
.zm-basis{font-size:12.5px;color:var(--muted);margin-top:7px;}
.zm-filterrow{display:flex;gap:7px;flex-wrap:wrap;}
.zm-fchip{background:transparent;border:1px solid var(--line);color:var(--parch);border-radius:18px;padding:6px 13px;font-size:12.5px;font-family:inherit;cursor:pointer;transition:all .15s;}
.zm-fchip.is-on{background:var(--parch);color:var(--night);border-color:var(--parch);font-weight:600;}
.zm-summary{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;padding:14px 16px;background:rgba(233,185,73,.07);border:1px solid rgba(233,185,73,.25);border-radius:12px;margin-bottom:16px;}
.zm-spannum{font-family:'Frank Ruhl Libre',serif;font-size:34px;font-weight:900;color:var(--gold);line-height:1;}
.zm-spanunit{font-size:14px;color:var(--parch);}
.zm-spancap{font-size:12.5px;color:var(--muted);flex:1 1 100%;}
.zm-rail{position:relative;height:46px;margin:6px 4px 20px;border-bottom:1px solid var(--line);}
.zm-railtick{position:absolute;top:6px;width:3px;height:22px;border-radius:2px;transform:translateX(-50%);opacity:.92;}
.zm-railends{position:absolute;bottom:4px;left:0;right:0;display:flex;justify-content:space-between;font-size:11px;color:var(--muted);font-variant-numeric:tabular-nums;}
.zm-note{font-size:12.5px;color:var(--muted);font-style:italic;margin:-6px 0 14px;}
.zm-list{display:flex;flex-direction:column;gap:7px;}
.zm-taphint{font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--gold);opacity:.75;margin:0 2px 9px;}
.zm-row{background:rgba(243,236,221,.04);border:1px solid var(--line);border-radius:10px;overflow:hidden;}
.zm-row.is-open{border-color:rgba(233,185,73,.4);background:rgba(243,236,221,.06);}
.zm-rowtop{display:flex;align-items:center;gap:14px;padding:11px 14px;cursor:pointer;}
.zm-rownum{flex:none;width:22px;height:22px;border-radius:50%;background:rgba(243,236,221,.08);border:1px solid var(--line);color:var(--muted);font-size:11.5px;font-weight:600;display:flex;align-items:center;justify-content:center;font-variant-numeric:tabular-nums;}
.zm-row.is-open .zm-rownum{background:var(--gold);color:#1a1206;border-color:var(--gold);}
.zm-twistars{font-size:9.5px;opacity:.72;line-height:1.2;margin-top:2px;}
.zm-twinum{flex:none;font-size:11px;font-weight:700;background:rgba(8,12,22,.78);border:1.5px solid;border-radius:11px;min-width:22px;height:20px;padding:0 5px;display:flex;align-items:center;justify-content:center;font-variant-numeric:tabular-nums;}
.zm-stars{margin-top:12px;}
.zm-starshead{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--gold);opacity:.85;margin-bottom:7px;}
.zm-starrow{display:flex;align-items:baseline;gap:8px;padding:3px 0;border-bottom:1px solid rgba(243,236,221,.06);font-size:12px;}
.zm-starname{flex:1;min-width:0;font-weight:600;color:var(--parch);}
.zm-starmag{flex:none;color:var(--muted);font-variant-numeric:tabular-nums;}
.zm-stardep{flex:none;color:var(--horizon,#6FA8A0);font-variant-numeric:tabular-nums;min-width:78px;text-align:right;}
.zm-rowtop:hover{background:rgba(243,236,221,.05);}
.zm-rowtime{font-variant-numeric:tabular-nums;font-weight:600;font-size:15px;min-width:84px;color:var(--gold);}
.zm-rowlabel{flex:1;min-width:0;font-size:14.5px;}
.zm-rowchev{flex:none;font-size:18px;color:var(--muted);width:18px;text-align:center;line-height:1;}
.zm-rowdetail{padding:0 14px 13px 98px;animation:zmfade .15s ease;}
.zm-roweq{display:inline-flex;align-items:center;gap:8px;font-family:'SFMono-Regular',ui-monospace,Menlo,Consolas,monospace;font-size:13px;font-weight:600;color:var(--gold);background:rgba(233,185,73,.08);border:1px solid rgba(233,185,73,.32);border-radius:7px;padding:5px 10px;margin:0 0 9px;overflow-wrap:anywhere;}
.zm-roweqlab{font-family:'Inter',sans-serif;font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--night);background:var(--gold);border-radius:3px;padding:1px 5px;}
.zm-derivtext{font-size:13.5px;line-height:1.55;color:#E4E9F1;overflow-wrap:anywhere;}
.zm-derivhe{font-family:'Frank Ruhl Libre',serif;font-size:17px;line-height:1.7;margin:8px 0 6px;text-align:right;color:var(--parch);}
.zm-derivsrc{font-size:12px;margin-top:4px;}
@keyframes zmfade{from{opacity:0;transform:translateY(-3px);}to{opacity:1;transform:none;}}
.zm-src{color:var(--muted);font-size:12px;margin-top:2px;text-decoration:none;border-bottom:1px dotted rgba(143,162,188,.5);width:fit-content;transition:color .15s,border-color .15s;}
.zm-src:hover{color:var(--gold);border-bottom-color:var(--gold);}
.zm-srcplain{color:var(--muted);font-size:12px;margin-top:2px;}
.zm-tag{font-size:11px;letter-spacing:.04em;text-transform:uppercase;font-weight:600;border:1px solid;border-radius:6px;padding:3px 9px;flex:none;}
.zm-empty{color:var(--muted);font-size:14px;padding:18px 0;}
.zm-foot{max-width:1080px;margin:26px auto 0;padding:16px 0 30px;border-top:1px solid var(--line);display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;font-size:11.5px;color:var(--muted);}
.zm-foot a{color:var(--gold);text-decoration:none;}
.zm-foot a:hover{text-decoration:underline;}
.zm-body{display:flex;gap:24px;align-items:flex-start;}
.zm-left{flex:1;min-width:0;overflow:hidden;}
.zm-twilight{flex:none;width:320px;position:sticky;top:20px;border-left:1px solid var(--line);padding-left:24px;}
.zm-twihead{font-family:'Frank Ruhl Libre',serif;font-weight:700;font-size:19px;margin:0 0 2px;}
.zm-twisub{font-size:11.5px;color:var(--muted);margin-bottom:10px;line-height:1.4;}
.zm-rulercap{font-size:10px;letter-spacing:.05em;text-transform:uppercase;color:var(--gold);opacity:.8;margin-bottom:6px;}
.zm-twichart{display:flex;align-items:flex-start;}
.zm-minaxis{position:relative;flex:none;width:42px;}
.zm-twichart .zm-twiband{flex:1;min-width:0;}
.zm-mintick{position:absolute;right:0;width:6px;height:0;border-top:1px solid rgba(243,236,221,.22);}
.zm-mintick.is-major{width:12px;border-top-color:rgba(233,185,73,.6);}
.zm-minlabel{position:absolute;right:15px;top:0;transform:translateY(-50%);font-size:9.5px;color:var(--muted);font-variant-numeric:tabular-nums;}
.zm-twiband{position:relative;border-radius:12px;overflow:hidden;border:1px solid var(--line);}
.zm-twizone{position:absolute;left:0;right:0;display:flex;flex-direction:column;justify-content:flex-start;padding:6px 10px 0 42px;}
.zm-twiname{font-size:11.5px;font-weight:600;line-height:1.15;}
.zm-twirange{font-size:10px;opacity:.7;font-weight:400;font-variant-numeric:tabular-nums;margin-left:4px;}
.zm-twitick{position:absolute;left:3px;right:auto;transform:translateY(-50%);display:flex;align-items:center;cursor:pointer;background:none;border:none;padding:0;}
.zm-twitick:hover .zm-twinum{box-shadow:0 0 0 2px var(--gold);}
.zm-twidot{display:none;}
.zm-twiline{display:none;}
.zm-starline{position:absolute;left:40%;right:7px;transform:translateY(-50%);display:flex;align-items:center;gap:6px;white-space:nowrap;background:none;border:none;padding:2px 0;cursor:pointer;}
.zm-starline.is-sel .zm-starline-name{color:var(--gold);}
.zm-starline:hover .zm-starline-name{text-decoration:underline;}
.zm-twipct{font-size:9px;opacity:.7;line-height:1.1;margin-top:2px;}
.zm-stardetail{margin-top:12px;background:rgba(8,12,22,.5);border:1px solid rgba(233,185,73,.3);border-radius:12px;padding:13px 15px;}
.zm-stardhead{display:flex;align-items:center;justify-content:space-between;}
.zm-stardname{font-family:'Frank Ruhl Libre',serif;font-size:19px;font-weight:700;color:var(--parch);}
.zm-stardclose{background:none;border:none;color:var(--muted);font-size:20px;line-height:1;cursor:pointer;padding:0 4px;}
.zm-stardclass{font-size:12px;color:var(--gold);margin:1px 0 10px;}
.zm-stardgrid{display:grid;grid-template-columns:1fr 1fr;gap:8px 14px;}
.zm-stardcell{display:flex;flex-direction:column;}
.zm-stardk{font-size:9.5px;letter-spacing:.05em;text-transform:uppercase;color:var(--muted);}
.zm-stardv{font-size:14px;font-weight:600;color:var(--parch);font-variant-numeric:tabular-nums;}
.zm-scorecell{grid-column:1/-1;border-top:1px solid var(--line);padding-top:7px;margin-top:2px;}
.zm-scorecell .zm-stardv{color:var(--gold);font-size:16px;}
.zm-stardmethod{font-size:10.5px;color:var(--muted);line-height:1.5;margin-top:10px;}
.zm-starline-name{font-size:11.5px;font-weight:600;color:#F3ECDD;overflow:hidden;text-overflow:ellipsis;text-shadow:0 1px 3px rgba(0,0,0,.8);}
.zm-starline-mag{font-size:9.5px;color:rgba(243,236,221,.55);font-variant-numeric:tabular-nums;}
.zm-starline-dep{margin-left:auto;font-size:9.5px;color:rgba(251,243,216,.6);font-variant-numeric:tabular-nums;}
.zm-starglyph{flex:none;color:#FBF3D8;line-height:1;text-shadow:0 0 5px rgba(251,243,216,.7);}
.zm-twicap{font-size:11px;color:var(--muted);margin-top:9px;line-height:1.45;}
.zm-twinote{font-size:11px;color:var(--muted);margin-top:8px;line-height:1.5;padding-top:8px;border-top:1px solid var(--line);}
.zm-moonbtn{color:var(--parch);border-color:var(--line);}
.zm-moonbtn:hover{background:rgba(243,236,221,.08);}
.zm-mooncard{max-width:1080px;margin:0 auto 16px;background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:18px 20px;}
.zm-moongrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:16px;}
.zm-moonitem{display:flex;flex-direction:column;}
.zm-moonlabel{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:5px;}
.zm-moonval{font-family:'Frank Ruhl Libre',serif;font-size:22px;font-weight:700;line-height:1.2;}
.zm-moonval2{font-family:'Frank Ruhl Libre',serif;font-size:17px;font-weight:500;margin-top:2px;color:#D8E0EC;}
.zm-moontz{font-family:'Inter';font-size:11px;font-weight:500;color:var(--muted);margin-left:5px;letter-spacing:.02em;}
.zm-moondir{font-size:12px;color:var(--muted);margin-top:3px;}
.zm-moonmolad{grid-column:1/-1;border-top:1px solid var(--line);padding-top:12px;margin-top:2px;}
.zm-mooncap{font-size:11px;color:var(--muted);margin-top:12px;line-height:1.45;}
.zm-dir{background:rgba(233,185,73,.07);border:1px solid rgba(233,185,73,.22);border-radius:10px;padding:11px 14px;margin-bottom:14px;font-size:13.5px;line-height:1.5;}
.zm-dirstrong{color:var(--gold);font-weight:600;}
.zm-dirnote{color:var(--muted);}
.zm-source{margin-top:22px;padding-top:18px;border-top:1px solid var(--line);}
.zm-sourcehead{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);margin-bottom:10px;}
.zm-sourcehe{font-family:'Frank Ruhl Libre',serif;font-size:21px;line-height:1.7;margin:0 0 8px;text-align:right;color:var(--parch);}
.zm-sourceen{font-size:14.5px;font-style:italic;color:#D8E0EC;line-height:1.5;margin-bottom:6px;}
.zm-sourceref{display:inline-block;font-size:12.5px;color:var(--gold);text-decoration:none;border-bottom:1px dotted rgba(233,185,73,.5);margin-bottom:10px;}
.zm-sourceref:hover{border-bottom-style:solid;}
.zm-sourcenote{font-size:13px;color:var(--muted);line-height:1.55;}
.zm-sourcedef{margin-top:16px;padding:14px 16px;background:rgba(111,168,160,.06);border:1px solid rgba(111,168,160,.22);border-radius:10px;}
.zm-sourcedef .zm-sourcehead{color:var(--horizon,#6FA8A0);}
.zm-method{margin-top:18px;border-top:1px solid var(--line);padding-top:16px;}
.zm-methodtog{display:flex;align-items:center;gap:9px;width:100%;text-align:left;background:rgba(233,185,73,.06);border:1px solid rgba(233,185,73,.26);border-radius:10px;padding:11px 14px;color:var(--gold);font-family:'Inter',sans-serif;font-size:13.5px;font-weight:600;cursor:pointer;}
.zm-methodtog:hover{background:rgba(233,185,73,.1);}
.zm-methodhint{margin-left:auto;font-weight:400;font-size:11.5px;color:var(--muted);font-style:italic;}
.zm-methodbody{padding:16px 4px 4px;animation:zmfade .18s ease;}
.zm-methsec{margin-bottom:18px;}
.zm-methhd{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);margin-bottom:9px;}
.zm-methodbody p{font-size:13.5px;line-height:1.62;color:#E4E9F1;margin:0 0 9px;overflow-wrap:anywhere;}
.zm-methodbody b{color:var(--parch);}
.zm-vars{display:grid;grid-template-columns:auto 1fr;gap:5px 14px;margin:0;}
.zm-vars dt{font-family:'SFMono-Regular',ui-monospace,Menlo,Consolas,monospace;font-weight:700;color:var(--gold);font-size:13.5px;text-align:right;}
.zm-vars dd{margin:0;font-size:13px;line-height:1.5;color:#E4E9F1;}
.zm-methhe{font-family:'Frank Ruhl Libre',serif;font-size:18px;line-height:1.75;margin:6px 0 10px;text-align:right;color:var(--parch);border-right:2px solid rgba(233,185,73,.4);padding-right:12px;}
.zm-methnote{font-size:12px;color:var(--muted);font-style:italic;line-height:1.55;border-top:1px solid var(--line);padding-top:12px;}
.zm-dialwrap{margin:10px 0 6px;}
.zm-dialsvg{width:100%;height:auto;overflow:visible;}
.zm-dialhrnum{fill:var(--muted);font-size:9px;font-family:'Inter',sans-serif;}
.zm-dialbadge{fill:var(--parch);font-size:9px;font-weight:700;font-family:'Inter',sans-serif;}
.zm-sheetnum{display:inline-flex;align-items:center;justify-content:center;width:14px;height:14px;border:1px solid;border-radius:50%;font-size:9px;font-weight:700;margin-right:5px;vertical-align:middle;}
.zm-diallbl{fill:var(--parch);font-size:10.5px;font-family:'Inter',sans-serif;font-weight:600;}
.zm-diallbl.is-focus{fill:var(--gold);}
.zm-dialtime{fill:var(--muted);font-size:9px;font-family:'Inter',sans-serif;}
.zm-dialanchor{fill:var(--muted);font-size:10px;font-family:'Frank Ruhl Libre',serif;}
.zm-sheethead{margin-top:14px;font-family:'Frank Ruhl Libre',serif;font-size:15px;color:var(--parch);}
.zm-sheetsub{font-size:12px;color:var(--muted);line-height:1.5;margin:2px 0 10px;}
.zm-sheet{display:flex;flex-direction:column;gap:9px;}
.zm-sheetrow{display:grid;grid-template-columns:84px 1fr 54px;align-items:center;gap:8px;}
.zm-sheetname{font-size:11px;color:var(--parch);font-family:'Inter',sans-serif;text-align:right;line-height:1.2;}
.zm-sheetbar{position:relative;height:16px;background:rgba(243,236,221,.05);border-radius:3px;}
.zm-sheetspan{position:absolute;top:5px;height:6px;background:rgba(233,185,73,.28);border-radius:3px;}
.zm-sheettick{position:absolute;top:1px;width:3px;height:14px;border-radius:1px;transform:translateX(-1.5px);opacity:.85;}
.zm-sheettick.is-focus{top:-2px;height:20px;width:4px;box-shadow:0 0 0 1px #0B1A2E;}
.zm-sheettime{font-size:11px;color:var(--gold);font-family:'Inter',sans-serif;text-align:left;}
.zm-minis{display:grid;grid-template-columns:1fr 1fr;gap:12px 10px;margin:10px 0 8px;}
.zm-mini{text-align:center;}
.zm-minisvg{width:100%;height:auto;overflow:visible;}
.zm-mininame{font-size:11px;color:var(--parch);font-family:'Inter',sans-serif;margin-top:1px;}
.zm-minitime{font-size:14px;color:var(--gold);font-family:'Inter',sans-serif;font-weight:700;line-height:1.15;}
.zm-miniends{font-size:9.5px;color:var(--muted);font-family:'Inter',sans-serif;}
.zm-maindial{width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;padding:8px 0 6px;}
.zm-optabs{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;}
.zm-opt{background:rgba(243,236,221,.04);border:1px solid var(--line);color:var(--parch);border-radius:8px;padding:6px 13px;font-size:13px;font-family:inherit;cursor:pointer;transition:all .15s;}
.zm-opt:hover{border-color:rgba(233,185,73,.4);}
.zm-opt.is-on{background:var(--gold);color:#0B1A2E;border-color:var(--gold);font-weight:600;}
.zm-maindialsub{font-size:13px;color:var(--muted);font-family:'Inter',sans-serif;}
.zm-maindialsvg{width:100%;max-width:600px;height:auto;overflow:visible;}
.zm-mdlbl{fill:var(--parch);font-size:12px;font-family:'Inter',sans-serif;font-weight:600;}
.zm-mdtime{fill:var(--gold);font-size:11px;font-family:'Inter',sans-serif;}
@media (max-width:860px){.zm-body{flex-direction:column;}.zm-twilight{width:100%;position:static;border-left:none;padding-left:0;border-top:1px solid var(--line);padding-top:18px;margin-top:6px;}}
@media (max-width:760px){.zm-head{align-items:flex-start;}.zm-rowtime{min-width:72px;}.zm-rowdetail{padding-left:14px;}.zm-vars{grid-template-columns:auto 1fr;gap:4px 10px;}}
`;

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(ZmanimMethods));
