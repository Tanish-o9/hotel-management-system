import { useEffect } from "react";
import { FaCheckCircle, FaInfoCircle, FaTimesCircle, FaTimes } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { removeNotification } from "../../features/notifications/notificationsSlice";

const icons = {
  success: <FaCheckCircle className="text-green-500" />,
  info: <FaInfoCircle className="text-blue-500" />,
  error: <FaTimesCircle className="text-red-500" />,
};

const ToastContainer = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((s) => s.notifications);

  useEffect(() => {
    const timers = items.map((n) => setTimeout(() => dispatch(removeNotification(n.id)), 4000));
    return () => timers.forEach(clearTimeout);
  }, [items, dispatch]);

  return (
    <div className="fixed right-4 top-20 z-[200] flex flex-col gap-3">
      {items.map((n) => (
        <div key={n.id} className="flex min-w-[280px] items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-xl dark:border-slate-700 dark:bg-slate-800">
          {icons[n.type]}
          <span className="flex-1 text-sm font-medium text-slate-800 dark:text-white">{n.message}</span>
          <button onClick={() => dispatch(removeNotification(n.id))} className="text-slate-400 hover:text-slate-600"><FaTimes size={12} /></button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
