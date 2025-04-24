
import { Button } from "@/components/ui/button";

interface BedroomProps {
  isAwake: boolean;
  onWakeUp: () => void;
  onTakeItem: (item: string) => void;
  hasItem: string;
}

const Bedroom = ({ isAwake, onWakeUp, onTakeItem, hasItem }: BedroomProps) => {
  return (
    <div className="w-full h-full p-4 relative">
      <h2 className="text-xl font-semibold mb-4">Спальня</h2>
      
      {/* Bed */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-amber-100 w-64 h-36 border-2 border-amber-300 rounded-md relative">
          <div className="bg-purple-200 w-full h-12 absolute top-0 left-0 rounded-t-md"></div>
          
          {!isAwake && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button onClick={onWakeUp} className="bg-blue-500 hover:bg-blue-600">
                Проснуться
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Bedside table */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
        <div className="bg-amber-800 w-24 h-20 rounded">
          <div className="absolute -top-4 w-full flex justify-center">
            <Button 
              disabled={!isAwake || hasItem !== ""} 
              variant="outline" 
              size="sm" 
              onClick={() => onTakeItem("Книга")}
              className="text-xs bg-white"
            >
              Взять книгу
            </Button>
          </div>
        </div>
      </div>
      
      {/* Wardrobe */}
      <div className="absolute left-8 top-1/3 transform -translate-y-1/2">
        <div className="bg-amber-800 w-20 h-40 rounded">
          <div className="absolute -top-4 w-full flex justify-center">
            <Button 
              disabled={!isAwake || hasItem !== ""} 
              variant="outline" 
              size="sm" 
              onClick={() => onTakeItem("Одежда")}
              className="text-xs bg-white"
            >
              Взять одежду
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bedroom;
