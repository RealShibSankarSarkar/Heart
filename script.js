document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.getElementById('mainContainer');
    const bgMusic = document.getElementById('bgMusic');
    
    // ১. মিউজিক এবং বাগান শুরু
    setTimeout(() => {
        bgMusic.play().catch(e => console.log("User interaction needed for audio"));
        document.body.classList.remove('not-loaded');
    }, 1000);

    // ২. ফ্রেম ডানে সরে যাওয়া (৫ সেকেন্ড পর)
    setTimeout(() => {
        mainContainer.classList.add('moving-to-right');
        startTreeSequence();
    }, 6000);
});

function startTreeSequence() {
    const trunk = document.getElementById('trunk');
    const branches = document.querySelectorAll('.branch');
    
    // ৩. গাছ বড় হওয়া
    setTimeout(() => {
        trunk.setAttribute('stroke-width', '8');
        trunk.style.transition = "stroke-dashoffset 4s ease-in";
        // SVG ট্রাঙ্ক এনিমেশন কোড এখানে
        
        branches.forEach(b => b.setAttribute('stroke-width', '4'));
    }, 3000);

    // ৪. পাতা উড়ে আসা
    setTimeout(() => {
        spawnLeaves();
    }, 7000);
}

function spawnLeaves() {
    const container = document.getElementById('leaves-container');
    for (let i = 0; i < 30; i++) {
        let leaf = document.createElement('div');
        leaf.className = 'leaf';
        container.appendChild(leaf);
        
        // এলোমেলো শুরুর জায়গা
        let startX = Math.random() * window.innerWidth;
        let startY = -50;
        
        // গাছের ডালের টার্গেট পজিশন
        let targetX = 150 + (Math.random() * 100 - 50);
        let targetY = 200 + (Math.random() * 200);

        leaf.style.left = startX + 'px';
        leaf.style.top = startY + 'px';
        leaf.style.opacity = '1';

        // অ্যানিমেশন (উড়ে এসে বসা)
        leaf.animate([
            { transform: `translate(0, 0) rotate(0deg)` },
            { transform: `translate(${targetX - startX}px, ${targetY - startY}px) rotate(720deg)` }
        ], {
            duration: 3000 + (i * 100),
            fill: 'forwards',
            easing: 'ease-out'
        });
    }

    // ৫. প্রপোজ লেটার আসা
    setTimeout(showProposal, 5000);
}

function showProposal() {
    const letter = document.getElementById('proposalLetter');
    const vine = letter.querySelector('.vine');
    const box = letter.querySelector('.letter-box');
    const textElement = document.getElementById('typed-text');
    const message = "তুমি কি আমার জীবনের শ্রেষ্ঠ অনুভূতি হয়ে থাকবে?";

    letter.style.display = 'flex';
    setTimeout(() => {
        vine.style.height = '100px';
        setTimeout(() => {
            box.style.transform = 'scale(1)';
            typeWriter(message, textElement);
        }, 1000);
    }, 500);
}

function typeWriter(text, element) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }
    type();
}