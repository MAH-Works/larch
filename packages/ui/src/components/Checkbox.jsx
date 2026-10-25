import { forwardRef, useEffect, useRef } from 'react';

/** Custom-drawn checkbox (native input underneath, so keyboard + a11y keep working). */
const Checkbox = forwardRef(function Checkbox({ indeterminate = false, className = '', ...props }, forwardedRef) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const setRef = (node) => {
    ref.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  return (
    <input
      ref={setRef}
      type="checkbox"
      className={`relative size-[15px] cursor-pointer appearance-none rounded-[4px] border border-[#c9cdd3] bg-white align-middle dark:border-[#56606d] dark:bg-[#151a20]
        checked:border-blue checked:bg-blue
        checked:after:absolute checked:after:left-[3px] checked:after:top-[3px] checked:after:h-1 checked:after:w-[7px] checked:after:-rotate-45 checked:after:border-b-[1.5px] checked:after:border-l-[1.5px] checked:after:border-white
        indeterminate:border-blue indeterminate:bg-blue
        indeterminate:after:absolute indeterminate:after:left-[3px] indeterminate:after:top-[6px] indeterminate:after:h-[1.5px] indeterminate:after:w-[7px] indeterminate:after:bg-white
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue ${className}`}
      {...props}
    />
  );
});

export default Checkbox;
