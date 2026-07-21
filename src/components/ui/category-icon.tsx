import {
  AirVent, AppWindow, Armchair, Axe, Baby, Bed, BedDouble, Bone, Brush,
  Cable, Cctv, Coffee, CookingPot, Cuboid, DoorClosed, DoorOpen, Drill,
  Dumbbell, Fan, Flower2, Grid3x3, Hammer, HandMetal, Heater, House,
  Lamp, LampCeiling, LampDesk, LayoutGrid, LayoutPanelTop, Microwave,
  Package, PaintRoller, PaintBucket, Paintbrush, PawPrint, PlugZap,
  Refrigerator, Shirt, ShowerHead, Sofa, Speaker, SprayCan, Square, Sun,
  ToyBrick, TreePine, Tv, Umbrella, Utensils, UtensilsCrossed, WashingMachine,
  Wallpaper, Wrench, type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

/**
 * Resolves the icon names stored in categories.json to lucide components.
 * JSON stays serializable (plain strings); only this file knows about React.
 * Unknown names fall back to LayoutGrid instead of crashing.
 */
const ICONS: Record<string, LucideIcon> = {
  "air-vent": AirVent, "app-window": AppWindow, armchair: Armchair, axe: Axe,
  baby: Baby, bed: Bed, "bed-double": BedDouble, bone: Bone, brush: Brush,
  cable: Cable, cctv: Cctv, coffee: Coffee, "cooking-pot": CookingPot,
  cuboid: Cuboid, "door-closed": DoorClosed, "door-open": DoorOpen,
  drill: Drill, dumbbell: Dumbbell, fan: Fan, "flower-2": Flower2,
  "grid-3x3": Grid3x3, hammer: Hammer, "hand-metal": HandMetal, heater: Heater,
  house: House, lamp: Lamp, "lamp-ceiling": LampCeiling, "lamp-desk": LampDesk,
  "layout-grid": LayoutGrid, "layout-panel-top": LayoutPanelTop,
  microwave: Microwave, package: Package, "paint-roller": PaintRoller,
  "paint-bucket": PaintBucket, paintbrush: Paintbrush, "paw-print": PawPrint,
  "plug-zap": PlugZap, refrigerator: Refrigerator, shirt: Shirt,
  "shower-head": ShowerHead, sofa: Sofa, speaker: Speaker, "spray-can": SprayCan,
  square: Square, sun: Sun, "toy-brick": ToyBrick, "tree-pine": TreePine,
  tv: Tv, umbrella: Umbrella, utensils: Utensils,
  "utensils-crossed": UtensilsCrossed, "washing-machine": WashingMachine,
  wallpaper: Wallpaper, wrench: Wrench,
};

export function CategoryIcon({
  name,
  className,
}: {
  name?: string;
  className?: string;
}) {
  const Icon = (name && ICONS[name]) || LayoutGrid;
  return <Icon className={cn("h-6 w-6", className)} aria-hidden />;
}
