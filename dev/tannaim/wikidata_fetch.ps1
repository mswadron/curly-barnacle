# Runs the Wikidata queries written by wikidata_fetch.py (q_*.rq) and saves wd_rows.json.
# PowerShell is used because Python's certificate store rejected query.wikidata.org on LENOVO-II.
param([string]$w)
$all=@(); Get-ChildItem "$w\q_*.rq" | ForEach-Object { $q = Get-Content $_.FullName -Raw -Encoding utf8; $r = Invoke-RestMethod -Method Post -Uri 'https://query.wikidata.org/sparql' -Headers @{'User-Agent'='limudlab-tannaim/1.0';'Accept'='application/sparql-results+json'} -Body @{query=$q}; $all += $r.results.bindings; Start-Sleep 1 }
$all | ConvertTo-Json -Depth 6 | Out-File -Encoding utf8 "$w\wd_rows.json"
