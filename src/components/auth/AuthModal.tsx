import { useState } from "react";
import { FaTimes, FaGoogle, FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeAuth, login, openAuth, setLoading, setError } from "../../features/auth/authSlice";
import { addNotification } from "../../features/notifications/notificationsSlice";
import {
  auth, googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  signOut,
} from "../../services/firebase";

const AuthModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen, mode, loading, error } = useAppSelector((s) => s.auth);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  if (!isOpen) return null;

  const handleGoogle = async () => {
    dispatch(setLoading(true));
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const u = result.user;
      const token = await u.getIdToken();
      dispatch(login({
        name: u.displayName ?? u.email!.split("@")[0],
        email: u.email!,
        photoURL: u.photoURL ?? undefined,
        emailVerified: u.emailVerified,
        token,
      }));
      dispatch(addNotification({ message: `Welcome, ${u.displayName ?? "User"}! 🎉`, type: "success" }));
    } catch (e: any) {
      dispatch(setError(e.message));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      if (mode === "register") {
        const result = await createUserWithEmailAndPassword(auth, form.email, form.password);
        await updateProfile(result.user, { displayName: form.name });
        await sendEmailVerification(result.user);
        setVerificationSent(true);
        await signOut(auth);
        dispatch(setLoading(false));
        dispatch(addNotification({ message: "Verification email sent! Please check your inbox.", type: "info" }));
      } else {
        const result = await signInWithEmailAndPassword(auth, form.email, form.password);
        const u = result.user;
        if (!u.emailVerified) {
          await sendEmailVerification(u);
          await signOut(auth);
          dispatch(setError("Email not verified. A new verification email has been sent."));
          return;
        }
        const token = await u.getIdToken();
        dispatch(login({
          name: u.displayName ?? form.email.split("@")[0],
          email: u.email!,
          photoURL: u.photoURL ?? undefined,
          emailVerified: true,
          token,
        }));
        dispatch(addNotification({ message: `Welcome back! 🎉`, type: "success" }));
      }
    } catch (e: any) {
      const msg: Record<string, string> = {
        "auth/user-not-found": "No account found with this email.",
        "auth/wrong-password": "Incorrect password.",
        "auth/email-already-in-use": "Email already registered.",
        "auth/weak-password": "Password must be at least 6 characters.",
        "auth/invalid-credential": "Invalid email or password.",
      };
      dispatch(setError(msg[e.code] ?? e.message));
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      await sendPasswordResetEmail(auth, form.email);
      setResetSent(true);
      dispatch(setLoading(false));
      dispatch(addNotification({ message: "Password reset email sent!", type: "info" }));
    } catch (e: any) {
      dispatch(setError("No account found with this email."));
    }
  };

  const close = () => {
    dispatch(closeAuth());
    setForm({ name: "", email: "", password: "" });
    setVerificationSent(false);
    setResetSent(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl dark:bg-slate-900">
        <button onClick={close} className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
          <FaTimes />
        </button>

        {/* Verification sent screen */}
        {verificationSent ? (
          <div className="text-center py-4">
            <FaEnvelope className="mx-auto mb-4 text-4xl text-amber-500" />
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">Check your inbox</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              We sent a verification link to <strong>{form.email}</strong>. Verify your email then sign in.
            </p>
            <button onClick={() => { setVerificationSent(false); dispatch(openAuth("login")); }}
              className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-amber-600 dark:bg-amber-600">
              Go to Sign In
            </button>
          </div>
        ) : resetSent ? (
          <div className="text-center py-4">
            <FaEnvelope className="mx-auto mb-4 text-4xl text-amber-500" />
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">Reset email sent</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Check <strong>{form.email}</strong> for a password reset link.
            </p>
            <button onClick={() => { setResetSent(false); dispatch(openAuth("login")); }}
              className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-amber-600 dark:bg-amber-600">
              Back to Sign In
            </button>
          </div>
        ) : mode === "forgot" ? (
          <>
            <h2 className="mb-2 text-2xl font-black text-slate-900 dark:text-white">Reset Password</h2>
            <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">Enter your email to receive a reset link.</p>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-amber-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
              {error && <p className="text-xs text-red-500">{error}</p>}
              <button type="submit" disabled={loading}
                className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-amber-600 dark:bg-amber-600 disabled:opacity-60">
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-slate-500">
              <button onClick={() => dispatch(openAuth("login"))} className="font-semibold text-amber-600 hover:underline">Back to Sign In</button>
            </p>
          </>
        ) : (
          <>
            <h2 className="mb-6 text-2xl font-black text-slate-900 dark:text-white">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h2>

            {/* Google */}
            <button onClick={handleGoogle} disabled={loading}
              className="mb-4 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 disabled:opacity-60">
              <FaGoogle className="text-red-500" /> Continue with Google
            </button>

            <div className="mb-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
              <span className="text-xs text-slate-400">or</span>
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "register" && (
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-400">Full Name</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-amber-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                </div>
              )}
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-400">Email</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-amber-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-400">Password</label>
                <div className="relative">
                  <input type={showPass ? "text" : "password"} required value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-11 text-sm outline-none focus:border-amber-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPass ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  </button>
                </div>
              </div>

              {mode === "login" && (
                <div className="text-right">
                  <button type="button" onClick={() => dispatch(openAuth("forgot"))}
                    className="text-xs font-semibold text-amber-600 hover:underline">
                    Forgot password?
                  </button>
                </div>
              )}

              {error && <p className="text-xs text-red-500">{error}</p>}

              <button type="submit" disabled={loading}
                className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500 disabled:opacity-60">
                {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button onClick={() => dispatch(openAuth(mode === "login" ? "register" : "login"))}
                className="font-semibold text-amber-600 hover:underline">
                {mode === "login" ? "Register" : "Sign In"}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
