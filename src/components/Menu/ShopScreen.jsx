// src/components/Menu/ShopScreen.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { IconArrowLeft, IconZap, IconHeart, IconHelp } from '../UI/Icons';
import anime from 'animejs';

const ShopScreen = ({ onBack, totalPoints, setTotalPoints, inventory, setInventory }) => {

  const ITEMS = [
    {
      id: 'hint',
      name: 'Gợi Ý',
      desc: 'Loại bỏ một đáp án sai.',
      price: 100,
      icon: <IconHelp className="w-8 h-8 text-yellow-400" />,
      color: 'yellow'
    },
    {
      id: 'heal',
      name: 'Hồi Máu',
      desc: 'Hồi phục 1 mạng.',
      price: 200,
      icon: <IconHeart className="w-8 h-8 text-red-500" />,
      color: 'red'
    },
    {
      id: 'skip',
      name: 'Bỏ Qua',
      desc: 'Qua màn ngay lập tức.',
      price: 300,
      icon: <IconZap className="w-8 h-8 text-purple-500" />,
      color: 'purple'
    }
  ];

  const handleBuy = (item) => {
    if (totalPoints >= item.price) {
      setTotalPoints(prev => prev - item.price);
      setInventory(prev => ({
        ...prev,
        [item.id]: (prev[item.id] || 0) + 1
      }));

      // Animation feedback
      const btnId = `#btn-buy-${item.id}`;
      anime({
        targets: btnId,
        scale: [1, 0.9, 1.1, 1],
        duration: 300,
        easing: 'easeInOutQuad'
      });

      // Play sound if possible (requires audio context or global sfx handler, skipping for simplicity or assuming user feedback is enough)
    } else {
        // Shake animation for "Not enough money"
        const cardId = `#card-${item.id}`;
        anime({
            targets: cardId,
            translateX: [0, -10, 10, -10, 10, 0],
            duration: 400
        });
    }
  };

  return (
    <div className="relative flex flex-col items-center w-full h-full min-h-screen overflow-hidden bg-slate-900 text-slate-100">

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_#1e293b_0%,_#0f172a_100%)]" />
         <div className="absolute w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] top-[-20%] left-[-10%]" />
         <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] bottom-[-10%] right-[-10%]" />
      </div>

      {/* Header */}
      <div className="z-10 flex items-center justify-between w-full max-w-4xl p-6 mt-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 transition-all rounded-full bg-slate-800 hover:bg-slate-700 hover:scale-105"
        >
          <IconArrowLeft className="w-5 h-5" />
          <span className="font-bold">Quay lại</span>
        </button>

        <div className="flex items-center gap-3 px-6 py-3 border rounded-full bg-slate-800/80 border-amber-500/30">
          <span className="text-2xl">🪙</span>
          <span className="text-2xl font-black text-amber-400">{totalPoints}</span>
        </div>
      </div>

      {/* Title */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="z-10 mb-12 text-5xl font-black text-transparent uppercase bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 drop-shadow-lg"
      >
        Cửa Hàng Kỹ Năng
      </motion.h1>

      {/* Shop Grid */}
      <div className="z-10 grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl w-full px-8">
        {ITEMS.map((item, idx) => (
          <motion.div
            key={item.id}
            id={`card-${item.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative flex flex-col items-center p-6 border transition-all duration-300 bg-slate-800/60 backdrop-blur-md rounded-3xl border-slate-700 hover:border-slate-500 hover:bg-slate-800/80 group"
          >
            {/* Icon Circle */}
            <div className={`
               w-24 h-24 mb-6 rounded-full flex items-center justify-center
               bg-gradient-to-br from-slate-700 to-slate-900 shadow-inner
               border-2 border-${item.color}-500/30
               group-hover:scale-110 transition-transform duration-300
            `}>
               {item.icon}
            </div>

            <h3 className="mb-2 text-2xl font-bold">{item.name}</h3>
            <p className="mb-6 text-sm text-center text-slate-400 h-10">{item.desc}</p>

            <div className="w-full mt-auto">
               <div className="flex items-center justify-center gap-2 mb-4 text-xl font-bold text-amber-300">
                  <span>{item.price}</span> 🪙
               </div>

               <button
                 id={`btn-buy-${item.id}`}
                 onClick={() => handleBuy(item)}
                 disabled={totalPoints < item.price}
                 className={`
                   w-full py-3 px-4 rounded-xl font-bold tracking-wider uppercase transition-all
                   flex items-center justify-center gap-2
                   ${totalPoints >= item.price
                     ? `bg-${item.color}-600 hover:bg-${item.color}-500 text-white shadow-lg shadow-${item.color}-500/20`
                     : 'bg-slate-700 text-slate-500 cursor-not-allowed opacity-70'}
                 `}
               >
                 {totalPoints >= item.price ? 'Mua' : 'Thiếu điểm'}
               </button>
            </div>

            {/* Inventory Count Badge */}
            <div className="absolute top-4 right-4 px-3 py-1 text-xs font-bold bg-slate-900 rounded-full text-slate-400 border border-slate-700">
              Đang có: <span className="text-white">{inventory[item.id] || 0}</span>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default ShopScreen;
