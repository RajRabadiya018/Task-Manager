// ============================================
// store/provider.tsx
// Redux Provider wrapper for Next.js.
// This is a CLIENT component — wraps the app
// so all child components can access the Redux store.
// ============================================

"use client"; // Required — Provider uses React context (client-only)

import { store } from "@/store"; // Import from store/index.ts
import { Provider } from "react-redux";

/**
 * ReduxProvider — wraps children with the Redux Provider.
 * Used in the root layout to make the store available everywhere.
 */
export default function ReduxProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return <Provider store={store}>{children}</Provider>;
}
