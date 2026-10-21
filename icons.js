/* Shared, font-independent UI marks. Inline SVG keeps iOS from choosing emoji. */
window.WorkshopIcons = (() => {
  'use strict';
  const paths=Object.freeze({
    "arrow-up-right":"<path d=\"M5 19 19 5M5 5h14v14\"/>",
    "arrow-down":"<path d=\"M12 4v16m-6-6 6 6 6-6\"/>",
    "arrow-left":"<path d=\"M20 12H4m6-6-6 6 6 6\"/>",
    "arrow-right":"<path d=\"M4 12h16m-6-6 6 6-6 6\"/>",
    "close":"<path d=\"m6 6 12 12M18 6 6 18\"/>",
    "plus":"<path d=\"M12 4v16M4 12h16\"/>",
    "asterisk":"<path d=\"M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4\"/>",
    "copy":"<path d=\"M9 4H4v13h5M9 8h11v13H9z\"/>",
    "reset":"<path d=\"M4 9a8 8 0 1 1 1 9M4 3v6h6\"/>",
    "play":"<path d=\"m7 4 13 8-13 8z\"/>",
    "pause":"<path d=\"M8 4v16M16 4v16\"/>",
    "search":"<circle cx=\"10.5\" cy=\"10.5\" r=\"6.5\"/><path d=\"m15.5 15.5 5 5\"/>",
    "chat":"<path d=\"M5 4h14v12H9l-4 4V4Z\"/><path d=\"M8 8h8M8 12h5\"/>",
    "menu":"<path d=\"M4 8h16M4 16h16\"/>"
  });
  function svg(name,classes=''){
    const safe=String(classes).replace(/[^a-zA-Z0-9 _-]/g,'');
    return `<svg class="ui-icon ${safe}" data-ui-icon="${paths[name]?name:'arrow-up-right'}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name]||paths['arrow-up-right']}</svg>`;
  }
  return Object.freeze({svg,paths});
})();
