# Maharil's Moon · לבנת המהרי"ל

**Seder:** Luach & Reference
**Tile:** [apps/maharils_moon.html](../apps/maharils_moon.html)
**Status:** Live (linked from index.html), added 2026-09-30

## What it covers
The sky over Mainz on the night of Hoshana Rabbah in every year of the Maharil's rabbinate (5148 to 5187, 1387 to 1426), plus 5787 for comparison, built around the incident quoted by the Sha'arei Teshuvah (OC 664:1) in the name of the Maharil: the community thought dawn had come, the moon was still shining, it grew dark again, and they waited almost an hour for the true alos; on Erev Rosh Chodesh Cheshvan they fasted, read Vayechal and said selichos.

Sections:
1. The night: moon and sun altitude from sunset to sunrise, twilight bands, alos (sun at 16 degrees below), the hour before alos marked.
2. Forty Hoshana Rabbahs: date of Hoshana Rabbah vs moonrise after sunset, sunset, moonrise, or moon height before alos; click a dot to select the year; full table.
3. The ellipse: the lunar orbit at true shape or stretched x5, the moon's path through Tishrei, distance on the pre-dawn of Hoshana Rabbah.
3b. Why it rises when it does: for the selected year, each night of Sukkos (15 to 22 Tishrei) the moonrise delay vs the 49-minute average, split into the north-south swing and the speed along the ellipse (residual under half a minute), with the moon's declination and direction; plus the 18.6-year cycle of the moon's maximum declination across 1387 to 1426.
4. Brightness: phase, distance and altitude factors; moonlight compared with twilight levels.
5. The cloud layer: optical depth slider, time of night slider, moon height slider (actual or by hand) with a strip showing which years had the moon at that height; rendered sky from east to SSW; slant path through the cloud; moonlight vs real twilight through the night.
6. For teaching: the page's times are clock times for modern readers; the community reckoned in sha'os zmaniyos, readable by day from the sun, while at night the hour had to be judged by other, less exact means.

## Sources
Sha'arei Teshuvah on Shulchan Aruch OC 664:1 (Maginei Eretz, Lemberg 1893), quoted verbatim.

## Method
- Positions: PyEphem for Mainz 49.99 N 8.27 E. Hebrew dates from the fixed calendar (hdate). Dates shown proleptic Gregorian; the Julian date in use then ran 8 to 9 days behind.
- Clock toggle: Mainz local mean solar time (UTC + 33 min) or UTC.
- Moon brightness: Krisciunas and Schaefer (1991) phase law, inverse square for distance, 0.2 mag per airmass extinction.
- Cloud: direct beam e^(-tau/mu); two-stream conservative reflectance R = [(1-g)tau + (2/3 - mu)(1 - e^(-tau/mu))] / [4/3 + (1-g)tau], g = 0.85. Rendering is a sketch of the physics, not a photograph.
- Twilight illuminance: typical published clear-sky values, approximate.

## Notes
- The year of the incident is not given in the sources. Erev Rosh Chodesh Cheshvan (29 Tishrei) was not Shabbos, which leaves 27 of the 40 years.
- The darkening (החשיך) is not moonset: on every one of these mornings the moon set late morning or early afternoon.
- Physical readings on the page (cloud mechanism, moon as a time cue) are interpretation, not sourced.
- Open: Sefer Maharil's own wording not yet checked (not on Sefaria).
