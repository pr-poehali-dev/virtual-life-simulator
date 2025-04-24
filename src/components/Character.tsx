
import { Button } from "@/components/ui/button";

interface CharacterProps {
  isAwake: boolean;
  handsWashed: boolean;
  hasItem: string;
  onDropItem: () => void;
}

const Character = ({ isAwake, handsWashed, hasItem, onDropItem }: CharacterProps) => {
  if (!isAwake) {
    return null;
  }

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
      <div className="relative">
        {/* Character body */}
        <div className="w-20 h-40 bg-blue-400 rounded-t-full relative flex flex-col items-center">
          {/* Face */}
          <div className="w-16 h-16 bg-amber-200 rounded-full mt-2 flex justify-center items-center">
            {/* Eyes */}
            <div className="flex gap-4">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>
          </div>
          
          {/* Hands */}
          <div className="absolute top-16 left-0 w-5 h-20 bg-amber-200 rounded-full">
            {handsWashed && <div className="absolute inset-0 bg-blue-200 opacity-50 rounded-full"></div>}
          </div>
          <div className="absolute top-16 right-0 w-5 h-20 bg-amber-200 rounded-full">
            {handsWashed && <div className="absolute inset-0 bg-blue-200 opacity-50 rounded-full"></div>}
          </div>
          
          {/* Item indicator if holding something */}
          {hasItem && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs whitespace-nowrap">
              {hasItem}
            </div>
          )}
        </div>
      </div>
      
      {hasItem && (
        <Button 
          variant="outline" 
          size="sm"
          onClick={onDropItem}
          className="mt-2 text-xs bg-white"
        >
          Положить {hasItem}
        </Button>
      )}
    </div>
  );
};

export default Character;
