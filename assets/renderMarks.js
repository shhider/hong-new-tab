import htm from './htm.js';
import { h } from './h.js';

const html = htm.bind(h);

export function renderMarks(bookmarks, targetDOM) {
  const result = document.createDocumentFragment();

  bookmarks.sort((a, b) => a.index - b.index);

  // 一级书签作为置顶
  const topMarks = createSection('置顶', bookmarks);
  topMarks && result.appendChild(topMarks);

  // 子目录书签
  bookmarks
    .filter((folder) => (folder.url == null)) // folder
    .map((folder) => createSection(folder.title, folder.children))
    .forEach((node) => node && result.appendChild(node));

  targetDOM.appendChild(result);
}

const createSection = (title, marks = []) => {
  const markNodes = marks
    .filter((mark) => (mark.url != null)) // not folder
    .map((mark) => createMark(mark.title, mark.url));

  if (!markNodes.length) {
    return null;
  }
  return html`
    <div class="column">
      <div class="section">
        <p class="section-title">${title}</p>
        ${markNodes}
      </div>
    </div>
  `;
};

const createMark = (title, url) => html`
  <a href="${url}" class="mark">
    <p class="mark-title" title="${title}">${title}</p>
    <p class="mark-url" title="${url}">${url}</p>
  </a>
`;
