
import TaskListingContainer from "@/components/tasks/TaskListingContainer";
import { getTasks } from "@/lib/api/tasks";

export default async function Page({ searchParams }) {
  const filters = await searchParams;
  const filterObj = {
    ...filters,
  };

  const querySearch = new URLSearchParams(filters);
  const queryString = querySearch.toString();


  // Fetched server-side on the initial request
const responseData = await getTasks(queryString);

// Safe fallback normalization in case pagination params were stripped out
const tasks = responseData?.tasks || (Array.isArray(responseData) ? responseData : []);
const total = responseData?.total || tasks.length;

  return (
    <div className="w-full min-h-screen bg-[#F4EFEA] p-6 md:p-12 text-[#1C1E1B]">
      <div className="max-w-7xl mx-auto mb-10 border-b border-[#E6DDD4] pb-6">
        <h1 className="text-4xl font-black tracking-tight text-[#1C1E1B]">
          Open Positions
        </h1>
        <p className="text-zinc-500 mt-2 text-sm">
          Discover your next engineering challenge.
        </p>
      </div>

      {/* Pass data to the Client Wrapper to handle filtering interactivity */}
      <TaskListingContainer
        filters={filterObj}
        tasks={tasks || []}
        total={total}
      />
    </div>
  );
}
