// ==UserScript==
// @name         VK Video Blur Remover (Ultimate)
// @namespace    http://tampermonkey.net/
// @version      2025-08-29
// @description  Combines best methods to remove blur, overlays, and restrictions from VK video previews.
// @author       You & Gemini
// @match        https://vk.com/*
// @match        https://vkvideo.ru/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const applyFixes = () => {
        // --- Метод 1: Принудительное переопределение стилей ---

        // Убираем размытие с главных превью
        document.querySelectorAll('[class*="vkitVideoCardPreviewImage__imgBlurred"]').forEach(el => {
            el.style.setProperty('filter', 'none', 'important');
            el.style.setProperty('transform', 'none', 'important');
        });

        // Полностью скрываем оверлеи с ограничениями
        document.querySelectorAll('[class*="vkitVideoCardRestrictionOverlay__--"], [class*="vkitOverlay__root--"]').forEach(el => {
            el.style.setProperty('display', 'none', 'important');
        });

        // Убираем размытие со старых миниатюр плеера
        document.querySelectorAll('.videoplayer--blur .videoplayer_thumb').forEach(el => {
            el.style.setProperty('filter', 'none', 'important');
        });

        // --- Метод 2: Удаление классов ограничений  ---

        const restrictionSelectors = [
            '.mv_recom_item.VideoRestriction',
            '.VideoRestriction',
            '.VideoRestriction--small',
            '.VideoRestriction--canPreview',
            '.VideoRestriction--blur',
            '[class*="videoplayer--hasRestriction"]',
            '[class*="videoplayer--blur"]'
        ];

        document.querySelectorAll(restrictionSelectors.join(', ')).forEach(el => {
            el.classList.remove(
                'VideoRestriction',
                'VideoRestriction--small',
                'VideoRestriction--canPreview',
                'VideoRestriction--blur',
                'videoplayer--hasRestriction',
                'videoplayer--blur'
            );
        });
    };

    // Наблюдатель за изменениями на странице для динамического контента
    const observer = new MutationObserver(applyFixes);
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    // Первоначальный запуск
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyFixes);
    } else {
        applyFixes();
    }
})();