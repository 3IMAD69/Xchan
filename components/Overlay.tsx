import { PropsWithChildren } from "react";

export const Overlay = ({ children }: PropsWithChildren) => {
  return (
    // <div className="absolute left-0 bottom-0 p-2 w-full min-h-24 text-sm text-slate-300 z-50 bg-black/50">
    //   {children}
    // </div>
    <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-black/40 border-t border-white/10 transition-all duration-300 z-50">
      <div className="cursor-pointer p-4 text-white/90 font-medium text-sm md:text-base max-w-4xl">
        {children}
      </div>
    </div>
  );
};
