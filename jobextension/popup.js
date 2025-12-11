// popup.js
document.getElementById('saveJobBtn').addEventListener('click', () => {
  chrome.storage.local.get('jobData', ({ jobData }) => {
    console.log('Retrieved jobData:', jobData);
    if (!jobData || !jobData.companyName || !jobData.role || !jobData.jobLink) {
      alert('Incomplete job data. Please click "Refresh" to reload the page or ensure you are on a job listing page.');
      return;
    }

    const userResponse = confirm('Did you actually apply for this job? Click OK if YES, Cancel if NO.');
    jobData.applied = userResponse;

    fetch('http://localhost:5000/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jobData)
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('Job saved to backend:', data);
        alert(
          `Job added to your dashboard!\n\n` +
          `Role: ${jobData.role}\n` +
          `Company: ${jobData.companyName}\n` +
          `Job Link: ${jobData.jobLink}\n` +
          `Applied: ${jobData.applied ? 'Yes' : 'No'}`
        );
      })
      .catch(err => {
        console.error('Error saving job:', err);
        alert('Failed to save job. Please try again.');
      });
  });
});

document.getElementById('refreshBtn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]?.id) {
      alert('No active tab found. Please ensure you are on a LinkedIn job page.');
      return;
    }
    chrome.tabs.reload(tabs[0].id, { bypassCache: true }, () => {
      if (chrome.runtime.lastError) {
        console.error('Reload error:', chrome.runtime.lastError);
        alert('Failed to reload the page. Please try again manually.');
        return;
      }
      console.log('Page reloaded successfully');
      alert('Page reloaded. Please wait a moment and try saving the job.');
    });
  });
});