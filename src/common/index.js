/**
 * Calculates current page and total pages of a list
 * @param  {Object} links - links object returned by api
 * @returns {Object} An Object containing totalPages and currentPage values
 */
const calculatePages = links => {
  let totalPages = 1;
  let currentPage = 1;

  if (links.pages) {
    if (links.pages.next) {
      const nextPage = new URL(links.pages.next).searchParams.get('page');
      currentPage = Number(nextPage) - 1;
    } else if (links.pages.prev && !links.pages.next) {
      const prevPage = new URL(links.pages.prev).searchParams.get('page');
      currentPage = Number(prevPage) + 1;
    }

    if (links.pages.last) {
      const lastPage = new URL(links.pages.last).searchParams.get('page');
      totalPages = Number(lastPage);
    } else if (links.pages.prev && !links.pages.last) {
      const prevPage = new URL(links.pages.prev).searchParams.get('page');
      totalPages = Number(prevPage) + 1;
    }
  }
  return {totalPages, currentPage};
};

/**
 * Calculates cost and hours of a resource
 * @param  {Date} createdAt - The created_At time of a resource
 * @param  {number} hourlyPrice - The hourly price of a resource
 * @returns {Object} An object containing totalCost and totalHours
 */
const calculateCostAndHours = (createdAt, hourlyPrice) => {
  const createdDate = new Date(createdAt);
  const totalHours = Math.ceil(Math.abs(Date.now() - createdDate) / 36e5);
  const totalCost = totalHours * hourlyPrice;
  return {totalCost, totalHours};
};

module.exports = {
  calculatePages,
  calculateCostAndHours
};
