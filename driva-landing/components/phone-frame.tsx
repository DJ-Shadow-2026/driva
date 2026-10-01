import { CircleUserRound, Compass, House, Warehouse } from "lucide-react";
import { copy } from "@/content/copy";
import { DrivaMark } from "./logo";

const TAB_ICONS = [House, Compass, null, Warehouse, CircleUserRound] as const;

/** The app's bottom tab bar, with the raised orange Drive button. */
function TabBar() {
  return (
    <div className="absolute inset-x-0 bottom-0 z-10 border-t border-graphite bg-asphalt/95 pb-5 backdrop-blur">
      <ul className="grid grid-cols-5 items-end px-1 pt-2">
        {copy.ui.tabs.map((label, i) => {
          const Icon = TAB_ICONS[i];
          const active = i === 0;
          if (!Icon) {
            return (
              <li key={label} className="flex flex-col items-center">
                <span className="-mt-7 mb-1 flex h-[54px] w-[54px] items-center justify-center rounded-full bg-signal shadow-[0_0_0_5px_var(--asphalt),0_8px_28px_rgba(255,106,0,0.45)]">
                  <DrivaMark tone="asphalt" className="h-[26px] w-[26px]" />
                </span>
                <span className="text-[10.5px] font-medium text-chalk/80">{label}</span>
              </li>
            );
          }
          return (
            <li key={label} className="flex flex-col items-center gap-1">
              <Icon
                className={`h-[21px] w-[21px] ${active ? "text-signal" : "text-fog"}`}
                strokeWidth={1.8}
                aria-hidden="true"
              />
              <span className={`text-[10.5px] font-medium ${active ? "text-chalk" : "text-fog"}`}>
                {label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * A modern phone silhouette: 44px outer radius, thin graphite bezel,
 * dynamic island. Children render in a scroll-locked viewport.
 */
export function PhoneFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[9/19.2] w-full rounded-phone bg-[#1d1f23] p-[9px] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(255,255,255,0.08)] ${className}`}
    >
      {/* Side buttons */}
      <span className="absolute top-[22%] -left-[2px] h-[7%] w-[3px] rounded-l bg-[#24262b]" />
      <span className="absolute top-[31%] -left-[2px] h-[7%] w-[3px] rounded-l bg-[#24262b]" />
      <span className="absolute top-[26%] -right-[2px] h-[11%] w-[3px] rounded-r bg-[#24262b]" />

      <div className="relative h-full w-full overflow-hidden rounded-screen bg-asphalt ring-1 ring-graphite">
        {/* Dynamic island */}
        <span className="absolute top-[11px] left-1/2 z-20 h-[26px] w-[31%] -translate-x-1/2 rounded-full bg-black" />

        <div className="h-full overflow-hidden overscroll-none pt-[46px]">
          <div className="flex items-center justify-between border-b border-graphite/70 px-4 pb-2.5">
            <DrivaMark className="h-[22px] w-[22px]" />
          </div>
          {children}
        </div>

        <TabBar />
      </div>
    </div>
  );
}
