// content.js
function scrapeJobDetails() {
  // Selector based on provided DOM snippet
  const companyName = document.querySelector('.job-details-jobs-unified-top-card__company-name a[class*="xZRZHJbgMvqgXhwwABwPvJzWRCteGMQSpE"], .job-details-jobs-unified-top-card__company-name a')?.innerText?.trim() || '';
  const role = document.querySelector('.job-details-jobs-unified-top-card__job-title, .top-card-layout__title')?.innerText?.trim() || '';
  const jobDescription = document.querySelector('.show-more-less-html__markup, .job-details-jobs-unified-top-card__job-insight')?.innerText?.trim() || '';
  const jobLink = window.location.href;

  const jobData = { companyName, role, jobDescription, jobLink, applied: false };
  console.log('Scraped jobData:', jobData);

  // Clear previous jobData to avoid stale data
  chrome.storage.local.remove('jobData', () => {
    if (role && companyName && jobLink) {
      chrome.storage.local.set({ jobData }, () => {
        console.log('Saved jobData to chrome.storage.local:', jobData);
      });
    } else {
      console.log('Incomplete jobData, not saving:', jobData);
    }
  });

  return { status: role && companyName && jobLink ? 'success' : 'error', message: 'Incomplete job data' };
}

// Retry scraping with a delay
function scrapeWithRetry(attempts = 5, delay = 1000) {
  let attempt = 0;
  function tryScrape() {
    const result = scrapeJobDetails();
    if (result.status === 'success' || attempt >= attempts) {
      return;
    }
    attempt++;
    console.log(`Retry attempt ${attempt}/${attempts} after ${delay}ms`);
    setTimeout(tryScrape, delay);
  }
  tryScrape();
}

// Run on initial page load
window.addEventListener('load', () => {
  console.log('Content script loaded');
  scrapeWithRetry();
});

// Create a MutationObserver to watch for DOM changes
const observer = new MutationObserver(() => {
  console.log('DOM changed, re-scraping job data');
  scrapeWithRetry();
});

// Observe a specific container for job details
const targetNode = document.querySelector('.job-details-jobs-unified-top-card, .top-card-layout, .jobs-search__results-list') || document.body;
observer.observe(targetNode, {
  childList: true,
  subtree: true
});

// Handle URL changes in SPAs
window.addEventListener('popstate', () => {
  console.log('URL changed, re-scraping job data');
  scrapeWithRetry();
});

// Fallback: Periodically check for job data updates
setInterval(() => {
  const currentUrl = window.location.href;
  chrome.storage.local.get('jobData', ({ jobData }) => {
    if (jobData?.jobLink !== currentUrl) {
      console.log('URL mismatch detected, re-scraping job data');
      scrapeWithRetry();
    }
  });
}, 2000);