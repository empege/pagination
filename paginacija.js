$(function () {

  // Selectors
  const pagination = {
    selectors: {
    },
    stateClasses: {
      pagination: '.m-pagination',
      pageNumber: 'm-pagination__page-number',
      pageNumberActive: 'm-pagination__page-number--active',
    }
  }

  // Elements
  const paginationElement = $(pagination.stateClasses.pagination);

  // Variables
  const numberOfPages = 20; //NUMBER_OF_PAGES - Try 5, 10, 100
  const pagesBeforeDivision = 5; // DIVISION_NUMBER
  let currentPage = 1; // CURRENT_PAGE_NUMBER

  // My create element function
  const myCreateElement = (data) => {
    // Get tag
    const tag = data.tag.toUpperCase();
    // Create element
    const element = document.createElement(tag);
    // Add content
    element.innerText = data.contents ? data.contents : null;
    // Add class(es)
    if (data.classes) {
      if (typeof data.classes === 'object') {
        data.classes.forEach((currentClass) => {
          currentClass && element.classList.add(currentClass);
        });
      } else {
        element.classList.add(data.classes);
      }
    }
    // Add dataset(s)
    if (data.dataset) {
      data.dataset.forEach((currentDataset) => {
        const [key, value] = Object.entries(currentDataset)[0];
        element.dataset[key] = value;
      })
    }
    return element;
  }

  // Get output if NUMBER_OF_PAGES is too low (NUMBER_OF_PAGES and DIVISION_NUMBER + 1 are the same)
  const simplePaginationOutput = (currentPage) => {
    for (let i = 1; i <= numberOfPages; i++) {
      paginationElement.append(
        myCreateElement(
          {
            tag: 'span',
            contents: i,
            classes: [
              pagination.stateClasses.pageNumber,
              i === currentPage && pagination.stateClasses.pageNumberActive,
            ],
            dataset: [
              { pageNumber: i }, // Ovaj camelCase se automatsi pretvori u hyphen-hyphen :)
            ]
          })
      );
    }
  }

  // Get output if CURRENT_PAGE_NUMBER is less than DIVISION_NUMBER
  const startingPagesOutput = (currentPage) => {
    for (let i = 1; i <= pagesBeforeDivision; i++) {
      paginationElement.append(`<span class="${pagination.stateClasses.pageNumber} ${i === currentPage ? `${pagination.stateClasses.pageNumber}--active` : ''}" data-page-number="${i}">${i}</span>`);
    }
    paginationElement.append(`...<span class="${pagination.stateClasses.pageNumber}" data-page-number="${numberOfPages}">${numberOfPages}</span>`);
  }

  // Get output if CURRENT_PAGE_NUMBER is more than LAST_PAGE - DIVISION_NUMBER
  const endingPagesOutput = (currentPage) => {
    paginationElement.append(`<span class="${pagination.stateClasses.pageNumber}" data-page-number="1">1</span>...`);
    for (let i = numberOfPages - pagesBeforeDivision + 1; i <= numberOfPages; i++) {
      paginationElement.append(`<span class="${pagination.stateClasses.pageNumber} ${i === currentPage ? `${pagination.stateClasses.pageNumber}--active` : ''}" data-page-number="${i}">${i}</span>`);
    }
  }

  // Get output for pages in between starting and ending pages - When MORE than minimum amount of pages
  const pagesInBetweenPlus = (currentPage) => {
    paginationElement.append(`
      <span class="${pagination.stateClasses.pageNumber}" data-page-number="1">1</span>
      ...
      <span class="${pagination.stateClasses.pageNumber}" data-page-number="${Math.round((currentPage - 1) / 2)}">${Math.round((currentPage - 1) / 2)}</span>
      ...
      <span class="${pagination.stateClasses.pageNumber}" data-page-number="${currentPage - 1}">${currentPage - 1}</span>
      <span class="${pagination.stateClasses.pageNumber} m-pagination__page-number--active" data-page-number="${currentPage}">${currentPage}</span>
      <span class="${pagination.stateClasses.pageNumber}" data-page-number="${currentPage + 1}">${currentPage + 1}</span>
      ...
      <span class="${pagination.stateClasses.pageNumber}" data-page-number="${Math.round((numberOfPages - currentPage) / 2 + currentPage)}">${Math.round((numberOfPages - currentPage) / 2 + currentPage)}</span>
      ...
      <span class="${pagination.stateClasses.pageNumber}" data-page-number="${numberOfPages}">${numberOfPages}</span>
    `);
  }

  // Get output for pages in between starting and ending pages - When LESS than minimum amount of pages
  const pagesInBetweenMinus = (currentPage) => {
    paginationElement.append(`
      <span class="${pagination.stateClasses.pageNumber}" data-page-number="1">1</span>
      ...
      <span class="${pagination.stateClasses.pageNumber}" data-page-number="${currentPage - 1}">${currentPage - 1}</span>
      <span class="${pagination.stateClasses.pageNumber} m-pagination__page-number--active" data-page-number="${currentPage}">${currentPage}</span>
      <span class="${pagination.stateClasses.pageNumber}" data-page-number="${currentPage + 1}">${currentPage + 1}</span>
      ...
      <span class="${pagination.stateClasses.pageNumber}" data-page-number="${numberOfPages}">${numberOfPages}</span>
    `);
  }

  // Render Pagination Function
  const createPagination = (numberOfPages, currentPage) => {

    // Reset contents and rerender
    paginationElement.empty();

    if (numberOfPages <= pagesBeforeDivision + 1) {
      simplePaginationOutput(currentPage);
    } else if (currentPage < pagesBeforeDivision) {
      startingPagesOutput(currentPage);
    } else if (currentPage > numberOfPages - pagesBeforeDivision + 1) {
      endingPagesOutput(currentPage);
    } else {
      if (numberOfPages >= 20) {
        pagesInBetweenPlus(currentPage);
      } else {
        pagesInBetweenMinus(currentPage);
      }
    }
    // Event listener for pagination numbers
    const pageNumbers = $(`.${pagination.stateClasses.pageNumber}`);
    pageNumbers.on('click', function () {
      const currentPage = $(this).data('pageNumber');
      createPagination(numberOfPages, currentPage)
    })
  }

  createPagination(numberOfPages, currentPage);

});