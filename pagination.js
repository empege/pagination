setPaginationOrder() {
			this.pagination = [];
			if (this.data.totalPages <= 7) {
				for (let i = 1; i <= this.data.totalPages; i++) {
					this.pagination.push(i);
				}
			} else {
				for (let i = 1; i <= 7; i++) {
					const condOne = this.data.page > 4;
					const condTwo = this.data.totalPages - this.data.page < 4;
					switch (i) {
						case 1:
							this.pagination.push(1);
							break;
						case 2:
							this.pagination.push(condOne ? 0 : 2);
							break;
						case 3:
							if (condOne) {
								this.pagination.push(condTwo ? this.data.totalPages - 4 : this.data.page - 1);
							} else {
								this.pagination.push(3);
							}
							break;
						case 4:
							if (condOne) {
								this.pagination.push(condTwo ? this.data.totalPages - 3 : this.data.page);
							} else {
								this.pagination.push(4);
							}
							break;
						case 5:
							if (condOne) {
								this.pagination.push(condTwo ? this.data.totalPages - 2 : this.data.page + 1);
							} else {
								this.pagination.push(5);
							}
							break;
						case 6:
							this.pagination.push(condTwo ? this.data.totalPages - 1 : 0);
							break;
						case 7:
							this.pagination.push(this.data.totalPages);
							break;
						default:
							// some default code
					}
				}
			}
		},

		renderPagination() {
			this.$pageNumberContainer.empty();
			this.$pageNumberMobileContainer.empty();
			this.$paginationContainer.removeClass('hidden');
			this.pagination.forEach((page) => {
				if (page === 0) {
					// eslint-disable-next-line max-len
					const $newPage = $('<div class="m-article-archive__pagination-number m-article-archive__pagination-number--more" data-page-number="0">&hellip;</div>');
					this.$pageNumberContainer.append($newPage);
				} else {
					// eslint-disable-next-line max-len
					const $newPage = $(`<div class="m-article-archive__pagination-number js-page-number${this.data.page === page ? ' m-article-archive__pagination-number--active' : ''}" data-page-number="${page}">${page}</div>`);
					$newPage.on('click', this.changePageNumberClickHandler.bind(this));
					this.$pageNumberContainer.append($newPage);
				}
			});
			this.$pageNumberMobileContainer.append($(
				`<div class="m-article-archive__pagination-mobile-number" >${this.data.page} / ${this.data.totalPages}</div>`
			));
			this.togglePageArrowDisabledHandler();
		},