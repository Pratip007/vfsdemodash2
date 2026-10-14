/* ============================================
   CYBER SECURITY CONTROL TOWER - App Logic
   CTEM Dark Theme Edition
   ============================================ */

// ============== NAVIGATION ==============
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');
const pageTitle = document.getElementById('pageTitle');
const breadcrumb = document.getElementById('breadcrumb');

const pageTitles = {
  overview: { title: 'Overview', subtitle: 'Discover. Prioritise. Remediate. Continuously.' },
  assets: { title: 'Asset Coverage', subtitle: 'Know your attack surface. Inventory everything.' },
  protection: { title: 'Protection Coverage', subtitle: 'Know. Prioritise. Fix. Stay Ahead.' },
  vulnerabilities: { title: 'Vulnerability & Patch', subtitle: 'Identify, Prioritize, and Remediate.' },
  identity: { title: 'Identity & Access', subtitle: 'Secure every identity, everywhere.' },
  network: { title: 'Network Security', subtitle: 'VPN, Firewall, Zscaler Proxy & Zero Trust.' },
  cloud: { title: 'Cloud Security', subtitle: 'Multi-cloud governance and visibility.' },
  datasources: { title: 'Data Sources', subtitle: 'Security data reliability and freshness.' }
};

function navigateTo(pageName) {
  navItems.forEach(item => item.classList.remove('active'));
  pages.forEach(page => page.classList.remove('active'));

  const targetNav = document.querySelector(`.nav-item[data-page="${pageName}"]`);
  const targetPage = document.getElementById(`page-${pageName}`);

  if (targetNav) targetNav.classList.add('active');
  if (targetPage) targetPage.classList.add('active');

  const info = pageTitles[pageName] || { title: pageName, subtitle: '' };
  pageTitle.textContent = info.title;
  breadcrumb.textContent = info.subtitle;

  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => initChartsForPage(pageName), 100);
}

navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo(item.getAttribute('data-page'));
  });
});

// ============== MODAL ==============
function openModal(title, content) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = content;
  document.getElementById('modalOverlay').classList.add('active');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
}

document.getElementById('modalOverlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ============== CHART DEFAULTS (DARK THEME) ==============
Chart.defaults.font.family = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.color = '#475569';
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.pointStyle = 'circle';
Chart.defaults.plugins.legend.labels.padding = 16;
Chart.defaults.elements.arc.borderWidth = 0;

const darkGridColor = 'rgba(0,0,0,0.06)';
const darkTooltipBg = '#1e293b';

const chartInstances = {};

function getOrCreateChart(id, config) {
  if (chartInstances[id]) {
    chartInstances[id].destroy();
  }
  const canvas = document.getElementById(id);
  if (!canvas) return null;
  chartInstances[id] = new Chart(canvas.getContext('2d'), config);
  return chartInstances[id];
}

// ============== CHART CONFIGS ==============

function initRiskTrendChart() {
  getOrCreateChart('chartRiskTrend', {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Critical', data: [280, 310, 295, 320, 350, 342],
          borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.08)',
          fill: true, tension: 0.4, pointRadius: 3, pointHoverRadius: 5, borderWidth: 2
        },
        {
          label: 'High', data: [520, 580, 610, 640, 670, 689],
          borderColor: '#fb923c', backgroundColor: 'rgba(251,146,60,0.08)',
          fill: true, tension: 0.4, pointRadius: 3, pointHoverRadius: 5, borderWidth: 2
        },
        {
          label: 'Medium', data: [980, 1050, 1100, 1120, 1180, 1204],
          borderColor: '#fbbf24', backgroundColor: 'rgba(251,191,36,0.08)',
          fill: true, tension: 0.4, pointRadius: 3, pointHoverRadius: 5, borderWidth: 2
        },
        {
          label: 'Low', data: [680, 700, 710, 720, 740, 749],
          borderColor: '#16a34a', backgroundColor: 'rgba(22,163,74,0.08)',
          fill: true, tension: 0.4, pointRadius: 3, pointHoverRadius: 5, borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: { position: 'top', labels: { boxWidth: 8, color: '#475569' } },
        tooltip: { backgroundColor: darkTooltipBg, titleColor: '#f1f5f9', bodyColor: '#cbd5e1', padding: 12, cornerRadius: 8, borderColor: 'rgba(148,163,184,0.1)', borderWidth: 1 }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 11 } } },
        y: { grid: { color: darkGridColor }, ticks: { color: '#64748b', font: { size: 11 } } }
      }
    }
  });
}

function initAssetsByTechChart() {
  getOrCreateChart('chartAssetsByTech', {
    type: 'doughnut',
    data: {
      labels: ['Web & Domains', 'Cloud', 'Endpoints', 'Network Devices', 'Third Party', 'Others'],
      datasets: [{
        data: [8421, 5982, 4120, 2431, 2118, 1820],
        backgroundColor: ['#2563eb', '#fb923c', '#16a34a', '#7c3aed', '#fbbf24', '#64748b'],
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '65%',
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: darkTooltipBg, padding: 12, cornerRadius: 8, borderColor: 'rgba(148,163,184,0.1)', borderWidth: 1,
          callbacks: { label: ctx => { const t = ctx.dataset.data.reduce((a,b) => a+b, 0); return ` ${ctx.label}: ${ctx.raw.toLocaleString()} (${((ctx.raw/t)*100).toFixed(1)}%)`; } }
        }
      }
    }
  });
}

function initCoverageTrendChart() {
  getOrCreateChart('chartCoverageTrend', {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        { label: 'Defender', data: [89,90,92,93,94,95], borderColor: '#2563eb', tension: 0.4, pointRadius: 3, borderWidth: 2, fill: false },
        { label: 'BitLocker', data: [94,95,96,97,97,98], borderColor: '#16a34a', tension: 0.4, pointRadius: 3, borderWidth: 2, fill: false },
        { label: 'DLP', data: [55,58,62,65,68,72], borderColor: '#ef4444', tension: 0.4, pointRadius: 3, borderWidth: 2, fill: false },
        { label: 'ZIA', data: [72,74,76,78,79,81], borderColor: '#0891b2', tension: 0.4, pointRadius: 3, borderWidth: 2, fill: false }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: { position: 'top', labels: { boxWidth: 8 } },
        tooltip: { backgroundColor: darkTooltipBg, padding: 12, cornerRadius: 8, borderColor: 'rgba(148,163,184,0.1)', borderWidth: 1 }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#64748b' } },
        y: { grid: { color: darkGridColor }, min: 40, max: 100, ticks: { color: '#64748b', callback: v => v + '%' } }
      }
    }
  });
}

function initProtectionGapChart() {
  getOrCreateChart('chartProtectionGap', {
    type: 'bar',
    data: {
      labels: ['Defender', 'BitLocker', 'DLP', 'ZIA', 'MDC', 'Win Act.'],
      datasets: [
        { label: 'Covered', data: [95,98,72,81,89,97], backgroundColor: 'rgba(52,211,153,0.7)', borderRadius: 4 },
        { label: 'Gap', data: [5,2,28,19,11,3], backgroundColor: 'rgba(239,68,68,0.7)', borderRadius: 4 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', labels: { boxWidth: 8 } },
        tooltip: { backgroundColor: darkTooltipBg, padding: 12, cornerRadius: 8, borderColor: 'rgba(148,163,184,0.1)', borderWidth: 1 }
      },
      scales: {
        x: { stacked: true, grid: { display: false }, ticks: { color: '#64748b' } },
        y: { stacked: true, grid: { color: darkGridColor }, max: 100, ticks: { color: '#64748b', callback: v => v + '%' } }
      }
    }
  });
}

function initVulnSeverityChart() {
  getOrCreateChart('chartVulnSeverity', {
    type: 'doughnut',
    data: {
      labels: ['Critical', 'High', 'Medium', 'Low'],
      datasets: [{ data: [342,689,1204,749], backgroundColor: ['#ef4444','#fb923c','#fbbf24','#16a34a'], hoverOffset: 8 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '60%',
      plugins: {
        legend: { position: 'right', labels: { padding: 20 } },
        tooltip: { backgroundColor: darkTooltipBg, padding: 12, cornerRadius: 8, borderColor: 'rgba(148,163,184,0.1)', borderWidth: 1 }
      }
    }
  });
}

function initVulnTrendChart() {
  getOrCreateChart('chartVulnTrend', {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Total Vulnerabilities', data: [2400,2550,2650,2780,2890,2984],
        borderColor: '#2563eb', backgroundColor: 'rgba(37,99,235,0.08)',
        fill: true, tension: 0.4, pointRadius: 4, borderWidth: 2
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', labels: { boxWidth: 8 } },
        tooltip: { backgroundColor: darkTooltipBg, padding: 12, cornerRadius: 8, borderColor: 'rgba(148,163,184,0.1)', borderWidth: 1 }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#64748b' } },
        y: { grid: { color: darkGridColor }, ticks: { color: '#64748b' } }
      }
    }
  });
}

function initExposureTypeChart() {
  getOrCreateChart('chartExposureType', {
    type: 'bar',
    data: {
      labels: ['Misconfigurations', 'Unpatched Services', 'Exposed Data', 'Identity Risks', 'Other'],
      datasets: [{
        label: 'Percentage', data: [32,24,18,14,12],
        backgroundColor: ['#ef4444','#fb923c','#fbbf24','#2563eb','#64748b'],
        borderRadius: 6, barThickness: 32
      }]
    },
    options: {
      indexAxis: 'y', responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { backgroundColor: darkTooltipBg, padding: 12, cornerRadius: 8, borderColor: 'rgba(148,163,184,0.1)', borderWidth: 1, callbacks: { label: ctx => ` ${ctx.raw}%` } }
      },
      scales: {
        x: { grid: { color: darkGridColor }, max: 40, ticks: { color: '#64748b', callback: v => v + '%' } },
        y: { grid: { display: false }, ticks: { color: '#475569' } }
      }
    }
  });
}

function initMFAChart() {
  getOrCreateChart('chartMFA', {
    type: 'doughnut',
    data: {
      labels: ['MFA Enabled', 'MFA Disabled'],
      datasets: [{ data: [9200,345], backgroundColor: ['#16a34a','#ef4444'], hoverOffset: 8 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '65%',
      plugins: {
        legend: { position: 'bottom', labels: { padding: 20 } },
        tooltip: {
          backgroundColor: darkTooltipBg, padding: 12, cornerRadius: 8, borderColor: 'rgba(148,163,184,0.1)', borderWidth: 1,
          callbacks: { label: ctx => { const t = ctx.dataset.data.reduce((a,b) => a+b, 0); return ` ${ctx.label}: ${ctx.raw.toLocaleString()} (${((ctx.raw/t)*100).toFixed(1)}%)`; } }
        }
      }
    }
  });
}

function initCloudCoverageChart() {
  getOrCreateChart('chartCloudCoverage', {
    type: 'bar',
    data: {
      labels: ['Wiz Coverage', 'Cloud Logging', 'DB Encryption', 'Onboarding', 'Monitoring'],
      datasets: [{
        label: 'Coverage %', data: [88,92,85,94,91],
        backgroundColor: ['rgba(167,139,250,0.7)','rgba(52,211,153,0.7)','rgba(34,211,238,0.7)','rgba(56,189,248,0.7)','rgba(251,146,60,0.7)'],
        borderRadius: 6, barThickness: 40
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { backgroundColor: darkTooltipBg, padding: 12, cornerRadius: 8, borderColor: 'rgba(148,163,184,0.1)', borderWidth: 1, callbacks: { label: ctx => ` ${ctx.raw}%` } }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#64748b' } },
        y: { grid: { color: darkGridColor }, max: 100, ticks: { color: '#64748b', callback: v => v + '%' } }
      }
    }
  });
}

function initDataFreshnessChart() {
  getOrCreateChart('chartDataFreshness', {
    type: 'bar',
    data: {
      labels: ['AD', 'Intune', 'Defender', 'Wiz', 'FortiMgr', 'Accops', 'Nessus', 'Sentinel', 'SCCM'],
      datasets: [{
        label: 'Minutes since last sync', data: [5,12,3,8,120,15,22,1,360],
        backgroundColor: function(ctx) {
          const val = ctx.raw;
          if (val <= 15) return 'rgba(52,211,153,0.7)';
          if (val <= 60) return 'rgba(251,191,36,0.7)';
          return 'rgba(239,68,68,0.7)';
        },
        borderRadius: 6, barThickness: 36
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: darkTooltipBg, padding: 12, cornerRadius: 8, borderColor: 'rgba(148,163,184,0.1)', borderWidth: 1,
          callbacks: { label: ctx => ctx.raw < 60 ? ` ${ctx.raw} minutes ago` : ` ${(ctx.raw/60).toFixed(1)} hours ago` }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#64748b' } },
        y: { grid: { color: darkGridColor }, ticks: { color: '#64748b', callback: val => val < 60 ? val + 'm' : (val/60).toFixed(0) + 'h' } }
      }
    }
  });
}

// ============== ZSCALER CHARTS ==============

function initZscalerDeployChart() {
  getOrCreateChart('chartZscalerDeploy', {
    type: 'bar',
    data: {
      labels: ['ZIA', 'ZPA', 'ZDX', 'DLP', 'SSL Inspect'],
      datasets: [
        {
          label: 'Deployed', data: [81,76,94,72,98],
          backgroundColor: 'rgba(34,211,238,0.7)',
          borderRadius: 6, barThickness: 36
        },
        {
          label: 'Gap', data: [19,24,6,28,2],
          backgroundColor: 'rgba(239,68,68,0.4)',
          borderRadius: 6, barThickness: 36
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', labels: { boxWidth: 8 } },
        tooltip: { backgroundColor: darkTooltipBg, padding: 12, cornerRadius: 8, borderColor: 'rgba(148,163,184,0.1)', borderWidth: 1, callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.raw}%` } }
      },
      scales: {
        x: { stacked: true, grid: { display: false }, ticks: { color: '#475569' } },
        y: { stacked: true, grid: { color: darkGridColor }, max: 100, ticks: { color: '#64748b', callback: v => v + '%' } }
      }
    }
  });
}

function initZscalerThreatsChart() {
  getOrCreateChart('chartZscalerThreats', {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Threats Blocked', data: [32100,38400,35200,41600,44800,48230],
          borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.08)',
          fill: true, tension: 0.4, pointRadius: 3, borderWidth: 2
        },
        {
          label: 'Malware', data: [2100,2600,2800,3000,3200,3412],
          borderColor: '#fb923c', backgroundColor: 'rgba(251,146,60,0.08)',
          fill: true, tension: 0.4, pointRadius: 3, borderWidth: 2
        },
        {
          label: 'Phishing', data: [1200,1400,1500,1600,1750,1892],
          borderColor: '#fbbf24', backgroundColor: 'rgba(251,191,36,0.08)',
          fill: true, tension: 0.4, pointRadius: 3, borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: { position: 'top', labels: { boxWidth: 8 } },
        tooltip: { backgroundColor: darkTooltipBg, padding: 12, cornerRadius: 8, borderColor: 'rgba(148,163,184,0.1)', borderWidth: 1 }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#64748b' } },
        y: { grid: { color: darkGridColor }, ticks: { color: '#64748b' } }
      }
    }
  });
}

// ============== CHART INIT BY PAGE ==============
const chartInitMap = {
  overview: ['RiskTrend'],
  assets: ['AssetsByTech'],
  protection: ['CoverageTrend', 'ProtectionGap'],
  vulnerabilities: ['VulnSeverity', 'VulnTrend', 'ExposureType'],
  identity: ['MFA'],
  network: ['ZscalerDeploy', 'ZscalerThreats'],
  cloud: ['CloudCoverage'],
  datasources: ['DataFreshness']
};

const chartInitFunctions = {
  RiskTrend: initRiskTrendChart,
  AssetsByTech: initAssetsByTechChart,
  CoverageTrend: initCoverageTrendChart,
  ProtectionGap: initProtectionGapChart,
  VulnSeverity: initVulnSeverityChart,
  VulnTrend: initVulnTrendChart,
  ExposureType: initExposureTypeChart,
  MFA: initMFAChart,
  CloudCoverage: initCloudCoverageChart,
  DataFreshness: initDataFreshnessChart,
  ZscalerDeploy: initZscalerDeployChart,
  ZscalerThreats: initZscalerThreatsChart
};

function initChartsForPage(pageName) {
  const charts = chartInitMap[pageName];
  if (!charts) return;
  charts.forEach(chartName => {
    const fn = chartInitFunctions[chartName];
    if (fn) fn();
  });
}

// ============== TREE INTERACTIVITY ==============
document.querySelectorAll('.tree-label').forEach(label => {
  label.addEventListener('click', function() {
    const node = this.closest('.tree-node') || this.closest('.tree-root');
    if (!node) return;
    const children = node.querySelectorAll(':scope > .tree-node');
    if (children.length === 0) return;
    children.forEach(child => {
      child.style.display = child.style.display === 'none' ? 'block' : child.style.display === '' ? 'none' : 'block';
    });
  });
});

// ============== RISK MATRIX CLICK ==============
document.querySelectorAll('.risk-matrix td[class^="cell-"]').forEach(cell => {
  cell.addEventListener('click', function() {
    const row = this.closest('tr');
    const accountType = row.querySelector('td:first-child').textContent.trim();
    const headerCells = this.closest('table').querySelectorAll('thead th');
    const colIndex = Array.from(this.parentNode.children).indexOf(this);
    const mfaStatus = headerCells[colIndex].textContent.trim();
    openModal(
      `${accountType} Accounts - ${mfaStatus}`,
      `<div style="text-align:center;padding:20px;">
        <div style="font-size:48px;font-weight:800;margin-bottom:8px;color:var(--accent-blue);">${this.textContent}</div>
        <div style="font-size:14px;color:#475569;">${accountType} accounts with ${mfaStatus}</div>
        <div style="margin-top:20px;padding:12px;background:var(--blue-light);border:1px solid rgba(37,99,235,0.15);border-radius:8px;font-size:13px;color:#475569;">
          Click to view detailed list of accounts
        </div>
      </div>`
    );
  });
});

// ============== MOBILE SIDEBAR ==============
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

function checkMobile() {
  if (window.innerWidth <= 768) {
    menuToggle.style.display = 'flex';
  } else {
    menuToggle.style.display = 'none';
    sidebar.classList.remove('open');
  }
}

menuToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
window.addEventListener('resize', checkMobile);
checkMobile();

// ============== SEARCH ==============
const searchInput = document.querySelector('.search-box input');
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) return;

    const searchMap = {
      'defender': 'protection', 'bitlocker': 'protection', 'dlp': 'protection',
      'zscaler': 'network', 'zia': 'network', 'zpa': 'network', 'zdx': 'network',
      'ssl': 'network', 'proxy': 'network', 'zero trust': 'network',
      'mdc': 'protection',
      'asset': 'assets', 'endpoint': 'assets', 'server': 'assets', 'laptop': 'assets',
      'windows': 'assets', 'mac': 'assets', 'ios': 'assets', 'android': 'assets',
      'vulnerability': 'vulnerabilities', 'patch': 'vulnerabilities', 'cve': 'vulnerabilities',
      'eol': 'vulnerabilities', 'eos': 'vulnerabilities',
      'identity': 'identity', 'mfa': 'identity', 'admin': 'identity',
      'user': 'identity', 'service account': 'identity', 'iam': 'identity',
      'vpn': 'network', 'firewall': 'network', 'forti': 'network',
      'accops': 'network', 'network': 'network',
      'cloud': 'cloud', 'aws': 'cloud', 'azure': 'cloud', 'wiz': 'cloud',
      'data source': 'datasources', 'nessus': 'datasources',
      'sentinel': 'datasources', 'intune': 'datasources', 'sccm': 'datasources'
    };

    for (const [keyword, page] of Object.entries(searchMap)) {
      if (query.includes(keyword)) {
        navigateTo(page);
        searchInput.value = '';
        return;
      }
    }

    const escaped = searchInput.value.replace(/[<>&"']/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":"&#39;"}[c]));
    openModal('Search Results', `<div style="text-align:center;padding:20px;color:#64748b;">
      <i class="fas fa-search" style="font-size:32px;margin-bottom:12px;color:var(--accent-blue);"></i>
      <div>No results found for "${escaped}"</div>
    </div>`);
  }
});

// ============== INIT ON LOAD ==============
document.addEventListener('DOMContentLoaded', () => initChartsForPage('overview'));
if (document.readyState !== 'loading') initChartsForPage('overview');
