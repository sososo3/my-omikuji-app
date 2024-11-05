import React, { useState } from 'react';

function App() {
  const [fortune, setFortune] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const FORTUNES = [
    { 
      result: '大吉', 
      probability: 10, 
      description: '今年は最高の1日になるでしょう！',
      videoPath: '/videos/daikichi.mp4'
    },
    { 
      result: '中吉', 
      probability: 25, 
      description: 'とても良い運勢です',
      videoPath: '/videos/chukichi.mp4'
    },
    { 
      result: '小吉', 
      probability: 25, 
      description: '穏やかな日々が過ごせそうです',
      videoPath: '/videos/shokichi.mp4'
    },
    { 
      result: '吉', 
      probability: 25, 
      description: '平常通りの運勢です',
      videoPath: '/videos/kichi.mp4'
    },
    { 
      result: '凶', 
      probability: 15, 
      description: '少し気を付けて過ごしましょう',
      videoPath: '/videos/kyo.mp4'
    }
  ];

  const drawFortune = () => {
    setIsDrawing(true);
    
    const random = Math.random() * 100;
    let sum = 0;
    
    for (const fortune of FORTUNES) {
      sum += fortune.probability;
      if (random <= sum) {
        setTimeout(() => {
          setFortune(fortune);
          setIsDrawing(false);
        }, 1000);
        break;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-bold text-center mb-8">おみくじ</h1>
                
                {!isDrawing && !fortune && (
                  <button
                    onClick={drawFortune}
                    className="w-full py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    おみくじを引く
                  </button>
                )}

                {isDrawing && (
                  <div className="text-xl text-center animate-pulse">
                    おみくじを引いています...
                  </div>
                )}

                {fortune && !isDrawing && (
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold mb-4">
                      {fortune.result}
                    </div>
                    <div className="text-xl mb-4">
                      {fortune.description}
                    </div>
                    
                    <div className="w-full rounded-lg shadow-lg mb-4 bg-black p-2">
                      <video 
                        key={fortune.videoPath}
                        controls
			autoPlay
                        width="100%"
                        playsInline
                      >
                        <source src={fortune.videoPath} type="video/mp4" />
                        お使いのブラウザは動画の再生に対応していません
                      </video>
                    </div>
                    
                    <button
                      onClick={() => {
                        setFortune(null);
                      }}
                      className="mt-8 py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      もう一度引く
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;