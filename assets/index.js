
function loadTargetBookmarks(bmId) {
  // 向浏览器获取指定书签文件夹下的书签列表
  chrome.bookmarks.getSubTree(bmId, function(args) {
    const bookmarks = args[0].children;
    console.log(bookmarks);

    const doms = document.createDocumentFragment();

    const column1 = createDiv('column');
    doms.appendChild(column1);

    const section1 = createSection('置顶');
    column1.appendChild(section1);
    bookmarks
      .filter((bm) => (bm.url != null))
      .sort((a, b) => a.index - b.index)
      .forEach((bm) => {
        section1.appendChild(
          createMark(bm.title, bm.url),
        );
      });

    bookmarks
      .filter((bm) => (bm.url == null))
      .sort((a, b) => a.index - b.index)
      .forEach((folder) => {
        const children = folder.children ?? [];
        if (!children.length) return;

        const column = createDiv('column');
        doms.appendChild(column);

        const elemSection = createSection(folder.title);
        column.appendChild(elemSection);

        // 只读一级目录
        children.forEach((bm) => {
          if (bm.url) {
            elemSection.appendChild(
              createMark(bm.title, bm.url),
            );
          }
        });
      });

    document.getElementById('root').appendChild(doms);
  })
}

function createDiv(className) {
  const elemDiv = document.createElement('div');
  elemDiv.className = className;
  return elemDiv;
}

function createSection(secTitle) {
  const elemSection = createDiv('section');

  const elemSecTitle = document.createElement('p');
  elemSecTitle.className = 'section-title';
  elemSecTitle.textContent = secTitle;
  elemSection.appendChild(elemSecTitle);

  return elemSection;
}

function createMark(title, url) {
  const elemMark = document.createElement('a');
  elemMark.href = url;
  elemMark.className = 'mark';

  const elemTitle = document.createElement('p');
  elemTitle.textContent = title;
  elemTitle.title = title;
  elemTitle.className = 'mark-title';
  elemMark.appendChild(elemTitle);

  const elemURL = document.createElement('p');
  elemURL.textContent = url;
  elemURL.title = url;
  elemURL.className = 'mark-url';
  elemMark.appendChild(elemURL);

  return elemMark;
}


// 当页面加载完成后执行 loadTargetBookmarks
window.onload = function() {
  const targetBookmarkId = '1851';
  loadTargetBookmarks(targetBookmarkId);
};
