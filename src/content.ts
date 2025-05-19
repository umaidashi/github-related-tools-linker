// src/content.ts
(() => {
  const match = window.location.href.match(/^https:\/\/github\.com\/([^\/]+)\/([^\/?#]+)/);
  if (!match) return;

  const user = match[1];
  const repo = match[2];

  // ここでGitHub APIを使ってpublicかどうか判定
  const apiUrl = `https://api.github.com/repos/${user}/${repo}`;
  fetch(apiUrl)
    .then(res => {
      if (!res.ok) return null;
      return res.json();
    })
    .then(repoInfo => {
      if (!repoInfo || repoInfo.private) return; // privateなら何もしない

      const deepwikiUrl = `https://deepwiki.com/${user}/${repo}`;
      const gitmcpUrl = `https://gitmcp.io/${user}/${repo}`;

      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.top = '100px';
      container.style.right = '20px';
      container.style.zIndex = '10000';
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '8px';

      const createButton = (label: string, url: string) => {
        const btn = document.createElement('button');
        btn.textContent = label;
        btn.onclick = () => window.open(url, '_blank');
        Object.assign(btn.style, {
          background: 'linear-gradient(90deg, #24292e 0%, #0366d6 100%)',
          color: 'white',
          border: 'none',
          padding: '12px 20px',
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(3,102,214,0.15)',
          fontWeight: 'bold',
          fontSize: '16px',
          transition: 'transform 0.15s, box-shadow 0.15s, background 0.3s',
          outline: 'none',
          minWidth: '200px',
        });
        btn.onmouseover = () => {
          btn.style.transform = 'translateY(-2px) scale(1.03)';
          btn.style.boxShadow = '0 8px 24px rgba(3,102,214,0.25)';
          btn.style.background = 'linear-gradient(90deg, #0366d6 0%, #24292e 100%)';
        };
        btn.onmouseout = () => {
          btn.style.transform = '';
          btn.style.boxShadow = '0 4px 16px rgba(3,102,214,0.15)';
          btn.style.background = 'linear-gradient(90deg, #24292e 0%, #0366d6 100%)';
        };
        return btn;
      };

      container.appendChild(createButton('Open in DeepWiki', deepwikiUrl));
      container.appendChild(createButton('Open in GitMCP', gitmcpUrl));
      document.body.appendChild(container);
    });
})();
