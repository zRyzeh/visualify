import type { MediaStore } from "@store/mediaStore";
import { createContext } from "react";

export const MediaContext = createContext<MediaStore | null>(null)