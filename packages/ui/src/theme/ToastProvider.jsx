import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const ToastContext = createContext({ showToast: () => {} });

/** Global toast: call `showToast('message')` from anywhere under <ToastProvider>. */
export function ToastProvider({ children, duration = 1800 }) {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const timer = useRef();

  const showToast = useCallback(
    (text) => {
      setMessage(text);
      setVisible(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setVisible(false), duration);
    },
    [duration],
  );

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        role="status"
        className={`pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-[7px] bg-[#252a32] px-[14px] py-[10px] text-xs text-white shadow-toast transition duration-200 ease-out ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-[18px] opacity-0'
        }`}
      >
        {message}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
