import { generateLink } from "@/utils/url";
import classNames from "classnames";
import Link from "next/link";
import { useMemo } from "react";

const maxPageToShow = 5;

const ThreadPageNav = ({
    pageCount,
    currentPage,
    urlParams,
}: ThreadPageNavProps) => {
    const pageToShow = useMemo(() => {
        const pageToShow = [];
        const halfMaxPageToShow = Math.floor(maxPageToShow / 2);
        const startPage = currentPage - halfMaxPageToShow;
        const endPage = currentPage + halfMaxPageToShow;

        for (
            let i = Math.max(1, startPage);
            i <= Math.min(endPage, pageCount);
            i++
        ) {
            pageToShow.push(i);
        }

        return pageToShow;
    }, [pageCount, currentPage]);

    const previousLink =
        currentPage > 1
            ? generateLink("/thread", {
                  ...urlParams,
                  page: "" + (currentPage - 1),
              })
            : "";

    const nextLink =
        currentPage < pageCount
            ? generateLink("/thread", {
                  ...urlParams,
                  page: "" + (currentPage + 1),
              })
            : "";

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end">
                <li className="page-item">
                    <Link
                        className={classNames("page-link", {
                            disabled: !previousLink,
                        })}
                        href={previousLink}
                    >
                        Previous
                    </Link>
                </li>
                {pageToShow.map((x) => (
                    <li key={x} className="page-item">
                        <Link
                            className={classNames("page-link", {active: x === currentPage})}
                            href={generateLink("/thread", {
                                ...urlParams,
                                page: "" + x,
                            })}
                        >
                            {x}
                        </Link>
                    </li>
                ))}

                <li className="page-item">
                    <Link
                        className={classNames("page-link", {
                            disabled: !nextLink,
                        })}
                        href={nextLink}
                    >
                        Next
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default ThreadPageNav;

export interface ThreadPageNavProps {
    pageCount: number;
    currentPage: number;
    urlParams: { [key: string]: string };
}
