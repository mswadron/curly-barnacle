/* ============================================================================
   Tolaim — life-stage sizes (real, in mm) + glossary of technical terms.
   window.TOLAIM_STAGES[id] = { note, stages:[{label, mm, shape, notScale?}] }
   shape names map to the SVG library in tolaim.js.
   Sizes are the largest real dimension of that stage (length or wingspan).
   ========================================================================== */
window.TOLAIM_STAGES = {
  copepods:      { note:"Adults are ~1–2 mm — just visible as a moving speck.", stages:[
    {label:"Egg", mm:0.1, shape:"egg"}, {label:"Nauplius larva", mm:0.25, shape:"nauplius"}, {label:"Adult", mm:1.5, shape:"copepod"} ]},
  mosquito:      { note:"The larva (‘wriggler’) is the big, visible stage at ~8 mm.", stages:[
    {label:"Egg raft", mm:0.7, shape:"egg"}, {label:"Larva (wriggler)", mm:8, shape:"wriggler"}, {label:"Pupa", mm:4, shape:"pupa"}, {label:"Adult", mm:5, shape:"fly"} ]},
  blackfly:      { note:"Larvae anchor in current at ~7 mm.", stages:[
    {label:"Larva", mm:7, shape:"maggot"}, {label:"Pupa", mm:3, shape:"pupa"}, {label:"Adult", mm:3, shape:"fly"} ]},
  anisakis:      { note:"The stage found in fish is the L3 larva, ~2 cm, coiled.", stages:[
    {label:"Egg", mm:0.05, shape:"egg"}, {label:"L3 larva (in fish)", mm:22, shape:"nematode"}, {label:"Adult (in whale)", mm:60, shape:"nematode"} ]},
  tapeworm:      { note:"The plerocercoid in fish is ~1–3 cm; the adult in a person reaches many metres.", stages:[
    {label:"Egg", mm:0.06, shape:"egg"}, {label:"Plerocercoid (in fish)", mm:20, shape:"nematode"}, {label:"Adult (in human)", mm:10000, shape:"nematode", notScale:true} ]},
  myxo:          { note:"Entirely microscopic — spores ~0.01 mm; muscle cysts a millimetre or two.", stages:[
    {label:"Spore", mm:0.012, shape:"spore"}, {label:"Muscle cyst (plasmodium)", mm:2, shape:"cyst"} ]},
  aphids:        { note:"Soft-bodied, ~2–3 mm, on the leaf surface.", stages:[
    {label:"Nymph", mm:1, shape:"aphid"}, {label:"Adult", mm:2.5, shape:"aphid"} ]},
  leafminer:     { note:"The mining larva is ~3 mm inside the leaf.", stages:[
    {label:"Egg", mm:0.25, shape:"egg"}, {label:"Larva (in leaf)", mm:3, shape:"maggot"}, {label:"Pupa", mm:1.8, shape:"pupa"}, {label:"Adult fly", mm:2, shape:"fly"} ]},
  "legume-weevil":{ note:"The grub develops inside a single seed, ~3–4 mm.", stages:[
    {label:"Egg", mm:0.5, shape:"egg"}, {label:"Larva (in seed)", mm:3.5, shape:"grub"}, {label:"Adult beetle", mm:3.5, shape:"beetle"} ]},
  swd:           { note:"Larva ~3.5 mm inside intact ripening fruit.", stages:[
    {label:"Egg", mm:0.6, shape:"egg"}, {label:"Larva", mm:3.5, shape:"maggot"}, {label:"Pupa", mm:3, shape:"pupa"}, {label:"Adult", mm:3, shape:"fly"} ]},
  vinegarfly:    { note:"Larva ~4 mm in overripe/fallen fruit.", stages:[
    {label:"Egg", mm:0.5, shape:"egg"}, {label:"Larva", mm:4, shape:"maggot"}, {label:"Pupa", mm:3, shape:"pupa"}, {label:"Adult", mm:2.5, shape:"fly"} ]},
  codling:       { note:"The caterpillar (the ‘worm in the apple’) is ~12–15 mm.", stages:[
    {label:"Egg", mm:1, shape:"egg"}, {label:"Larva (caterpillar)", mm:14, shape:"caterpillar"}, {label:"Pupa", mm:10, shape:"pupa"}, {label:"Adult moth", mm:17, shape:"moth"} ]},
  driedfig:      { note:"Stored-fruit moth larva ~12 mm.", stages:[
    {label:"Larva", mm:12, shape:"caterpillar"}, {label:"Adult moth", mm:20, shape:"moth"} ]},
  warble:        { note:"The mature grub under the hide reaches ~28 mm.", stages:[
    {label:"Egg (on hair)", mm:1, shape:"egg"}, {label:"L1 larva", mm:3, shape:"maggot"}, {label:"Mature grub", mm:28, shape:"grub"}, {label:"Adult fly", mm:14, shape:"fly"} ]},
  fasciola:      { note:"The adult liver fluke is a ~2–3 cm leaf-shaped worm.", stages:[
    {label:"Egg", mm:0.15, shape:"egg"}, {label:"Metacercaria (on plants)", mm:0.2, shape:"cyst"}, {label:"Adult fluke (in liver)", mm:30, shape:"fluke"} ]},
  cysticercus:   { note:"The bladder-worm cyst in muscle is ~5–10 mm; the adult tapeworm reaches metres.", stages:[
    {label:"Egg", mm:0.04, shape:"egg"}, {label:"Cysticercus (in muscle)", mm:10, shape:"cyst"}, {label:"Adult tapeworm", mm:10000, shape:"nematode", notScale:true} ]},
  vinegareels:   { note:"Adults are ~2 mm nematodes swimming in the liquid.", stages:[
    {label:"Juvenile", mm:0.4, shape:"nematode"}, {label:"Adult", mm:2, shape:"nematode"} ]},
  juiceflies:    { note:"Larva ~3.5 mm, carried into the juice from the fruit.", stages:[
    {label:"Egg", mm:0.5, shape:"egg"}, {label:"Larva", mm:3.5, shape:"maggot"}, {label:"Adult", mm:2.5, shape:"fly"} ]}
};

window.TOLAIM_GLOSSARY = {
  "encyst":"To become enclosed in a protective capsule (a cyst) — the parasite rounds up and forms a wall around itself, often to survive in host tissue.",
  "cyst":"A closed sac or capsule the parasite forms (or is enclosed in) within host tissue.",
  "viscera":"The internal organs of the body cavity — gut, liver, and so on. In a fish, the guts one removes when cleaning it.",
  "gut wall":"The wall of the intestine; many larvae bore through it to reach the body cavity or organs.",
  "larva":"An immature, worm-like feeding stage that hatches from the egg, before it becomes an adult (plural: larvae).",
  "larvae":"The plural of larva — immature feeding stages before the adult form.",
  "pupa":"The still, non-feeding stage in which a larva reorganises into the adult (as a caterpillar does in a cocoon).",
  "ovipositor":"The egg-laying organ at the tip of a female insect’s abdomen; in the spotted-wing fly it is serrated, letting her saw into intact fruit.",
  "nematode":"A roundworm — a slender, unsegmented worm, tapered at both ends. Anisakis and vinegar eels are nematodes.",
  "copepod":"A tiny (~1 mm) crustacean of ponds and reservoirs; the first host of several fish parasites.",
  "crustacean":"An arthropod group that includes copepods, crabs and shrimp — jointed-legged animals with a hard shell.",
  "metacercaria":"The infective cyst stage of a fluke that waits on wet vegetation until a grazing animal swallows it (plural: metacercariae).",
  "metacercariae":"Plural of metacercaria — the fluke’s infective cysts on vegetation.",
  "plerocercoid":"The larval stage of a fish tapeworm found in the fish’s flesh, infective to whoever eats it.",
  "oncosphere":"The tiny hooked embryo that hatches from a tapeworm egg and burrows through the gut wall into the bloodstream.",
  "cysticercus":"The fluid-filled ‘bladder-worm’ larva of a tapeworm, encysted in muscle (plural: cysticerci).",
  "cysticerci":"Plural of cysticercus — tapeworm bladder-worm larvae in muscle.",
  "microsporidia":"A group of extremely small spore-forming parasites that live inside host cells.",
  "spore":"A tough, dormant single-celled unit that spreads the parasite and germinates in a new host.",
  "plasmodium":"A multinucleate blob of parasite tissue (here, the mass a myxozoan forms inside a muscle cyst).",
  "host":"The animal in or on which a parasite lives.",
  "intermediate host":"A host that carries an earlier larval stage before the parasite reaches the animal it matures in.",
  "obligate":"Strictly required — an ‘obligate still-water’ breeder cannot develop in any other setting.",
  "anadromous":"Migrating from the sea into fresh water to spawn (as salmon do).",
  "viscosity":"A liquid’s thickness or resistance to flow.",
  "parenchyma":"The soft functional tissue of an organ, such as the body of the liver.",
  "bile duct":"The channel that carries bile from the liver — where adult liver flukes finally settle.",
  "musculature":"The muscle tissue — the flesh — of the animal.",
  "instar":"A stage between two moults of a larva.",
  "molt":"To shed and regrow the outer cuticle, letting an insect or larva grow (also spelled moult).",
  "filter feed":"To strain small food particles from the water, as blackfly larvae do from the current.",
  "post-mortem":"After death — here, movement of larvae in a fish after it has been caught.",
  "occurrence records":"Individual dated, located observations or specimens logged in a biodiversity database (GBIF)."
};
