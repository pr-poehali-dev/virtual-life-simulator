import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Cloud, Home, ArrowLeft, Sun } from 'lucide-react';

const PaperPlane = () => {
  const [paperState, setPaperState] = useState<'paper' | 'folding' | 'plane' | 'flying'>('paper');
  const [timer, setTimer] = useState<number | null>(null);
  const [daytime, setDaytime] = useState<'morning' | 'day' | 'evening'>('day');
  
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

  const cycleDaytime = () => {
    setDaytime(prev => {
      if (prev === 'morning') return 'day';
      if (prev === 'day') return 'evening';
      return 'morning';
    });
  };

  const getSkyColor = () => {
    switch(daytime) {
      case 'morning': return 'bg-gradient-to-b from-pink-200 to-blue-300';
      case 'day': return 'bg-gradient-to-b from-blue-300 to-blue-500';
      case 'evening': return 'bg-gradient-to-b from-orange-300 to-purple-500';
      default: return 'bg-blue-400';
    }
  };

  return (
    <div className="min-h-screen bg-room-wall flex flex-col">
      <div className="container mx-auto py-6 flex-1 flex flex-col max-w-5xl">
        <h1 className="text-4xl font-bold text-center mb-6 text-room-furniture">Бумажный самолетик</h1>
        
        <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 flex-1 flex flex-col border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <Link to="/">
              <Button variant="outline" className="flex items-center gap-2 hover:bg-room-accent/10">
                <ArrowLeft size={16} /> <Home size={16} /> Вернуться домой
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2" 
              onClick={cycleDaytime}
            >
              <Sun size={16} /> Сменить время дня
            </Button>
          </div>
          
          <div className="flex-1 relative mt-4 rounded-xl overflow-hidden bg-room-wall/50 border-2 border-slate-200 shadow-inner">
            {/* Комната - вид от первого лица */}
            <div className="w-full h-full relative">
              {/* Стены комнаты */}
              <div className="absolute inset-0 bg-gradient-to-b from-room-wall to-room-wall/90"></div>
              
              {/* Окно */}
              <div className="absolute right-[10%] top-[15%] w-[35%] h-[45%] rounded-lg overflow-hidden shadow-xl border-4 border-room-wood">
                {/* Рама окна */}
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 pointer-events-none z-10">
                  <div className="border-b-2 border-r-2 border-room-wood/30"></div>
                  <div className="border-b-2 border-room-wood/30"></div>
                  <div className="border-r-2 border-room-wood/30"></div>
                  <div></div>
                </div>
                
                {/* Небо за окном */}
                <div className={`h-full w-full ${getSkyColor()} relative`}>
                  <div className="clouds-background absolute inset-0 opacity-60"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Облака */}
                    <div className="absolute top-1/4 left-1/4 text-white opacity-80 animate-floating">
                      <Cloud size={40} />
                    </div>
                    <div className="absolute top-2/3 right-1/3 text-white opacity-70 animate-floating" style={{animationDelay: '1s'}}>
                      <Cloud size={30} />
                    </div>
                    <div className="absolute bottom-1/4 right-1/4 text-white opacity-90 animate-floating" style={{animationDelay: '2s'}}>
                      <Cloud size={50} />
                    </div>
                  </div>
                </div>
                
                {/* Подоконник */}
                <div className="absolute bottom-0 left-0 right-0 h-[10%] bg-room-wood"></div>
              </div>
              
              {/* Стол */}
              <div className="absolute bottom-0 left-0 right-0 h-[30%] wood-texture bg-room-wood border-t-4 border-room-wood shadow-inner">
                {/* Текстура стола */}
                <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-black/10 via-transparent to-black/10"></div>
                
                {/* Бумага/Самолетик */}
                <div className="absolute top-[-120px] left-1/2 transform -translate-x-1/2">
                  {paperState === 'paper' && (
                    <div 
                      className="w-36 h-44 bg-white rounded-sm shadow-lg cursor-pointer transition-transform hover:scale-105 paper-texture" 
                      onClick={handlePaperClick}
                    >
                      <div className="h-full w-full flex items-center justify-center text-gray-500 font-medium">
                        Нажми, чтобы сложить самолетик
                      </div>
                    </div>
                  )}
                  
                  {paperState === 'folding' && (
                    <div className="relative w-36 h-44 bg-white rounded-sm shadow-lg flex items-center justify-center overflow-hidden">
                      {/* Анимация складывания */}
                      <div className="absolute inset-0">
                        <div className="absolute inset-0 paper-texture"></div>
                        <div className="absolute top-0 left-0 right-0 h-1/2 bg-white border-b border-dashed border-gray-300 transform origin-bottom-left" 
                          style={{transform: `rotate(${45 - (timer || 0) * 9}deg)`}}>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white transform origin-top-right"
                          style={{transform: `rotate(${(timer || 0) * -9}deg)`}}>
                        </div>
                      </div>
                      
                      {/* Таймер */}
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="text-6xl font-bold text-room-accent animate-pulse">{timer}</div>
                      </div>
                    </div>
                  )}
                  
                  {paperState === 'plane' && (
                    <div
                      className="cursor-pointer transition-transform hover:scale-105 hover:rotate-3"
                      onClick={handleLaunchPlane}
                    >
                      <div className="relative">
                        {/* Самолетик */}
                        <div className="w-40 h-16 relative">
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 border-t-[40px] border-l-[20px] border-r-[20px] border-t-white border-l-transparent border-r-transparent"></div>
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 rotate-180 border-t-[40px] border-l-[70px] border-r-[70px] border-t-white border-l-transparent border-r-transparent"></div>
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 border-t-[5px] border-l-[3px] border-r-[3px] border-t-room-accent/30 border-l-transparent border-r-transparent"></div>
                        </div>
                        
                        <div className="text-center mt-4 text-gray-600 font-medium">
                          Нажми, чтобы запустить
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {paperState === 'flying' && (
                    <div className="w-40 h-16 absolute animate-fly">
                      {/* Летящий самолетик */}
                      <div className="relative">
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 border-t-[40px] border-l-[20px] border-r-[20px] border-t-white border-l-transparent border-r-transparent"></div>
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 rotate-180 border-t-[40px] border-l-[70px] border-r-[70px] border-t-white border-l-transparent border-r-transparent"></div>
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 border-t-[5px] border-l-[3px] border-r-[3px] border-t-room-accent/30 border-l-transparent border-r-transparent"></div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Предметы на столе */}
                <div className="absolute top-[-30px] left-[20%] w-16 h-10 bg-room-accent/90 rounded-md shadow-md">
                  <div className="absolute inset-0 bg-opacity-70 bg-white/10"></div>
                </div>
                
                <div className="absolute top-[-25px] left-[70%] w-14 h-14 bg-room-wood rounded-full shadow-md flex items-center justify-center">
                  <div className="w-10 h-10 bg-amber-800/80 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-amber-600/90 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Руки персонажа */}
              <div className="absolute bottom-0 left-[20%] w-20 h-32 bg-amber-300 rounded-t-3xl"></div>
              <div className="absolute bottom-0 right-[20%] w-20 h-32 bg-amber-300 rounded-t-3xl"></div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-slate-50 rounded-lg text-center text-gray-600">
            <p className="text-sm italic">
              Создай бумажный самолетик и запусти его в окно!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperPlane;
