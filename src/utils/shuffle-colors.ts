import { COLORS } from "@/constants/todo";

export const shuffleColors = (lastColor?: string) => {
  if (lastColor && COLORS.includes(lastColor)) {
    const currentIndex = COLORS.indexOf(lastColor);
    const nextIndex = (currentIndex + 1) % COLORS.length;
    return COLORS[nextIndex];
  }

  return COLORS[0];
};