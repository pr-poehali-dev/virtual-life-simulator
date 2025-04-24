
import { Button } from "@/components/ui/button";
import { Home, Bed, Bath, UtensilsCrossed } from "lucide-react";

type Room = "bedroom" | "bathroom" | "livingroom" | "kitchen";

interface RoomNavigationProps {
  currentRoom: Room;
  onChangeRoom: (room: Room) => void;
}

const RoomNavigation = ({ currentRoom, onChangeRoom }: RoomNavigationProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Button
        variant={currentRoom === "bedroom" ? "default" : "outline"}
        onClick={() => onChangeRoom("bedroom")}
        className="flex items-center gap-2"
      >
        <Bed size={18} />
        <span className="hidden sm:inline">Спальня</span>
      </Button>
      
      <Button
        variant={currentRoom === "bathroom" ? "default" : "outline"}
        onClick={() => onChangeRoom("bathroom")}
        className="flex items-center gap-2"
      >
        <Bath size={18} />
        <span className="hidden sm:inline">Ванная</span>
      </Button>
      
      <Button
        variant={currentRoom === "livingroom" ? "default" : "outline"}
        onClick={() => onChangeRoom("livingroom")}
        className="flex items-center gap-2"
      >
        <Home size={18} />
        <span className="hidden sm:inline">Гостиная</span>
      </Button>
      
      <Button
        variant={currentRoom === "kitchen" ? "default" : "outline"}
        onClick={() => onChangeRoom("kitchen")}
        className="flex items-center gap-2"
      >
        <UtensilsCrossed size={18} />
        <span className="hidden sm:inline">Кухня</span>
      </Button>
    </div>
  );
};

export default RoomNavigation;
