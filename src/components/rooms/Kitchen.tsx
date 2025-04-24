
import { Button } from "@/components/ui/button";

interface KitchenProps {
  onTakeItem: (item: string) => void;
  hasItem: string;
}

const Kitchen = ({ onTakeItem, hasItem }: KitchenProps) => {
  return (
    <div className="w-full h-full p-4 relative">
      <h2 className="text-xl font-semibold mb-4">Кухня</h2>
      
      {/* Kitchen counter */}
      <div className="absolute left-1/2 bottom-16 transform -translate-x-1/2">
        <div className="bg-gray-300 w-80 h-24 rounded-md">
          <div className="absolute top-0 inset-x-0 h-4 bg-gray-400"></div>
        </div>
      </div>
      
      {/* Fridge */}
      <div className="absolute right-16 top-1/3 transform -translate-y-1/4">
        <div className="bg-gray-200 w-24 h-40 rounded-md relative">
          <div className="absolute left-2 top-1/2 w-3 h-5 bg-gray-400 rounded"></div>
          <div className="absolute -top-8 w-full flex justify-center">
            <Button 
              disabled={hasItem !== ""} 
              variant="outline" 
              size="sm" 
              onClick={() => onTakeItem("Еда")}
              className="text-xs bg-white"
            >
              Взять еду
            </Button>
          </div>
        </div>
      </div>
      
      {/* Stove */}
      <div className="absolute left-16 top-1/3 transform -translate-y-1/4">
        <div className="bg-gray-600 w-28 h-24 rounded-md">
          <div className="grid grid-cols-2 gap-2 p-2">
            <div className="bg-gray-800 rounded-full w-8 h-8"></div>
            <div className="bg-gray-800 rounded-full w-8 h-8"></div>
            <div className="bg-gray-800 rounded-full w-8 h-8"></div>
            <div className="bg-gray-800 rounded-full w-8 h-8"></div>
          </div>
          <div className="absolute -top-8 w-full flex justify-center">
            <Button 
              disabled={hasItem !== ""} 
              variant="outline" 
              size="sm" 
              onClick={() => onTakeItem("Сковородка")}
              className="text-xs bg-white whitespace-nowrap"
            >
              Взять сковородку
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kitchen;
