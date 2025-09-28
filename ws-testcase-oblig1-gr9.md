# WS Test Case – Oblig1 Group 9
Group: Jahn Aage, Gustav Øines
Date: 2025-09-25

**Criterion:**

## 1) WSG criterion (exact quote)
"Use JavaScript in an energy-efficient and accessible way, only using APIs and making external calls when this enhances a project's sustainability."

- "Improve sustainability through accessible and performant code."
- "Integrate energy-relevant APIs - such as Battery Status, Compression Streams, Page Visibility, or Vibration - where these can reduce energy consumption."
- "Call client- or server-side APIs only when necessary. Equally, ensure an API is optimized to only send data that is actually required."

## 2) Plain-language summary

That Websites should only request and receive the data they actually need and to avoid 
unnecessary API calls.

## 3) Why it matters
- Performance: fewer requests and less JS work means that the page operates more smoothly
- CO₂ / Energy: less data transferred and less CPU/GPU activity means less energy is being used and lower emmisions.
- UX / Accessibility: improve performance and makes sites more responsive.

## 4) Machine-testable? (yes / no / partly)
**Partly.**
- some parts can be tested automatically like total number of requests and payload-size by parsing HAR data or lighthouse JSON data

- we can manually go through our code to check if the data that we are sending to the client is actually being used or we can use a proxy to proxy the response json and then log used props in a set and then check the set using a filter to see what props are being used

- we could extract data from lighthouse but it does not tell us much about over-fetching. it does however give us an insight into execution times but it seem like there are not many options for detecting over-fetching.


## 5) Signals to check (explicit list)

- Total number of requests made to the JSON data file over time.
- Total bytes downloaded from that file over time.
- JSON payload size is reduced by removing unused fields in the fixed  version.
- Polling does not occur in the fixed version.
- The fixed version avoids repeatedly fetching identical data.

## 6) Pass / Fail rules (explicit)

pass: no uneccesarry requests,
no "overfetching" requested data = data fetched

fail: polling continues after initial load.
total requests and transferred bytes remain similar over time


## 7) Exact test steps (reproducible)

1. serve both versions locally
- from route: bash: `npx http-server . -p 8000`,
- Broken version: `http://localhost:8000/broken/index.html`,
- Fixed version: `http://localhost:8000/fixed/index.html`,

2. run lighthouse on both versions:
npx lighthouse "http://localhost:8000/broken/index.html" \
  --output=json --output=html \
  --output-path=./evidence/lhr-broken \
  --save-assets --chrome-flags="--headless"

npx lighthouse "http://localhost:8000/fixed/index.html" \
  --output=json --output=html \
  --output-path=./evidence/lhr-fixed \
  --save-assets --chrome-flags="--headless"

3. export network activity (HAR) for over time behavior
- Open Chrome DevTools → Network tab
- Enable “Preserve log” and clear logs
- Stay on the broken page 10 + seconds → Save as evidence-broken-version.har
- repeat for the fixed version and save as evidence-fixed-version.har

4. compare and interpret the results 
- go to https://toolbox.googleapps.com/apps/har_analyzer
- upload evidence-broken-version.har
- look under "all entries"
- take screenshot - save as -> broken-har-evidence.png
- upload evidence-fixed-version.har
- take screenshot - save as -> fixed-har-evidence.png
- compare the requests sent data uploaded and data downloaded



## 8) Evidence required (list filenames)

`evidence\broken-console.png`,
`evidence\evidence-broken.png`,
`evidence\fixed-version-network.png`,
`evidence\fixed-version.png`,
`evidence\evidence-broken-version.har`,
`evidence\evidence-fixed-version.har1`,
`evidence\localhost_2025-09-28_14-03-13.report.html`,
`evidence\localhost_2025-09-28_14-04-48.report.html`,
`evidence\lhr-broken.report.json`,
`evidence\lhr-fixed.report.json`,

## 9) Automation hints (optional)
- small snippet / instructions (if you automated checks)

## 10) Assumptions & notes
- Both versions were tested on the same browser, computer, and network. (Ryzen 3900x, 32GB Ram)
- Cache was cleared before each test.
- Number of requests and total download size are used as indicators of energy use.
- Measurements were taken with Chrome DevTools and Lighthouse.

