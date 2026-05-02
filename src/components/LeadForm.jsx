import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const SCROLL_THRESHOLD = 0.5;
const FALLBACK_TIMER_MS = 8000; // لو الصفحة قصيرة وما فيش سكرول، نعرض الفورم بعد 8 ثواني

/**
 * Popup lead form for multi-branch Eagle Gym. Appears once per session after
 * the user scrolls past 50% of the page. Includes a branch picker because
 * Eagle has multiple branches.
 *
 * Submits via the `submit_website_lead` RPC which writes to website_leads.
 * Each branch's Fitboost-System polls and pulls only its own leads (or
 * leads with no branch chosen).
 */
export default function LeadForm() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [branches, setBranches] = useState([]);
  const [form, setForm] = useState({ name: '', phone: '', interestedIn: '', branchSlug: '' });

  // Trigger when scroll passes 50%, OR after a fallback timer (whichever comes first).
  // The fallback handles short pages (e.g., the branch picker landing page) where
  // the user can't scroll 50%.
  useEffect(() => {
    const trigger = () => {
      setOpen(true);
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
    };

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      if (scrollTop / docHeight >= SCROLL_THRESHOLD) {
        trigger();
      }
    };

    const timer = setTimeout(trigger, FALLBACK_TIMER_MS);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
    };
  }, []);

  // Fetch branches the moment the popup opens (not on mount, to avoid wasted calls).
  useEffect(() => {
    if (!open || branches.length > 0) return;
    const gymSlug = import.meta.env.VITE_GYM_SLUG;
    if (!gymSlug) return;
    supabase
      .rpc('list_gym_branches', { p_gym_slug: gymSlug })
      .then(({ data, error }) => {
        if (error) {
          console.warn('list_gym_branches error:', error);
          return;
        }
        setBranches(data || []);
      });
  }, [open, branches.length]);

  const close = () => {
    setOpen(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    const name = form.name.trim();
    const phone = form.phone.trim();
    if (!name || !phone) {
      setError('من فضلك ادخل الاسم ورقم التليفون');
      return;
    }

    const gymSlug = import.meta.env.VITE_GYM_SLUG;
    if (!gymSlug) {
      setError('إعداد الموقع غير مكتمل');
      return;
    }

    setSubmitting(true);
    try {
      const { error: rpcError } = await supabase.rpc('submit_website_lead', {
        p_gym_slug: gymSlug,
        p_name: name,
        p_phone: phone,
        p_interested_in: form.interestedIn.trim() || null,
        p_source_path: window.location.pathname,
        p_user_agent: navigator.userAgent.slice(0, 240),
        p_branch_slug: form.branchSlug || null
      });
      if (rpcError) throw rpcError;
      setSubmitted(true);
      setTimeout(close, 2500);
    } catch (err) {
      console.warn('Lead submit error:', err);
      setError('حصل خطأ في الإرسال. حاول تاني.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      onClick={close}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden"
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="إغلاق"
          className="absolute top-3 left-3 text-gray-400 hover:text-gray-700 text-2xl leading-none"
        >
          ×
        </button>

        <div className="bg-gradient-to-l from-red-600 to-red-700 px-6 py-5 text-white">
          <h2 className="text-2xl font-bold">سجّل اهتمامك</h2>
          <p className="text-sm opacity-90 mt-1">سيب لنا اسمك ورقمك وهنرجع لك</p>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="text-5xl mb-3">✅</div>
            <p className="text-lg font-bold text-gray-800">تم الإرسال بنجاح</p>
            <p className="text-sm text-gray-600 mt-1">هنتواصل معاك قريباً</p>
          </div>
        ) : (
          <form onSubmit={submit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الاسم <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none text-gray-800"
                placeholder="مثلاً: أحمد محمد"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                رقم التليفون <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                inputMode="numeric"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none text-gray-800"
                placeholder="01xxxxxxxxx"
                dir="ltr"
              />
            </div>

            {/* Branch picker — only renders if the gym has branches */}
            {branches.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  أقرب فرع ليك
                </label>
                <select
                  value={form.branchSlug}
                  onChange={(e) => setForm({ ...form, branchSlug: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none text-gray-800 bg-white"
                >
                  <option value="">— أي فرع —</option>
                  {branches.map((b) => (
                    <option key={b.id} value={b.slug}>
                      {b.name_ar || b.name_en}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                مهتم بإيه؟
              </label>
              <input
                type="text"
                value={form.interestedIn}
                onChange={(e) => setForm({ ...form, interestedIn: e.target.value })}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none text-gray-800"
                placeholder="مثلاً: اشتراك / مدرب خاص / كلاسات…"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-l from-red-700 to-red-600 hover:from-red-800 hover:to-red-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
            >
              {submitting ? 'جاري الإرسال…' : 'إرسال'}
            </button>

            <p className="text-xs text-gray-500 text-center">
              بياناتك بتروح للفرع مباشرة وهنتواصل معاك بأسرع وقت
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
