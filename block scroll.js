// ==UserScript==
// @name         YouTube shorts: Disable scrolling
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Disables all the possible ways you can scroll down youtube shorts
// @icon         https://github.com/kuronekozero/youtube-shorts-disable-scrolling/blob/main/logo.webp
// @author       Timothy (kuronek0zero)
// @namespace    https://github.com/kuronekozero/youtube-shorts-disable-scrolling
// @match        https://www.youtube.com/shorts/*
// @grant        GM_addStyle
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    // Function to block events
    const blockEvent = (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
    };

    // Function to remove navigation buttons
    const removeNavButtons = () => {
        const navButtons = document.querySelectorAll(
            '#navigation-button-up, #navigation-button-down'
        );
        navButtons.forEach((btn) => {
            btn.remove();
            console.log("Removed:", btn.id);
        });
    };

    // Disable all scrolling methods
    const disableScrolling = () => {
        // Disable mouse wheel
        document.addEventListener('wheel', blockEvent, { passive: false, capture: true });

        // Disable touch scrolling
        document.addEventListener('touchmove', blockEvent, { passive: false, capture: true });

        // Disable key scrolling
        document.addEventListener('keydown', (e) => {
            const keysToBlock = [
                'ArrowUp', 'ArrowDown', 
                'ArrowLeft', 'ArrowRight',
                'Space', 'PageUp', 'PageDown', 
                'Home', 'End', 'Tab'
            ];
            if (keysToBlock.includes(e.code)) {
                blockEvent(e);
            }
        }, { passive: false, capture: true });

        // Disable window scrolling
        window.addEventListener('scroll', () => {
            window.scrollTo(0, 0);
        });

        // Disable scrollbar visibility
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';

        console.log("YouTube Shorts Scroll Blocker Activated!");
    };

    // Reapply scroll lock and remove navigation buttons when DOM changes
    const observer = new MutationObserver(() => {
        disableScrolling();
        removeNavButtons();
    });
    observer.observe(document, { childList: true, subtree: true });

    // Apply on load
    disableScrolling();
    removeNavButtons();
})();
