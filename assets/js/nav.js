// Lightweight fetch-based navigation for multi-page swap with zero theme blink

async function loadPage(url, pushState = true) {
  const contentEl = document.getElementById('page-content');
  if (!contentEl) {
    // If not on an admin page containing #page-content shell, redirect normally
    window.location.href = url;
    return;
  }
  
  try {
    const res = await fetch(url);
    const html = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const newContent = doc.getElementById('page-content');

    if (newContent) {
      // Extract modals/drawers BEFORE replacing contentEl to avoid losing them
      const fetchedOverlays = Array.from(doc.querySelectorAll('.modal-overlay, .drawer-overlay'));

      contentEl.replaceWith(newContent);
      document.title = doc.title;
      if (pushState) history.pushState({ url }, '', url);
      
      // Clean up old active overlays and append new ones
      document.querySelectorAll('.modal-overlay, .drawer-overlay').forEach(el => el.remove());
      fetchedOverlays.forEach(modalEl => {
        document.body.appendChild(modalEl);
      });
      
      // Copy any page-specific style blocks from the fetched page
      document.querySelectorAll('style[data-dynamic-style]').forEach(el => el.remove());
      doc.querySelectorAll('style').forEach(styleEl => {
        const s = document.createElement('style');
        s.setAttribute('data-dynamic-style', 'true');
        s.textContent = styleEl.textContent;
        document.head.appendChild(s);
      });
      
      // Update sidebar nav selection highlights
      setActiveSidebarLink(url);
      
      // Re-run any page-specific initializer script blocks
      const pageScript = doc.querySelector('script[data-page-init]');
      if (pageScript) {
        setTimeout(() => {
          const s = document.createElement('script');
          s.textContent = pageScript.textContent;
          document.body.appendChild(s);
          
          // Re-initialize Lucide icons on newly inserted content
          if (window.initializeLucideIcons) {
            window.initializeLucideIcons();
          }
        }, 0);
      } else {
        // Re-initialize Lucide icons on newly inserted content
        if (window.initializeLucideIcons) {
          window.initializeLucideIcons();
        }
      }
    } else {
      // Fallback
      window.location.href = url;
    }
  } catch (err) {
    console.error('Navigation failed, falling back to full load:', err);
    window.location.href = url; // graceful fallback
  }
}

document.addEventListener('click', (e) => {
  const link = e.target.closest('a[data-nav]');
  if (!link) return;
  e.preventDefault();
  loadPage(link.getAttribute('href'));
});

window.addEventListener('popstate', (e) => {
  if (e.state && e.state.url) {
    loadPage(e.state.url, false);
  } else {
    location.reload();
  }
});

function setActiveSidebarLink(url) {
  const pageName = url.split('/').pop();
  document.querySelectorAll('.sidebar-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href.includes(pageName)) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
}
