"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Pagination } from "@heroui/react";
import TaskFilters from "./TaskFilters";
import TaskCard from "./TaskCard";

export default function TaskListingContainer({ tasks, filters, total }) {
  const [searchQuery, setSearchQuery] = useState(filters.search);
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

    console.log("search params", sp.toString());

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

      <div className="max-w-7xl mx-auto mb-6 text-sm text-zinc-500">
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
          <Pagination className="w-full">
            <Pagination.Summary>
              Showing {startItem}-{endItem} of {totalItems} results
            </Pagination.Summary>
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={page === 1}
                  onPress={() => setPage((p) => p - 1)}
                >
                  <Pagination.PreviousIcon />
                  <span>Previous</span>
                </Pagination.Previous>
              </Pagination.Item>
              {getPageNumbers().map((p, i) =>
                p === "ellipsis" ? (
                  <Pagination.Item key={`ellipsis-${i}`}>
                    <Pagination.Ellipsis />
                  </Pagination.Item>
                ) : (
                  <Pagination.Item key={`page-${p}-${i}`}>
                    <Pagination.Link
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
                  isDisabled={page === totalPages}
                  onPress={() => setPage((p) => p + 1)}
                >
                  <span>Next</span>
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </>
      ) : (
        <div className="text-center py-20 border border-dashed border-zinc-800 rounded-[32px] max-w-7xl mx-auto">
          <p className="text-zinc-500 text-lg">
            No positions match your search criteria.
          </p>
        </div>
      )}
    </>
  );
}
