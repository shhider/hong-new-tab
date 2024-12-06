import { renderMarks } from './renderMarks.js';

window.onload = function() {
  const targeFolderID = '1851';
  // todo: 读取 目标书签目录

  // 向浏览器获取 目标书签目录 内的书签列表
  chrome.bookmarks.getSubTree(targeFolderID, (args) => {
    const bookmarks = args[0].children ?? [];
    if (bookmarks.length) {
      renderMarks(bookmarks, document.getElementById('root'));
    } else {
      // todo: 渲染空态
    }
  })
};
