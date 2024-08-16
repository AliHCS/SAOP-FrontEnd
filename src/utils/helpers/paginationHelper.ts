export const paginate = (pagination:any = {}, page:number = 1, count:number = 0): any => {
    pagination.total = count
    pagination.total_pages = Math.ceil(count / pagination.page_size)
    pagination.page = page
    pagination.previous_page = page > 1 ? page - 1 : 1
    pagination.next_page = page < pagination.total_pages ? page + 1 : pagination.total_pages
    return pagination
}