// src/components/Game/GamePanel.jsx
import React from 'react';
import Block from '../Block/Block';
import { IconHeart, IconEye, IconRocket } from '../UI/Icons';

const GamePanel = React.memo(({
  theme,
  currentTheme,
  currentLevelIndex,
  totalLevels,
  lives,
  currentLevel,
  handleBlockClick,
  answerFeedback,
  onSkipFeedback,
  powerUps,
  handleUsePowerUp,
  disabledOptions = []
}) => {
  const isDark = theme === 'dark';
  const isInFeedback = !!answerFeedback;

  const [showHint, setShowHint] = React.useState(false);

  // Khung tablet ngoài – viền gradient + shadow
  const frameShadow = isDark
    ? 'shadow-[0_18px_45px_rgba(0,0,0,0.75)]'
    : 'shadow-[0_18px_40px_rgba(15,23,42,0.35)]';

  const PowerUpButton = ({ type, icon, count, colorClass, tooltip }) => (
    <button
      id={`btn-powerup-${type}`}
      onClick={() => handleUsePowerUp(type)}
      disabled={count <= 0 || isInFeedback}
      className={`relative group flex flex-col items-center justify-center p-2 rounded-xl border border-white/10 transition-all
        ${count > 0 && !isInFeedback ? 'hover:bg-white/5 active:scale-95 cursor-pointer' : 'opacity-40 grayscale cursor-not-allowed'}
      `}
      title={tooltip}
    >
      <div className={`p-2 rounded-full mb-1 ${colorClass} bg-opacity-20 shadow-lg`}>
        {icon}
      </div>
      <span className="text-[9px] font-bold text-white tracking-wider">{count}</span>

      {/* Tooltip */}
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-[9px] text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
        {tooltip}
      </span>
    </button>
  );

  return (
    // LỚP VIỀN NGOÀI CỦA TABLET
    <div
      className={`relative z-10 flex h-full w-full flex-col rounded-[2.6rem] bg-gradient-to-b 
      from-cyan-500/60 via-sky-500/30 to-violet-500/60 p-[4px] ${frameShadow} transition-all duration-500 will-change-transform`}
    >
      {/* THÂN TABLET */}
      <div
        className="relative flex h-full w-full flex-col rounded-[2.2rem] border border-slate-900/80 
                   bg-slate-950/95 px-3 pb-3 pt-5 overflow-hidden"
      >
        {/* Camera & sensor */}
        <div className="absolute z-20 flex gap-2 -translate-x-1/2 pointer-events-none left-1/2 top-3">
          <div className="h-2.5 w-7 rounded-full bg-slate-900/90 shadow-inner shadow-black/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-slate-900/90 shadow-inner shadow-black/60" />
        </div>

        {/* Glow trang trí */}
        <div className="absolute w-40 h-40 rounded-full pointer-events-none -left-24 top-16 bg-cyan-500/15 blur-3xl" />
        <div className="absolute bottom-0 rounded-full pointer-events-none -right-28 h-52 w-52 bg-fuchsia-500/15 blur-3xl" />

        {/* MÀN HÌNH CHÍNH */}
        <div
          className={`relative flex h-full w-full flex-col rounded-[1.9rem] border-[1.5px] px-6 pb-4 pt-7
                      backdrop-blur-xl transition-all duration-400 overflow-hidden ${currentTheme.panel} ${
            isInFeedback ? 'ring-2 ring-emerald-400/40' : ''
          }`}
        >
          {/* HEADER */}
          <div className="flex-none mb-5">
            <div className="flex items-end justify-between gap-4 mb-4">
              <div>
                <div
                  className={`mb-1 inline-flex items-center gap-2 rounded-full border border-slate-600/70 bg-slate-900/80 px-3 py-[2px] text-[9px] font-black tracking-[0.24em] uppercase opacity-80 ${currentTheme.textSub}`}
                >
                  <span className="h-[6px] w-[6px] rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
                  LEVEL
                </div>

                <div className="flex items-baseline gap-2">
                  <div
                    className={`font-mono text-5xl font-black leading-none tracking-tight ${currentTheme.textTitle}`}
                  >
                    {currentLevelIndex + 1}
                  </div>
                  <div className="text-sm font-semibold text-slate-400">
                    / {totalLevels}
                  </div>
                </div>
              </div>

              {/* LIVES */}
              <div
                className={`flex items-center gap-2 rounded-full border px-3 py-2 shadow-sm
                ${
                  isDark
                    ? 'bg-slate-950/80 border-cyan-500/40'
                    : 'bg-slate-900/70 border-slate-500/70'
                }`}
              >
                <span
                  className={`text-[9px] font-bold tracking-[0.18em] uppercase opacity-70 ${currentTheme.textSub}`}
                >
                  LIVES
                </span>
                <div className="flex items-center gap-[2px]">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg transition-all duration-300 ${
                        i < lives
                          ? 'scale-100 drop-shadow-[0_0_8px_rgba(248,113,113,0.6)]'
                          : 'scale-75 opacity-25 grayscale'
                      }`}
                    >
                      {i < lives ? (
                        <IconHeart filled className="w-5 h-5 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                      ) : (
                        <IconHeart className="w-5 h-5 text-slate-600" />
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Thanh progress */}
            <div className="relative h-[6px] w-full overflow-hidden rounded-full bg-slate-700/40">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out
                ${
                  isDark
                    ? 'bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]'
                    : 'bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-500'
                }`}
                style={{
                  width: `${((currentLevelIndex + 1) / totalLevels) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* VÙNG NỘI DUNG CUỘN – CỐ ĐỊNH CHIỀU CAO */}
          <div
            className={`flex flex-col space-y-5 pr-2 custom-scrollbar ${
              answerFeedback ? 'overflow-hidden' : 'overflow-y-auto'
            }`}
            // Reduced height to make room for PowerUps + Button
            style={{ height: 'calc(100% - 150px)' }}
          >
            {/* Nhiệm vụ */}
            <div>
              <h1
                className={`mb-3 break-words text-2xl md:text-3xl font-black leading-tight ${currentTheme.textTitle}`}
              >
                {currentLevel.title}
              </h1>

              <div
                className={`group relative overflow-hidden rounded-2xl border-l-[6px] px-4 py-4 shadow-sm ${currentTheme.boxTask}`}
              >
                <span className="absolute transition-opacity pointer-events-none -right-4 -bottom-4 text-7xl rotate-12 opacity-5 group-hover:opacity-15">
                  🎯
                </span>
                <p className="relative z-10 flex items-start gap-3 text-sm font-semibold leading-relaxed">
                  <span className="mt-0.5 text-xl">🎯</span>
                  <span>{currentLevel.instruction}</span>
                </p>
              </div>

              <div className="mt-2 ml-1 flex items-start gap-2">
                 <button
                    onClick={() => setShowHint(prev => !prev)}
                    className="px-2 py-0.5 rounded border border-yellow-500/30 bg-yellow-500/10 text-[10px] text-yellow-300 hover:bg-yellow-500/20 transition"
                 >
                    {showHint ? 'HIDE HINT' : 'SHOW HINT'}
                 </button>
                 {showHint && (
                    <p className={`text-[11px] font-medium opacity-75 ${currentTheme.textSub}`}>
                        <span className="text-yellow-400 animate-pulse mr-1">💡</span>
                        {currentLevel.hint || 'Gợi ý: Hãy quan sát kỹ đường đi của nhân vật trước khi chọn block.'}
                    </p>
                 )}
              </div>
            </div>

            {/* DANH SÁCH BLOCK */}
            <div className="pb-2 space-y-3">
              {currentLevel.options.map((opt) => {
                const isSelected =
                  answerFeedback && answerFeedback.selectedId === opt.id;
                const isCorrectBlock =
                  answerFeedback && answerFeedback.correctId === opt.id;
                const status = answerFeedback?.status;
                const isDisabled = disabledOptions.includes(opt.id);

                let extra = '';
                if (isDisabled) {
                   extra = ' opacity-30 grayscale pointer-events-none border-dashed border-slate-700';
                }
                else if (answerFeedback) {
                  if (status === 'correct' && isSelected) {
                    extra =
                      ' border-emerald-400 bg-emerald-500/10 shadow-[0_0_25px_rgba(16,185,129,0.7)]';
                  } else if (status === 'wrong' && isSelected) {
                    extra =
                      ' border-rose-500 bg-rose-500/10 shadow-[0_0_25px_rgba(244,63,94,0.7)]';
                  } else if (status === 'wrong' && isCorrectBlock) {
                    extra =
                      ' border-emerald-400 bg-emerald-500/10 shadow-[0_0_25px_rgba(16,185,129,0.7)]';
                  }
                }

                return (
                  <div
                    key={opt.id}
                    onClick={() =>
                      !answerFeedback && !isDisabled && handleBlockClick(opt.id)
                    }
                    className={`group relative flex items-center gap-4 rounded-2xl border-2 p-3 transition-all duration-200
                    ${
                      answerFeedback || isDisabled
                        ? 'cursor-default'
                        : 'cursor-pointer hover:-translate-y-[1px] hover:translate-x-[2px] hover:shadow-[0_10px_24px_rgba(15,23,42,0.7)] active:translate-y-0 active:shadow-none'
                    }
                    ${currentTheme.blockWrapper} ${extra}`}
                  >
                    {/* Glow nhẹ bên trái */}
                    <div className="absolute w-10 h-10 transition -translate-y-1/2 rounded-full pointer-events-none -left-6 top-1/2 bg-cyan-500/0 blur-2xl group-hover:bg-cyan-500/30" />

                    {/* Block */}
                    <div className="relative z-10 flex-none transition-transform duration-300 group-hover:rotate-1 group-hover:scale-[1.03]">
                      <Block
                        type={opt.type}
                        text={opt.text}
                        theme={theme}
                        scale={0.8}
                      />
                    </div>

                    {/* Text */}
                    <div className="relative z-10 flex flex-col justify-center flex-1 min-w-0">
                      <p
                        className={`mb-0.5 truncate text-base font-bold ${currentTheme.blockTextMain}`}
                      >
                        {opt.text}
                      </p>
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-[0.2em] opacity-85 ${currentTheme.blockTextSub}`}
                        >
                          {opt.type}
                        </span>

                        {!answerFeedback && !isDisabled && (
                          <span
                            className={`translate-x-2 text-[10px] font-bold opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 ${
                              isDark ? 'text-cyan-400' : 'text-blue-500'
                            }`}
                          >
                            CHỌN ▷
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* POWER UPS AREA */}
          <div className="mt-auto pt-2 pb-2 border-t border-slate-700/50 flex justify-center gap-4">
             {powerUps && handleUsePowerUp && (
               <>
                 <PowerUpButton
                    type="hint"
                    icon={<IconEye className="w-5 h-5 text-yellow-300"/>}
                    count={powerUps.hint}
                    colorClass="bg-yellow-500"
                    tooltip="Loại bỏ 1 đáp án sai (50/50)"
                 />
                 <PowerUpButton
                    type="skip"
                    icon={<IconRocket className="w-5 h-5 text-purple-300"/>}
                    count={powerUps.skip}
                    colorClass="bg-purple-500"
                    tooltip="Bỏ qua màn này (Auto-Win)"
                 />
                 <PowerUpButton
                    type="heal"
                    icon={<IconHeart filled className="w-5 h-5 text-red-300"/>}
                    count={powerUps.heal}
                    colorClass="bg-red-500"
                    tooltip="Hồi phục 1 mạng"
                 />
               </>
             )}
          </div>

          {/* VÙNG CHO NÚT TIẾP TỤC – CHIỀU CAO CỐ ĐỊNH */}
          <div className="h-[50px] flex items-center justify-center">
            {answerFeedback && (
              <button
                onClick={onSkipFeedback}
                className="rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400 px-9 py-3 text-[11px] font-extrabold uppercase tracking-[0.26em] text-slate-950 shadow-[0_14px_32px_rgba(16,185,129,0.7)] transition-all hover:brightness-110 hover:-translate-y-[1px] active:translate-y-0 active:shadow-[0_8px_20px_rgba(16,185,129,0.6)]"
              >
                TIẾP TỤC ▷
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

GamePanel.displayName = 'GamePanel';
export default GamePanel;