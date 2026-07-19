export default function LogoLoader() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-black text-white">
      <img
        src="/xchan_logo.png"
        alt="Xchan logo"
        className="h-28 w-28 animate-[spin_2.5s_linear_infinite]"
      />

      {/* <p className="animate-pulse font-mono text-xs tracking-[0.35em] text-gray-500">
        LOADING
      </p> */}
    </div>
  );
}
