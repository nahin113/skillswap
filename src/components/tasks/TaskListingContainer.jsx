"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Pagination } from "@heroui/react";
import TaskFilters from "./TaskFilters";
import TaskCard from "./TaskCard";

export default function TaskListingContainer({ tasks, filters, total }) {
  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const [selectedCategory, setSelectedCategory] = useState(
    filters.category || "all"
  );
  const [page, setPage] = useState(filters.page || 1);

  const router = useRouter();

  const totalItems = total || 0;
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedCategory]);


  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);
    if (page > 3) {
      pages.push("ellipsis");
    }
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (page < totalPages - 2) {
      pages.push("ellipsis");
    }
    pages.push(totalPages);
    return pages;
  };

  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  useEffect(() => {
    const sp = new URLSearchParams();

    if (searchQuery) {
      sp.set("search", searchQuery);
    }

    if (selectedCategory !== "all") {
      sp.set("category", selectedCategory);
    }

    if (page) {
      sp.set("page", page);
    }


    const path = `?${sp.toString()}`;
    router.push(path, {scroll : false});
  }, [router, searchQuery, selectedCategory, page]);

  return (
    <>
      <TaskFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="max-w-7xl mx-auto mb-6 text-sm font-medium text-zinc-500 px-2">
        Showing {tasks.length} position{tasks.length !== 1 && "s"}
      </div>

      {tasks.length > 0 ? (
        <>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {tasks.map((taskItem) => (
              <TaskCard
                key={taskItem._id?.$oid || taskItem._id}
                task={taskItem}
              />
            ))}
          </div>

          {/* Styled Pagination Controls Wrapper */}
          <Pagination className="w-full mt-10">
            <Pagination.Summary className="text-zinc-500 font-medium text-xs">
              Showing {startItem}-{endItem} of {totalItems} results
            </Pagination.Summary>
            <Pagination.Content className="gap-1 bg-white p-1.5 rounded-xl border border-[#E6DDD4] shadow-sm">
              <Pagination.Item>
                <Pagination.Previous
                  className="text-zinc-600 hover:bg-[#F4EFEA] hover:text-[#1C1E1B] font-bold text-xs px-3 py-1.5 rounded-lg transition-colors"
                  isDisabled={page === 1}
                  onPress={() => setPage((p) => p - 1)}
                >
                  <Pagination.PreviousIcon className="text-zinc-500" />
                  <span>Previous</span>
                </Pagination.Previous>
              </Pagination.Item>

              {getPageNumbers().map((p, i) =>
                p === "ellipsis" ? (
                  <Pagination.Item key={`ellipsis-${i}`}>
                    <Pagination.Ellipsis className="text-zinc-400" />
                  </Pagination.Item>
                ) : (
                  <Pagination.Item key={`page-${p}-${i}`}>
                    <Pagination.Link
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                        p === page
                          ? "bg-[#1C1E1B] text-[#F4EFEA]"
                          : "text-zinc-600 hover:bg-[#F4EFEA] hover:text-[#1C1E1B]"
                      }`}
                      isActive={p === page}
                      onPress={() => setPage(p)}
                    >
                      {p}
                    </Pagination.Link>
                  </Pagination.Item>
                )
              )}

              <Pagination.Item>
                <Pagination.Next
                  className="text-zinc-600 hover:bg-[#F4EFEA] hover:text-[#1C1E1B] font-bold text-xs px-3 py-1.5 rounded-lg transition-colors"
                  isDisabled={page === totalPages}
                  onPress={() => setPage((p) => p + 1)}
                >
                  <span>Next</span>
                  <Pagination.NextIcon className="text-zinc-500" />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </>
      ) : (
        <div className="text-center py-20 bg-white border border-[#E6DDD4] rounded-[32px] max-w-7xl mx-auto shadow-sm">
          <p className="text-zinc-400 text-sm font-medium">
            No positions match your search criteria.
          </p>
        </div>
      )}
    </>
  );
}
