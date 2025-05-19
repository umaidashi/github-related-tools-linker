// src/content.ts
(() => {
  const match = window.location.href.match(/^https:\/\/github\.com\/([^\/]+)\/([^\/?#]+)/);
  if (!match) return;

  const user = match[1];
  const repo = match[2];

  // ここでGitHub APIを使ってpublicかどうか判定
  const apiUrl = `https://api.github.com/repos/${user}/${repo}`;
  fetch(apiUrl)
    .then(async res => {
      const deepwikiUrl = `https://deepwiki.com/${user}/${repo}`;
      const gitmcpUrl = `https://gitmcp.io/${user}/${repo}`;
      const devinUrl = `https://app.devin.ai/wiki/${user}/${repo}`;

      const createButton = (label: string, url: string) => {
        const btn = document.createElement('button');
        btn.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 4px;">${label}<span style="font-size: 1.1em;">&#8594;</span></span>`;
        btn.onclick = () => window.open(url, '_blank');
        Object.assign(btn.style, {
          background: 'linear-gradient(90deg, #24292e 0%, #0366d6 100%)',
          color: 'white',
          border: 'none',
          padding: '6px 14px',
          borderRadius: '6px',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(3,102,214,0.10)',
          fontWeight: 'bold',
          fontSize: '13px',
          transition: 'transform 0.15s, box-shadow 0.15s, background 0.3s',
          outline: 'none',
          minWidth: '80px',
        });
        btn.onmouseover = () => {
          btn.style.transform = 'translateY(-1px) scale(1.04)';
          btn.style.boxShadow = '0 4px 16px rgba(3,102,214,0.18)';
          btn.style.background = 'linear-gradient(90deg, #0366d6 0%, #24292e 100%)';
        };
        btn.onmouseout = () => {
          btn.style.transform = '';
          btn.style.boxShadow = '0 2px 8px rgba(3,102,214,0.10)';
          btn.style.background = 'linear-gradient(90deg, #24292e 0%, #0366d6 100%)';
        };
        return btn;
      };

      const repoHeader = document.querySelector('strong[itemprop="name"]');
      if (repoHeader && repoHeader.parentElement) {
        const inlineContainer = document.createElement('span');
        inlineContainer.style.display = 'inline-flex';
        inlineContainer.style.gap = '8px';
        inlineContainer.style.marginLeft = '12px';
        if (!res.ok) {
          // fetch失敗（private等）はDevinボタンのみ
          inlineContainer.appendChild(createButton('Devin', devinUrl));
        } else {
          const repoInfo = await res.json();
          if (!repoInfo) return;
          if (repoInfo.private) {
            inlineContainer.appendChild(createButton('DevinWiki', devinUrl));
          } else {
            inlineContainer.appendChild(createButton('DeepWiki', deepwikiUrl));
            inlineContainer.appendChild(createButton('GitMCP', gitmcpUrl));
          }
        }
        repoHeader.parentElement.appendChild(inlineContainer);
      }
    });
})();
