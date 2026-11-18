import type { Metadata } from "next";
import { Showcase } from "./Showcase";

export const metadata: Metadata = { title: "Design system" };

/** Vitrine dos tokens e componentes (F-04/F-05). Uso interno de desenvolvimento. */
export default function DevUiPage() {
  return <Showcase />;
}
