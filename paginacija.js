$(function () {

  // Selectors
  const pagination = {
    selectors: {
    },
    stateClasses: {
      pagination: '.m-pagination',
      pageNumber: 'm-pagination__page-number',
    }
  }

  // Elements
  const paginationElement = $(pagination.stateClasses.pagination);

  // Variables
  const numberOfPages = 20;
  const pagesBeforeDivision = 5; // DIVISION number - At what page does it start to show 1...5...9 10 11...15...20 (before it's 1 2 3 4 pagesBeforeDivision(5)...lastPage)
  let currentPage = 10;

  // Render Pagination Function
  const createPagination = (numberOfPages, currentPage) => {
    const paginationContents = $('<div class="m-pagination__contents"></div>');

    if (numberOfPages >= 20) {
      // If less than DIVISION number
      if (currentPage < pagesBeforeDivision) {
        for (let i = 1; i <= pagesBeforeDivision; i++) {
          paginationContents.append(`<span class="${pagination.stateClasses.pageNumber} ${i === currentPage ? `${pagination.stateClasses.pageNumber}--active` : ''}" data-page-number="${i}">${i}</span>`);
        }
        paginationContents.append(`...<span class="${pagination.stateClasses.pageNumber}" data-page-number="${numberOfPages}">${numberOfPages}</span>`);
        // If more than LAST - DIVISION number
      } else if (currentPage > numberOfPages - pagesBeforeDivision + 1) {
        paginationContents.append(`<span class="${pagination.stateClasses.pageNumber}" data-page-number="1">1</span>...`);
        for (let i = numberOfPages - pagesBeforeDivision + 1; i <= numberOfPages; i++) {
          paginationContents.append(`<span class="${pagination.stateClasses.pageNumber} ${i === currentPage ? `${pagination.stateClasses.pageNumber}--active` : ''}" data-page-number="${i}">${i}</span>`);
        }
        // In BETWEEN
      } else {
        paginationContents.html(`
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
        `)
      }
    }
    // Reset contents and rerender
    paginationElement.empty();
    paginationElement.append(paginationContents);

    // Event listener for pagination numbers (Ovo moze gore jedino ako imamo neki placeholder vec u htmlu pa da moze da ga nadje (jer inace ne postoje pageNumberi dok se ne naprave u jsu iznad), i taman da ima nesto dok loaduje npr?)
    const pageNumbers = $(`.${pagination.stateClasses.pageNumber}`);
    pageNumbers.on('click', function () {
      const currentPage = $(this).data('pageNumber');
      createPagination(numberOfPages, currentPage)
    })
  }
  createPagination(numberOfPages, currentPage);
});