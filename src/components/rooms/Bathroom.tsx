
import { Button } from "@/components/ui/button";

interface BathroomProps {
  handsWashed: boolean;
  onWashHands: () => void;
  onTakeItem: (item: string) => void;
  hasItem: string;
}

const Bathroom = ({ handsWashed, onWashHands, onTakeItem, hasItem }: BathroomProps) => {
  return (
    <div className="w-full h-full p-4 relative">
      <h2 className="text-xl font-semibold mb-4">Ванная</h2>
      
      {/* Sink */}
      <div className="absolute left-1/2 top-1/3 transform -translate-x-1/2">
        <div className="bg-gray-200 w-48 h-24 rounded-md relative">
          <div className="bg-blue-300 w-16 h-4 absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          <div className="absolute -top-8 w-full flex justify-center">
            <Button 
              disabled={handsWashed} 
              onClick={onWashHands}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Помыть руки
            </Button>
          </div>
        </div>
      </div>
      
      {/* Bathtub */}
      <div className="absolute left-1/2 bottom-16 transform -translate-x-1/2">
        <div className="bg-gray-200 w-64 h-32 rounded-md"></div>
      </div>
      
      {/* Shelf with items */}
      <div className="absolute right-8 top-1/3">
        <div className="bg-slate-300 w-24 h-4"></div>
        <div className="absolute -top-10 w-full flex justify-center">
          <Button 
            disabled={hasItem !== ""} 
            variant="outline" 
            size="sm" 
            onClick={() => onTakeItem("Полотенце")}
            className="text-xs bg-white"
          >
            Взять полотенце
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Bathroom;
