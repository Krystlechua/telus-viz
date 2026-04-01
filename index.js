// Load the Looker Studio Library
const dscc = require('@google/dscc');

function drawViz(data) {
  // Clear the container
  const container = document.body;
  container.innerHTML = '<div id="viz-container" class="search-results-grid"></div>';
  const vizContainer = document.getElementById('viz-container');

  // Loop through rows of data from your Sheet
  data.tables.DEFAULT.forEach((row) => {
    const app = row.dimensions[0];
    const product = row.dimensions[1];
    const status = row.dimensions[2];
    const release = row.dimensions[3];
    const investment = row.metrics[0] ? row.metrics[0].toLocaleString() : '$0';

    const cardWrapper = document.createElement('div');
    cardWrapper.className = 'search-card-wrapper';
    cardWrapper.onclick = function() { this.classList.toggle('flipped'); };

    cardWrapper.innerHTML = `
      <div class="search-card-inner">
        <div class="search-card-front">
          <div class="search-card-header">
            <h6 class="search-card-title">${app} &bull; ${product}</h6>
          </div>
          <p><strong>Status:</strong> ${status}</p>
          <p><strong>Release:</strong> ${release}</p>
          <p><strong>Investment:</strong> $${investment}</p>
          <div class="flip-hint">Click to flip</div>
        </div>
        <div class="search-card-back">
          <h6 class="search-card-title">Detailed Info</h6>
          <p>Additional details pulled from your sheet can go here.</p>
          <div class="flip-hint">Click to return</div>
        </div>
      </div>
    `;
    vizContainer.appendChild(cardWrapper);
  });
}

// Subscribe to data updates
dscc.subscribeToData(drawViz, {transform: dscc.tableTransform});
