import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AuthModal from "../auth/AuthModal";
import ToastContainer from "../notifications/ToastContainer";
import ChatBot from "../ChatBot";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
    <AuthModal />
    <ToastContainer />
    <ChatBot />
  </div>
);

export default Layout;
