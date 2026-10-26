import type { ReactNode } from 'react';

/** Centered, padded content column for every inner page. `max` is a Tailwind max-width class. */
export function PageWrap({ children, className = '', max = 'max-w-[1600px]' }: { children?: ReactNode; className?: string; max?: string }) {
  return (
    <div
      className={`mx-auto w-full ${max} px-[33px] pb-11 pt-[29px] tablet:px-5 mobile:px-[13px] mobile:pb-[30px] mobile:pt-[21px] ${className}`}
    >
      {children}
    </div>
  );
}

/** Eyebrow + H1 + description, with page actions (children) aligned right. */
export interface PageHeadingProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

export function PageHeading({ eyebrow, title, description, children }: PageHeadingProps) {
  return (
    <div className="mb-6 flex items-end justify-between gap-[18px] mobile:flex-col mobile:items-start mobile:gap-[13px]">
      <div>
        {eyebrow && (
          <p className="mb-2 mt-0 text-[11px] font-semibold uppercase tracking-[.13em] text-[#999da5] dark:text-[#7f8895]">
            {eyebrow}
          </p>
        )}
        <h1 className="m-0 text-2xl font-[650] leading-[1.1] tracking-[-.045em] text-ink mobile:text-[22px]">{title}</h1>
        {description && <p className="mb-0 mt-[7px] text-[13px] text-muted">{description}</p>}
      </div>
      {children && (
        <div className="flex items-center gap-2 mobile:w-full mobile:*:flex-1 mobile:*:justify-center">{children}</div>
      )}
    </div>
  );
}
