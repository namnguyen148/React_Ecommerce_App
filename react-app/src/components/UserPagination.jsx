import Pagination from "react-bootstrap/Pagination";
import queryString from "query-string";

export default function UserPagination({
  loading,
  pages,
  handelSearch,
  totalPage = 0,
}) {
  return (
    <>
      {loading
        ? null
        : totalPage > 1 && (
            <Pagination className="justify-content-center flex-wrap">
              {pages.map((page, index) => (
                <Pagination.Item
                  key={index}
                  onClick={() =>
                    handelSearch(
                      queryString.parseUrl(page.url || "")?.query,
                      "page"
                    )
                  }
                  disabled={page.active}
                >
                  {page.label
                    .replace("&laquo; Trang sau", "<")
                    .replace("Trang trước &raquo;", ">")}
                </Pagination.Item>
              ))}
            </Pagination>
          )}
    </>
  );
}
