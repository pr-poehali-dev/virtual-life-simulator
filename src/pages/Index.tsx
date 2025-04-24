
import { useState } from "react";
import RoomNavigation from "@/components/RoomNavigation";
import Bedroom from "@/components/rooms/Bedroom";
import Bathroom from "@/components/rooms/Bathroom";
import LivingRoom from "@/components/rooms/LivingRoom";
import Kitchen from "@/components/rooms/Kitchen";
import Character from "@/components/Character";

type Room = "bedroom" | "bathroom" | "livingroom" | "kitchen";

const Index = () => {
  const [currentRoom, setCurrentRoom] = useState<Room>("bedroom");
  const [characterState, setCharacterState] = useState({
    isAwake: false,
    handsWashed: false,
    hasItem: "",
  });

  const handleWakeUp = () => {
    setCharacterState({...characterState, isAwake: true});
  };

  const handleWashHands = () => {
    setCharacterState({...characterState, handsWashed: true});
  };

  const handleTakeItem = (item: string) => {
    setCharacterState({...characterState, hasItem: item});
  };

  const handleDropItem = () => {
    setCharacterState({...characterState, hasItem: ""});
  };

  const renderRoom = () => {
    switch (currentRoom) {
      case "bedroom":
        return (
          <Bedroom 
            isAwake={characterState.isAwake} 
            onWakeUp={handleWakeUp} 
            onTakeItem={handleTakeItem}
            hasItem={characterState.hasItem}
          />
        );
      case "bathroom":
        return (
          <Bathroom 
            onWashHands={handleWashHands} 
            handsWashed={characterState.handsWashed}
            onTakeItem={handleTakeItem}
            hasItem={characterState.hasItem}
          />
        );
      case "livingroom":
        return (
          <LivingRoom 
            onTakeItem={handleTakeItem}
            hasItem={characterState.hasItem}
          />
        );
      case "kitchen":
        return (
          <Kitchen 
            onTakeItem={handleTakeItem}
            hasItem={characterState.hasItem}
          />
        );
      default:
        return <Bedroom isAwake={characterState.isAwake} onWakeUp={handleWakeUp} onTakeItem={handleTakeItem} hasItem={characterState.hasItem} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <div className="container mx-auto py-4 flex-1 flex flex-col">
        <h1 className="text-3xl font-bold text-center mb-4">Симулятор жизни</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 flex-1 flex flex-col">
          <RoomNavigation currentRoom={currentRoom} onChangeRoom={setCurrentRoom} />
          
          <div className="flex-1 relative mt-4 rounded-lg overflow-hidden bg-blue-50 border-2 border-slate-200">
            {renderRoom()}
            <Character 
              isAwake={characterState.isAwake}
              handsWashed={characterState.handsWashed}
              hasItem={characterState.hasItem}
              onDropItem={handleDropItem}
            />
          </div>
          
          <div className="mt-4 p-3 bg-slate-100 rounded-lg">
            <p className="text-sm">
              <strong>Статус персонажа:</strong> {characterState.isAwake ? "Проснулся" : "Спит"} | 
              Руки: {characterState.handsWashed ? "Чистые" : "Грязные"} | 
              {characterState.hasItem ? `Держит: ${characterState.hasItem}` : "Ничего не держит"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
