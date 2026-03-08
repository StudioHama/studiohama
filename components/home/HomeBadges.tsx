export function HomeBadges() {
  return (
    <div className="mt-16 mb-2">
      <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase text-center mb-6">
        Authorized by
      </p>
      <div className="flex items-center justify-center gap-8 flex-wrap">
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center">
            <span className="text-[10px] text-gray-400 text-center leading-tight px-1">황해도<br />문화재</span>
          </div>
          <p className="text-[10px] text-gray-400 text-center leading-tight">
            황해도<br />무형문화재 제3호
          </p>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <div className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center">
            <span className="text-[10px] text-gray-400 text-center leading-tight px-1">삼척시립<br />합창단</span>
          </div>
          <p className="text-[10px] text-gray-400 text-center leading-tight">
            삼척시립<br />합창단
          </p>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <div className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center">
            <span className="text-[10px] text-gray-400 text-center leading-tight px-1">김포<br />오페라단</span>
          </div>
          <p className="text-[10px] text-gray-400 text-center leading-tight">
            김포<br />오페라단
          </p>
        </div>
      </div>
    </div>
  );
}
