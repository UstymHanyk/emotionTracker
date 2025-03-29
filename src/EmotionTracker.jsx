// // 
// import React, { useState, useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';

// const EmotionTracker = () => {
//   const [selectedQuadrant, setSelectedQuadrant] = useState(null);
//   const [selectedEmotion, setSelectedEmotion] = useState(null);
//   const [selectedSubEmotion, setSelectedSubEmotion] = useState(null);
//   const [showDescription, setShowDescription] = useState(false);
//   const [showStats, setShowStats] = useState(false);
//   const [emotionHistory, setEmotionHistory] = useState([]);
//   const [gridView, setGridView] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
//   const containerRef = useRef(null);

//   // Завантаження історії емоцій з localStorage при завантаженні
//   useEffect(() => {
//     const savedEmotions = localStorage.getItem('emotionHistory');
//     if (savedEmotions) {
//       setEmotionHistory(JSON.parse(savedEmotions));
//     }
    
//     // Встановлення розмірів контейнера при завантаженні
//     if (containerRef.current) {
//       setDimensions({
//         width: containerRef.current.offsetWidth,
//         height: containerRef.current.offsetHeight
//       });
//     }
    
//     // Слухач для оновлення розмірів при зміні розміру вікна
//     const handleResize = () => {
//       if (containerRef.current) {
//         setDimensions({
//           width: containerRef.current.offsetWidth,
//           height: containerRef.current.offsetHeight
//         });
//       }
//     };
    
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Структуровані дані емоцій за квадрантами
//   const emotionsByQuadrant = {
//     "high-unpleasant": {
//       name: "Висока Енергія Неприємні",
//       color: "from-red-400 to-red-600",
//       borderColor: "border-red-500",
//       textColor: "text-red-700",
//       emotions: {
//         "гнів": ["роздратування", "гіркота", "злість", "обурення", "лють", "ненависть"],
//         "страх": ["стурбованість", "занепокоєння", "настороженість", "напруженість", "хвилювання", 
//                 "тривога", "переляк", "сум'яття", "паніка", "жах"],
//         "нетерпимість": ["мстивість", "войовничість", "агресія", "бунтарство", "опір"],
//         "відраза": ["неприязнь", "обридливість", "гидування"]
//       }
//     },
//     "high-pleasant": {
//       name: "Висока Енергія Приємні",
//       color: "from-yellow-300 to-yellow-500",
//       borderColor: "border-yellow-500",
//       textColor: "text-yellow-800",
//       emotions: {
//         "радість": ["задоволення", "втіха", "веселість", "насолода", "щастя", 
//                  "захват", "тріумфування", "блаженство", "ейфорія"],
//         "інтерес": ["цікавість", "жвавість", "захопленість", "збудження", "ентузіазм", "азарт", "драйв"],
//         "здивування": ["подив", "захват", "потрясіння", "приголомшеність"],
//         "рішучість": ["наснага", "натхнення", "сміливість", "енергійність"]
//       }
//     },
//     "low-unpleasant": {
//       name: "Низька Енергія Неприємні",
//       color: "from-blue-300 to-blue-500",
//       borderColor: "border-blue-500",
//       textColor: "text-blue-800",
//       emotions: {
//         "сум": ["смуток", "хандра", "туга", "пригніченість", "горе", "скорбота", "відчай"],
//         "сором": ["соромливість", "боязкість", "ніяковість"],
//         "образа": ["досада", "сердитість", "скривдженість"],
//         "провина": ["жалкування", "розпач", "каяття"],
//         "нудьга": ["апатія", "загальмованість"],
//         "самотність": ["відкинутість", "ізольованість", "безпорадність", "слабкість", "вразливість"]
//       }
//     },
//     "low-pleasant": {
//       name: "Низька Енергія Приємні",
//       color: "from-green-300 to-green-500",
//       borderColor: "border-green-500",
//       textColor: "text-green-800",
//       emotions: {
//         "умиротворення": ["спокій", "розслабленість", "безтурботність"],
//         "смирення": ["впевненість", "довольство", "життєрадісність", "полегшення"],
//         "прийняття": ["ніжність", "симпатія", "співчуття", "прив'язаність", "вдячність", "повага"],
//         "одухотвореність": ["співпричетність", "натхнення", "наснага", "надія", "життєлюбність"]
//       }
//     }
//   };

//   // Додаткові описи для емоцій
//   const emotionDescriptions = {
//     "гнів": "стан незадоволення, обурення; роздратування",
//     "страх": "стан хвилювання, тривоги, неспокою, викликаний очікуванням небезпеки",
//     "сум": "смуток, спричинений горем, невдачею або іншою причиною",
//     "радість": "почуття задоволення, втіхи, приємності",
//     "інтерес": "увага до кого-, чого-небудь, зацікавлення кимось, чимось",
//     "умиротворення": "стан спокою та гармонії",
//     "смирення": "стан спокійного прийняття ситуації",
//     "одухотвореність": "стан піднесення та натхнення",
//     "відраза": "сильне почуття неприязні, відрази до кого-, чого-небудь",
//     "сором": "почуття сильного збентеження, незручності від усвідомлення непристойності вчинку",
//     "образа": "почуття гіркоти, досади, болісного переживання, викликане чиїмсь зневажливим ставленням",
//     "провина": "усвідомлення відповідальності за негативний вчинок чи його наслідки",
//     "нудьга": "стан бездіяльності, відсутності інтересу до оточуючого",
//     "самотність": "відчуття ізольованості від інших людей",
//     "нетерпимість": "нездатність або небажання терпіти когось або щось",
//     "здивування": "почуття, викликане чимось незвичайним, незрозумілим, несподіваним",
//     "рішучість": "твердість і непохитність у прийнятті рішень та їх виконанні"
//   };

//   // Create an evenly spaced grid of emotions
// const getAllEmotions = () => {
//     const allEmotions = [];
//     const gridSize = 10; // 10x10 grid
    
//     // Define quadrant positions in the grid
//     const quadrantBounds = {
//       "high-unpleasant": { minX: 0, maxX: 4, minY: 0, maxY: 4 },
//       "high-pleasant": { minX: 5, maxX: 9, minY: 0, maxY: 4 },
//       "low-unpleasant": { minX: 0, maxX: 4, minY: 5, maxY: 9 },
//       "low-pleasant": { minX: 5, maxX: 9, minY: 5, maxY: 9 }
//     };
    
//     // Process each quadrant
//     Object.entries(emotionsByQuadrant).forEach(([quadrantKey, quadrantData]) => {
//       const bounds = quadrantBounds[quadrantKey];
//       const quadrantWidth = bounds.maxX - bounds.minX + 1;
//       const quadrantHeight = bounds.maxY - bounds.minY + 1;
      
//       // Get all emotions (main and sub) for this quadrant
//       const quadrantEmotions = [];
      
//       Object.entries(quadrantData.emotions).forEach(([mainEmotion, subEmotions]) => {
//         quadrantEmotions.push({
//           name: mainEmotion,
//           type: "main"
//         });
        
//         subEmotions.forEach(subEmotion => {
//           quadrantEmotions.push({
//             name: subEmotion,
//             parent: mainEmotion,
//             type: "sub"
//           });
//         });
//       });
      
//       // Calculate total cells in this quadrant
//       const totalCells = quadrantWidth * quadrantHeight;
//       const totalEmotions = quadrantEmotions.length;
      
//       // Distribute emotions evenly in the quadrant
//       quadrantEmotions.forEach((emotion, index) => {
//         const cellIndex = Math.floor((index / totalEmotions) * totalCells);
//         const cellY = Math.floor(cellIndex / quadrantWidth);
//         const cellX = cellIndex % quadrantWidth;
        
//         // Calculate grid position
//         const x = bounds.minX + cellX;
//         const y = bounds.minY + cellY;
        
//         allEmotions.push({
//           ...emotion,
//           quadrant: quadrantKey,
//           x: x,
//           y: y,
//           distance: Math.sqrt(Math.pow(x - 4.5, 2) + Math.pow(y - 4.5, 2)) // Distance from center
//         });
//       });
//     });
    
//     return allEmotions;
//   };
//   const allEmotions = getAllEmotions();

//   // Обробка вибору квадранта
//   const handleQuadrantSelect = (quadrant) => {
//     setSelectedQuadrant(quadrant);
//     setSelectedEmotion(null);
//     setSelectedSubEmotion(null);
//     setShowDescription(false);
//     setShowStats(false);
//   };

//   // Обробка вибору емоції
//   const handleEmotionSelect = (emotion) => {
//     setSelectedEmotion(emotion);
//     setSelectedSubEmotion(null);
//     setShowDescription(false);
//   };

//   // Обробка вибору підемоції
//   const handleSubEmotionSelect = (subEmotion) => {
//     setSelectedSubEmotion(subEmotion);
//     setShowDescription(true);
//   };

//   // Функція для вибору емоції в сітці
//   const handleGridEmotionSelect = (emotion) => {
//     if (emotion.type === "main") {
//       setSelectedEmotion(emotion.name);
//       setSelectedQuadrant(emotion.quadrant);
//       setSelectedSubEmotion(null);
//       setShowDescription(false);
//     } else {
//       setSelectedEmotion(emotion.parent);
//       setSelectedQuadrant(emotion.quadrant);
//       setSelectedSubEmotion(emotion.name);
//       setShowDescription(false);
//     }
//   };
  
//   // Функція для отримання розміру емоції на основі її типу та відстані від центру
//   const getEmotionSize = (emotion) => {
//     return emotion.type === "main" ? 60 : 50;
//   };

//   // Збереження обраної емоції
//   const saveEmotion = () => {
//     if (!selectedSubEmotion) return;
    
//     const newEmotionRecord = {
//       quadrant: selectedQuadrant,
//       emotion: selectedEmotion,
//       subEmotion: selectedSubEmotion,
//       timestamp: new Date().toISOString()
//     };
    
//     const updatedHistory = [newEmotionRecord, ...emotionHistory];
//     setEmotionHistory(updatedHistory);
//     localStorage.setItem('emotionHistory', JSON.stringify(updatedHistory));
    
//     // Повернення на головний екран після збереження
//     setSelectedQuadrant(null);
//     setSelectedEmotion(null);
//     setSelectedSubEmotion(null);
//     setShowDescription(false);
//     setGridView(false);
//   };

//   // Повернення на головний екран
//   const handleBack = () => {
//     if (showStats) {
//       setShowStats(false);
//     } else if (showDescription) {
//       setShowDescription(false);
//     } else if (selectedSubEmotion) {
//       setSelectedSubEmotion(null);
//     } else if (selectedEmotion && !gridView) {
//       setSelectedEmotion(null);
//     } else if (selectedQuadrant && !gridView) {
//       setSelectedQuadrant(null);
//     } else if (gridView) {
//       setGridView(false);
//       setSelectedQuadrant(null);
//       setSelectedEmotion(null);
//       setSelectedSubEmotion(null);
//       setShowDescription(false);
//     }
//   };

//   // Підготовка даних для статистики
//   const prepareStatsData = () => {
//     const last7Days = emotionHistory.filter(record => {
//       const recordDate = new Date(record.timestamp);
//       const weekAgo = new Date();
//       weekAgo.setDate(weekAgo.getDate() - 7);
//       return recordDate >= weekAgo;
//     });

//     // Підрахунок частоти квадрантів
//     const quadrantCounts = {};
//     last7Days.forEach(record => {
//       if (!quadrantCounts[record.quadrant]) {
//         quadrantCounts[record.quadrant] = 0;
//       }
//       quadrantCounts[record.quadrant]++;
//     });

//     // Підрахунок топ-5 емоцій
//     const emotionCounts = {};
//     last7Days.forEach(record => {
//       const emotionName = record.subEmotion;
//       if (!emotionCounts[emotionName]) {
//         emotionCounts[emotionName] = 0;
//       }
//       emotionCounts[emotionName]++;
//     });

//     const topEmotions = Object.entries(emotionCounts)
//       .sort((a, b) => b[1] - a[1])
//       .slice(0, 5);

//     return { quadrantCounts, topEmotions, totalRecords: last7Days.length };
//   };
  
//   // Функція для отримання кольору емоції на основі її квадранта і відстані від центру
//   const getEmotionColor = (emotion) => {
//     const { quadrant, distance } = emotion;
//     const baseColors = emotionsByQuadrant[quadrant].color;
    
//     // Зменшення насиченості кольору залежно від відстані від центру
//     const opacity = 1 - (distance / 15) * 0.3; // Максимальне зменшення насиченості на 30%
    
//     return `bg-gradient-to-br ${baseColors} opacity-${Math.floor(opacity * 100)}`;
//   };
  
//   // Обробка руху в сітці емоцій
//   const handleDrag = (_, info) => {
//     setPosition({
//       x: position.x + info.delta.x,
//       y: position.y + info.delta.y
//     });
//   };
  
//   // Обробка завершення перетягування з "магнітним" ефектом до найближчої емоції
//   const handleDragEnd = (_, info) => {
//     const cellSize = 80; // Приблизний розмір комірки сітки
    
//     // Округлюємо до найближчої комірки для "магнітного" ефекту
//     const newX = Math.round(position.x / cellSize) * cellSize;
//     const newY = Math.round(position.y / cellSize) * cellSize;
    
//     setPosition({ x: newX, y: newY });
    
//     // Знаходження найближчої емоції до центру екрана
//     const centerX = dimensions.width / 2;
//     const centerY = dimensions.height / 2;
    
//     let closestEmotion = null;
//     let minDistance = Infinity;
    
//     allEmotions.forEach(emotion => {
//       const emotionScreenX = emotion.x * cellSize + position.x + 400; // 400 - половина сітки
//       const emotionScreenY = emotion.y * cellSize + position.y + 400;
      
//       const distance = Math.sqrt(
//         Math.pow(emotionScreenX - centerX, 2) + 
//         Math.pow(emotionScreenY - centerY, 2)
//       );
      
//       if (distance < minDistance) {
//         minDistance = distance;
//         closestEmotion = emotion;
//       }
//     });
    
//     // Якщо центральна емоція достатньо близька, виводимо деталі
//     if (minDistance < cellSize / 2 && closestEmotion) {
//       handleGridEmotionSelect(closestEmotion);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white" ref={containerRef}>
//       {/* Верхня панель */}
//       <div className="p-4 flex justify-between items-center">
//         {(selectedQuadrant || selectedEmotion || selectedSubEmotion || showStats || gridView) ? (
//           <button 
//             onClick={handleBack} 
//             className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-xl"
//           >
//             {showDescription ? "×" : "←"}
//           </button>
//         ) : (
//           <button 
//             className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center invisible text-xl"
//           >
//             ←
//           </button>
//         )}
//         <h1 className="text-2xl font-bold text-center flex-1">Трекер емоцій</h1>
//         <button 
//           onClick={() => setShowStats(!showStats)} 
//           className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-xl"
//         >
//           {showStats ? "×" : "📊"}
//         </button>
//       </div>

//       {/* Статистика емоцій */}
//       {showStats && (
//         <div className="p-6">
//           <h2 className="text-2xl font-bold mb-6 text-center">Статистика емоцій</h2>
          
//           {emotionHistory.length > 0 ? (
//             <div>
//               <div className="bg-gray-800 rounded-xl p-4 mb-6">
//                 <h3 className="text-xl font-bold mb-2">Останні 7 днів</h3>
//                 {(() => {
//                   const { quadrantCounts, topEmotions, totalRecords } = prepareStatsData();
//                   return (
//                     <>
//                       <p className="text-lg mb-4">Записано емоцій: {totalRecords}</p>
                      
//                       <h4 className="text-lg font-semibold mb-2">Розподіл за квадрантами:</h4>
//                       <div className="grid grid-cols-2 gap-2 mb-4">
//                         {Object.entries(quadrantCounts).map(([quadrant, count]) => (
//                           <div 
//                             key={quadrant} 
//                             className={`p-3 rounded-lg bg-gradient-to-br ${emotionsByQuadrant[quadrant]?.color || ""} flex justify-between items-center`}
//                           >
//                             <span className="text-base">{emotionsByQuadrant[quadrant]?.name || quadrant}</span>
//                             <span className="font-bold text-lg">{count}</span>
//                           </div>
//                         ))}
//                       </div>
                      
//                       <h4 className="text-lg font-semibold mb-2">Найчастіші емоції:</h4>
//                       <div className="space-y-2">
//                         {topEmotions.length > 0 ? (
//                           topEmotions.map(([emotion, count], index) => (
//                             <div key={emotion} className="flex justify-between items-center p-2 bg-gray-700 rounded-lg">
//                               <span className="text-lg">{index + 1}. {emotion}</span>
//                               <span className="font-bold">{count} раз(ів)</span>
//                             </div>
//                           ))
//                         ) : (
//                           <p>Немає даних для відображення</p>
//                         )}
//                       </div>
//                     </>
//                   );
//                 })()}
//               </div>
              
//               <h3 className="text-xl font-bold mb-2">Останні записи:</h3>
//               <div className="space-y-2 max-h-64 overflow-y-auto">
//                 {emotionHistory.slice(0, 10).map((record, index) => {
//                   const date = new Date(record.timestamp);
//                   const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
                  
//                   return (
//                     <div 
//                       key={index} 
//                       className={`p-3 rounded-lg bg-gradient-to-br ${emotionsByQuadrant[record.quadrant]?.color || ""}`}
//                     >
//                       <div className="font-bold text-lg">{record.subEmotion}</div>
//                       <div className="text-sm opacity-80">{formattedDate}</div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           ) : (
//             <div className="text-center p-6 bg-gray-800 rounded-xl">
//               <p className="text-xl">Ще немає записаних емоцій</p>
//               <p className="mt-2">Додайте першу емоцію, щоб побачити статистику</p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Сітка емоцій */}
//       {gridView && !showStats && !showDescription && (
//         <div className="absolute inset-0 overflow-hidden" style={{ top: '76px', bottom: '72px' }}>
//           <motion.div 
//             className="absolute w-800 h-800"
//             style={{ 
//               width: '800px',
//               height: '800px',
//               x: position.x,
//               y: position.y
//             }}
//             drag
//             dragConstraints={{ 
//               left: -600, 
//               right: 600, 
//               top: -600, 
//               bottom: 600 
//             }}
//             onDrag={handleDrag}
//             onDragEnd={handleDragEnd}
//           >
//             {allEmotions.map((emotion, index) => {
//               const size = getEmotionSize(emotion);
//               return (
//                 <motion.div
//                   key={`${emotion.name}-${index}`}
//                   className={`absolute rounded-full flex items-center justify-center cursor-pointer bg-gradient-to-br ${emotionsByQuadrant[emotion.quadrant].color} select-none`}
//                   style={{
//                     left: `${emotion.x * 80}px`,
//                     top: `${emotion.y * 80}px`,
//                     width: `${size}px`,
//                     height: `${size}px`,
//                     fontSize: emotion.type === "main" ? '16px' : '14px',
//                     fontWeight: emotion.type === "main" ? 'bold' : 'normal',
//                     zIndex: emotion.type === "main" ? 2 : 1,
//                     filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.3))'
//                   }}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => handleGridEmotionSelect(emotion)}
//                   initial={{ opacity: 0, scale: 0 }}
//                   animate={{ 
//                     opacity: 1, 
//                     scale: 1,
//                     transition: { 
//                       delay: index * 0.01,
//                       type: "spring",
//                       stiffness: 300,
//                       damping: 20
//                     }
//                   }}
//                 >
//                   <span className="text-center px-2">{emotion.name}</span>
                  
                  
//                 </motion.div>
//               );
//             })}
//           </motion.div>
          
//           {/* Індикатор поточного вибору або підказка */}
//           {selectedEmotion && !showDescription && (
//             <div className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4 flex flex-col items-center">
//               <p className="text-lg mb-2">
//                 {selectedEmotion} 
//                 {selectedSubEmotion ? `: ${selectedSubEmotion}` : ''}
//               </p>
//               <p className="text-sm opacity-70">
//                 {selectedEmotion && emotionDescriptions[selectedEmotion] 
//                   ? emotionDescriptions[selectedEmotion] 
//                   : 'Проведіть пальцем, щоб досліджувати емоції'}
//               </p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Блок з вибраною емоцією */}
//       {selectedSubEmotion && showDescription && !showStats && (
//         <div className="px-6 py-8">
//           <div className={`rounded-2xl p-6 mx-auto max-w-md bg-gradient-to-br ${selectedQuadrant ? emotionsByQuadrant[selectedQuadrant].color : ""}`}>
//             <h2 className="text-4xl font-bold text-center mb-6">{selectedSubEmotion}</h2>
//             <p className="text-center text-xl">
//               {selectedEmotion && emotionDescriptions[selectedEmotion] 
//                 ? emotionDescriptions[selectedEmotion] 
//                 : `Ви відчуваєте ${selectedSubEmotion.toLowerCase()}`}
//             </p>
//             <div className="mt-10 flex justify-end">
//               <motion.button 
//                 onClick={saveEmotion}
//                 className="bg-white text-black rounded-full w-16 h-16 flex items-center justify-center text-2xl"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 ✓
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Вибір підемоцій */}
//       {selectedEmotion && !showDescription && !showStats && !gridView && (
//         <div className="p-6">
//           <h2 className="text-2xl font-bold mb-6 text-center">
//             Виберіть точніше, як ви почуваєтесь
//           </h2>
//           <div className="grid grid-cols-3 gap-4">
//             {selectedQuadrant && selectedEmotion && 
//              emotionsByQuadrant[selectedQuadrant].emotions[selectedEmotion].map((subEmotion, index) => (
//               <motion.button 
//                 key={subEmotion}
//                 onClick={() => handleSubEmotionSelect(subEmotion)}
//                 className={`rounded-full aspect-square flex items-center justify-center p-3 text-center text-lg
//                   bg-gradient-to-br ${emotionsByQuadrant[selectedQuadrant].color} 
//                   border-2 ${emotionsByQuadrant[selectedQuadrant].borderColor}
//                   relative overflow-hidden`}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ 
//                   opacity: 1, 
//                   y: 0,
//                   transition: { 
//                     delay: index * 0.05,
//                     type: "spring"
//                   }
//                 }}
//               >
//                 {subEmotion}
                
//                 {/* Анімований градієнт фону */}
//                 <motion.div 
//                   className={`absolute inset-0 rounded-full opacity-60 bg-gradient-to-br ${emotionsByQuadrant[selectedQuadrant].color}`}
//                   animate={{ 
//                     background: [`linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.1) 100%)`,
// `linear-gradient(225deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.1) 100%)`]
//                   }}
//                   transition={{ 
//                     repeat: Infinity,
//                     repeatType: "reverse",
//                     duration: 6
//                   }}
//                   style={{ zIndex: -1 }}
//                 />
//               </motion.button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Вибір емоцій */}
//       {selectedQuadrant && !selectedEmotion && !showStats && !gridView && (
//         <div className="p-6">
//           <h2 className="text-2xl font-bold mb-6 text-center">
//             Що ви відчуваєте?
//           </h2>
//           <div className="grid grid-cols-2 gap-4">
//             {Object.keys(emotionsByQuadrant[selectedQuadrant].emotions).map((emotion, index) => (
//               <motion.button 
//                 key={emotion}
//                 onClick={() => handleEmotionSelect(emotion)}
//                 className={`rounded-xl py-6 px-4 
//                   bg-gradient-to-br ${emotionsByQuadrant[selectedQuadrant].color} 
//                   border-2 ${emotionsByQuadrant[selectedQuadrant].borderColor}
//                   flex flex-col items-center justify-center
//                   relative overflow-hidden`}
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.97 }}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ 
//                   opacity: 1, 
//                   y: 0,
//                   transition: { 
//                     delay: index * 0.1,
//                     type: "spring"
//                   }
//                 }}
//               >
//                 <span className="text-2xl font-bold mb-1">{emotion}</span>
//                 <span className={`text-sm ${emotionsByQuadrant[selectedQuadrant].textColor}`}>
//                   {emotionDescriptions[emotion]}
//                 </span>
                
//                 {/* Анімований градієнт фону */}
//                 <motion.div 
//                   className={`absolute inset-0 opacity-50 bg-gradient-to-br ${emotionsByQuadrant[selectedQuadrant].color}`}
//                   animate={{ 
//                     background: [`linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.1) 100%)`,
//                                 `linear-gradient(225deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.1) 100%)`]
//                   }}
//                   transition={{ 
//                     repeat: Infinity,
//                     repeatType: "reverse",
//                     duration: 5
//                   }}
//                   style={{ zIndex: -1 }}
//                 />
//               </motion.button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Головний екран з квадрантами та іншими опціями */}
//       {!selectedQuadrant && !showStats && !gridView && (
//         <div className="px-6 pb-24 pt-8">
//           <div className="grid grid-cols-2 gap-4 mb-6">
//             {Object.keys(emotionsByQuadrant).map((quadrantKey) => {
//               const quadrant = emotionsByQuadrant[quadrantKey];
//               return (
//                 <motion.button 
//                   key={quadrantKey}
//                   onClick={() => handleQuadrantSelect(quadrantKey)}
//                   className={`rounded-xl aspect-square flex flex-col items-center justify-center p-4 
//                     bg-gradient-to-br ${quadrant.color} 
//                     border-2 ${quadrant.borderColor}
//                     relative overflow-hidden`}
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.97 }}
//                 >
//                   <span className="text-xl font-bold mb-2 text-center">{quadrant.name}</span>
                  
//                   {/* Пульсуючий фоновий ефект */}
//                   <motion.div 
//                     className={`absolute inset-0 bg-gradient-to-br ${quadrant.color}`}
//                     animate={{ 
//                       opacity: [0.7, 0.5, 0.7],
//                       scale: [1, 1.05, 1]
//                     }}
//                     transition={{ 
//                       repeat: Infinity,
//                       repeatType: "reverse",
//                       duration: 4
//                     }}
//                     style={{ zIndex: -1 }}
//                   />
//                 </motion.button>
//               );
//             })}
//           </div>
          
//           {/* Кнопка відображення сітки */}
//           <motion.button 
//             onClick={() => setGridView(true)}
//             className="w-full rounded-xl py-4 px-6 bg-gradient-to-r from-purple-500 to-indigo-500 
//               text-center text-xl font-bold mb-4 relative overflow-hidden"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             <span>Карта емоцій</span>
            
//             {/* Анімований градієнт фону */}
//             <motion.div 
//               className="absolute inset-0 opacity-50 bg-gradient-to-r from-purple-500 to-indigo-500"
//               animate={{ 
//                 background: [`linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.1) 100%)`,
//                             `linear-gradient(225deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.1) 100%)`]
//               }}
//               transition={{ 
//                 repeat: Infinity,
//                 repeatType: "reverse",
//                 duration: 5
//               }}
//               style={{ zIndex: -1 }}
//             />
//           </motion.button>
          
//           {/* Останні записи */}
//           {emotionHistory.length > 0 && (
//             <div className="mt-8">
//               <h3 className="text-xl font-bold mb-3">Останні записи:</h3>
//               <div className="space-y-3">
//                 {emotionHistory.slice(0, 3).map((record, index) => {
//                   const date = new Date(record.timestamp);
//                   const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
                  
//                   return (
//                     <motion.div 
//                       key={index} 
//                       className={`p-4 rounded-lg bg-gradient-to-br ${emotionsByQuadrant[record.quadrant]?.color || ""}`}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ 
//                         opacity: 1, 
//                         x: 0,
//                         transition: { 
//                           delay: index * 0.1,
//                           type: "spring"
//                         }
//                       }}
//                     >
//                       <div className="font-bold text-lg">{record.subEmotion}</div>
//                       <div className="text-sm opacity-80">{formattedDate}</div>
//                     </motion.div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Нижня панель навігації для сітки емоцій */}
//     {gridView && !showStats && (
//     <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-80 backdrop-blur-md p-4 flex flex-col items-center border-t border-gray-800">
//         {selectedEmotion ? (
//         <div className="flex flex-col items-center w-full">
//             <div className="flex items-center justify-between w-full mb-2">
//             <h3 className="text-xl font-semibold">
//                 {selectedEmotion}
//                 {selectedSubEmotion ? `: ${selectedSubEmotion}` : ''}
//             </h3>
//             {selectedSubEmotion && (
//                 <button 
//                 onClick={saveEmotion}
//                 className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center"
//                 >
//                 ✓
//                 </button>
//             )}
//             </div>
//             <p className="text-sm text-gray-300 text-center">
//             {selectedEmotion && emotionDescriptions[selectedEmotion] 
//                 ? emotionDescriptions[selectedEmotion] 
//                 : 'Проведіть, щоб дослідити емоції. Зупиніться на бажаній.'}
//             </p>
//         </div>
//         ) : (
//         <div className="text-center">
//             <p className="text-base">Перетягніть сітку, щоб знайти свою емоцію</p>
//             <p className="text-sm text-gray-400 mt-1">Центруйте емоцію в колі для вибору</p>
//         </div>
//         )}
//     </div>
//     )}

//       {/* Покажчик в центрі для сітки емоцій */}
//       {gridView && !showStats && !showDescription && (
//         <div className="fixed inset-0 pointer-events-none flex items-center justify-center" style={{ top: '76px', bottom: '72px' }}>
//           <div className="w-16 h-16 border-2 border-white rounded-full opacity-50"></div>
//         </div>
//       )}

//       {/* Інструкція при першому перегляді сітки */}
//       {gridView && !showStats && !showDescription && !selectedEmotion && (
//         <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-80 backdrop-blur-md p-4 text-center">
//           <p className="text-base">Перетягніть сітку, щоб знайти свою емоцію</p>
//           <p className="text-sm text-gray-400 mt-1">Центруйте емоцію в колі для вибору</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmotionTracker;


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
  const [currentMood, setCurrentMood] = useState(null);
  const [showJournal, setShowJournal] = useState(false);
  const [journalEntry, setJournalEntry] = useState('');
  const [journalEntries, setJournalEntries] = useState([]);
  const [showReminders, setShowReminders] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState({ text: '', time: '', days: [] });
  const [theme, setTheme] = useState('dark');
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(1);
  const containerRef = useRef(null);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedEmotions = localStorage.getItem('emotionHistory');
    const savedJournal = localStorage.getItem('journalEntries');
    const savedReminders = localStorage.getItem('reminders');
    const savedTheme = localStorage.getItem('theme');
    const tutorialCompleted = localStorage.getItem('tutorialCompleted');
    
    if (savedEmotions) {
      setEmotionHistory(JSON.parse(savedEmotions));
    }
    
    if (savedJournal) {
      setJournalEntries(JSON.parse(savedJournal));
    }
    
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    }
    
    if (savedTheme) {
      setTheme(savedTheme);
    }
    
    if (!tutorialCompleted) {
      setShowTutorial(true);
    }
    
    // Set container dimensions
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight
      });
    }
    
    // Update dimensions on window resize
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

  // Emotion data by quadrant
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

  // Descriptions for emotions
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

  // Get all emotions for grid display
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

  // Handle quadrant selection
  const handleQuadrantSelect = (quadrant) => {
    setSelectedQuadrant(quadrant);
    setSelectedEmotion(null);
    setSelectedSubEmotion(null);
    setShowDescription(false);
    setShowStats(false);
    setShowJournal(false);
    setShowReminders(false);
  };

  // Handle emotion selection
  const handleEmotionSelect = (emotion) => {
    setSelectedEmotion(emotion);
    setSelectedSubEmotion(null);
    setShowDescription(false);
  };

  // Handle sub-emotion selection
  const handleSubEmotionSelect = (subEmotion) => {
    setSelectedSubEmotion(subEmotion);
    setShowDescription(true);
  };

  // Handle grid emotion selection
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
  
  // Get emotion size based on type and distance from center
  const getEmotionSize = (emotion) => {
    return emotion.type === "main" ? 60 : 50;
  };

  // Save selected emotion
  const saveEmotion = () => {
    if (!selectedSubEmotion) return;
    
    const newEmotionRecord = {
      quadrant: selectedQuadrant,
      emotion: selectedEmotion,
      subEmotion: selectedSubEmotion,
      timestamp: new Date().toISOString(),
      notes: journalEntry || null
    };
    
    const updatedHistory = [newEmotionRecord, ...emotionHistory];
    setEmotionHistory(updatedHistory);
    localStorage.setItem('emotionHistory', JSON.stringify(updatedHistory));
    
    // Set current mood for journal entry
    setCurrentMood({
      emotion: selectedSubEmotion,
      quadrant: selectedQuadrant
    });
    
    // If we have journal text, prompt to save it
    if (journalEntry.trim().length > 0) {
      saveJournalEntry();
    } else {
      // If we don't have a journal entry, ask if they want to add one
      setShowJournal(true);
    }
    
    // Return to main screen after saving
    setSelectedQuadrant(null);
    setSelectedEmotion(null);
    setSelectedSubEmotion(null);
    setShowDescription(false);
    setGridView(false);
  };

  // Save journal entry
  const saveJournalEntry = () => {
    if (!journalEntry.trim()) return;
    
    const newEntry = {
      id: Date.now(),
      text: journalEntry,
      timestamp: new Date().toISOString(),
      mood: currentMood
    };
    
    const updatedEntries = [newEntry, ...journalEntries];
    setJournalEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    
    // Reset journal entry
    setJournalEntry('');
    setShowJournal(false);
  };

  // Add a new reminder
  const addReminder = () => {
    if (!newReminder.text.trim() || !newReminder.time) return;
    
    const reminder = {
      id: Date.now(),
      text: newReminder.text,
      time: newReminder.time,
      days: newReminder.days.length ? newReminder.days : ['all'],
      active: true
    };
    
    const updatedReminders = [reminder, ...reminders];
    setReminders(updatedReminders);
    localStorage.setItem('reminders', JSON.stringify(updatedReminders));
    
    // Reset reminder form
    setNewReminder({ text: '', time: '', days: [] });
  };

  // Toggle reminder active state
  const toggleReminder = (id) => {
    const updatedReminders = reminders.map(reminder => 
      reminder.id === id ? { ...reminder, active: !reminder.active } : reminder
    );
    
    setReminders(updatedReminders);
    localStorage.setItem('reminders', JSON.stringify(updatedReminders));
  };

  // Toggle theme (dark/light)
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Navigate back button
  const handleBack = () => {
    if (showStats) {
      setShowStats(false);
    } else if (showJournal) {
      setShowJournal(false);
    } else if (showReminders) {
      setShowReminders(false);
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

  // Complete tutorial
  const completeTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('tutorialCompleted', 'true');
  };

  // Next tutorial step
  const nextTutorialStep = () => {
    if (tutorialStep < 4) {
      setTutorialStep(tutorialStep + 1);
    } else {
      completeTutorial();
    }
  };

  // Prepare stats data
  const prepareStatsData = () => {
    const last7Days = emotionHistory.filter(record => {
      const recordDate = new Date(record.timestamp);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return recordDate >= weekAgo;
    });

    // Count quadrants
    const quadrantCounts = {};
    last7Days.forEach(record => {
      if (!quadrantCounts[record.quadrant]) {
        quadrantCounts[record.quadrant] = 0;
      }
      quadrantCounts[record.quadrant]++;
    });

    // Count top emotions
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

    // Group emotions by day for chart
    const last7DaysDates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      last7DaysDates.push(date.toLocaleDateString());
    }

    const emotionsByDay = {};
    last7DaysDates.forEach(date => { emotionsByDay[date] = { count: 0 }; });

    last7Days.forEach(record => {
      const date = new Date(record.timestamp).toLocaleDateString();
      if (emotionsByDay[date]) {
        emotionsByDay[date].count++;
        if (!emotionsByDay[date].quadrants) {
          emotionsByDay[date].quadrants = {};
        }
        if (!emotionsByDay[date].quadrants[record.quadrant]) {
          emotionsByDay[date].quadrants[record.quadrant] = 0;
        }
        emotionsByDay[date].quadrants[record.quadrant]++;
      }
    });

    return { 
      quadrantCounts, 
      topEmotions, 
      totalRecords: last7Days.length,
      emotionsByDay,
      last7DaysDates
    };
  };
  
  // Get emotion color based on quadrant and distance from center
  const getEmotionColor = (emotion) => {
    const { quadrant, distance } = emotion;
    const baseColors = emotionsByQuadrant[quadrant].color;
    
    // Reduce color saturation based on distance from center
    const opacity = 1 - (distance / 15) * 0.3; // Maximum 30% reduction
    
    return `bg-gradient-to-br ${baseColors} opacity-${Math.floor(opacity * 100)}`;
  };
  
  // Handle drag movement in emotion grid
  const handleDrag = (_, info) => {
    setPosition({
      x: position.x + info.delta.x,
      y: position.y + info.delta.y
    });
  };
  
  // Handle drag end with magnet effect to closest emotion
  const handleDragEnd = (_, info) => {
    const cellSize = 80; // Approximate grid cell size
    
    // Round to nearest cell for magnet effect
    const newX = Math.round(position.x / cellSize) * cellSize;
    const newY = Math.round(position.y / cellSize) * cellSize;
    
    setPosition({ x: newX, y: newY });
    
    // Find closest emotion to screen center
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    
    let closestEmotion = null;
    let minDistance = Infinity;
    
    allEmotions.forEach(emotion => {
      const emotionScreenX = emotion.x * cellSize + position.x + 400; // 400 - half of grid
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
    
    // If central emotion is close enough, show details
    if (minDistance < cellSize / 2 && closestEmotion) {
      handleGridEmotionSelect(closestEmotion);
    }
  };

  // Get a friendly date string
  const getFriendlyDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return `Сьогодні, ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    } else if (diffDays === 1) {
      return `Вчора, ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    } else if (diffDays < 7) {
      const days = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'Пʼятниця', 'Субота'];
      return `${days[date.getDay()]}, ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    } else {
      return date.toLocaleDateString() + ', ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
  };

  // Base classes for theming
  const themeClasses = {
    background: theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50',
    text: theme === 'dark' ? 'text-white' : 'text-gray-900',
    cardBg: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
    border: theme === 'dark' ? 'border-gray-700' : 'border-gray-200',
    buttonBg: theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200',
    input: theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900',
  };

  return (
    <div className={`min-h-screen ${themeClasses.background} ${themeClasses.text} transition-colors duration-300`} ref={containerRef}>
      {/* Header bar */}
      <div className={`p-4 flex justify-between items-center border-b ${themeClasses.border}`}>
        {(selectedQuadrant || selectedEmotion || selectedSubEmotion || showStats || gridView || showJournal || showReminders) ? (
          <button 
            onClick={handleBack} 
            className={`w-10 h-10 rounded-full ${themeClasses.buttonBg} flex items-center justify-center text-xl`}
          >
            {showDescription ? "×" : "←"}
          </button>
        ) : (
          <button 
            onClick={toggleTheme} 
            className={`w-10 h-10 rounded-full ${themeClasses.buttonBg} flex items-center justify-center text-xl`}
          >
            {theme === 'dark' ? "☀️" : "🌙"}
          </button>
        )}
        <h1 className="text-xl font-bold text-center flex-1">Трекер емоцій</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowReminders(!showReminders && !showStats)} 
            className={`w-10 h-10 rounded-full ${themeClasses.buttonBg} flex items-center justify-center text-xl ${showReminders ? 'border-2 border-blue-500' : ''}`}
          >
            🔔
          </button>
          <button 
            onClick={() => setShowJournal(!showJournal && !showStats)} 
            className={`w-10 h-10 rounded-full ${themeClasses.buttonBg} flex items-center justify-center text-xl ${showJournal ? 'border-2 border-blue-500' : ''}`}
          >
            📔
          </button>
          <button 
            onClick={() => setShowStats(!showStats)} 
            className={`w-10 h-10 rounded-full ${themeClasses.buttonBg} flex items-center justify-center text-xl ${showStats ? 'border-2 border-blue-500' : ''}`}
          >
            📊
          </button>
        </div>
      </div>

      {/* Tutorial overlay */}
      {showTutorial && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-6">
          <div className={`${themeClasses.cardBg} rounded-xl p-6 max-w-md`}>
            {tutorialStep === 1 && (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Ласкаво просимо до Трекера емоцій!</h2>
                <p className="mb-6">Цей додаток допоможе вам відстежувати, аналізувати та розуміти свої емоції.</p>
                <img src="/api/placeholder/300/200" alt="Welcome" className="mx-auto mb-6 rounded-lg" />
                <button 
                  onClick={nextTutorialStep}
                  className="w-full rounded-lg bg-blue-500 hover:bg-blue-600 text-white py-3 font-medium"
                >
                  Далі
                </button>
              </div>
            )}
            
            {tutorialStep === 2 && (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Виберіть свою емоцію</h2>
                <p className="mb-6">Виберіть квадрант, який відповідає вашому стану, або використовуйте Карту емоцій для більш інтуїтивного вибору.</p>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {Object.keys(emotionsByQuadrant).map((key) => (
                    <div key={key} className={`p-3 rounded-lg bg-gradient-to-br ${emotionsByQuadrant[key].color}`}>
                      <p className="text-sm font-medium">{emotionsByQuadrant[key].name}</p>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={nextTutorialStep}
                  className="w-full rounded-lg bg-blue-500 hover:bg-blue-600 text-white py-3 font-medium"
                >
                  Далі
                </button>
              </div>
            )}
            
            {tutorialStep === 3 && (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Ведіть щоденник</h2>
                <p className="mb-6">Записуйте свої думки разом з емоціями, щоб краще зрозуміти, що викликає певні почуття.</p>
                <div className={`${themeClasses.buttonBg} rounded-lg p-4 mb-6 text-left`}>
                  <p className="text-sm italic">Сьогодні я відчував радість, коли...</p>
                </div>
                <button 
                  onClick={nextTutorialStep}
                  className="w-full rounded-lg bg-blue-500 hover:bg-blue-600 text-white py-3 font-medium"
                >
                  Далі
                </button>
              </div>
            )}
            
            {tutorialStep === 4 && (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Аналізуйте свої емоції</h2>
                <p className="mb-6">Відстежуйте своє емоційне здоров'я за допомогою статистики та графіків, щоб виявити закономірності.</p>
                <div className="h-32 bg-blue-100 rounded-lg mb-6 flex items-center justify-center">
                  <p className="text-blue-500">Приклад графіка</p>
                </div>
                <button 
                  onClick={completeTutorial}
                  className="w-full rounded-lg bg-blue-500 hover:bg-blue-600 text-white py-3 font-medium"
                  >
                    Почати
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
  
        {/* Main content area */}
        <div className="container mx-auto p-4">
          {/* Stats view */}
          {showStats && (
            <div className={`${themeClasses.cardBg} rounded-xl shadow-lg p-4 mb-4`}>
              <h2 className="text-xl font-bold mb-4">Аналіз емоцій за останні 7 днів</h2>
              
              {emotionHistory.length === 0 ? (
                <p className="text-center py-6">Немає даних для аналізу. Почніть відстежувати свої емоції!</p>
              ) : (
                <>
                  {/* Stats calculations */}
                  {(() => {
                    const stats = prepareStatsData();
                    return (
                      <div className="space-y-6">
                        {/* Summary numbers */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className={`${themeClasses.buttonBg} rounded-lg p-4 text-center`}>
                            <p className="text-sm opacity-70">Всього записів</p>
                            <p className="text-2xl font-bold">{stats.totalRecords}</p>
                          </div>
                          <div className={`${themeClasses.buttonBg} rounded-lg p-4 text-center`}>
                            <p className="text-sm opacity-70">Переважний стан</p>
                            <p className="text-lg font-bold truncate">
                              {Object.entries(stats.quadrantCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ? 
                                emotionsByQuadrant[Object.entries(stats.quadrantCounts).sort((a, b) => b[1] - a[1])[0][0]].name : 
                                "Немає даних"}
                            </p>
                          </div>
                        </div>
                        
                        {/* Top emotions */}
                        <div>
                          <h3 className="font-medium mb-2">Найчастіші емоції</h3>
                          <div className="space-y-2">
                            {stats.topEmotions.length > 0 ? stats.topEmotions.map(([emotion, count], index) => (
                              <div key={emotion} className="flex items-center">
                                <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4 mr-2">
                                  <div 
                                    className="bg-blue-500 h-4 rounded-full" 
                                    style={{ width: `${(count / stats.totalRecords) * 100}%` }}
                                  ></div>
                                </div>
                                <span className="whitespace-nowrap">{emotion} ({count})</span>
                              </div>
                            )) : (
                              <p>Недостатньо даних</p>
                            )}
                          </div>
                        </div>
                        
                        {/* Line chart */}
                        <div>
                          <h3 className="font-medium mb-2">Динаміка за тиждень</h3>
                          <div className="h-40 flex items-end justify-between space-x-1">
                            {stats.last7DaysDates.map(date => {
                              const dayData = stats.emotionsByDay[date] || { count: 0 };
                              const height = dayData.count ? Math.max(10, Math.min(100, (dayData.count / 5) * 100)) : 0;
                              
                              return (
                                <div key={date} className="flex flex-col items-center flex-1">
                                  {height > 0 && (
                                    <div className="w-full rounded-t-md overflow-hidden">
                                      {dayData.quadrants && Object.entries(dayData.quadrants).map(([quadrant, count]) => {
                                        const quadrantHeight = (count / dayData.count) * height;
                                        return (
                                          <div 
                                            key={quadrant} 
                                            className={`w-full bg-gradient-to-b ${emotionsByQuadrant[quadrant].color}`}
                                            style={{ height: `${quadrantHeight}%` }}
                                          ></div>
                                        );
                                      })}
                                    </div>
                                  )}
                                  <div 
                                    className={`w-full ${themeClasses.buttonBg} opacity-70`} 
                                    style={{ height: height === 0 ? '10%' : `${height}%` }}
                                  ></div>
                                  <p className="text-xs mt-1 truncate" style={{ maxWidth: '40px' }}>
                                    {new Date(date).toLocaleDateString([], {weekday: 'short'})}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        
                        {/* Mood calendar - NEW FEATURE */}
                        <div>
                          <h3 className="font-medium mb-2">Календар настрою</h3>
                          <div className="grid grid-cols-7 gap-1">
                            {Array.from({ length: 7 }, (_, i) => {
                              const date = new Date();
                              date.setDate(date.getDate() - 6 + i);
                              const dateStr = date.toLocaleDateString();
                              
                              // Find mood for this day
                              const todayMoods = emotionHistory.filter(record => 
                                new Date(record.timestamp).toLocaleDateString() === dateStr
                              );
                              
                              let dominantQuadrant = null;
                              if (todayMoods.length > 0) {
                                const quadrantCounts = {};
                                todayMoods.forEach(record => {
                                  if (!quadrantCounts[record.quadrant]) quadrantCounts[record.quadrant] = 0;
                                  quadrantCounts[record.quadrant]++;
                                });
                                
                                dominantQuadrant = Object.entries(quadrantCounts)
                                  .sort((a, b) => b[1] - a[1])[0]?.[0];
                              }
                              
                              return (
                                <div 
                                  key={i} 
                                  className={`aspect-square ${themeClasses.buttonBg} rounded-md flex flex-col items-center justify-center p-1 text-center ${
                                    dominantQuadrant ? `bg-gradient-to-br ${emotionsByQuadrant[dominantQuadrant].color} bg-opacity-50` : ''
                                  }`}
                                >
                                  <span className="text-xs font-bold">{date.getDate()}</span>
                                  <span className="text-[10px] opacity-70">
                                    {['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'][date.getDay()]}
                                  </span>
                                  <span className="text-2xs mt-1">
                                    {todayMoods.length > 0 ? `${todayMoods.length} 📝` : ''}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        
                        {/* Insights - NEW FEATURE */}
                        <div className={`${themeClasses.cardBg} border ${themeClasses.border} rounded-lg p-4`}>
                          <h3 className="font-medium mb-2">Ваші інсайти</h3>
                          {stats.totalRecords >= 5 ? (
                            <div className="space-y-2 text-sm">
                              {stats.topEmotions.length > 0 && (
                                <p>Ваша найчастіша емоція: <strong>{stats.topEmotions[0][0]}</strong></p>
                              )}
                              
                              {Object.entries(stats.quadrantCounts).length > 0 && (
                                <p>Ви найчастіше перебуваєте в стані <strong>
                                  {emotionsByQuadrant[Object.entries(stats.quadrantCounts)
                                    .sort((a, b) => b[1] - a[1])[0][0]].name.toLowerCase()}
                                </strong></p>
                              )}
                              
                              {emotionHistory.length > 0 && (
                                <p>Останній запис: <strong>{getFriendlyDate(emotionHistory[0].timestamp)}</strong></p>
                              )}
                              
                              {stats.totalRecords >= 10 && (
                                <p className="italic mt-2">Продовжуйте відстежувати свої емоції для отримання більш глибоких інсайтів!</p>
                              )}
                            </div>
                          ) : (
                            <p className="text-sm italic">Додайте більше записів (мінімум 5) для отримання інсайтів</p>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </>
              )}
            </div>
          )}
          
          {/* Journal view */}
          {showJournal && (
            <div className={`${themeClasses.cardBg} rounded-xl shadow-lg p-4 mb-4`}>
              <h2 className="text-xl font-bold mb-4">Емоційний щоденник</h2>
              
              {/* New entry form */}
              <div className={`border ${themeClasses.border} rounded-lg p-4 mb-4`}>
                <h3 className="font-medium mb-2">Новий запис</h3>
                
                {/* Current mood selection if not set */}
                {!currentMood && (
                  <div className="mb-4">
                    <p className="text-sm mb-2">Ваш поточний настрій:</p>
                    <div className="grid grid-cols-4 gap-2">
                      {Object.keys(emotionsByQuadrant).map(quadrant => (
                        <button
                          key={quadrant}
                          onClick={() => setCurrentMood({ quadrant })}
                          className={`rounded-lg py-2 text-center text-xs bg-gradient-to-br ${emotionsByQuadrant[quadrant].color} ${
                            currentMood?.quadrant === quadrant ? 'ring-2 ring-white ring-opacity-70' : ''
                          }`}
                        >
                          <span className="px-2 font-medium text-white truncate block">
                            {emotionsByQuadrant[quadrant].name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Show selected mood if any */}
                {currentMood && (
                  <div className="flex items-center mb-4">
                    <div className={`rounded-full w-8 h-8 mr-2 bg-gradient-to-br ${
                      emotionsByQuadrant[currentMood.quadrant].color
                    }`}></div>
                    <p>
                      {currentMood.emotion ? 
                        `Я відчуваю: ${currentMood.emotion}` : 
                        `Стан: ${emotionsByQuadrant[currentMood.quadrant].name}`}
                    </p>
                    <button 
                      onClick={() => setCurrentMood(null)} 
                      className="ml-2 text-sm opacity-70"
                    >
                      Змінити
                    </button>
                  </div>
                )}
                
                {/* Journal text area */}
                <textarea
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  placeholder="Опишіть свої думки та почуття..."
                  className={`w-full rounded-lg p-3 mb-3 min-h-[100px] ${themeClasses.input}`}
                ></textarea>
                
                {/* New feature: Add tags */}
                <div className="mb-3">
                  <p className="text-sm mb-1">Додайте теги:</p>
                  <div className="flex flex-wrap gap-2">
                    {["робота", "сім'я", "здоров'я", "стосунки", "фінанси", "особисте"].map(tag => (
                      <button 
                        key={tag} 
                        className={`px-3 py-1 rounded-full text-xs ${themeClasses.buttonBg} hover:bg-opacity-80`}
                      >
                        #{tag}
                      </button>
                    ))}
                    <button className={`px-3 py-1 rounded-full text-xs ${themeClasses.buttonBg} hover:bg-opacity-80`}>
                      + Новий
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={saveJournalEntry}
                  disabled={!journalEntry.trim() || !currentMood}
                  className={`w-full rounded-lg bg-blue-500 py-2 font-medium text-white ${
                    (!journalEntry.trim() || !currentMood) ? 'opacity-50' : 'hover:bg-blue-600'
                  }`}
                >
                  Зберегти запис
                </button>
              </div>
              
              {/* Journal entries list */}
              <div>
                <h3 className="font-medium mb-2">Попередні записи</h3>
                
                {journalEntries.length === 0 ? (
                  <p className="text-center py-6 italic">Немає збережених записів</p>
                ) : (
                  <div className="space-y-3">
                    {journalEntries.map((entry) => (
                      <div key={entry.id} className={`border ${themeClasses.border} rounded-lg p-3`}>
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            {entry.mood && (
                              <div 
                                className={`w-6 h-6 rounded-full mr-2 bg-gradient-to-br ${
                                  emotionsByQuadrant[entry.mood.quadrant].color
                                }`}
                              ></div>
                            )}
                            <span className="font-medium">
                              {entry.mood?.emotion || (entry.mood ? 
                                emotionsByQuadrant[entry.mood.quadrant].name : 'Запис')}
                            </span>
                          </div>
                          <span className="text-xs opacity-70">{getFriendlyDate(entry.timestamp)}</span>
                        </div>
                        <p className="text-sm whitespace-pre-line">{entry.text}</p>
                        
                        {/* Entry actions */}
                        <div className="flex justify-end mt-2 space-x-2">
                          <button className="text-xs opacity-70 hover:opacity-100">Редагувати</button>
                          <button className="text-xs opacity-70 hover:opacity-100">Видалити</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Reminders view */}
          {showReminders && (
            <div className={`${themeClasses.cardBg} rounded-xl shadow-lg p-4 mb-4`}>
              <h2 className="text-xl font-bold mb-4">Нагадування</h2>
              
              {/* New reminder form */}
              <div className={`border ${themeClasses.border} rounded-lg p-4 mb-4`}>
                <h3 className="font-medium mb-2">Нове нагадування</h3>
                
                <input
                  type="text"
                  value={newReminder.text}
                  onChange={(e) => setNewReminder({...newReminder, text: e.target.value})}
                  placeholder="Текст нагадування..."
                  className={`w-full rounded-lg p-3 mb-3 ${themeClasses.input}`}
                />
                
                <div className="flex mb-3">
                  <input
                    type="time"
                    value={newReminder.time}
                    onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
                    className={`rounded-lg p-3 ${themeClasses.input} flex-1 mr-2`}
                  />
                  
                  <select 
                    className={`rounded-lg p-3 ${themeClasses.input} flex-1`}
                    value={newReminder.days.join(',')}
                    onChange={(e) => {
                      const selected = Array.from(e.target.selectedOptions, option => option.value);
                      setNewReminder({...newReminder, days: selected});
                    }}
                    multiple
                  >
                    <option value="all">Щодня</option>
                    <option value="1">Понеділок</option>
                    <option value="2">Вівторок</option>
                    <option value="3">Середа</option>
                    <option value="4">Четвер</option>
                    <option value="5">П'ятниця</option>
                    <option value="6">Субота</option>
                    <option value="0">Неділя</option>
                  </select>
                </div>
                
                {/* New feature: Reminder type */}
                <div className="mb-3">
                  <p className="text-sm mb-1">Тип нагадування:</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button className={`px-3 py-2 rounded-lg text-sm ${themeClasses.buttonBg} hover:bg-opacity-80 flex items-center justify-center`}>
                      <span className="mr-1">📝</span> Запис
                    </button>
                    <button className={`px-3 py-2 rounded-lg text-sm ${themeClasses.buttonBg} hover:bg-opacity-80 flex items-center justify-center`}>
                      <span className="mr-1">🧘</span> Дихання
                    </button>
                    <button className={`px-3 py-2 rounded-lg text-sm ${themeClasses.buttonBg} hover:bg-opacity-80 flex items-center justify-center`}>
                      <span className="mr-1">🤔</span> Рефлексія
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={addReminder}
                  disabled={!newReminder.text.trim() || !newReminder.time}
                  className={`w-full rounded-lg bg-blue-500 py-2 font-medium text-white ${
                    (!newReminder.text.trim() || !newReminder.time) ? 'opacity-50' : 'hover:bg-blue-600'
                  }`}
                >
                  Додати нагадування
                </button>
              </div>
              
              {/* Reminders list */}
              <div>
                <h3 className="font-medium mb-2">Ваші нагадування</h3>
                
                {reminders.length === 0 ? (
                  <p className="text-center py-6 italic">Немає збережених нагадувань</p>
                ) : (
                  <div className="space-y-3">
                    {reminders.map((reminder) => (
                      <div key={reminder.id} className={`border ${themeClasses.border} rounded-lg p-3 flex items-center`}>
                        <div 
                          className={`w-6 h-6 mr-3 rounded-full flex items-center justify-center 
                          ${reminder.active ? 'bg-blue-500' : themeClasses.buttonBg}`}
                          onClick={() => toggleReminder(reminder.id)}
                        >
                          {reminder.active && <span className="text-white text-xs">✓</span>}
                        </div>
                        
                        <div className="flex-1">
                          <p className={`font-medium ${!reminder.active ? 'line-through opacity-50' : ''}`}>
                            {reminder.text}
                          </p>
                          <p className="text-xs opacity-70">
                            {reminder.time} • 
                            {reminder.days.includes('all') ? ' Щодня' : 
                              reminder.days.map(d => 
                                [' Нд', ' Пн', ' Вт', ' Ср', ' Чт', ' Пт', ' Сб'][parseInt(d)]
                              ).join(', ')}
                          </p>
                        </div>
                        
                        <button className="px-2 opacity-70 hover:opacity-100">
                          ✏️
                        </button>
                        <button className="px-2 opacity-70 hover:opacity-100">
                          🗑️
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
  
          {/* Emotion selection - Main screen */}
          {!selectedQuadrant && !showStats && !showJournal && !showReminders && !gridView && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(emotionsByQuadrant).map((quadrant) => (
                  <button
                    key={quadrant}
                    onClick={() => handleQuadrantSelect(quadrant)}
                    className={`rounded-xl p-4 shadow-lg bg-gradient-to-br ${emotionsByQuadrant[quadrant].color} h-32 flex flex-col justify-between`}
                  >
                    <span className="text-white font-medium text-lg leading-tight">
                      {emotionsByQuadrant[quadrant].name}
                    </span>
                    <div className="flex flex-wrap mt-2">
                      {Object.keys(emotionsByQuadrant[quadrant].emotions).slice(0, 3).map(emotion => (
                        <span key={emotion} className="text-white text-sm bg-white bg-opacity-20 rounded-full px-2 py-1 m-1 truncate max-w-[90%]">
                          {emotion}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
              
              {/* NEW FEATURE: Mood Map Button */}
              <button
                onClick={() => setGridView(true)}
                className={`w-full ${themeClasses.cardBg} rounded-xl shadow-lg p-4 flex items-center justify-center`}
              >
                <span className="text-xl mr-2">🗺️</span>
                <span className="font-medium">Карта емоцій</span>
              </button>
              
              {/* Recent emotions */}
              {emotionHistory.length > 0 && (
                <div className={`${themeClasses.cardBg} rounded-xl shadow-lg p-4`}>
                  <h2 className="font-medium mb-3">Останні записи</h2>
                  <div className="space-y-2">
                    {emotionHistory.slice(0, 3).map((record, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center p-2 rounded-lg overflow-hidden ${themeClasses.buttonBg}`}
                      >
                        <div 
                          className={`w-10 h-10 rounded-full mr-3 bg-gradient-to-br ${emotionsByQuadrant[record.quadrant].color}`}
                        ></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <p className="font-medium truncate">{record.subEmotion}</p>
                            <p className="text-xs opacity-70">{getFriendlyDate(record.timestamp)}</p>
                          </div>
                          {record.notes && (
                            <p className="text-sm truncate opacity-70">{record.notes}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* NEW FEATURE: Emotional Health Score */}
              {emotionHistory.length >= 5 && (
                <div className={`${themeClasses.cardBg} rounded-xl shadow-lg p-4`}>
                  <h2 className="font-medium mb-2">Індекс емоційного здоров'я</h2>
                  
                  {(() => {
                    // Calculate emotional wellbeing score
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    
                    const recentEmotions = emotionHistory.filter(record => 
                      new Date(record.timestamp) >= weekAgo
                    );
                    
                    // Count pleasant vs unpleasant emotions
                    let pleasantCount = 0;
                    let totalCount = recentEmotions.length;
                    
                    recentEmotions.forEach(record => {
                      if (record.quadrant === "high-pleasant" || record.quadrant === "low-pleasant") {
                        pleasantCount++;
                      }
                    });
                    
                    // Calculate score from 0-100
                    const score = totalCount > 0 ? Math.round((pleasantCount / totalCount) * 100) : 50;
                    
                    // Determine color and message
                    let scoreColor, scoreMessage;
                    
                    if (score >= 80) {
                      scoreColor = "text-green-500";
                      scoreMessage = "Відмінне емоційне здоров'я";
                    } else if (score >= 60) {
                      scoreColor = "text-green-400";
                      scoreMessage = "Добре емоційне здоров'я";
                    } else if (score >= 40) {
                      scoreColor = "text-yellow-500";
                      scoreMessage = "Нормальне емоційне здоров'я";
                    } else if (score >= 20) {
                      scoreColor = "text-orange-500";
                      scoreMessage = "Потребує уваги";
                    } else {
                      scoreColor = "text-red-500";
                      scoreMessage = "Потребує підтримки";
                    }
                    
                    return (
                      <div className="flex items-center">
                        <div className="w-24 h-24 relative flex items-center justify-center mr-4">
                          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke={theme === 'dark' ? '#374151' : '#E5E7EB'}
                              strokeWidth="10"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke={score >= 80 ? '#10B981' : score >= 60 ? '#34D399' : score >= 40 ? '#FBBF24' : score >= 20 ? '#F59E0B' : '#EF4444'}
                              strokeWidth="10"
                              strokeDasharray={`${2 * Math.PI * 40}`}
                              strokeDashoffset={`${2 * Math.PI * 40 * (1 - score / 100)}`}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className={`text-2xl font-bold ${scoreColor}`}>{score}</span>
                          </div>
                        </div>
                        
                        <div>
                          <p className={`${scoreColor} font-medium`}>{scoreMessage}</p>
                          <p className="text-sm opacity-70">На основі {totalCount} записів за 7 днів</p>
                          <button className="text-sm text-blue-500 mt-1">Детальніше</button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
              
              {/* NEW FEATURE: Breathing Exercise */}
              <div className={`${themeClasses.cardBg} rounded-xl shadow-lg p-4`}>
                <h2 className="font-medium mb-3">Вправа для заспокоєння</h2>
                <div className="text-center">
                  <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-24 h-24 flex items-center justify-center text-xl font-medium mb-3"
                  >
                    Почати
                  </button>
                  <p className="text-sm opacity-70">Глибоке дихання • 5 хвилин</p>
                </div>
              </div>
            </div>
          )}
  
          {/* Second level: Emotion selection for a quadrant */}
          {selectedQuadrant && !selectedEmotion && !gridView && (
            <div>
              <h2 className={`text-xl font-bold mb-4 ${emotionsByQuadrant[selectedQuadrant].textColor}`}>
                {emotionsByQuadrant[selectedQuadrant].name}
              </h2>
              
              <div className="grid grid-cols-2 gap-3">
                {Object.keys(emotionsByQuadrant[selectedQuadrant].emotions).map((emotion) => (
                  <button
                    key={emotion}
                    onClick={() => handleEmotionSelect(emotion)}
                    className={`rounded-lg p-3 bg-gradient-to-br ${emotionsByQuadrant[selectedQuadrant].color} flex flex-col`}
                  >
                    <span className="text-white font-medium text-lg mb-1">{emotion}</span>
                    <div className="flex flex-wrap">
                    {emotionsByQuadrant[selectedQuadrant].emotions[emotion].slice(0, 3).map(sub => (
                        <span key={sub} className="text-white text-xs mr-1 opacity-80">{sub},</span>
                      ))}
                      {emotionsByQuadrant[selectedQuadrant].emotions[emotion].length > 3 && (
                        <span className="text-white text-xs opacity-80">...</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
  
          {/* Third level: Sub-emotion selection */}
          {selectedEmotion && !showDescription && !gridView && (
            <div>
              <h2 className={`text-xl font-bold mb-2 ${emotionsByQuadrant[selectedQuadrant].textColor}`}>
                {selectedEmotion}
              </h2>
              <p className="mb-4 text-sm opacity-80">
                {emotionDescriptions[selectedEmotion]}
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {emotionsByQuadrant[selectedQuadrant].emotions[selectedEmotion].map((subEmotion) => (
                  <button
                    key={subEmotion}
                    onClick={() => handleSubEmotionSelect(subEmotion)}
                    className={`rounded-lg p-3 transition-all ${
                      selectedSubEmotion === subEmotion 
                        ? `bg-gradient-to-br ${emotionsByQuadrant[selectedQuadrant].color} text-white` 
                        : `${themeClasses.cardBg} border ${themeClasses.border}`
                    }`}
                  >
                    {subEmotion}
                  </button>
                ))}
              </div>
              
              {selectedSubEmotion && (
                <button
                  onClick={saveEmotion}
                  className="w-full rounded-lg bg-blue-500 hover:bg-blue-600 text-white py-3 font-medium mt-4"
                >
                  Зберегти емоцію
                </button>
              )}
            </div>
          )}
  
          {/* Emotion description */}
          {showDescription && (
            <div>
              <h2 className={`text-xl font-bold mb-2 ${emotionsByQuadrant[selectedQuadrant].textColor}`}>
                {selectedSubEmotion}
              </h2>
              
              <div className={`p-4 rounded-lg ${themeClasses.cardBg} border ${themeClasses.border} mb-4`}>
                <p>Як проявляється <strong>{selectedSubEmotion}</strong>?</p>
                <ul className="mt-2 list-disc list-inside">
                  <li>Фізично: напружені м'язи, зміна дихання</li>
                  <li>Думки: характерні думки при цій емоції</li>
                  <li>Поведінка: як ви дієте під впливом цієї емоції</li>
                </ul>
              </div>
              
              <div className={`p-4 rounded-lg ${themeClasses.cardBg} border ${themeClasses.border} mb-4`}>
                <p className="mb-2">Запишіть свої думки:</p>
                <textarea
                  placeholder="Що викликало цю емоцію? Як ви її відчуваєте?"
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  className={`w-full p-2 rounded ${themeClasses.input} min-h-24`}
                />
              </div>
              
              <button
                onClick={saveEmotion}
                className="w-full rounded-lg bg-blue-500 hover:bg-blue-600 text-white py-3 font-medium"
              >
                Зберегти
              </button>
            </div>
          )}
  
          {/* Stats view */}
          {showStats && (
            <div>
              <h2 className="text-xl font-bold mb-4">Статистика емоцій</h2>
              
              {emotionHistory.length === 0 ? (
                <div className={`p-4 rounded-lg ${themeClasses.cardBg} border ${themeClasses.border} text-center`}>
                  <p>У вас ще немає записів емоцій.</p>
                  <p className="mt-2 text-sm opacity-80">Додайте емоції, щоб побачити статистику.</p>
                </div>
              ) : (
                <>
                  {/* Stats data */}
                  {(() => {
                    const stats = prepareStatsData();
                    return (
                      <>
                        {/* Recent emotions */}
                        <div className={`p-4 rounded-lg ${themeClasses.cardBg} border ${themeClasses.border} mb-4`}>
                          <h3 className="font-medium mb-2">Останні емоції</h3>
                          {emotionHistory.slice(0, 3).map((record, index) => (
                            <div key={index} className={`flex items-center mb-2 ${index < emotionHistory.slice(0, 3).length - 1 ? 'border-b border-gray-200 pb-2' : ''}`}>
                              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${emotionsByQuadrant[record.quadrant].color} mr-3 flex-shrink-0`}></div>
                              <div className="flex-grow">
                                <p className="font-medium">{record.subEmotion}</p>
                                <p className="text-xs opacity-80">{getFriendlyDate(record.timestamp)}</p>
                              </div>
                            </div>
                          ))}
                          <p className="text-xs opacity-80 text-right mt-2">Всього записів: {emotionHistory.length}</p>
                        </div>
                        
                        {/* Top emotions */}
                        <div className={`p-4 rounded-lg ${themeClasses.cardBg} border ${themeClasses.border} mb-4`}>
                          <h3 className="font-medium mb-2">Найчастіші емоції (за тиждень)</h3>
                          {stats.topEmotions.length > 0 ? (
                            <ul className="space-y-2">
                              {stats.topEmotions.map(([emotion, count], index) => (
                                <li key={index} className="flex items-center">
                                  <span className="mr-2">{index + 1}.</span>
                                  <span className="flex-grow">{emotion}</span>
                                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{count} раз{count !== 1 ? 'и' : ''}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-center opacity-80">Немає даних за останній тиждень</p>
                          )}
                        </div>
                        
                        {/* Emotion distribution */}
                        <div className={`p-4 rounded-lg ${themeClasses.cardBg} border ${themeClasses.border}`}>
                          <h3 className="font-medium mb-2">Розподіл за типами емоцій</h3>
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            {Object.keys(emotionsByQuadrant).map((quadrant) => {
                              const count = stats.quadrantCounts[quadrant] || 0;
                              const percentage = stats.totalRecords > 0 
                                ? Math.round((count / stats.totalRecords) * 100) 
                                : 0;
                              
                              return (
                                <div 
                                  key={quadrant} 
                                  className={`rounded-lg p-3 ${themeClasses.buttonBg} relative overflow-hidden`}
                                >
                                  <div 
                                    className={`absolute left-0 bottom-0 h-1 bg-gradient-to-r ${emotionsByQuadrant[quadrant].color}`}
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                  <p className="text-xs font-medium">{emotionsByQuadrant[quadrant].name}</p>
                                  <p className="text-lg font-bold">{percentage}%</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </>
              )}
              
              {/* Recent entries list */}
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-3">Історія емоцій</h3>
                
                {emotionHistory.length === 0 ? (
                  <div className={`p-4 rounded-lg ${themeClasses.cardBg} border ${themeClasses.border} text-center`}>
                    <p>У вас ще немає записів емоцій.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {emotionHistory.map((record, index) => (
                      <div 
                        key={index}
                        className={`p-3 rounded-lg ${themeClasses.cardBg} border ${themeClasses.border} flex items-center`}
                      >
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${emotionsByQuadrant[record.quadrant].color} mr-4 flex-shrink-0 flex items-center justify-center`}>
                          <span className="text-xs text-white">
                            {new Date(record.timestamp).getDate()}
                          </span>
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium">{record.subEmotion}</p>
                          <p className="text-xs opacity-80">{getFriendlyDate(record.timestamp)}</p>
                          {record.notes && (
                            <p className="text-sm mt-1 italic opacity-90">{record.notes.substring(0, 80)}{record.notes.length > 80 ? '...' : ''}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
  
          {/* Journal view */}
          {showJournal && (
            <div>
              <h2 className="text-xl font-bold mb-4">Щоденник емоцій</h2>
              
              <div className={`p-4 rounded-lg ${themeClasses.cardBg} border ${themeClasses.border} mb-4`}>
                <h3 className="font-medium mb-2">Новий запис</h3>
                <textarea
                  placeholder="Що ви відчуваєте? Що викликало ці емоції?"
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  className={`w-full p-2 rounded ${themeClasses.input} min-h-24 mb-3`}
                />
                <button
                  onClick={saveJournalEntry}
                  disabled={!journalEntry.trim()}
                  className={`w-full rounded-lg py-2 font-medium ${
                    journalEntry.trim() ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Зберегти запис
                </button>
              </div>
              
              <h3 className="font-bold mb-3">Мої записи</h3>
              
              {journalEntries.length === 0 ? (
                <div className={`p-4 rounded-lg ${themeClasses.cardBg} border ${themeClasses.border} text-center`}>
                  <p>У вас ще немає записів у щоденнику.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {journalEntries.map((entry) => (
                    <div 
                      key={entry.id}
                      className={`p-4 rounded-lg ${themeClasses.cardBg} border ${themeClasses.border}`}
                    >
                      <div className="flex items-center mb-2">
                        <p className="text-sm opacity-80">{getFriendlyDate(entry.timestamp)}</p>
                        {entry.mood && (
                          <span className={`ml-auto px-2 py-1 rounded-full text-xs bg-gradient-to-r ${emotionsByQuadrant[entry.mood.quadrant].color} text-white`}>
                            {entry.mood.emotion}
                          </span>
                        )}
                      </div>
                      <p className="whitespace-pre-wrap">{entry.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
  
          {/* Reminders view */}
          {showReminders && (
            <div>
              <h2 className="text-xl font-bold mb-4">Нагадування про трекинг</h2>
              
              <div className={`p-4 rounded-lg ${themeClasses.cardBg} border ${themeClasses.border} mb-4`}>
                <h3 className="font-medium mb-2">Нове нагадування</h3>
                <input
                  type="text"
                  placeholder="Запишіть свої емоції..."
                  value={newReminder.text}
                  onChange={(e) => setNewReminder({...newReminder, text: e.target.value})}
                  className={`w-full p-2 rounded ${themeClasses.input} mb-3`}
                />
                <div className="flex mb-3">
                  <input
                    type="time"
                    value={newReminder.time}
                    onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
                    className={`flex-grow p-2 rounded-l ${themeClasses.input}`}
                  />
                  <button
                    onClick={addReminder}
                    disabled={!newReminder.text.trim() || !newReminder.time}
                    className={`px-4 rounded-r font-medium ${
                      newReminder.text.trim() && newReminder.time ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Додати
                  </button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'].map((day, index) => (
                    <button
                      key={day}
                      onClick={() => {
                        const newDays = [...newReminder.days];
                        if (newDays.includes(day)) {
                          const index = newDays.indexOf(day);
                          newDays.splice(index, 1);
                        } else {
                          newDays.push(day);
                        }
                        setNewReminder({...newReminder, days: newDays});
                      }}
                      className={`w-8 h-8 rounded-full text-xs ${
                        newReminder.days.includes(day)
                          ? 'bg-blue-500 text-white'
                          : `${themeClasses.buttonBg}`
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
              
              <h3 className="font-bold mb-3">Мої нагадування</h3>
              
              {reminders.length === 0 ? (
                <div className={`p-4 rounded-lg ${themeClasses.cardBg} border ${themeClasses.border} text-center`}>
                  <p>У вас ще немає нагадувань.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {reminders.map((reminder) => (
                    <div 
                      key={reminder.id}
                      className={`p-3 rounded-lg ${themeClasses.cardBg} border ${themeClasses.border} flex items-center ${!reminder.active ? 'opacity-60' : ''}`}
                    >
                      <div className="flex-grow">
                        <p className="font-medium">{reminder.text}</p>
                        <div className="flex items-center text-sm">
                          <span className="mr-2">{reminder.time}</span>
                          <span className="text-xs">
                            {reminder.days.includes('all') 
                              ? 'Щодня' 
                              : reminder.days.join(', ')}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleReminder(reminder.id)}
                        className={`w-10 h-6 rounded-full relative ${reminder.active ? 'bg-green-500' : themeClasses.buttonBg} transition-colors`}
                      >
                        <span 
                          className={`absolute w-5 h-5 rounded-full ${themeClasses.background} top-0.5 transition-transform ${reminder.active ? 'transform translate-x-4' : 'translate-x-1'}`}
                        ></span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Grid View - Emotion Map */}
          {gridView && (
            <div className="h-[calc(100vh-120px)] relative overflow-hidden">
              <motion.div
                drag
                dragConstraints={{ left: -800, right: 800, top: -800, bottom: 800 }}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                className="absolute w-[800px] h-[800px] bg-opacity-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{ x: position.x, y: position.y }}
              >
                <div className="relative w-full h-full">
                  {/* Center marker */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-white z-10"></div>
                  
                  {/* Quadrant boundaries */}
                  <div className="absolute top-0 left-0 w-full h-1/2 border-b border-dashed border-white opacity-20"></div>
                  <div className="absolute top-0 left-1/2 h-full w-0 border-l border-dashed border-white opacity-20"></div>
                  
                  {/* Quadrant labels */}
                  <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 opacity-40 text-white font-bold">
                    {emotionsByQuadrant["high-unpleasant"].name}
                  </div>
                  <div className="absolute top-1/4 left-3/4 transform -translate-x-1/2 -translate-y-1/2 opacity-40 text-white font-bold">
                    {emotionsByQuadrant["high-pleasant"].name}
                  </div>
                  <div className="absolute top-3/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 opacity-40 text-white font-bold">
                    {emotionsByQuadrant["low-unpleasant"].name}
                  </div>
                  <div className="absolute top-3/4 left-3/4 transform -translate-x-1/2 -translate-y-1/2 opacity-40 text-white font-bold">
                    {emotionsByQuadrant["low-pleasant"].name}
                  </div>
                  
                  {/* Emotions */}
                  {allEmotions.map((emotion, index) => {
                    const size = getEmotionSize(emotion);
                    return (
                      <motion.div
                        key={index}
                        className={`absolute rounded-full flex items-center justify-center ${getEmotionColor(emotion)} border-2 border-white shadow-lg cursor-pointer`}
                        style={{
                          left: `${emotion.x * 80 + 400 - size/2}px`,
                          top: `${emotion.y * 80 + 400 - size/2}px`,
                          width: `${size}px`,
                          height: `${size}px`,
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.01 }}
                        onClick={() => handleGridEmotionSelect(emotion)}
                      >
                        <span className="text-white text-xs font-medium">{emotion.name}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
              
              {/* Info panel at bottom */}
              {selectedEmotion && selectedSubEmotion && (
                <div className={`absolute bottom-0 left-0 right-0 ${themeClasses.cardBg} p-4 border-t ${themeClasses.border}`}>
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${emotionsByQuadrant[selectedQuadrant].color} mr-3`}></div>
                    <div>
                      <h3 className="font-bold">{selectedSubEmotion}</h3>
                      <p className="text-xs opacity-80">{selectedEmotion}</p>
                    </div>
                    <button
                      onClick={saveEmotion}
                      className="ml-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      Зберегти
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Main screen with quadrants */}
          {!selectedQuadrant && !showStats && !showJournal && !showReminders && !gridView && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-center">Як ви почуваєтеся?</h2>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => handleQuadrantSelect("high-unpleasant")}
                  className={`h-32 rounded-lg bg-gradient-to-br ${emotionsByQuadrant["high-unpleasant"].color} p-3 flex flex-col justify-between`}
                >
                  <span className="text-white font-medium">
                    {emotionsByQuadrant["high-unpleasant"].name}
                  </span>
                  <div className="flex flex-wrap">
                    {Object.keys(emotionsByQuadrant["high-unpleasant"].emotions).slice(0, 3).map(emotion => (
                      <span key={emotion} className="text-white text-xs mr-1 opacity-80">{emotion},</span>
                    ))}
                    <span className="text-white text-xs opacity-80">...</span>
                  </div>
                </button>
                
                <button
                  onClick={() => handleQuadrantSelect("high-pleasant")}
                  className={`h-32 rounded-lg bg-gradient-to-br ${emotionsByQuadrant["high-pleasant"].color} p-3 flex flex-col justify-between`}
                >
                  <span className="text-white font-medium">
                    {emotionsByQuadrant["high-pleasant"].name}
                  </span>
                  <div className="flex flex-wrap">
                    {Object.keys(emotionsByQuadrant["high-pleasant"].emotions).slice(0, 3).map(emotion => (
                      <span key={emotion} className="text-white text-xs mr-1 opacity-80">{emotion},</span>
                    ))}
                    <span className="text-white text-xs opacity-80">...</span>
                  </div>
                </button>
                
                <button
                  onClick={() => handleQuadrantSelect("low-unpleasant")}
                  className={`h-32 rounded-lg bg-gradient-to-br ${emotionsByQuadrant["low-unpleasant"].color} p-3 flex flex-col justify-between`}
                >
                  <span className="text-white font-medium">
                    {emotionsByQuadrant["low-unpleasant"].name}
                  </span>
                  <div className="flex flex-wrap">
                    {Object.keys(emotionsByQuadrant["low-unpleasant"].emotions).slice(0, 3).map(emotion => (
                      <span key={emotion} className="text-white text-xs mr-1 opacity-80">{emotion},</span>
                    ))}
                    <span className="text-white text-xs opacity-80">...</span>
                  </div>
                </button>
                
                <button
                  onClick={() => handleQuadrantSelect("low-pleasant")}
                  className={`h-32 rounded-lg bg-gradient-to-br ${emotionsByQuadrant["low-pleasant"].color} p-3 flex flex-col justify-between`}
                >
                  <span className="text-white font-medium">
                    {emotionsByQuadrant["low-pleasant"].name}
                  </span>
                  <div className="flex flex-wrap">
                    {Object.keys(emotionsByQuadrant["low-pleasant"].emotions).slice(0, 3).map(emotion => (
                      <span key={emotion} className="text-white text-xs mr-1 opacity-80">{emotion},</span>
                    ))}
                    <span className="text-white text-xs opacity-80">...</span>
                  </div>
                </button>
              </div>
              
              <button
                onClick={() => setGridView(true)}
                className={`w-full py-3 rounded-lg ${themeClasses.cardBg} border ${themeClasses.border} mb-4 font-medium flex items-center justify-center`}
              >
                <span className="mr-2">Карта емоцій</span>
                <span>🗺️</span>
              </button>
              
              {emotionHistory.length > 0 && (
                <div className={`p-4 rounded-lg ${themeClasses.cardBg} border ${themeClasses.border}`}>
                  <h3 className="font-medium mb-2">Остання емоція</h3>
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${emotionsByQuadrant[emotionHistory[0].quadrant].color} mr-4 flex-shrink-0 flex items-center justify-center text-white text-lg font-bold`}>
                      <span>{emotionHistory[0].subEmotion.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="font-medium">{emotionHistory[0].subEmotion}</p>
                      <p className="text-xs opacity-80">{getFriendlyDate(emotionHistory[0].timestamp)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
};

export default EmotionTracker;