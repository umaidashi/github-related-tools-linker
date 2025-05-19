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
          background: '#24292e',
          color: 'white',
          border: 'none',
          padding: '8px',
          borderRadius: '4px',
          cursor: 'pointer'
        });
        return btn;
      };

      container.appendChild(createButton('Open in DeepWiki', deepwikiUrl));
      container.appendChild(createButton('Open in GitMCP', gitmcpUrl));
      document.body.appendChild(container);
    });
})();
