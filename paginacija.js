const rootElement = document.getElementById('root');

// Za sad radi samo ako ima 20 stranica i vise
const numberOfPages = 20;
const pagesBeforeDivision = 5; // At what page does it start to show 1...5...9 10 11...15...20 (before it's 1 2 3 4 pagesBeforeDivision(5)...lastPage)
let currentPage = 10;

const paginationEllipsis = '<span class="m-pagination__ellipsis">... </span>';
const paginationClass = 'm-pagination__page-number';

const createPagination = (numberOfPages, currentPage) => {
  const paginationElement = document.createElement('DIV');
  paginationElement.classList.add('m-pagination');
  const paginationContentsWrapper = document.createElement('DIV');
  paginationContentsWrapper.classList.add('m-pagination__contents-wrapper');

  let paginationContents = '';

  if (numberOfPages >= 20) {
    // If less than DIVISION number
    if (currentPage < pagesBeforeDivision) {
      for (let i = 1; i <= pagesBeforeDivision; i++) {
        paginationContents += `<span class="${paginationClass} ${i === currentPage ? `${paginationClass}--active` : ''}" data-page-number="${i}">${i}</span>`;
      }
      paginationContents += `${paginationEllipsis}<span class="${paginationClass}" data-page-number="${numberOfPages}">${numberOfPages}</span>`;
      // If more than LAST - DIVISION number
    } else if (currentPage > numberOfPages - pagesBeforeDivision + 1) {
      paginationContents += `<span class="${paginationClass}" data-page-number="1">1</span>${paginationEllipsis}`;
      for (let i = numberOfPages - pagesBeforeDivision + 1; i <= numberOfPages; i++) {
        paginationContents += `<span class="${paginationClass} ${i === currentPage ? `${paginationClass}--active` : ''}" data-page-number="${i}">${i}</span>`;
      }
      // In BETWEEN
    } else {
      paginationContents += `
      <span class="${paginationClass}" data-page-number="1">1</span>
      ${paginationEllipsis}
      <span class="${paginationClass}" data-page-number="${Math.round((currentPage - 1) / 2)}">${Math.round((currentPage - 1) / 2)}</span>
      ${paginationEllipsis}
      <span class="${paginationClass}" data-page-number="${currentPage - 1}">${currentPage - 1}</span>
      <span class="${paginationClass} m-pagination__page-number--active" data-page-number="${currentPage}">${currentPage}</span>
      <span class="${paginationClass}" data-page-number="${currentPage + 1}">${currentPage + 1}</span>
      ${paginationEllipsis}
      <span class="${paginationClass}" data-page-number="${Math.round((numberOfPages - currentPage) / 2 + currentPage)}">${Math.round((numberOfPages - currentPage) / 2 + currentPage)}</span>
      ${paginationEllipsis}
      <span class="${paginationClass}" data-page-number="${numberOfPages}">${numberOfPages}</span>`;
    }
    paginationContentsWrapper.innerHTML = paginationContents;
  }

  paginationElement.append(paginationContentsWrapper);
  // Verovatno ne bi trebalo ovo da radim rootu, nego nekom wrapperu koji tu stoji bas za paginaciju...
  rootElement.innerHTML = '';
  rootElement.append(paginationElement);

  // Add event listeners (nisam stavljao js selektore, samo sam ovako direktno za sad)
  const pageNumbers = document.querySelectorAll(`.${paginationClass}`);

  pageNumbers.forEach(current => {
    current.addEventListener('click', (e) => {
      const currentPage = Number(e.target.dataset.pageNumber);
      console.log(e.target.dataset.pageNumber);
      createPagination(numberOfPages, currentPage)
    });
  })
}
createPagination(numberOfPages, currentPage);