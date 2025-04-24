
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const PaperPlane = () => {
  const [paperState, setPaperState] = useState<'paper' | 'folding' | 'plane' | 'flying'>('paper');
  const [timer, setTimer] = useState<number | null>(null);
  
  const handlePaperClick = () => {
    if (paperState === 'paper') {
      setPaperState('folding');
      setTimer(5);
    }
  };

  useEffect(() => {
    let interval: number | undefined;
    
    if (paperState === 'folding' && timer !== null) {
      interval = setInterval(() => {
        if (timer > 0) {
          setTimer(timer - 1);
        } else {
          setPaperState('plane');
          clearInterval(interval);
        }
      }, 1000) as unknown as number;
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer, paperState]);

  const handleLaunchPlane = () => {
    if (paperState === 'plane') {
      setPaperState('flying');
      
      // Reset after animation completes
      setTimeout(() => {
        setPaperState('paper');
        setTimer(null);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <div className="container mx-auto py-4 flex-1 flex flex-col">
        <h1 className="text-3xl font-bold text-center mb-4">Бумажный самолетик</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <Link to="/">
              <Button variant="outline">← Назад</Button>
            </Link>
          </div>
          
          <div className="flex-1 relative mt-4 rounded-lg overflow-hidden bg-blue-50 border-2 border-slate-200">
            {/* Room view - first person perspective */}
            <div className="w-full h-full relative">
              {/* Window */}
              <div className="absolute right-10 top-20 w-1/3 h-2/5 bg-sky-300 border-4 border-amber-800 rounded-sm">
                <div className="h-full w-full flex items-center justify-center">
                  <div className="text-4xl">☁️</div>
                </div>
              </div>
              
              {/* Table */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-amber-700 border-t-4 border-amber-900">
                {/* Paper/Plane */}
                <div className="absolute top-[-120px] left-1/2 transform -translate-x-1/2">
                  {paperState === 'paper' && (
                    <div 
                      className="w-32 h-40 bg-white rounded-sm shadow-md cursor-pointer transition-transform hover:scale-105" 
                      onClick={handlePaperClick}
                    >
                      <div className="h-full w-full flex items-center justify-center text-gray-400">
                        Нажми на бумагу
                      </div>
                    </div>
                  )}
                  
                  {paperState === 'folding' && (
                    <div className="relative w-32 h-40 bg-white rounded-sm shadow-md flex items-center justify-center">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl font-bold text-blue-500">{timer}</div>
                      </div>
                      <div className="absolute inset-0 animate-pulse bg-blue-100 opacity-50"></div>
                    </div>
                  )}
                  
                  {paperState === 'plane' && (
                    <div
                      className="w-40 h-32 cursor-pointer transition-transform hover:scale-105"
                      onClick={handleLaunchPlane}
                    >
                      <div className="text-5xl">✈️</div>
                      <div className="text-center mt-2 text-gray-600">Нажми, чтобы запустить</div>
                    </div>
                  )}
                  
                  {paperState === 'flying' && (
                    <div className="w-40 h-32 absolute animate-fly">
                      <div className="text-5xl">✈️</div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Person's hands */}
              <div className="absolute bottom-0 left-1/4 w-16 h-24 bg-amber-200 rounded-t-full"></div>
              <div className="absolute bottom-0 right-1/4 w-16 h-24 bg-amber-200 rounded-t-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperPlane;
