// Search functionality for TIC Software website

(function() {
  // Inject CSS for search results dropdown
  const style = document.createElement('style');
  style.textContent = `
    .search-results {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      background: #ffffff;
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.12);
      z-index: 9999;
      margin-top: 4px;
      width: 320px;
      max-height: 360px;
      overflow-y: auto;
    }

    .search-results.open {
      display: block;
    }

    .search-result-item {
      padding: 10px 14px;
      cursor: pointer;
      border-bottom: 1px solid #F0F0F0;
      text-decoration: none;
      display: block;
      transition: background-color 0.2s;
    }

    .search-result-item:hover {
      background-color: #F5F7FB;
    }

    .search-result-item:last-child {
      border-bottom: none;
    }

    .search-result-title {
      font-weight: 600;
      font-size: 0.875rem;
      color: #1D1E2B;
    }

    .search-result-desc {
      font-size: 0.78rem;
      color: #666;
      margin-top: 2px;
      line-height: 1.3;
    }

    .search-result-type {
      font-size: 0.7rem;
      color: #003d99;
      text-transform: uppercase;
      font-weight: 600;
      margin-top: 4px;
    }

    .search-no-results {
      padding: 12px 14px;
      font-size: 0.875rem;
      color: #666;
      text-align: center;
    }
  `;
  document.head.appendChild(style);

  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchResults = document.getElementById('search-results');

    if (!searchInput || !searchBtn || !searchResults || !window.SEARCH_DATA) {
      return;
    }

    // Perform search
    function performSearch(query) {
      if (query.trim().length < 2) {
        searchResults.classList.remove('open');
        return;
      }

      const queryLower = query.toLowerCase();
      const results = window.SEARCH_DATA.filter(item => {
        const searchFields = (
          item.title + ' ' +
          item.description + ' ' +
          item.keywords
        ).toLowerCase();
        return searchFields.includes(queryLower);
      }).slice(0, 5); // Limit to 5 results

      // Clear previous results
      searchResults.innerHTML = '';

      if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-no-results">No results found</div>';
        searchResults.classList.add('open');
        return;
      }

      // Display results
      results.forEach(result => {
        const link = document.createElement('a');
        link.href = result.url;
        link.className = 'search-result-item';
        link.innerHTML = `
          <div class="search-result-title">${escapeHtml(result.title)}</div>
          <div class="search-result-desc">${escapeHtml(result.description.substring(0, 80))}...</div>
          <div class="search-result-type">${result.type}</div>
        `;
        searchResults.appendChild(link);
      });

      searchResults.classList.add('open');
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    // Input event for live search
    searchInput.addEventListener('input', function(e) {
      performSearch(e.target.value);
    });

    // Search button click
    searchBtn.addEventListener('click', function() {
      performSearch(searchInput.value);
    });

    // Enter key in input
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        performSearch(e.target.value);
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.nav-search')) {
        searchResults.classList.remove('open');
      }
    });

    // Close dropdown on Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        searchResults.classList.remove('open');
      }
    });
  });
})();
