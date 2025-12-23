document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const scroller = document.getElementById('main-scroller');

    // --- INTERSECTION OBSERVER ---
    const observerOptions = {
        threshold: 0.15 // Lower threshold for better mobile detection
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Update nav links based on what's in view
                const index = Array.from(sections).indexOf(entry.target);
                navLinks.forEach(link => link.classList.remove('active'));
                navLinks[index].classList.add('active');

                // Update progress bar
                const progress = ((index + 1) / sections.length) * 100;
                progressFill.style.width = `${progress}%`;
                progressText.innerText = `${index + 1}`; // Assuming progressText should show the current section number

                // Trigger Stats Animation
                if (entry.target.id === 'stats') {
                    animateStats();
                }
            }
        });
    }, observerOptions);

    sections.forEach(sec => observer.observe(sec));

    // --- MOBILE NAVIGATION TOGGLE ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const aside = document.querySelector('aside');
    const overlay = document.getElementById('sidebar-overlay');

    const toggleSidebar = () => {
        aside.classList.toggle('active');
        overlay.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (aside.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    };

    mobileToggle.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    // --- SIDEBAR NAVIGATION (SMOOTH SCROLL) ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            // Close sidebar on mobile after click
            if (aside.classList.contains('active')) {
                toggleSidebar();
            }

            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // --- STATS COUNTER ANIMATION ---
    let statsAnimated = false;
    const animateStats = () => {
        if (statsAnimated) return;
        statsAnimated = true;

        const counters = document.querySelectorAll('.stat-num');
        const speed = 200;

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-val');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // --- 3D TILT EFFECT REFINED ---
    const handleTilt = (e) => {
        const cards = document.querySelectorAll('.card-frame');
        const isTouch = e.type === 'touchmove';
        const clientX = isTouch ? e.touches[0].clientX : e.clientX;
        const clientY = isTouch ? e.touches[0].clientY : e.clientY;

        cards.forEach(card => {
            const section = card.closest('section');
            if (!section.classList.contains('active')) {
                card.style.transform = `rotateX(0deg) rotateY(0deg)`;
                return;
            }

            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;

            const x = clientX - cardCenterX;
            const y = clientY - cardCenterY;

            // Subtle tilt for mobile/desktop
            const tiltFactor = window.innerWidth < 900 ? 10 : 15;
            const tiltX = (y / (window.innerHeight / 2)) * -tiltFactor;
            const tiltY = (x / (window.innerWidth / 2)) * tiltFactor;

            card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
        });
    };

    window.addEventListener('mousemove', handleTilt);
    window.addEventListener('touchmove', handleTilt, { passive: false });

    // --- ORB & GRID PARALLAX ---
    const handleBackgroundParallax = (e) => {
        const isTouch = e.type === 'touchmove';
        const pageX = isTouch ? e.touches[0].pageX : e.pageX;
        const pageY = isTouch ? e.touches[0].pageY : e.pageY;

        const orb1 = document.querySelector('.orb-1');
        const orb2 = document.querySelector('.orb-2');
        const grid = document.getElementById('bg-grid');

        const moveX = (window.innerWidth / 2 - pageX) / 40;
        const moveY = (window.innerHeight / 2 - pageY) / 40;

        if (orb1) orb1.style.transform = `translate(${moveX}px, ${moveY}px)`;
        if (orb2) orb2.style.transform = `translate(${-moveX * 1.5}px, ${-moveY * 1.5}px)`;
        if (grid) grid.style.transform = `translate(${moveX / 2}px, ${moveY / 2}px)`;
    };

    window.addEventListener('mousemove', handleBackgroundParallax);
    window.addEventListener('touchmove', handleBackgroundParallax, { passive: true });

    // --- TRANSLATION LOGIC ---
    const translations = {
        'en': {
            'nav-home': 'Home',
            'nav-impact': 'Impact',
            'nav-recruitment': 'Recruitment',
            'nav-systems': 'Systems',
            'nav-management': 'Management',
            'nav-compliance': 'Compliance',
            'nav-culture': 'Culture',
            'nav-ecosystem': 'Ecosystem',
            'nav-skills': 'Skills',
            'nav-timeline': 'Timeline',
            'nav-education': 'Education',
            'nav-contact': 'Contact',
            'progress-label': 'Interview Progress',
            'hero-tag': 'Innovation in Human Capital',
            'hero-heading': 'Transforming HR <br>Through Technology',
            'hero-desc': 'Vittorio Zumpano — Bridging the gap between HR Operations and Technical Automation to build scalable, high-performance employee ecosystems.',
            'hero-btn-begin': 'Begin Experience',
            'hero-btn-visit': 'Visit Live App',
            'stats-tag': '01. Strategic Impact',
            'stats-heading': 'Quantifiable Results',
            'stat-1': 'Years HR Experience',
            'stat-2': 'Proprietary Systems Built',
            'stat-3': 'Employees Managed',
            'stat-4': '% Process Automation',
            'stat-5': 'Connected Web Apps',
            'stat-6': 'AI Integration',
            'rec-tag': '02. Talent Acquisition',
            'rec-heading': 'End-to-End Digital Recruitment',
            'rec-desc': 'Engineered a robust, end-to-end recruitment ecosystem that revolutionized talent acquisition. By building custom submission and collection pipelines, I streamlined the screening process for international candidates, reducing administrative overhead by 60%.',
            'rec-tag-1': 'Workflow Automation',
            'rec-tag-2': 'Cloud Infrastructure',
            'rec-tag-3': 'Strategic Hiring',
            'sys-tag': '03. Logistics & Safety',
            'sys-heading': 'Real-Time Presence Tracking',
            'sys-desc': 'Engineered a proprietary "On My Way" (OMW) tracker to manage a diverse, remote workforce. Integrating Google Apps Script with real-time data visualization, the system automatically flags exceptions, ensuring 100% accountability and operational safety.',
            'sys-tag-1': 'Mobile Web Apps',
            'sys-tag-2': 'Apps Script',
            'sys-tag-3': 'Real-time Data',
            'man-tag': '04. Workforce Management',
            'man-heading': 'Enterprise Scheduling Ecosystem',
            'man-desc': 'Architected a comprehensive Workforce Management Hub (ALT Dashboard) integrating sophisticated scheduling logic and automated time-off engines. The system features proactive conflict detection and coverage heatmaps, empowering management with data-driven decision tools.',
            'man-tag-1': 'Dashboard Design',
            'man-tag-2': 'Logic Engines',
            'man-tag-3': 'Conflict Resolution',
            'com-tag': '05. Compliance & Payroll',
            'com-heading': 'Administrative Integrity',
            'com-desc': 'Digitized complex legal workflows for visa documentation and tax adjustments with precision-engineered administrative portals. Automated timesheet collection and validation reduced processing time while maintaining 100% accuracy for cross-border compliance.',
            'com-tag-1': 'Tax Automation',
            'com-tag-2': 'Legal Compliance',
            'com-tag-3': 'Payroll Accuracy',
            'cul-tag': '06. Culture & Engagement',
            'cul-heading': 'The Unified Communications Hub',
            'cul-desc': 'Integrated a dynamic internal communications engine into the core employee dashboard to foster engagement and professional growth. Facilitates transparent news delivery, performance assessment feedback loops, and streamlined support systems.',
            'cul-tag-1': 'Internal Comms',
            'cul-tag-2': 'News Engine',
            'cul-tag-3': 'Employee Growth',
            'eco-heading': 'The AI-Powered Ecosystem',
            'eco-desc': 'Experience the full scope of my work, including 8 proprietary apps integrated with AI technology and secure user authentication.',
            'eco-user': 'USER',
            'eco-pass': 'PASS',
            'eco-btn': 'Launch Enterprise System',
            'ski-tag': '07. Expertise',
            'ski-heading': 'Technical Skills & AI Proficiency Matrix',
            'ski-cat-1': 'Web Development',
            'ski-cat-2': 'Data & Backend',
            'ski-cat-3': 'Cloud Platforms',
            'ski-cat-4': 'AI & Automation',
            'ski-list-1-item-1': 'HTML5 / CSS3 / ES6+ JS',
            'ski-list-1-item-2': 'Google Apps Script',
            'ski-list-1-item-3': 'Web App Architecture',
            'ski-list-1-item-4': 'Responsive Design / PWA',
            'ski-list-2-item-1': 'Sheets as Database',
            'ski-list-2-item-2': 'SQL Concepts & Queries',
            'ski-list-2-item-3': 'Data Validation / APIs',
            'ski-list-2-item-4': 'Automated Reporting',
            'ski-list-3-item-1': 'Google Workspace Ecosystem',
            'ski-list-3-item-2': 'Cloud Deployment',
            'ski-list-3-item-3': 'OAuth / Webhook Integration',
            'ski-list-3-item-4': 'Gmail & Drive APIs',
            'ski-list-4-item-1': 'AI Integration',
            'ski-list-4-item-2': 'Workflow Optimization',
            'ski-list-4-item-3': 'Process Automation',
            'ski-list-4-item-4': 'Script Development',
            'tim-tag': '08. Professional Evolution',
            'tim-heading': 'Career Milestones',
            'tim-role-1': 'HR Manager & Systems Developer',
            'tim-company-1': 'Brain Power Co. Ltd.',
            'tim-desc-1': 'Promoted to Manager/Trainer, Built 8-app platform, Achieved 100% automation of key HR processes.',
            'tag-dev': 'Full-stack Dev',
            'tag-hr': 'HR Management',
            'tag-ai': 'AI Integration',
            'tim-edu-h': 'Education & Early Career',
            'tim-role-2': 'International Educator & Professional',
            'tim-desc-2': 'Established foundational communication and organizational skills in international environments across Japan.',
            'edu-tag': '09. Academic Foundation',
            'edu-heading': 'Education & Credentials',
            'edu-uni': 'York University',
            'edu-deg': 'Bachelor of Arts (BA) | 1997 - 2001',
            'edu-focus': 'Focus: Economics & Office Management',
            'edu-cert-h': 'Professional Certifications',
            'edu-cert-1': 'CompTIA A+ Certification (IT Professional)',
            'edu-cert-2': 'Microsoft Office Specialist',
            'lan-tag': 'Expertise',
            'lan-heading': 'Bilingual Capability',
            'lan-en': 'English',
            'lan-en-l': 'Native',
            'lan-jp': 'Japanese',
            'lan-jp-l': 'Casual - Business Professional',
            'lan-desc': 'Bilingual capability enables seamless communication with Japanese staff and international team members.',
            'con-tag': '10. Social Proof',
            'con-heading': 'Recommendations',
            'con-rest': 'Please do not contact yet',
            'con-quote': '"Available upon request from Joseph Portin, Manager at Brain Power Co. Ltd."',
            'con-name': 'Joseph Portin',
            'con-manager': 'Manager, Brain Power Co. Ltd.',
            'con-contact-info': '06-4256-6601 | joseph@brain-power.co.jp',
            'con-link-tag': "Let's Connect",
            'con-link-h': 'Contact Information',
            'con-person': 'Vittorio Zumpano',
            'con-loc': 'Suita-shi, Osaka, Japan',
            'con-phone': '080-5336-8486',
            'con-email': 'osakadon@gmail.com',
            'con-instagram': '@osaka.don',
            'con-btn': 'Reach Out via Email'
        },
        'jp': {
            'nav-home': 'ホーム',
            'nav-impact': '実績と成果',
            'nav-recruitment': '採用',
            'nav-systems': '社内システム',
            'nav-management': '労務管理',
            'nav-compliance': 'コンプライアンス',
            'nav-culture': '企業文化',
            'nav-ecosystem': 'エコシステム',
            'nav-skills': 'スキル',
            'nav-timeline': '経歴・沿革',
            'nav-education': '学歴・資格',
            'nav-contact': 'お問い合わせ',
            'progress-label': '進行状況',
            'hero-tag': '人的資本のイノベーション',
            'hero-heading': 'テクノロジーによる<br>人事変革',
            'hero-desc': 'Vittorio Zumpano（ヴィットリオ・ズムパーノ）— 人事オペレーションと技術的自動化を融合させ、拡張性の高い高性能な従業員エコシステムを構築します。',
            'hero-btn-begin': '体験を始める',
            'hero-btn-visit': 'ライブデモを見る',
            'stats-tag': '01. 戦略的インパクト',
            'stats-heading': '数値で見る実績',
            'stat-1': '人事経験年数',
            'stat-2': '構築した独自システム数',
            'stat-3': '管理従業員数',
            'stat-4': 'プロセス自動化率',
            'stat-5': '連携ウェブアプリ数',
            'stat-6': 'AI統合プロジェクト',
            'rec-tag': '02. 人材獲得',
            'rec-heading': 'エンドツーエンドの採用デジタルトランスフォーメーション',
            'rec-desc': '人材獲得を根本から変える堅牢な採用エコシステムを構築しました。独自の応募・データ収集パイプラインを開発することで、海外候補者の選考プロセスを効率化し、事務的負担を60％削減しました。',
            'rec-tag-1': 'ワークフロー自動化',
            'rec-tag-2': 'クラウド・インフラ',
            'rec-tag-3': '戦略的採用',
            'sys-tag': '03. 物流・安全管理',
            'sys-heading': 'リアルタイム所在管理',
            'sys-desc': '多様なリモートワーク環境に対応するため、独自の所在確認システム「On My Way (OMW)」を開発しました。Google Apps Scriptとリアルタイムのデータ可視化を統合し、例外を自動的にフラグ立てすることで、100％の所在確認と業務上の安全を確保しました。',
            'sys-tag-1': 'モバイルウェブアプリ',
            'sys-tag-2': 'Apps Script',
            'sys-tag-3': 'リアルタイムデータ',
            'man-tag': '04. 人員配置・スケジュール管理',
            'man-heading': 'エンタープライズ・スケジューリング・エコシステム',
            'man-desc': '高度なスケジューリング・ロジックと自動休暇管理エンジンを統合した「ALTダッシュボード」を設計しました。このシステムは、競合の事前検知やカバレッジ・ヒートマップ機能を備え、データに基づいた迅速な意思決定を可能にします。',
            'man-tag-1': 'ダッシュボード設計',
            'man-tag-2': 'ロジックエンジン',
            'man-tag-3': 'シフト競合解決',
            'com-tag': '05. コンプライアンス・給与計算',
            'com-heading': '管理業務の整合性',
            'com-desc': 'ビザ更新や税務調整などの複雑な法的ワークフローを、精密に設計された管理用ポータルでデジタル化しました。タイムシートの自動収集と検証により、処理時間を短縮しつつ、国境を越えたコンプライアンスの100％の精度を維持しています。',
            'com-tag-1': '税務自動化',
            'com-tag-2': '法的コンプライアンス',
            'com-tag-3': '給与計算精度',
            'cul-tag': '06. 企業文化・エンゲージメント',
            'cul-heading': '統合コミュニケーション・ハブ',
            'cul-desc': '従業員ダッシュボードの中核に動的な社内コミュニケーション・エンジンを統合し、エンゲージメントとプロフェッショナルな成長を促進しました。透明性の高いニュース配信、評価フィードバック・ループ、合理化されたサポートシステムを実現しています。',
            'cul-tag-1': '社内広報',
            'cul-tag-2': 'ニュースエンジン',
            'cul-tag-3': '従業員の成長',
            'eco-heading': 'AI搭載エコシステム',
            'eco-desc': 'AIテクノロジーとセキュアな認証機能を統合した8つの独自アプリを含む、私の業務の全容をご体験ください。',
            'eco-user': 'ユーザー名',
            'eco-pass': 'パスワード',
            'eco-btn': 'システムを起動',
            'ski-tag': '07. 専門スキル',
            'ski-heading': '技術スキル ＆ AI習熟度マトリックス',
            'ski-cat-1': 'ウェブ開発',
            'ski-cat-2': 'データ ＆ バックエンド',
            'ski-cat-3': 'クラウドプラットフォーム',
            'ski-cat-4': 'AI ＆ 自動化',
            'ski-list-1-item-1': 'HTML5 / CSS3 / ES6+ JS',
            'ski-list-1-item-2': 'Google Apps Script',
            'ski-list-1-item-3': 'ウェブアプリ・アーキテクチャ',
            'ski-list-1-item-4': 'レスポンシブデザイン / PWA',
            'ski-list-2-item-1': 'データベースとしてのSheets',
            'ski-list-2-item-2': 'SQLの概念とクエリ',
            'ski-list-2-item-3': 'データ検証 / API',
            'ski-list-2-item-4': '自動レポート作成',
            'ski-list-3-item-1': 'Google Workspace エコシステム',
            'ski-list-3-item-2': 'クラウドデプロイメント',
            'ski-list-3-item-3': 'OAuth / Webhook 連携',
            'ski-list-3-item-4': 'Gmail ＆ Drive API',
            'ski-list-4-item-1': 'AIの統合',
            'ski-list-4-item-2': 'ワークフロー最適化',
            'ski-list-4-item-3': 'プロセス自動化',
            'ski-list-4-item-4': 'スクリプト開発',
            'tim-tag': '08. プロフェッショナルとしての進化',
            'tim-heading': '主な経歴',
            'tim-company-1': '株式会社 Brain Power',
            'tim-role-1': '人事マネージャー 兼 システム開発者',
            'tim-desc-1': 'マネージャー兼トレーナーに昇進。8つのアプリからなるプラットフォームを構築し、主要な人事プロセスの100％自動化を達成。',
            'tag-dev': 'フルスタック開発',
            'tag-hr': '人事管理',
            'tag-ai': 'AI統合',
            'tim-edu-h': '学歴・経歴初期',
            'tim-role-2': '国際教育専門職',
            'tim-desc-2': '日本各地の多文化環境において、コミュニケーションと組織運営の基礎となるスキルを確立。',
            'edu-tag': '09. アカデミック・ファンデーション',
            'edu-heading': '学歴・資格',
            'edu-uni': 'ヨーク大学 (York University)',
            'edu-deg': '学士号 (BA) | 1997年 - 2001年',
            'edu-focus': '専攻：経済学・オフィス管理',
            'edu-cert-h': '保有資格',
            'edu-cert-1': 'CompTIA A+（ITプロフェッショナル）',
            'edu-cert-2': 'マイクロソフト・オフィス・スペシャリスト（MOS）',
            'lan-tag': '専門性',
            'lan-heading': 'バイリンガル能力',
            'lan-en': '英語',
            'lan-en-l': 'ネイティブ',
            'lan-jp': '日本語',
            'lan-jp-l': '日常会話 〜 ビジネスレベル',
            'lan-desc': '高い日本語能力により、日本人スタッフや多国籍チームメンバーと円滑なコミュニケーションが可能です。',
            'con-tag': '10. リファレンス・推薦',
            'con-heading': '推薦状',
            'con-rest': '現時点での連絡はご遠慮ください',
            'con-quote': '「株式会社Brain Powerのマネージャー、Joseph Portinより依頼に応じて提供可能です。」',
            'con-name': 'Joseph Portin（ジョセフ・ポーティン）',
            'con-manager': 'マネージャー（株式会社Brain Power）',
            'con-contact-info': '06-4256-6601 | joseph@brain-power.co.jp',
            'con-link-tag': 'お問い合わせ',
            'con-link-h': '連絡先情報',
            'con-person': 'Vittorio Zumpano',
            'con-loc': '日本、大阪府吹田市',
            'con-phone': '080-5336-8486',
            'con-email': 'osakadon@gmail.com',
            'con-instagram': '@osaka.don',
            'con-btn': 'メールでお問い合わせ'
        }
    };

    const switchLanguage = (lang) => {
        document.body.classList.remove('lang-en', 'lang-jp');
        document.body.classList.add(`lang-${lang}`);

        const elements = document.querySelectorAll('[data-t]');
        elements.forEach(el => {
            const key = el.getAttribute('data-t');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        // Update active class on buttons
        const langBtns = document.querySelectorAll('.lang-btn');
        langBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });

        // Save preference
        localStorage.setItem('preferred-lang', lang);
    };

    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });

    // Load preferred lang
    const savedLang = localStorage.getItem('preferred-lang') || 'en';
    switchLanguage(savedLang);

    // --- BUTTON HOVER EFFECTS ---
    const btns = document.querySelectorAll('.btn');
    btns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            // Haptic/audio placeholder
        });
    });
});
