import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { DarkModeProvider } from "./context/DarkModeContext";
import { auth, onAuthStateChanged } from "./services/firebase";
import { login, logout } from "./features/auth/authSlice";

// Sync Firebase auth state with Redux
onAuthStateChanged(auth, async (user) => {
  if (user && user.emailVerified) {
    const token = await user.getIdToken();
    store.dispatch(login({
      name: user.displayName ?? user.email!.split("@")[0],
      email: user.email!,
      photoURL: user.photoURL ?? undefined,
      emailVerified: true,
      token,
    }));
  } else {
    store.dispatch(logout());
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <DarkModeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DarkModeProvider>
    </Provider>
  </StrictMode>
);
