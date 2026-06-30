import { Suspense } from "react";
import SignUpPage from "./SignUpPage";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#252825]">
          <div className="text-[#F4EFEA] text-lg">Loading...</div>
        </div>
      }
    >
      <SignUpPage />
    </Suspense>
  );
}
