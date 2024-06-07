// src/utils/sort.js
export const sortData = (data, sortType) => {
    switch (sortType) {
        case 'latest':
            return [...data].sort((a, b) => b.timestamp - a.timestamp); // 최신순: 큰 timestamp가 먼저
        case 'oldest':
            return [...data].sort((a, b) => a.timestamp - b.timestamp); // 오래된 순: 작은 timestamp가 먼저
        case 'mostComments':
            return [...data].sort((a, b) => (b.commentsCount || 0) - (a.commentsCount || 0)); // 댓글 수 정렬
        default:
            return data;
    }
};

export const filterData = (data, category) => {
    if (category === 'total') return data;
    return data.filter(item => item.category === category);
};

export const filterAndSortData = (data, category, sortType) => {
    const filteredData = filterData(data, category);
    return sortData(filteredData, sortType);
};
