// src/components/UI/ResultModal.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconStar, IconSkull, IconHome, IconSettings, IconRefresh, IconNext } from './Icons';

const ResultModal = ({ type, message, theme, stats, scoreDetails, isGoldenWin, onHome, onReplay, onOpenSettings, onNextLevel, onStartReview }) => {
  const isDark = theme === 'dark';
  const isWin = type === 'win';
  const isReview = type === 'review_start';

  const totalQuestions = stats?.total ?? 0;
  const correct = stats?.correct ?? 0;
  const wrong = stats?.wrong ?? 0;
  const totalAnswered = correct + wrong;
  const accuracy = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;

  let subtitle = '';
  if (isWin) subtitle = 'Bạn đã hoàn thành chặng code này! Tiếp tục chinh phục level mới nhé.';
  else if (isReview) subtitle = 'Đã đến lúc ôn tập! Hoàn thành lại các câu sai để lấy điểm tuyệt đối.';
  else subtitle = 'Bạn đã hết mạng ở chặng này. Thử lại và cải thiện kết quả lần sau!';

  // Theme Colors
  const bgGradient = isGoldenWin
    ? 'from-yellow-600 via-amber-500 to-orange-600' // Gold
    : 'from-purple-600 via-fuchsia-600 to-indigo-600'; // Default Purple

  const innerBgGradient = isGoldenWin
    ? 'from-yellow-700/90 via-amber-600/90 to-orange-700/90'
    : 'from-purple-700/90 via-violet-700/90 to-indigo-800/90';

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed inset-0 z-[200] flex items-center justify-center ${isGoldenWin ? 'golden-glow-container' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* BACKDROP: chặn click xuống dưới */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-[6px]"
          onClick={(e) => {
            // chặn propagation để click nền không click được vào game phía sau
            e.stopPropagation();
          }}
        />

        {/* CARD LEADERBOARD */}
        <motion.div
          className="relative z-10 w-[360px] md:w-[420px]"
          initial={{ scale: 0.7, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <div className={`relative rounded-[2.2rem] bg-gradient-to-br ${bgGradient} p-1 shadow-[0_24px_80px_rgba(0,0,0,0.75)]`}>
            {/* nền sọc chéo */}
            <div className={`rounded-[2rem] overflow-hidden bg-gradient-to-br ${innerBgGradient}`}>
              <div
                className="absolute inset-0 opacity-[0.15] pointer-events-none"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(135deg, rgba(255,255,255,0.2) 0, rgba(255,255,255,0.2) 8px, transparent 8px, transparent 16px)',
                }}
              />

              {/* HEADER "KẾT QUẢ" */}
              <div className="relative flex items-center justify-center px-6 pt-5 pb-2">
                <div className="px-6 py-2 rounded-full bg-black/40 border border-white/20 shadow-[0_8px_20px_rgba(15,23,42,0.7)]">
                  <p className="text-[11px] font-black tracking-[0.35em] text-white/80 uppercase text-center">
                    {isReview ? 'ÔN TẬP' : 'KẾT QUẢ'}
                  </p>
                </div>
              </div>

              {/* ICON STARS / SKULL */}
              <div className="relative flex items-center justify-center mt-1 mb-3">
                {isWin ? (
                  <div className="flex gap-2">
                    <IconStar filled className="w-8 h-8 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,250,110,0.9)]" />
                    <IconStar filled className="w-8 h-8 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,250,110,0.9)]" />
                    <IconStar filled className="w-8 h-8 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,250,110,0.9)]" />
                  </div>
                ) : isReview ? (
                   <div className="flex items-center justify-center w-14 h-14 rounded-full bg-slate-900/70 border border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                    <IconRefresh className="w-8 h-8 text-emerald-300" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-slate-900/70 border border-slate-500 shadow-[0_0_20px_rgba(15,23,42,0.8)]">
                    <IconSkull className="w-8 h-8 text-slate-300" />
                  </div>
                )}
              </div>

              {/* TITLE + SUBTITLE + PILL SUMMARY */}
              <div className="relative px-6 text-center">
                <p className="text-[11px] font-semibold tracking-[0.28em] text-white/55 uppercase mb-1">
                  {isWin ? 'CHÚC MỪNG' : isReview ? 'SỬA LỖI' : 'THỬ LẠI NHÉ'}
                </p>

                <p className="text-xl font-extrabold tracking-[0.22em] uppercase text-white drop-shadow-[0_4px_14px_rgba(15,23,42,0.8)]">
                  {isWin ? 'CHIẾN THẮNG!' : isReview ? 'CƠ HỘI CUỐI' : 'GAME OVER'}
                </p>

                <p className="mt-2 text-[12px] leading-relaxed text-purple-100/85">
                  {subtitle}
                </p>

                <div className="flex items-center justify-center mt-3">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/45 border border-white/15 shadow-[0_0_18px_rgba(15,23,42,0.9)]">
                    <span className="text-[11px] font-semibold text-emerald-300">
                      Đúng {correct}/{totalQuestions}
                    </span>
                    <span className="w-[1px] h-3.5 bg-white/25" />
                    <span className="text-[11px] font-semibold text-sky-300">
                      {accuracy}% chính xác
                    </span>
                    {totalAnswered < totalQuestions && (
                      <>
                        <span className="w-[1px] h-3.5 bg-white/25" />
                        <span className="text-[11px] font-semibold text-amber-300">
                          Đã làm {totalAnswered}/{totalQuestions}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-4 h-[2px] w-24 mx-auto rounded-full bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-70" />
              </div>

              {/* BẢNG CHI TIẾT */}
              <div className="relative px-6 pb-4 mt-3">
                {scoreDetails ? (
                   <div className="px-4 py-3 border rounded-3xl bg-black/35 border-white/10">
                     <div className="flex justify-between items-center text-[11px] text-white/50 mb-2">
                       <span>DIFFICULTY</span>
                       <span>PROGRESS</span>
                     </div>
                     <div className="space-y-2 text-[12px]">
                        <div className="flex items-center justify-between px-3 py-2 rounded-2xl bg-slate-900/80">
                           <span className="font-semibold text-emerald-300">EASY</span>
                           <span className="font-bold text-white">{scoreDetails.easy} / 10</span>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 rounded-2xl bg-slate-900/80">
                           <span className="font-semibold text-yellow-300">NORMAL</span>
                           <span className="font-bold text-white">{scoreDetails.normal} / 10</span>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 rounded-2xl bg-slate-900/80">
                           <span className="font-semibold text-rose-300">HARD</span>
                           <span className="font-bold text-white">{scoreDetails.hard} / 10</span>
                        </div>
                     </div>
                     {isGoldenWin && (
                         <div className="mt-3 text-center">
                             <span className="text-yellow-400 font-black tracking-widest animate-pulse">✨ GOLDEN MASTER ✨</span>
                         </div>
                     )}
                   </div>
                ) : (
                  <div className="px-4 py-3 border rounded-3xl bg-black/35 border-white/10">
                    <div className="flex justify-between items-center text-[11px] text-white/50 mb-1">
                      <span>#</span>
                      <span>MỤC</span>
                      <span>KẾT QUẢ</span>
                    </div>

                    <div className="space-y-2 text-[13px]">
                      <div className="flex items-center justify-between px-3 py-2 rounded-2xl bg-slate-900/80">
                        <span className="text-[11px] font-bold text-white/70">1.</span>
                        <span className="font-semibold text-white/90">TỔNG CÂU HỎI</span>
                        <span className="font-bold text-amber-300">{totalQuestions}</span>
                      </div>
                      <div className="flex items-center justify-between px-3 py-2 rounded-2xl bg-slate-900/80">
                        <span className="text-[11px] font-bold text-white/70">2.</span>
                        <span className="font-semibold text-emerald-300">TRẢ LỜI ĐÚNG</span>
                        <span className="font-bold text-emerald-300">{correct}</span>
                      </div>
                      <div className="flex items-center justify-between px-3 py-2 rounded-2xl bg-slate-900/80">
                        <span className="text-[11px] font-bold text-white/70">3.</span>
                        <span className="font-semibold text-rose-300">TRẢ LỜI SAI</span>
                        <span className="font-bold text-rose-300">{wrong}</span>
                      </div>
                      <div className="flex items-center justify-between px-3 py-2 rounded-2xl bg-slate-900/80">
                        <span className="text-[11px] font-bold text-white/70">4.</span>
                        <span className="font-semibold text-sky-300">CHÍNH XÁC</span>
                        <span className="font-bold text-sky-300">{accuracy}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3 NÚT DƯỚI – CHỈ CHO BẤM MẤY NÀY */}
              <div className="relative flex items-center justify-center gap-3 px-6 pt-2 pb-5">
                <button
                  onClick={onHome}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-slate-900/80 border border-slate-500/60 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-100 hover:border-amber-300 hover:text-amber-300 hover:shadow-[0_0_18px_rgba(251,191,36,0.6)] transition-all"
                >
                  <IconHome className="w-4 h-4" /> <span>HOME</span>
                </button>

                <button
                  onClick={onOpenSettings}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-slate-900/80 border border-slate-500/60 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-100 hover:border-cyan-300 hover:text-cyan-300 hover:shadow-[0_0_18px_rgba(34,211,238,0.6)] transition-all"
                >
                  <IconSettings className="w-4 h-4" /> <span>SETTINGS</span>
                </button>

                {isReview ? (
                   <button
                    onClick={onStartReview}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-emerald-500 text-white text-[11px] font-extrabold uppercase tracking-[0.18em] shadow-[0_10px_28px_rgba(16,185,129,0.7)] hover:brightness-110 hover:-translate-y-[1px] active:translate-y-0 active:shadow-[0_6px_18px_rgba(16,185,129,0.7)] transition-all"
                  >
                    <IconRefresh className="w-4 h-4" /> <span>START REVIEW</span>
                  </button>
                ) : isWin && onNextLevel ? (
                   <button
                    onClick={onNextLevel}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-orange-500 text-white text-[11px] font-extrabold uppercase tracking-[0.18em] shadow-[0_10px_28px_rgba(249,115,22,0.7)] hover:brightness-110 hover:-translate-y-[1px] active:translate-y-0 active:shadow-[0_6px_18px_rgba(249,115,22,0.7)] transition-all"
                  >
                    <IconNext className="w-4 h-4" /> <span>NEXT</span>
                  </button>
                ) : (
                  <button
                    onClick={onReplay}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-emerald-400 text-slate-900 text-[11px] font-extrabold uppercase tracking-[0.18em] shadow-[0_10px_28px_rgba(16,185,129,0.7)] hover:brightness-110 hover:-translate-y-[1px] active:translate-y-0 active:shadow-[0_6px_18px_rgba(16,185,129,0.7)] transition-all"
                  >
                    <IconRefresh className="w-4 h-4" /> <span>REFRESH</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ResultModal;
