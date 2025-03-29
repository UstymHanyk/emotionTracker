// 
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const EmotionTracker = () => {
  const [selectedQuadrant, setSelectedQuadrant] = useState(null);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [selectedSubEmotion, setSelectedSubEmotion] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [emotionHistory, setEmotionHistory] = useState([]);
  const [gridView, setGridView] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  // Завантаження історії емоцій з localStorage при завантаженні
  useEffect(() => {
    const savedEmotions = localStorage.getItem('emotionHistory');
    if (savedEmotions) {
      setEmotionHistory(JSON.parse(savedEmotions));
    }
    
    // Встановлення розмірів контейнера при завантаженні
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight
      });
    }
    
    // Слухач для оновлення розмірів при зміні розміру вікна
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Структуровані дані емоцій за квадрантами
  const emotionsByQuadrant = {
    "high-unpleasant": {
      name: "Висока Енергія Неприємні",
      color: "from-red-400 to-red-600",
      borderColor: "border-red-500",
      textColor: "text-red-700",
      emotions: {
        "гнів": ["роздратування", "гіркота", "злість", "обурення", "лють", "ненависть"],
        "страх": ["стурбованість", "занепокоєння", "настороженість", "напруженість", "хвилювання", 
                "тривога", "переляк", "сум'яття", "паніка", "жах"],
        "нетерпимість": ["мстивість", "войовничість", "агресія", "бунтарство", "опір"],
        "відраза": ["неприязнь", "обридливість", "гидування"]
      }
    },
    "high-pleasant": {
      name: "Висока Енергія Приємні",
      color: "from-yellow-300 to-yellow-500",
      borderColor: "border-yellow-500",
      textColor: "text-yellow-800",
      emotions: {
        "радість": ["задоволення", "втіха", "веселість", "насолода", "щастя", 
                 "захват", "тріумфування", "блаженство", "ейфорія"],
        "інтерес": ["цікавість", "жвавість", "захопленість", "збудження", "ентузіазм", "азарт", "драйв"],
        "здивування": ["подив", "захват", "потрясіння", "приголомшеність"],
        "рішучість": ["наснага", "натхнення", "сміливість", "енергійність"]
      }
    },
    "low-unpleasant": {
      name: "Низька Енергія Неприємні",
      color: "from-blue-300 to-blue-500",
      borderColor: "border-blue-500",
      textColor: "text-blue-800",
      emotions: {
        "сум": ["смуток", "хандра", "туга", "пригніченість", "горе", "скорбота", "відчай"],
        "сором": ["соромливість", "боязкість", "ніяковість"],
        "образа": ["досада", "сердитість", "скривдженість"],
        "провина": ["жалкування", "розпач", "каяття"],
        "нудьга": ["апатія", "загальмованість"],
        "самотність": ["відкинутість", "ізольованість", "безпорадність", "слабкість", "вразливість"]
      }
    },
    "low-pleasant": {
      name: "Низька Енергія Приємні",
      color: "from-green-300 to-green-500",
      borderColor: "border-green-500",
      textColor: "text-green-800",
      emotions: {
        "умиротворення": ["спокій", "розслабленість", "безтурботність"],
        "смирення": ["впевненість", "довольство", "життєрадісність", "полегшення"],
        "прийняття": ["ніжність", "симпатія", "співчуття", "прив'язаність", "вдячність", "повага"],
        "одухотвореність": ["співпричетність", "натхнення", "наснага", "надія", "життєлюбність"]
      }
    }
  };

  // Додаткові описи для емоцій
  const emotionDescriptions = {
    "гнів": "стан незадоволення, обурення; роздратування",
    "страх": "стан хвилювання, тривоги, неспокою, викликаний очікуванням небезпеки",
    "сум": "смуток, спричинений горем, невдачею або іншою причиною",
    "радість": "почуття задоволення, втіхи, приємності",
    "інтерес": "увага до кого-, чого-небудь, зацікавлення кимось, чимось",
    "умиротворення": "стан спокою та гармонії",
    "смирення": "стан спокійного прийняття ситуації",
    "одухотвореність": "стан піднесення та натхнення",
    "відраза": "сильне почуття неприязні, відрази до кого-, чого-небудь",
    "сором": "почуття сильного збентеження, незручності від усвідомлення непристойності вчинку",
    "образа": "почуття гіркоти, досади, болісного переживання, викликане чиїмсь зневажливим ставленням",
    "провина": "усвідомлення відповідальності за негативний вчинок чи його наслідки",
    "нудьга": "стан бездіяльності, відсутності інтересу до оточуючого",
    "самотність": "відчуття ізольованості від інших людей",
    "нетерпимість": "нездатність або небажання терпіти когось або щось",
    "здивування": "почуття, викликане чимось незвичайним, незрозумілим, несподіваним",
    "рішучість": "твердість і непохитність у прийнятті рішень та їх виконанні"
  };

  // Create an evenly spaced grid of emotions
const getAllEmotions = () => {
    const allEmotions = [];
    const gridSize = 10; // 10x10 grid
    
    // Define quadrant positions in the grid
    const quadrantBounds = {
      "high-unpleasant": { minX: 0, maxX: 4, minY: 0, maxY: 4 },
      "high-pleasant": { minX: 5, maxX: 9, minY: 0, maxY: 4 },
      "low-unpleasant": { minX: 0, maxX: 4, minY: 5, maxY: 9 },
      "low-pleasant": { minX: 5, maxX: 9, minY: 5, maxY: 9 }
    };
    
    // Process each quadrant
    Object.entries(emotionsByQuadrant).forEach(([quadrantKey, quadrantData]) => {
      const bounds = quadrantBounds[quadrantKey];
      const quadrantWidth = bounds.maxX - bounds.minX + 1;
      const quadrantHeight = bounds.maxY - bounds.minY + 1;
      
      // Get all emotions (main and sub) for this quadrant
      const quadrantEmotions = [];
      
      Object.entries(quadrantData.emotions).forEach(([mainEmotion, subEmotions]) => {
        quadrantEmotions.push({
          name: mainEmotion,
          type: "main"
        });
        
        subEmotions.forEach(subEmotion => {
          quadrantEmotions.push({
            name: subEmotion,
            parent: mainEmotion,
            type: "sub"
          });
        });
      });
      
      // Calculate total cells in this quadrant
      const totalCells = quadrantWidth * quadrantHeight;
      const totalEmotions = quadrantEmotions.length;
      
      // Distribute emotions evenly in the quadrant
      quadrantEmotions.forEach((emotion, index) => {
        const cellIndex = Math.floor((index / totalEmotions) * totalCells);
        const cellY = Math.floor(cellIndex / quadrantWidth);
        const cellX = cellIndex % quadrantWidth;
        
        // Calculate grid position
        const x = bounds.minX + cellX;
        const y = bounds.minY + cellY;
        
        allEmotions.push({
          ...emotion,
          quadrant: quadrantKey,
          x: x,
          y: y,
          distance: Math.sqrt(Math.pow(x - 4.5, 2) + Math.pow(y - 4.5, 2)) // Distance from center
        });
      });
    });
    
    return allEmotions;
  };
  const allEmotions = getAllEmotions();

  // Обробка вибору квадранта
  const handleQuadrantSelect = (quadrant) => {
    setSelectedQuadrant(quadrant);
    setSelectedEmotion(null);
    setSelectedSubEmotion(null);
    setShowDescription(false);
    setShowStats(false);
  };

  // Обробка вибору емоції
  const handleEmotionSelect = (emotion) => {
    setSelectedEmotion(emotion);
    setSelectedSubEmotion(null);
    setShowDescription(false);
  };

  // Обробка вибору підемоції
  const handleSubEmotionSelect = (subEmotion) => {
    setSelectedSubEmotion(subEmotion);
    setShowDescription(true);
  };

  // Функція для вибору емоції в сітці
  const handleGridEmotionSelect = (emotion) => {
    if (emotion.type === "main") {
      setSelectedEmotion(emotion.name);
      setSelectedQuadrant(emotion.quadrant);
      setSelectedSubEmotion(null);
      setShowDescription(false);
    } else {
      setSelectedEmotion(emotion.parent);
      setSelectedQuadrant(emotion.quadrant);
      setSelectedSubEmotion(emotion.name);
      setShowDescription(false);
    }
  };
  
  // Функція для отримання розміру емоції на основі її типу та відстані від центру
  const getEmotionSize = (emotion) => {
    return emotion.type === "main" ? 60 : 50;
  };

  // Збереження обраної емоції
  const saveEmotion = () => {
    if (!selectedSubEmotion) return;
    
    const newEmotionRecord = {
      quadrant: selectedQuadrant,
      emotion: selectedEmotion,
      subEmotion: selectedSubEmotion,
      timestamp: new Date().toISOString()
    };
    
    const updatedHistory = [newEmotionRecord, ...emotionHistory];
    setEmotionHistory(updatedHistory);
    localStorage.setItem('emotionHistory', JSON.stringify(updatedHistory));
    
    // Повернення на головний екран після збереження
    setSelectedQuadrant(null);
    setSelectedEmotion(null);
    setSelectedSubEmotion(null);
    setShowDescription(false);
    setGridView(false);
  };

  // Повернення на головний екран
  const handleBack = () => {
    if (showStats) {
      setShowStats(false);
    } else if (showDescription) {
      setShowDescription(false);
    } else if (selectedSubEmotion) {
      setSelectedSubEmotion(null);
    } else if (selectedEmotion && !gridView) {
      setSelectedEmotion(null);
    } else if (selectedQuadrant && !gridView) {
      setSelectedQuadrant(null);
    } else if (gridView) {
      setGridView(false);
      setSelectedQuadrant(null);
      setSelectedEmotion(null);
      setSelectedSubEmotion(null);
      setShowDescription(false);
    }
  };

  // Підготовка даних для статистики
  const prepareStatsData = () => {
    const last7Days = emotionHistory.filter(record => {
      const recordDate = new Date(record.timestamp);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return recordDate >= weekAgo;
    });

    // Підрахунок частоти квадрантів
    const quadrantCounts = {};
    last7Days.forEach(record => {
      if (!quadrantCounts[record.quadrant]) {
        quadrantCounts[record.quadrant] = 0;
      }
      quadrantCounts[record.quadrant]++;
    });

    // Підрахунок топ-5 емоцій
    const emotionCounts = {};
    last7Days.forEach(record => {
      const emotionName = record.subEmotion;
      if (!emotionCounts[emotionName]) {
        emotionCounts[emotionName] = 0;
      }
      emotionCounts[emotionName]++;
    });

    const topEmotions = Object.entries(emotionCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return { quadrantCounts, topEmotions, totalRecords: last7Days.length };
  };
  
  // Функція для отримання кольору емоції на основі її квадранта і відстані від центру
  const getEmotionColor = (emotion) => {
    const { quadrant, distance } = emotion;
    const baseColors = emotionsByQuadrant[quadrant].color;
    
    // Зменшення насиченості кольору залежно від відстані від центру
    const opacity = 1 - (distance / 15) * 0.3; // Максимальне зменшення насиченості на 30%
    
    return `bg-gradient-to-br ${baseColors} opacity-${Math.floor(opacity * 100)}`;
  };
  
  // Обробка руху в сітці емоцій
  const handleDrag = (_, info) => {
    setPosition({
      x: position.x + info.delta.x,
      y: position.y + info.delta.y
    });
  };
  
  // Обробка завершення перетягування з "магнітним" ефектом до найближчої емоції
  const handleDragEnd = (_, info) => {
    const cellSize = 80; // Приблизний розмір комірки сітки
    
    // Округлюємо до найближчої комірки для "магнітного" ефекту
    const newX = Math.round(position.x / cellSize) * cellSize;
    const newY = Math.round(position.y / cellSize) * cellSize;
    
    setPosition({ x: newX, y: newY });
    
    // Знаходження найближчої емоції до центру екрана
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    
    let closestEmotion = null;
    let minDistance = Infinity;
    
    allEmotions.forEach(emotion => {
      const emotionScreenX = emotion.x * cellSize + position.x + 400; // 400 - половина сітки
      const emotionScreenY = emotion.y * cellSize + position.y + 400;
      
      const distance = Math.sqrt(
        Math.pow(emotionScreenX - centerX, 2) + 
        Math.pow(emotionScreenY - centerY, 2)
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        closestEmotion = emotion;
      }
    });
    
    // Якщо центральна емоція достатньо близька, виводимо деталі
    if (minDistance < cellSize / 2 && closestEmotion) {
      handleGridEmotionSelect(closestEmotion);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white" ref={containerRef}>
      {/* Верхня панель */}
      <div className="p-4 flex justify-between items-center">
        {(selectedQuadrant || selectedEmotion || selectedSubEmotion || showStats || gridView) ? (
          <button 
            onClick={handleBack} 
            className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-xl"
          >
            {showDescription ? "×" : "←"}
          </button>
        ) : (
          <button 
            className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center invisible text-xl"
          >
            ←
          </button>
        )}
        <h1 className="text-2xl font-bold text-center flex-1">Трекер емоцій</h1>
        <button 
          onClick={() => setShowStats(!showStats)} 
          className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-xl"
        >
          {showStats ? "×" : "📊"}
        </button>
      </div>

      {/* Статистика емоцій */}
      {showStats && (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Статистика емоцій</h2>
          
          {emotionHistory.length > 0 ? (
            <div>
              <div className="bg-gray-800 rounded-xl p-4 mb-6">
                <h3 className="text-xl font-bold mb-2">Останні 7 днів</h3>
                {(() => {
                  const { quadrantCounts, topEmotions, totalRecords } = prepareStatsData();
                  return (
                    <>
                      <p className="text-lg mb-4">Записано емоцій: {totalRecords}</p>
                      
                      <h4 className="text-lg font-semibold mb-2">Розподіл за квадрантами:</h4>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {Object.entries(quadrantCounts).map(([quadrant, count]) => (
                          <div 
                            key={quadrant} 
                            className={`p-3 rounded-lg bg-gradient-to-br ${emotionsByQuadrant[quadrant]?.color || ""} flex justify-between items-center`}
                          >
                            <span className="text-base">{emotionsByQuadrant[quadrant]?.name || quadrant}</span>
                            <span className="font-bold text-lg">{count}</span>
                          </div>
                        ))}
                      </div>
                      
                      <h4 className="text-lg font-semibold mb-2">Найчастіші емоції:</h4>
                      <div className="space-y-2">
                        {topEmotions.length > 0 ? (
                          topEmotions.map(([emotion, count], index) => (
                            <div key={emotion} className="flex justify-between items-center p-2 bg-gray-700 rounded-lg">
                              <span className="text-lg">{index + 1}. {emotion}</span>
                              <span className="font-bold">{count} раз(ів)</span>
                            </div>
                          ))
                        ) : (
                          <p>Немає даних для відображення</p>
                        )}
                      </div>
                    </>
                  );
                })()}
              </div>
              
              <h3 className="text-xl font-bold mb-2">Останні записи:</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {emotionHistory.slice(0, 10).map((record, index) => {
                  const date = new Date(record.timestamp);
                  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
                  
                  return (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg bg-gradient-to-br ${emotionsByQuadrant[record.quadrant]?.color || ""}`}
                    >
                      <div className="font-bold text-lg">{record.subEmotion}</div>
                      <div className="text-sm opacity-80">{formattedDate}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center p-6 bg-gray-800 rounded-xl">
              <p className="text-xl">Ще немає записаних емоцій</p>
              <p className="mt-2">Додайте першу емоцію, щоб побачити статистику</p>
            </div>
          )}
        </div>
      )}

      {/* Сітка емоцій */}
      {gridView && !showStats && !showDescription && (
        <div className="absolute inset-0 overflow-hidden" style={{ top: '76px', bottom: '72px' }}>
          <motion.div 
            className="absolute w-800 h-800"
            style={{ 
              width: '800px',
              height: '800px',
              x: position.x,
              y: position.y
            }}
            drag
            dragConstraints={{ 
              left: -600, 
              right: 600, 
              top: -600, 
              bottom: 600 
            }}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            {allEmotions.map((emotion, index) => {
              const size = getEmotionSize(emotion);
              return (
                <motion.div
                  key={`${emotion.name}-${index}`}
                  className={`absolute rounded-full flex items-center justify-center cursor-pointer bg-gradient-to-br ${emotionsByQuadrant[emotion.quadrant].color} select-none`}
                  style={{
                    left: `${emotion.x * 80}px`,
                    top: `${emotion.y * 80}px`,
                    width: `${size}px`,
                    height: `${size}px`,
                    fontSize: emotion.type === "main" ? '16px' : '14px',
                    fontWeight: emotion.type === "main" ? 'bold' : 'normal',
                    zIndex: emotion.type === "main" ? 2 : 1,
                    filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.3))'
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleGridEmotionSelect(emotion)}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: { 
                      delay: index * 0.01,
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }
                  }}
                >
                  <span className="text-center px-2">{emotion.name}</span>
                  
                  
                </motion.div>
              );
            })}
          </motion.div>
          
          {/* Індикатор поточного вибору або підказка */}
          {selectedEmotion && !showDescription && (
            <div className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4 flex flex-col items-center">
              <p className="text-lg mb-2">
                {selectedEmotion} 
                {selectedSubEmotion ? `: ${selectedSubEmotion}` : ''}
              </p>
              <p className="text-sm opacity-70">
                {selectedEmotion && emotionDescriptions[selectedEmotion] 
                  ? emotionDescriptions[selectedEmotion] 
                  : 'Проведіть пальцем, щоб досліджувати емоції'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Блок з вибраною емоцією */}
      {selectedSubEmotion && showDescription && !showStats && (
        <div className="px-6 py-8">
          <div className={`rounded-2xl p-6 mx-auto max-w-md bg-gradient-to-br ${selectedQuadrant ? emotionsByQuadrant[selectedQuadrant].color : ""}`}>
            <h2 className="text-4xl font-bold text-center mb-6">{selectedSubEmotion}</h2>
            <p className="text-center text-xl">
              {selectedEmotion && emotionDescriptions[selectedEmotion] 
                ? emotionDescriptions[selectedEmotion] 
                : `Ви відчуваєте ${selectedSubEmotion.toLowerCase()}`}
            </p>
            <div className="mt-10 flex justify-end">
              <motion.button 
                onClick={saveEmotion}
                className="bg-white text-black rounded-full w-16 h-16 flex items-center justify-center text-2xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✓
              </motion.button>
            </div>
          </div>
        </div>
      )}

      {/* Вибір підемоцій */}
      {selectedEmotion && !showDescription && !showStats && !gridView && (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Виберіть точніше, як ви почуваєтесь
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {selectedQuadrant && selectedEmotion && 
             emotionsByQuadrant[selectedQuadrant].emotions[selectedEmotion].map((subEmotion, index) => (
              <motion.button 
                key={subEmotion}
                onClick={() => handleSubEmotionSelect(subEmotion)}
                className={`rounded-full aspect-square flex items-center justify-center p-3 text-center text-lg
                  bg-gradient-to-br ${emotionsByQuadrant[selectedQuadrant].color} 
                  border-2 ${emotionsByQuadrant[selectedQuadrant].borderColor}
                  relative overflow-hidden`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    delay: index * 0.05,
                    type: "spring"
                  }
                }}
              >
                {subEmotion}
                
                {/* Анімований градієнт фону */}
                <motion.div 
                  className={`absolute inset-0 rounded-full opacity-60 bg-gradient-to-br ${emotionsByQuadrant[selectedQuadrant].color}`}
                  animate={{ 
                    background: [`linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.1) 100%)`,
`linear-gradient(225deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.1) 100%)`]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 6
                  }}
                  style={{ zIndex: -1 }}
                />
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Вибір емоцій */}
      {selectedQuadrant && !selectedEmotion && !showStats && !gridView && (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Що ви відчуваєте?
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(emotionsByQuadrant[selectedQuadrant].emotions).map((emotion, index) => (
              <motion.button 
                key={emotion}
                onClick={() => handleEmotionSelect(emotion)}
                className={`rounded-xl py-6 px-4 
                  bg-gradient-to-br ${emotionsByQuadrant[selectedQuadrant].color} 
                  border-2 ${emotionsByQuadrant[selectedQuadrant].borderColor}
                  flex flex-col items-center justify-center
                  relative overflow-hidden`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    delay: index * 0.1,
                    type: "spring"
                  }
                }}
              >
                <span className="text-2xl font-bold mb-1">{emotion}</span>
                <span className={`text-sm ${emotionsByQuadrant[selectedQuadrant].textColor}`}>
                  {emotionDescriptions[emotion]}
                </span>
                
                {/* Анімований градієнт фону */}
                <motion.div 
                  className={`absolute inset-0 opacity-50 bg-gradient-to-br ${emotionsByQuadrant[selectedQuadrant].color}`}
                  animate={{ 
                    background: [`linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.1) 100%)`,
                                `linear-gradient(225deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.1) 100%)`]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 5
                  }}
                  style={{ zIndex: -1 }}
                />
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Головний екран з квадрантами та іншими опціями */}
      {!selectedQuadrant && !showStats && !gridView && (
        <div className="px-6 pb-24 pt-8">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {Object.keys(emotionsByQuadrant).map((quadrantKey) => {
              const quadrant = emotionsByQuadrant[quadrantKey];
              return (
                <motion.button 
                  key={quadrantKey}
                  onClick={() => handleQuadrantSelect(quadrantKey)}
                  className={`rounded-xl aspect-square flex flex-col items-center justify-center p-4 
                    bg-gradient-to-br ${quadrant.color} 
                    border-2 ${quadrant.borderColor}
                    relative overflow-hidden`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="text-xl font-bold mb-2 text-center">{quadrant.name}</span>
                  
                  {/* Пульсуючий фоновий ефект */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${quadrant.color}`}
                    animate={{ 
                      opacity: [0.7, 0.5, 0.7],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 4
                    }}
                    style={{ zIndex: -1 }}
                  />
                </motion.button>
              );
            })}
          </div>
          
          {/* Кнопка відображення сітки */}
          <motion.button 
            onClick={() => setGridView(true)}
            className="w-full rounded-xl py-4 px-6 bg-gradient-to-r from-purple-500 to-indigo-500 
              text-center text-xl font-bold mb-4 relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Карта емоцій</span>
            
            {/* Анімований градієнт фону */}
            <motion.div 
              className="absolute inset-0 opacity-50 bg-gradient-to-r from-purple-500 to-indigo-500"
              animate={{ 
                background: [`linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.1) 100%)`,
                            `linear-gradient(225deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.1) 100%)`]
              }}
              transition={{ 
                repeat: Infinity,
                repeatType: "reverse",
                duration: 5
              }}
              style={{ zIndex: -1 }}
            />
          </motion.button>
          
          {/* Останні записи */}
          {emotionHistory.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-3">Останні записи:</h3>
              <div className="space-y-3">
                {emotionHistory.slice(0, 3).map((record, index) => {
                  const date = new Date(record.timestamp);
                  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
                  
                  return (
                    <motion.div 
                      key={index} 
                      className={`p-4 rounded-lg bg-gradient-to-br ${emotionsByQuadrant[record.quadrant]?.color || ""}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        transition: { 
                          delay: index * 0.1,
                          type: "spring"
                        }
                      }}
                    >
                      <div className="font-bold text-lg">{record.subEmotion}</div>
                      <div className="text-sm opacity-80">{formattedDate}</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Нижня панель навігації для сітки емоцій */}
    {gridView && !showStats && (
    <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-80 backdrop-blur-md p-4 flex flex-col items-center border-t border-gray-800">
        {selectedEmotion ? (
        <div className="flex flex-col items-center w-full">
            <div className="flex items-center justify-between w-full mb-2">
            <h3 className="text-xl font-semibold">
                {selectedEmotion}
                {selectedSubEmotion ? `: ${selectedSubEmotion}` : ''}
            </h3>
            {selectedSubEmotion && (
                <button 
                onClick={saveEmotion}
                className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center"
                >
                ✓
                </button>
            )}
            </div>
            <p className="text-sm text-gray-300 text-center">
            {selectedEmotion && emotionDescriptions[selectedEmotion] 
                ? emotionDescriptions[selectedEmotion] 
                : 'Проведіть, щоб дослідити емоції. Зупиніться на бажаній.'}
            </p>
        </div>
        ) : (
        <div className="text-center">
            <p className="text-base">Перетягніть сітку, щоб знайти свою емоцію</p>
            <p className="text-sm text-gray-400 mt-1">Центруйте емоцію в колі для вибору</p>
        </div>
        )}
    </div>
    )}

      {/* Покажчик в центрі для сітки емоцій */}
      {gridView && !showStats && !showDescription && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center" style={{ top: '76px', bottom: '72px' }}>
          <div className="w-16 h-16 border-2 border-white rounded-full opacity-50"></div>
        </div>
      )}

      {/* Інструкція при першому перегляді сітки */}
      {gridView && !showStats && !showDescription && !selectedEmotion && (
        <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-80 backdrop-blur-md p-4 text-center">
          <p className="text-base">Перетягніть сітку, щоб знайти свою емоцію</p>
          <p className="text-sm text-gray-400 mt-1">Центруйте емоцію в колі для вибору</p>
        </div>
      )}
    </div>
  );
};

export default EmotionTracker;