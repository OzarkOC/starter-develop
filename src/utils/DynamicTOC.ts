export function DynamicTOC() {
  const table = 'Book-pages';
  const bookName = 'Referral Training Program';
  const url = `https://dev--skilled-craftsmen--ozarkoc.autocode.dev/AirtableGetData/?table=${table}&bookName=${encodeURIComponent(
    bookName
  )}`;
  // Checks
  const TOC = document.querySelector("[sc-element='TOC-container']");
  if (!TOC) return;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.sort((a, b) => a.PageNum - b.PageNum);
      let type, titleMod, contentTitle;

      data.forEach((item) => {
        // Set Type for selector
        if (item.LessonTitle.includes('Unit')) {
          type = 'unit';
          titleMod = item.LessonTitle.replace(type);
        } else if (item.LessonTitle.includes('Section')) {
          type = 'section';
          titleMod = item.LessonTitle.replace(new RegExp(type, 'i'), '');
        } else if (item.LessonTitle.includes('Header')) {
          type = 'header';
          titleMod = item.LessonTitle.replace(new RegExp(type, 'i'), '');
        } else {
          type = '';
        }
        // Check if type is valid
        if (type === 'unit' || 'section' || 'header') {
          const clonedSelector = TOC.querySelector(`[element-type='${type}']`)?.cloneNode(true);
          if (!clonedSelector) return;
          clonedSelector.style.display = 'grid';
          clonedSelector.id = item.pageRecID;
          const contentTitle = clonedSelector.querySelector('[sc-element="TOC-title"]');
          if (!contentTitle) return;
          contentTitle.textContent = titleMod;
          const contentPage = clonedSelector.querySelector('[sc-element="TOC-page"]');
          if (!contentPage) return;
          contentPage.textContent = item.PageNum;
          TOC.appendChild(clonedSelector);
        }
      });
      return;
    });
}

// Detect click
// Assuming this code is in DynamicTOC.ts

// Assuming this code is in DynamicTOC.ts

// function handleSelectClick(event: Event) {
// show pop up
// show page content
// when all pages clicked that is before mark quick as unlocked
// Logic to execute when the TOC-Select element or its parent is clicked
//}

//document.addEventListener('click', (event) => {
//   const selectElement = event.target as HTMLElement;

//  const isSelectElement = selectElement.matches("[sc-element='TOC-Select']");
//  const isChildOfSelect = selectElement.closest("[sc-element='TOC-Select']");

//  if (isSelectElement || isChildOfSelect) {
//    handleSelectClick(event);
//  }
// });
