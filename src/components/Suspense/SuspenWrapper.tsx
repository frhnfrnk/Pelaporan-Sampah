// SuspenseWrapper.js
import { Suspense } from "react";

const SuspenseWrapper = ({ children }: any) => {
  return (
    <Suspense
      fallback={
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default SuspenseWrapper;
