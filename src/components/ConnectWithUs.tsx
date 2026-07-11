import { useState } from "react";

const ConnectWithUs = () => {
  const [form, setForm] = useState({ first: "", last: "", email: "", message: "" });

  return (
    <section className="bg-slate-50 py-20 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Connect with Us</h2>
            <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
              Have any queries or need assistance? Feel free to reach out to us. We are here to ensure your stay is filled with joy and delight.
            </p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-400">First name *</label>
                <input type="text" value={form.first} onChange={(e) => setForm({ ...form, first: e.target.value })}
                  className="w-full border-b border-slate-300 bg-transparent py-2 text-sm text-slate-900 outline-none focus:border-amber-500 dark:border-slate-600 dark:text-white" required />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-400">Last name *</label>
                <input type="text" value={form.last} onChange={(e) => setForm({ ...form, last: e.target.value })}
                  className="w-full border-b border-slate-300 bg-transparent py-2 text-sm text-slate-900 outline-none focus:border-amber-500 dark:border-slate-600 dark:text-white" required />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-400">Email *</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border-b border-slate-300 bg-transparent py-2 text-sm text-slate-900 outline-none focus:border-amber-500 dark:border-slate-600 dark:text-white" required />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-400">Message</label>
              <textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full resize-none border-b border-slate-300 bg-transparent py-2 text-sm text-slate-900 outline-none focus:border-amber-500 dark:border-slate-600 dark:text-white" />
            </div>
            <button type="submit" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ConnectWithUs;
