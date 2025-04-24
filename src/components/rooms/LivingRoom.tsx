
import { Button } from "@/components/ui/button";

interface LivingRoomProps {
  onTakeItem: (item: string) => void;
  hasItem: string;
}

const LivingRoom = ({ onTakeItem, hasItem }: LivingRoomProps) => {
  return (
    <div className="w-full h-full p-4 relative">
      <h2 className="text-xl font-semibold mb-4">Гостиная</h2>
      
      {/* Sofa */}
      <div className="absolute left-1/2 bottom-16 transform -translate-x-1/2">
        <div className="bg-green-300 w-80 h-28 rounded-md">
          <div className="absolute top-0 left-0 w-full h-8 bg-green-400 rounded-t-md"></div>
        </div>
      </div>
      
      {/* TV */}
      <div className="absolute left-1/2 top-16 transform -translate-x-1/2">
        <div className="bg-gray-800 w-48 h-28 rounded-md">
          <div className="absolute inset-1 bg-gray-900 rounded-sm"></div>
        </div>
      </div>
      
      {/* Coffee table */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/4">
        <div className="bg-amber-700 w-36 h-16 rounded">
          <div className="absolute -top-8 w-full flex justify-center gap-2">
            <Button 
              disabled={hasItem !== ""} 
              variant="outline" 
              size="sm" 
              onClick={() => onTakeItem("Пульт")}
              className="text-xs bg-white"
            >
              Взять пульт
            </Button>
            <Button 
              disabled={hasItem !== ""} 
              variant="outline" 
              size="sm" 
              onClick={() => onTakeItem("Журнал")}
              className="text-xs bg-white"
            >
              Взять журнал
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivingRoom;
