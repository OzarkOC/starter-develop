export function booklearn() {
  let currentPage = '1'; // set current page default to 1
  const modal = document.querySelector<HTMLDivElement>('div[sc-textbook="modal"]'); // find the modal
  let leftheadDefault = '';
  let rightheadDefault = '';

  if (!modal) return;
  let currentContent = modal.querySelector(`[sc-textbook-page='${currentPage}']`);
  const prevbtn = modal.querySelector<HTMLButtonElement>('[sc-textbook="prev-btn"]');
  const nextbtn = modal.querySelector<HTMLButtonElement>('[sc-textbook="next-btn"]');
  const prevbtnAlertDefault = modal.hasAttribute('prevbtn-alert-default')
    ? modal.getAttribute('prevbtn-alert-default')
    : 'false';
  const prevbtnAlertTxt = modal.hasAttribute('prevbtn-alert-txt-default')
    ? modal.getAttribute('prevbtn-alert-txt-default')
    : 'Are you sure you want to go back?';
  const nxtbtnAlertDefault = modal.hasAttribute('nxtbtn-alert-default')
    ? modal.getAttribute('nxtbtn-alert-default')
    : 'false';
  const nxtbtnAlertTxt = modal.hasAttribute('nxtbtn-alert-txt-default')
    ? modal.getAttribute('nxtbtn-alert-txt-default')
    : 'Are you sure you want to continue?';
  // const nxtbtnAlertDefault = modal.hasAttribute('nxtbtn-alert-default')
  //   ? modal.getAttribute('nxtbtn-alert-default')
  //   : 'false';
  if (!prevbtn || !nextbtn || !currentContent) return;
  // set default text to whatever it is on webflow
  const nxtbtnDefault = nextbtn.textContent;
  const prevbtnDefault = prevbtn.textContent;

  const screensArray = Array.from(modal.querySelectorAll<HTMLDivElement>('div[sc-textbook-page]')); // store array of pages
  if (!screensArray || !screensArray.length) return;
  // hide all screens that are not current page
  hidescreen();
  // set where the page display is
  const pageDisplay = modal.querySelector<HTMLTextAreaElement>("[sc-textbook='pagedisplay']");
  // update the display to show the current page If it exists
  if (pageDisplay) updatePageDisplay();
  const progressBar = modal.querySelector<HTMLDivElement>("[sc-textbook='progressbar']");
  // update the display to show the current page If it exists
  if (progressBar) updatePageProgress();
  // Set and display leftheader and Rightheader
  // Check if their is an attribute to set default head?
  if (modal.hasAttribute('sc-lefthead-default')) {
    leftheadDefault = modal.getAttribute('sc-lefthead-default');
    // console.log(leftheadDefault);
  }
  if (modal.hasAttribute('sc-righthead-default')) {
    rightheadDefault = modal.getAttribute('sc-righthead-default');
    // console.log(rightheadDefault);
  }
  // set attributes to text elements if they exist
  updatehead();
  updateBTNdisplay();
  // Now lets turn some pages
  nextbtn.addEventListener('click', () => {
    const hasAtt = currentContent.hasAttribute('sc-nxtbtn-alert');
    let alertStatus;
    if (!hasAtt) {
      alertStatus = nxtbtnAlertDefault;
    } else {
      alertStatus = currentContent.getAttribute('sc-nxtbtn-alert');
    }
    if (alertStatus === true || alertStatus === 'true') {
      const result = confirm(`${nxtbtnAlertTxt}`);
      if (result) {
        nextPage();
      }
    } else nextPage();
  });
  prevbtn.addEventListener('click', () => {
    const hasAtt = currentContent.hasAttribute('sc-prevbtn-alert');
    let alertStatus;
    if (!hasAtt) {
      alertStatus = prevbtnAlertDefault;
    } else {
      alertStatus = currentContent.getAttribute('sc-prevbtn-alert');
    }
    if (alertStatus === true || alertStatus === 'true') {
      const result = confirm(`${prevbtnAlertTxt}`);
      if (result) {
        prevPage();
      }
    } else prevPage();

    //console.log(currentPage);
  });
  // ----------------- FUNCTIONS -------------------------
  function prevPage() {
    currentPage--;
    currentContent = modal.querySelector(`[sc-textbook-page='${currentPage}']`);
    hidescreen();
    updateBTNdisplay();
    updatehead();
    updatePageDisplay();
    updatePageProgress();
  }
  function nextPage() {
    currentPage++;
    currentContent = modal.querySelector(`[sc-textbook-page='${currentPage}']`);
    hidescreen();
    updateBTNdisplay();
    updatehead();
    updatePageDisplay();
    updatePageProgress();
  }
  // update Btn Display
  function updateBTNdisplay() {
    console.log(currentPage);
    // check if page is page 1
    //let nxtbtntext
    if (currentPage < screensArray.length && Number(currentPage) > 1) {
      prevbtn.style.display = 'block';
      nextbtn.style.display = 'block';
      nextbtn.textContent = currentContent.hasAttribute('sc-nxtbtn-txt')
        ? currentContent.getAttribute('sc-nxtbtn-txt')
        : nxtbtnDefault;
      prevbtn.textContent = currentContent.hasAttribute('sc-prevbtn-txt')
        ? currentContent.getAttribute('sc-prevbtn-txt')
        : prevbtnDefault;
    }
    if (currentPage === 1 || currentPage === '1') {
      prevbtn.style.display = 'none';
      nextbtn.textContent = currentContent.hasAttribute('sc-nxtbtn-txt')
        ? currentContent.getAttribute('sc-nxtbtn-txt')
        : nxtbtnDefault;
    } // it is equal to screenArray.length
    else if (currentPage === screensArray.length) {
      nextbtn.style.display = 'none';
      prevbtn.style.display = 'block';
      prevbtn.textContent = currentContent.hasAttribute('sc-prevbtn-txt')
        ? currentContent.getAttribute('sc-prevbtn-txt')
        : prevbtnDefault;
    }
  }
  // Update page number dsisplay
  function updatePageDisplay() {
    pageDisplay.textContent = currentPage;
    //update progress bar
  }
  function updatePageProgress() {
    const progress = (Number(currentPage) / screensArray.length) * 100;
    progressBar.style.width = `${progress}%`; // Adding % unit for width
  }
  // Update Header Display
  function updatehead() {
    const lefthead = modal.querySelector('[sc-textbook="lefthead"]');
    const righthead = modal.querySelector('[sc-textbook="righthead"]');

    if (righthead) {
      if (currentContent.hasAttribute('sc-rightHead-txt'))
        // set new default for righthead
        rightheadDefault = currentContent.getAttribute('sc-rightHead-txt');
      righthead.textContent = rightheadDefault;
    }

    // IF heads exist ... set to default... else do nothig
    // if newheadexist and head exist set to newhead.
    if (lefthead) {
      if (currentContent.hasAttribute('sc-leftHead-txt'))
        // set new default for lefthead
        leftheadDefault = currentContent.getAttribute('sc-leftHead-txt');
      lefthead.textContent = leftheadDefault;
    }
  }
  // Update the right header
  //modal.querySelector<HTMLTextAreaElement>("[sc-textbook='pagedisplay']")?.textContent =
  //currentPage; // Updated page#

  //const totalpages = screensArray.length;
  // const container = document.querySelector(`div[sc-textbook-page='${currentPage}']`);

  // container.querySelector('[sc-textbook="totalpage"]').textContent = totalpages;
  // const nxtBtn = container.querySelector("[sc-textbook='next-btn']");
  // //   const initialnxtbtn = container.querySelector("[sc-textbook='next-btn']");
  // //   let initialprevbtn = null;
  // if (!container || !nxtBtn) return;

  // nxtBtn.addEventListener('click', () => {
  //   currentPage++;
  //   hidescreen(screensArray, currentPage);
  //   container = document.querySelector(`div[sc-textbook-page='${currentPage}']`);
  //   nxtbtn = container.querySelector("[sc-textbook='next-btn']");
  //   if (!container || !nxtBtn) return;
  //   changeNxtBtn(nxtBtn);
  // });

  //   let nextBtnClickHandler; // Declare nextBtnClickHandler here

  //   initialnxtbtn.addEventListener('click', function () {
  //     currentPage = (parseInt(currentPage, 10) + 1).toString();
  //     container = document.querySelector(`div[sc-textbook-page='${currentPage}']`);
  //     hidescreen(screensArray, currentPage);
  //     updateNextBtnEvent(currentPage);

  //     initialprevbtn = container.querySelector("[sc-textbook='prev-btn']");
  //     //console.log(initialprevbtn);
  //     return initialprevbtn;
  //   });
  //   //if (!initialprevbtn) return;
  //   console.log(initialprevbtn);

  function hidescreen() {
    screensArray.forEach((screen) => {
      const pageNumber = screen.getAttribute('sc-textbook-page');
      screen.style.display = pageNumber !== String(currentPage) ? 'none' : 'block';
    });
  }

  //   function updateNextBtnEvent(currentPage) {
  //     const container = document.querySelector(`div[sc-textbook-page='${currentPage}']`);
  //     const nxtbtn = container.querySelector("[sc-textbook='next-btn']");
  //     if (!nxtbtn) return;
  //     // Remove existing event listener if any
  //     nxtbtn.removeEventListener('click', nextBtnClickHandler);

  //     // Define a new function for the updated event listener
  //     nextBtnClickHandler = function () {
  //       currentPage = (parseInt(currentPage, 10) + 1).toString();
  //       hidescreen(screensArray, currentPage);
  //       updateNextBtnEvent(currentPage); // Update the event listener again
  //     };

  //     // Add the updated event listener
  //     nxtbtn.addEventListener('click', nextBtnClickHandler);
  //   }
  //   function updatePrevBtnEvent(currentPage) {
  //     const container = document.querySelector(`div[sc-textbook-page='${currentPage}']`);
  //     const prevbtn = container.querySelector("[sc-textbook='prev-btn']");
  //     if (!prevbtn) return;
  //     // Remove existing event listener if any
  //     prevbtn.removeEventListener('click', prevBtnClickHandler);

  //     // Define a new function for the updated event listener
  //     prevtBtnClickHandler = function () {
  //       currentPage = (parseInt(currentPage, 10) + 1).toString();
  //       hidescreen(screensArray, currentPage);
  //       updateNextBtnEvent(currentPage); // Update the event listener again
  //     };

  //     // Add the updated event listener
  //     prevbtn.addEventListener('click', prevBtnClickHandler);
  //   }
}
