# Study notes for Numbers, keyed by Catane entry number. AI notes written for this guide, not sourced text.
N={
3127:dict(en="burning anger",mod="",sim=[],tv="From emprendre, to kindle. The same word as at Shemos 20:5. The digital text of Catane numbers this entry 3127, which belongs to an Exodus entry; by its place in the list it should be 3217."),
3206:dict(en="at his ease, in his own space",mod="à son aise",sim=[("ease","English"),("at ease","English")],tv="English ease is this same Old French word, aise: room at one's side, elbow room."),
3207:dict(en="lamps",mod="",sim=[("lucid","English, same root")],tv="The same word as at Shemos 30:7."),
3208:dict(en="a shovel, a rake",mod="",sim=[],tv="The same word as at Shemos 27:3. Not traced."),
3209:dict(en="saying",mod="disant",sim=[("diction","English"),("dictate","English")],tv="Rashi uses the French form to show the grammar of the Hebrew word: an ongoing saying."),
3210:dict(en="beaten work",mod="battu",sim=[("batter","English")],tv="The same word as at Shemos 25:18."),
3211:dict(en="cucumbers",mod="concombres",sim=[("cucumber","English")],tv="Latin cucumis. English cucumber is the Old French word."),
3212:dict(en="watermelons",mod="pastèque",sim=[],tv="Catane reads bodekes. Modern French pastèque comes from Arabic battikh, the same word as the Hebrew avatiach. Not traced further."),
3213:dict(en="leeks",mod="poireaux",sim=[("porridge","English, perhaps")],tv="Latin porrum, a leek, with a diminutive ending: porel, later poireau."),
3214:dict(en="coriander",mod="coriandre",sim=[("coriander","English")],tv="The same word as at Shemos 16:31."),
3215:dict(en="crystal",mod="cristal",sim=[("crystal","English")],tv=""),
3216:dict(en="to amuse oneself, to stroll at leisure",mod="",sim=[],tv="Old French esbanoier, to take one's pleasure. Not kept in modern French. Catane is unsure of the exact form."),
3218:dict(en="talk, gossip",mod="parler",sim=[("parley","English"),("parlor","English")],tv="The same word as at Bereishis 37:2."),
3219:dict(en="bold, headstrong",mod="",sim=[("eager","English, a cousin")],tv="Old French engrès, fierce or pressing. English eager comes from a related Old French word, aigre, sharp."),
3220:dict(en="a round cake",mod="tourteau; tourte",sim=[("tart","English, perhaps"),("tortilla","English, a Spanish cousin"),("torte","English")],tv="Late Latin torta, a round loaf, with a diminutive ending."),
3221:dict(en="doing",mod="faisant",sim=[("feasible","English"),("fashion","English")],tv="Rashi uses French forms to show the grammar of the Hebrew: an ongoing doing."),
3222:dict(en="going",mod="allant",sim=[("alley","English")],tv="Given together with the word just above, for the same point of grammar. An alley is a going-way, from aller."),
3223:dict(en="thin",mod="ténu",sim=[("tenuous","English")],tv="The same word as at Bereishis 41:3."),
3224:dict(en="they thinned out, beat thin",mod="atténuer",sim=[("attenuate","English")],tv="A verb built on tenve, thin."),
3225:dict(en="a noise of murmuring",mod="murmure",sim=[("murmur","English")],tv="Murmur with the collective ending -diz: a mass of murmurs."),
3226:dict(en="they were sick of it",mod="",sim=[],tv="The verb encreistre in its sense of wearying, the sense Catane points to at Bereishis 25:21. Lor is modern leur, to them."),
3227:dict(en="is weary of, loathes",mod="",sim=[],tv="The same verb as in the comment on verse 4."),
3228:dict(en="a pole",mod="perche",sim=[("perch","English")],tv="Latin pertica, a pole. A bird's perch and the old land measure are both this word."),
3229:dict(en="you will curse him",mod="tu le maudiras",sim=[("malediction","English")],tv="Latin maledicere, to speak ill. The l before d later became u: maldire, maudire."),
3230:dict(en="springs, shoots forth",mod="détendre (to release)",sim=[("distend","English")],tv="To un-stretch a bow is to let the arrow fly."),
3231:dict(en="to pierce, to bore",mod="forer",sim=[("perforate","English")],tv="Catane reads forjier and glosses it to bore. Latin forare, to bore, is behind modern forer and English perforate."),
3232:dict(en="burning anger",mod="",sim=[],tv="The same word as at Shemos 20:5."),
3233:dict(en="islands",mod="îles",sim=[("isle","English"),("insular","English")],tv="Latin insula. French dropped the s and marked it with a circumflex. English island is a native word that borrowed its silent s from isle."),
3234:dict(en="a lean-to, a side gallery",mod="appentis",sim=[("penthouse","English"),("append","English")],tv="Something hung on to a building. English penthouse is this same word, apentis, reshaped as if it contained house."),
}

# Added 2026-10-06 after Mordy's review: more English and Yiddish relatives.
for _k,(_s,_t) in {3215: ([('krishtol (קרישטאָל)', 'Yiddish')], ''), 3220: ([('tort (טאָרט), a cake', 'Yiddish')], '')}.items():
    N[_k]['sim']=N[_k].get('sim',[])+_s
    if _t: N[_k]['tv']=(N[_k].get('tv','')+' '+_t).strip()
