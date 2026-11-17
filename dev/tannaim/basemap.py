# Builds the map outline used by tannaim.js (D.basemap) from Natural Earth 1:10m (public domain):
# ne_10m_land, ne_10m_lakes, ne_10m_rivers_lake_centerlines (github.com/nvkelso/natural-earth-vector, geojson/).
# Clips to lon 34.2-36.0, lat 31.15-33.4, simplifies, projects to a 420-wide SVG frame. Needs shapely.
import json, math, sys
from shapely.geometry import shape, box
from shapely.ops import unary_union
src = sys.argv[1] if len(sys.argv) > 1 else '.'
B = (34.2, 31.15, 36.0, 33.4)
bb = box(*B); W = 420; kx = math.cos(math.radians(32.3)); sx = W / ((B[2] - B[0]) * kx); H = round((B[3] - B[1]) * sx)
def P(lon, lat): return (round((lon - B[0]) * kx * sx, 1), round((B[3] - lat) * sx, 1))
def path(geom):
    out = []; gs = [geom] if geom.geom_type in ('Polygon', 'LineString') else list(getattr(geom, 'geoms', []))
    for g in gs:
        if g.geom_type == 'Polygon':
            for ring in [g.exterior] + list(g.interiors): out.append('M' + 'L'.join('%s,%s' % P(*c) for c in ring.coords) + 'Z')
        elif g.geom_type == 'LineString': out.append('M' + 'L'.join('%s,%s' % P(*c) for c in g.coords))
        else: out.append(path(g))
    return ''.join(out)
def load(f): return [shape(ft['geometry']).intersection(bb) for ft in json.load(open(src + '/' + f))['features'] if shape(ft['geometry']).intersects(bb)]
land = unary_union(load('ne_10m_land.geojson')).simplify(0.004)
def frame(lon0, lat0, lon1, lat1):
    x0, y0 = P(lon0, lat1); x1, y1 = P(lon1, lat0); return [x0, y0, round(x1 - x0, 1), round(y1 - y0, 1)]
out = {'bbox': B, 'w': W, 'h': H, 'kx': round(kx, 6), 'sx': round(sx, 4), 'land': path(land),
       'lakes': ''.join(path(g.simplify(0.002)) for g in load('ne_10m_lakes.geojson')),
       'rivers': ''.join(path(g.simplify(0.003)) for g in load('ne_10m_rivers_lake_centerlines.geojson')),
       'frames': {'all': [0, 0, W, H], 'galil': frame(34.95, 32.6, 35.75, 33.12)},
       'labels': [{'he': 'ים כנרת', 'en': 'Kinneret', 'lon': 35.59, 'lat': 32.82}, {'he': 'ים המלח', 'en': 'Dead Sea', 'lon': 35.5, 'lat': 31.5}, {'he': 'הים הגדול', 'en': 'Mediterranean', 'lon': 34.45, 'lat': 32.6}],
       'src': 'Natural Earth 1:10m land, lakes and rivers (public domain)'}
json.dump(out, open('basemap.json', 'w'))
