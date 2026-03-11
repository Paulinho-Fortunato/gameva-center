import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()
app.use('/static/*', serveStatic({ root: './' }))

app.get('/', (c) => c.html(homePage()))
app.get('/sobre', (c) => c.html(aboutPage()))
app.get('/servicos', (c) => c.html(servicesPage()))
app.get('/contato', (c) => c.html(contactPage()))

/* ══════════════════════════════════════════════════════════════
   BASE LAYOUT
══════════════════════════════════════════════════════════════ */
function base(title: string, content: string, active = '') {
  return `<!DOCTYPE html>
<html lang="pt-AO">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Gameva Center</title>
  <meta name="description" content="Gameva Center: transformamos computadores em consoles PlayStation PS3 e PS4 em Angola. Instalação segura, rápida e profissional.">
  <meta name="theme-color" content="#000000">
  <meta name="keywords" content="Gameva Center, Gameva, Center, Angola, PlayStation, PS3, PS4, computadores, consoles">
  <meta property="og:title" content="Gameva Center - Transformação de PC em Console PlayStation em Angola">
  <meta property="og:description" content="Gameva Center: transformamos computadores em consoles PlayStation PS3 e PS4 em Angola. Instalação segura, rápida e profissional.">
  <meta property="og:image" content="/static/logo.jpg">
  <link rel="icon" href="/static/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="/static/style.css">
</head>
<body>
<div id="particles"></div>

<!-- ════ NAVBAR ════ -->
<nav class="navbar" id="navbar">
  <div class="nav-container">
    <a href="/" class="nav-brand">
      <div class="brand-logo-wrap">
        <div class="brand-logo-ring"></div>
        <div class="brand-logo-inner">
          <img src="/static/logo.jpg" alt="Gameva Center" class="logo-img">
        </div>
      </div>
      <div class="brand-text">
        <span class="brand-name">GAMEVA</span>
        <span class="brand-tagline">Center · Angola</span>
      </div>
    </a>

    <button class="nav-toggle" id="navToggle" aria-label="Abrir menu">
      <span></span><span></span><span></span>
    </button>

    <ul class="nav-menu" id="navMenu">
      <li><a href="/"        class="nav-link ${active==='home'?'active':''}"><i class="fas fa-home"></i>Início</a></li>
      <li><a href="/sobre"   class="nav-link ${active==='sobre'?'active':''}"><i class="fas fa-users"></i>Sobre Nós</a></li>
      <li><a href="/servicos" class="nav-link ${active==='servicos'?'active':''}"><i class="fas fa-gamepad"></i>Serviços</a></li>
      <li><a href="/contato" class="nav-link ${active==='contato'?'active':''}"><i class="fas fa-envelope"></i>Contato</a></li>
      <li>
        <a href="https://wa.me/244931889628?text=Olá!%20Vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais." target="_blank" class="nav-cta">
          <i class="fab fa-whatsapp"></i>WhatsApp
        </a>
      </li>
    </ul>
  </div>
</nav>

<main>${content}</main>

<!-- ════ FOOTER ════ -->
<footer class="footer">
  <div class="footer-top">
    <div class="footer-brand">
      <div class="footer-brand-logo">
        <div class="footer-logo-ring-wrap">
          <div class="footer-logo-ring"></div>
          <div class="footer-logo-img-wrap">
            <img src="/static/logo.jpg" alt="Gameva Center" class="footer-logo-img">
          </div>
        </div>
        <div>
          <span class="footer-brand-name">GAMEVA CENTER</span>
          <span class="footer-brand-tagline">Tecnologia Gamer · Angola</span>
        </div>
      </div>
      <p class="footer-brand-desc">Transformamos computadores em verdadeiros consoles PlayStation sem danificar nada, podendo jogar e trabalhar com qualidade, segurança e profissionalismo. A experiência gamer que você merece, ao alcance de todos.</p>
      <div class="footer-socials">
                <a href="https://www.facebook.com/profile.php?id=100088176707418" target="_blank" class="fsocial fwa" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
        <a href="https://wa.me/244931889628" target="_blank" class="fsocial fwa" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
        <a href="tel:+244952717970" class="fsocial ftel" aria-label="Telefone"><i class="fas fa-phone"></i></a>
      </div>
    </div>

    <div class="footer-col">
      <h5>Navegação</h5>
      <ul class="footer-list">
        <li><i class="fas fa-chevron-right"></i><a href="/">Início</a></li>
        <li><i class="fas fa-chevron-right"></i><a href="/sobre">Sobre Nós</a></li>
        <li><i class="fas fa-chevron-right"></i><a href="/servicos">Serviços</a></li>
        <li><i class="fas fa-chevron-right"></i><a href="/contato">Contato</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h5>Serviços</h5>
      <ul class="footer-list-plain footer-list">
        <li><i class="fas fa-chevron-right"></i>PC em PS3</li>
        <li><i class="fas fa-chevron-right"></i>PC em PS4</li>
         <li><i class="fas fa-chevron-right"></i>Gameva Seguro</li> 
        <li><i class="fas fa-chevron-right"></i>Venda de Comandos</li>
        <li><i class="fas fa-chevron-right"></i>Suporte Técnico</li>
      </ul>
    </div>

    <div class="footer-col">
      <h5>Contato</h5>
      <div class="footer-contact-list">
        <div class="fcontact-item">
          <i class="fab fa-whatsapp"></i>
          <div>
            <div class="fcontact-label">WhatsApp</div>
            <div class="fcontact-val"><a href="https://wa.me/244931889628" target="_blank">+244 931 889 628</a></div>
          </div>
        </div>
        <div class="fcontact-item">
          <i class="fas fa-phone"></i>
          <div>
            <div class="fcontact-label">Telefone</div>
            <div class="fcontact-val"><a href="tel:+244952717970">+244 952 717 970</a></div>
          </div>
        </div>
        <div class="fcontact-item">
          <i class="fas fa-map-marker-alt"></i>
          <div>
            <div class="fcontact-label">Localização</div>
            <div class="fcontact-val">Angola · Atendimento por agendamento</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer-bottom">
    <div class="footer-bottom-inner">
      <span>&copy; 2026 Gameva Center. Todos os direitos reservados.</span>
      <div class="footer-bottom-right">
        Feito com <i class="fas fa-heart footer-heart"></i> para gamers de Angola
      </div>
    </div>
  </div>
</footer>

<script src="/static/app.js"></script>
</body>
</html>`
}

/* ══════════════════════════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════════════════════════ */
function homePage() {
  return base('Início', `

<!-- ── HERO ────────────────────────────────────────────── -->
<section class="hero">
  <div class="hero-bg-base"></div>
  <div class="hero-bg-grid"></div>
  <div class="hero-bg-glow"></div>
  <div class="hero-bg-glow2"></div>
  <div class="hero-scanlines"></div>

  <div class="hero-inner">
    <!-- Left -->
    <div class="hero-content" data-aos="fade-up">
      <div class="hero-eyebrow">
        <div class="hero-eyebrow-dot"></div>
        Especialistas em Tecnologia Gamer · Angola
      </div>

      <h1 class="hero-title">
        Transformamos o seu PC em<br>
        <em>Console PlayStation</em>
      </h1>

      <p class="hero-subtitle">
        Soluções tecnológicas inovadoras para gamers em Angola.
        Transformamos computadores em consoles PS3 e PS4 com
        instalação profissional e jogos prontos para jogar.
      </p>

      <div class="hero-consoles">
        <span class="chip chip-ps3"><i class="fas fa-gamepad"></i>PlayStation 3</span>
        <span class="chip chip-ps4"><i class="fas fa-gamepad"></i>PlayStation 4</span>
      </div>

      <div class="hero-ctas">
        <a href="https://wa.me/244931889628?text=Olá!%20Quero%20transformar%20meu%20PC%20em%20um%20console%20PlayStation.%20Podem%20me%20dar%20mais%20informações?" target="_blank" class="btn btn-green btn-lg">
          <i class="fab fa-whatsapp"></i>Falar no WhatsApp
        </a>
        <a href="/servicos" class="btn btn-ghost btn-lg">
          <i class="fas fa-gamepad"></i>Ver Serviços
        </a>
      </div>
    </div>

    <!-- Right — Controller Visual -->
    <div class="hero-visual" data-aos="fade-left" data-aos-delay="200">
      <div class="hero-visual-wrap">
        <div class="orb-ring orb-ring-1"></div>
        <div class="orb-ring orb-ring-2"></div>
        <div class="orb-ring orb-ring-3"></div>
        <div class="orb-ring orb-ring-3"></div>

        <div class="orb-center">
          <i class="fas fa-gamepad"></i>
        </div>

        <!-- PlayStation buttons -->
        <div class="ps-btn-wrap ps-btn-t">
          <div class="ps-btn-orb ps-x">X</div>
        </div>
        <div class="ps-btn-wrap ps-btn-r">
          <div class="ps-btn-orb ps-o">O</div>
        </div>
        <div class="ps-btn-wrap ps-btn-b">
          <div class="ps-btn-orb ps-sq">&#9633;</div>
        </div>
        <div class="ps-btn-wrap ps-btn-l">
          <div class="ps-btn-orb ps-tr">&#9651;</div>
        </div>
      </div>
    </div>
  </div>

  <div class="hero-scroll">
    <div class="hero-scroll-line"></div>
    <span class="hero-scroll-label">Scroll</span>
  </div>
</section>

<!-- ── STATS BAR ──────────────────────────────────────── -->
<div class="stats-bar">
  <div class="stats-bar-inner">
    <div class="stat-cell" data-aos="fade-up">
      <div class="stat-cell-icon"><i class="fas fa-users"></i></div>
      <div>
        <div class="stat-cell-num" data-count="200">0</div>
        <div class="stat-cell-label">Clientes Satisfeitos</div>
      </div>
    </div>
    <div class="stat-cell" data-aos="fade-up" data-aos-delay="80">
      <div class="stat-cell-icon"><i class="fas fa-desktop"></i></div>
      <div>
        <div class="stat-cell-num" data-count="100">0</div>
        <div class="stat-cell-label">PCs Transformados</div>
      </div>
    </div>
    <div class="stat-cell" data-aos="fade-up" data-aos-delay="160">
      <div class="stat-cell-icon"><i class="fas fa-gamepad"></i></div>
      <div>
        <div class="stat-cell-num" data-count="2">0</div>
        <div class="stat-cell-label">Consoles Suportados</div>
      </div>
    </div>
    <div class="stat-cell" data-aos="fade-up" data-aos-delay="240">
      <div class="stat-cell-icon"><i class="fas fa-star"></i></div>
      <div>
        <div class="stat-cell-num" data-count="5">0</div>
        <div class="stat-cell-label">Anos de Experiência</div>
      </div>
    </div>
  </div>
</div>

<!-- ── SERVICES PREVIEW ───────────────────────────────── -->
<section class="services-bg">
  <div class="sec">
    <div class="sh">
      <div class="sh-tag"><i class="fas fa-cogs"></i>O que fazemos</div>
      <h2 class="sh-title">Nossos <span class="accent">Serviços</span></h2>
      <p class="sh-desc">Soluções completas em tecnologia gamer para transformar sua experiência de jogo em Angola</p>
    </div>

    <div class="srv-grid">
      <!-- Featured — Transformação PC em Console -->
      <div class="srv-card srv-col-12" data-aos="fade-up">
        <div class="srv-card-glow"></div>
        <div class="srv-feat-badge">Serviço Principal</div>
        <div class="srv-card-featured">
          <div class="srv-feat-left">
            <div class="srv-feat-icon srv-icon-green">
              <i class="fas fa-tv"></i>
            </div>
            <div class="srv-ps-tags">
              <span class="ps-tag ps-tag-3">PS3</span>
              <span class="ps-tag ps-tag-4">PS4</span>
            </div>
          </div>
          <div class="srv-feat-right">
            <h3 class="srv-feat-title">Transformação de PC em Console PlayStation</h3>
            <p class="srv-feat-desc">Convertemos o seu computador em um console PlayStation totalmente funcional. Após a instalação, o PC funcionará com a interface e experiência autêntica do PlayStation — sem precisar comprar um console físico.</p>
            <a href="/servicos" class="btn btn-green btn-sm"><i class="fas fa-arrow-right"></i>Ver detalhes</a>
          </div>
        </div>
      </div>

      <!-- Instalação de jogos -->
      <div class="srv-card srv-col-4" data-aos="fade-up" data-aos-delay="80">
        <div class="srv-card-glow"></div>
        <div class="srv-card-head">
          <div class="srv-icon-box srv-icon-yellow"><i class="fas fa-compact-disc"></i></div>
        </div>
        <div class="srv-card-body">
          <h3 class="srv-card-title">Instalação de Jogos</h3>
          <p class="srv-card-desc">Instalamos jogos populares e exclusivos com configuração otimizada para o melhor desempenho possível no seu sistema.</p>
          <a href="/servicos" class="srv-link"><span>Saiba mais</span><i class="fas fa-arrow-right"></i></a>
        </div>
      </div>

      <!-- Venda de CPU -->
      <div class="srv-card srv-col-4" data-aos="fade-up" data-aos-delay="160">
        <div class="srv-card-glow"></div>
        <div class="srv-card-head">
          <div class="srv-icon-box srv-icon-orange"><i class="fas fa-microchip"></i></div>
        </div>
        <div class="srv-card-body">
          <h3 class="srv-card-title">Venda de CPU Acessível</h3>
          <p class="srv-card-desc">Computadores a preços acessíveis, prontos para transformação em console PlayStation. A solução completa para gamers.</p>
          <a href="/servicos" class="srv-link"><span>Saiba mais</span><i class="fas fa-arrow-right"></i></a>
        </div>
      </div>

      <!-- Venda de Comandos -->
      <div class="srv-card srv-col-4" data-aos="fade-up" data-aos-delay="240">
        <div class="srv-card-glow"></div>
        <div class="srv-card-head">
          <div class="srv-icon-box srv-icon-red"><i class="fas fa-gamepad"></i></div>
        </div>
        <div class="srv-card-body">
          <h3 class="srv-card-title">Venda de Comandos</h3>
          <p class="srv-card-desc">Controladores compatíveis com PS3 e PS4 para uma experiência de jogo autêntica e confortável.</p>
          <a href="/servicos" class="srv-link"><span>Saiba mais</span><i class="fas fa-arrow-right"></i></a>
        </div>
      </div>

      <!-- Suporte Técnico -->
      <div class="srv-card srv-col-6" data-aos="fade-up" data-aos-delay="80">
        <div class="srv-card-glow"></div>
        <div class="srv-card-head">
          <div class="srv-icon-box srv-icon-blue"><i class="fas fa-tools"></i></div>
        </div>
        <div class="srv-card-body">
          <h3 class="srv-card-title">Suporte Técnico Especializado</h3>
          <p class="srv-card-desc">Atendimento técnico especializado com visita ao domicílio. Instalação, configuração e solução de problemas no conforto da sua casa.</p>
          <a href="/servicos" class="srv-link"><span>Saiba mais</span><i class="fas fa-arrow-right"></i></a>
        </div>
      </div>

      <!-- Sobre -->
      <div class="srv-card srv-col-6" data-aos="fade-up" data-aos-delay="160" style="background:linear-gradient(145deg,rgba(0,200,83,.05),#111);border-color:rgba(0,200,83,.15)">
        <div class="srv-card-glow"></div>
        <div class="srv-card-head">
          <div class="srv-icon-box srv-icon-green"><i class="fas fa-shield-alt"></i></div>
        </div>
        <div class="srv-card-body">
          <h3 class="srv-card-title">Por que a Gameva Center?</h3>
          <p class="srv-card-desc">Processo 100% seguro, técnicos certificados, suporte pós-instalação e atendimento domiciliar. Qualidade e confiança que só a Gameva Center oferece.</p>
          <a href="/sobre" class="srv-link"><span>Conheça-nos</span><i class="fas fa-arrow-right"></i></a>
        </div>
      </div>
    </div>

    <div class="sec-cta-row">
      <a href="/servicos" class="btn-outline">
        <i class="fas fa-th-large"></i>Ver todos os serviços
      </a>
    </div>
  </div>
</section>

<!-- ── BENEFITS ───────────────────────────────────────── -->
<section class="benefits-bg">
  <div class="sec">
    <div class="sh">
      <div class="sh-tag"><i class="fas fa-shield-alt"></i>Por que nos escolher</div>
      <h2 class="sh-title">Vantagens <span class="accent">Gameva</span></h2>
      <p class="sh-desc">Qualidade, segurança e satisfação que nos tornam a melhor escolha em Angola</p>
    </div>

    <div class="ben-grid">
      <div class="ben-item" data-aos="fade-right">
        <div class="ben-icon"><i class="fas fa-shield-alt"></i></div>
        <div>
          <h3 class="ben-title">100% Seguro</h3>
          <p class="ben-desc">Processo de transformação sem risco para o hardware. Instalação via software, sem modificações físicas permanentes.</p>
        </div>
      </div>
      <div class="ben-item" data-aos="fade-up">
        <div class="ben-icon"><i class="fas fa-bolt"></i></div>
        <div>
          <h3 class="ben-title">Instalação Rápida</h3>
          <p class="ben-desc">Entrega ágil no prazo combinado. Em poucos horas seu PC estará funcionando como um console PlayStation.</p>
        </div>
      </div>
      <div class="ben-item" data-aos="fade-left">
        <div class="ben-icon"><i class="fas fa-user-tie"></i></div>
        <div>
          <h3 class="ben-title">Equipa Profissional</h3>
          <p class="ben-desc">Técnicos especializados com anos de experiência em tecnologia gamer e suporte pós-instalação dedicado.</p>
        </div>
      </div>
      <div class="ben-item" data-aos="fade-right" data-aos-delay="100">
        <div class="ben-icon"><i class="fas fa-tags"></i></div>
        <div>
          <h3 class="ben-title">Preço Acessível</h3>
          <p class="ben-desc">Soluções gamer de alta qualidade com o melhor custo-benefício disponível no mercado angolano.</p>
        </div>
      </div>
      <div class="ben-item" data-aos="fade-up" data-aos-delay="100">
        <div class="ben-icon"><i class="fas fa-home"></i></div>
        <div>
          <h3 class="ben-title">Atendimento ao Domicílio</h3>
          <p class="ben-desc">Vamos até você. Instalação e suporte técnico realizado no conforto da sua própria residência.</p>
        </div>
      </div>
      <div class="ben-item" data-aos="fade-left" data-aos-delay="100">
        <div class="ben-icon"><i class="fas fa-headset"></i></div>
        <div>
          <h3 class="ben-title">Suporte Pós-Venda</h3>
          <p class="ben-desc">Acompanhamento contínuo via WhatsApp para garantir que tudo funcione perfeitamente após a instalação.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── CTA ────────────────────────────────────────────── -->
<section class="cta-section">
  <div class="cta-grid-bg"></div>
  <div class="cta-glow1"></div>
  <div class="cta-inner">
    <div class="cta-icon-wrap" data-aos="zoom-in">
      <div class="cta-icon-main"><i class="fab fa-whatsapp"></i></div>
      <div class="cta-icon-badge"><i class="fas fa-check"></i></div>
    </div>
    <h2 class="cta-title" data-aos="fade-up" data-aos-delay="80">Pronto para transformar o seu PC?</h2>
    <p class="cta-desc" data-aos="fade-up" data-aos-delay="160">Entre em contato agora via WhatsApp e receba um orçamento gratuito. Em breve estarás jogando os melhores títulos do PlayStation no teu próprio computador.</p>
    <div class="cta-btns" data-aos="fade-up" data-aos-delay="240">
      <a href="https://wa.me/244931889628?text=Olá!%20Quero%20transformar%20meu%20PC%20em%20um%20console%20PlayStation.%20Qual%20o%20preço?" target="_blank" class="btn btn-green btn-lg">
        <i class="fab fa-whatsapp"></i>Falar no WhatsApp Agora
      </a>
      <a href="tel:+244952717970" class="btn btn-ghost btn-lg">
        <i class="fas fa-phone"></i>+244 952 717 970
      </a>
    </div>
  </div>
</section>
`, 'home')
}

/* ══════════════════════════════════════════════════════════════
   ABOUT PAGE
══════════════════════════════════════════════════════════════ */
function aboutPage() {
  return base('Sobre Nós', `

<!-- ── PAGE HERO ─────────────────────────────────────── -->
<section class="page-hero">
  <div class="page-hero-bg"></div>
  <div class="page-hero-grid"></div>
  <div class="page-hero-glow"></div>
  <div class="page-hero-content">
    <div class="page-eyebrow"><i class="fas fa-users"></i>Nossa história</div>
    <h1 class="page-title">Sobre a <span class="accent">Gameva Center</span></h1>
    <p class="page-subtitle">A empresa que está tornando os jogos de console acessíveis a todos em Angola</p>
  </div>
  <div class="page-breadcrumb">
    <a href="/">Início</a><i class="fas fa-chevron-right"></i><span>Sobre Nós</span>
  </div>
</section>

<!-- ── ABOUT STORY ─────────────────────────────────── -->
<section>
  <div class="sec">
    <div class="about-hero-grid">
      <!-- Visual -->
      <div class="about-visual" data-aos="fade-right">
        <div class="about-logo-ring"></div>
        <div class="about-logo-ring-2"></div>
        <div class="about-logo-center">
          <img src="/static/logo.jpg" alt="Gameva Center" class="about-logo-img">
        </div>
        <!-- Floating cards -->
        <div class="about-float-card afc-1" data-aos="fade-left" data-aos-delay="300">
          <i class="fas fa-users"></i>
          <div><div class="afc-num">200+</div><div class="afc-label">Clientes</div></div>
        </div>
        <div class="about-float-card afc-2" data-aos="fade-right" data-aos-delay="400">
          <i class="fas fa-desktop"></i>
          <div><div class="afc-num">150+</div><div class="afc-label">Instalações</div></div>
        </div>
        <div class="about-float-card afc-3" data-aos="fade-left" data-aos-delay="500">
          <i class="fas fa-star"></i>
          <div><div class="afc-num">5+</div><div class="afc-label">Anos</div></div>
        </div>
      </div>

      <!-- Text -->
      <div data-aos="fade-left">
        <div class="page-eyebrow about-eyebrow"><i class="fas fa-info-circle"></i>Quem somos</div>
        <h2 class="about-title">A empresa que revoluciona o acesso aos <span class="accent">jogos em Angola</span></h2>
        <p class="about-lead">Somos especialistas em tecnologia gamer com uma missão clara: tornar os jogos de console acessíveis a todos, sem precisar gastar fortunas num console físico.</p>
        <p class="about-body">A Gameva Center nasceu do amor pelos jogos e da percepção de que muitas pessoas tinham computadores em casa, mas não podiam desfrutar dos exclusivos do PlayStation por falta de acesso ao console.</p>
        <p class="about-body">Com tecnologia avançada e técnicos experientes, transformamos computadores em consoles PS3 e PS4 totalmente funcionais, com interface original e jogos prontos para jogar — instalação segura, sem riscos ao hardware.</p>
        <div class="about-divider"></div>
        <div class="about-mini-stats">
          <div class="ams-item"><span class="ams-num">200+</span><span class="ams-label">Clientes</span></div>
          <div class="ams-item"><span class="ams-num">150+</span><span class="ams-label">Instalações</span></div>
          <div class="ams-item"><span class="ams-num">5+</span><span class="ams-label">Anos de exp.</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── MVV ─────────────────────────────────────────── -->
<section class="mvv-bg">
  <div class="sec">
    <div class="sh">
      <div class="sh-tag"><i class="fas fa-compass"></i>Nossa essência</div>
      <h2 class="sh-title">Missão, Visão <span class="accent">e Valores</span></h2>
    </div>
    <div class="mvv-grid">
      <div class="mvv-card mvv-card-mission" data-aos="fade-up">
        <div class="mvv-bottom-line"></div>
        <div class="mvv-icon-wrap"><i class="fas fa-rocket"></i></div>
        <h3 class="mvv-name">Missão</h3>
        <p class="mvv-text">Tornar a experiência de jogos de console acessível através de soluções tecnológicas inovadoras e seguras, democratizando o entretenimento gamer em Angola.</p>
      </div>
      <div class="mvv-card mvv-card-vision" data-aos="fade-up" data-aos-delay="120">
        <div class="mvv-bottom-line"></div>
        <div class="mvv-icon-wrap"><i class="fas fa-eye"></i></div>
        <h3 class="mvv-name">Visão</h3>
        <p class="mvv-text">Ser a principal referência em serviços tecnológicos para gamers em Angola, reconhecida pela excelência, inovação e compromisso com a satisfação dos nossos clientes.</p>
      </div>
      <div class="mvv-card mvv-card-values" data-aos="fade-up" data-aos-delay="240">
        <div class="mvv-bottom-line"></div>
        <div class="mvv-icon-wrap"><i class="fas fa-gem"></i></div>
        <h3 class="mvv-name">Valores</h3>
        <ul class="mvv-values-list">
          <li class="mvv-val-item"><i class="fas fa-check-circle"></i>Qualidade em tudo que fazemos</li>
          <li class="mvv-val-item"><i class="fas fa-check-circle"></i>Segurança do cliente em primeiro lugar</li>
          <li class="mvv-val-item"><i class="fas fa-check-circle"></i>Inovação tecnológica constante</li>
          <li class="mvv-val-item"><i class="fas fa-check-circle"></i>Satisfação garantida do cliente</li>
          <li class="mvv-val-item"><i class="fas fa-check-circle"></i>Transparência e honestidade</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- ── WHY US ─────────────────────────────────────── -->
<section>
  <div class="sec">
    <div class="sh">
      <div class="sh-tag"><i class="fas fa-trophy"></i>Diferenciais</div>
      <h2 class="sh-title">Por que <span class="accent">nos escolher</span>?</h2>
      <p class="sh-desc">Confiança e qualidade que nos tornam únicos no mercado angolano</p>
    </div>
    <div class="why-grid">
      <div class="why-card" data-aos="zoom-in">
        <div class="why-icon-box"><i class="fas fa-tools"></i></div>
        <h4 class="why-name">Tecnologia Avançada</h4>
        <p class="why-text">Utilizamos as melhores ferramentas e técnicas para garantir uma transformação perfeita e sem falhas.</p>
      </div>
      <div class="why-card" data-aos="zoom-in" data-aos-delay="80">
        <div class="why-icon-box"><i class="fas fa-award"></i></div>
        <h4 class="why-name">Qualidade Garantida</h4>
        <p class="why-text">Cada instalação passa por testes rigorosos antes de ser entregue ao cliente. Zero tolerância a falhas.</p>
      </div>
      <div class="why-card" data-aos="zoom-in" data-aos-delay="160">
        <div class="why-icon-box"><i class="fas fa-headset"></i></div>
        <h4 class="why-name">Suporte Contínuo</h4>
        <p class="why-text">Disponíveis 7 dias por semana via WhatsApp para resolver qualquer questão após a instalação.</p>
      </div>
      <div class="why-card" data-aos="zoom-in" data-aos-delay="240">
        <div class="why-icon-box"><i class="fas fa-hand-holding-heart"></i></div>
        <h4 class="why-name">Atendimento Humanizado</h4>
        <p class="why-text">Cada cliente é único. Tratamos todos com atenção personalizada e cuidado especial do início ao fim.</p>
      </div>
    </div>
  </div>
</section>

<!-- ── CTA ────────────────────────────────────────── -->
<section class="cta-section">
  <div class="cta-grid-bg"></div>
  <div class="cta-glow1"></div>
  <div class="cta-inner">
    <div class="cta-icon-wrap" data-aos="zoom-in">
      <div class="cta-icon-main"><i class="fas fa-gamepad"></i></div>
    </div>
    <h2 class="cta-title" data-aos="fade-up" data-aos-delay="80">Quer saber mais sobre a Gameva Center?</h2>
    <p class="cta-desc" data-aos="fade-up" data-aos-delay="160">Fale com a nossa equipa e descubra como podemos transformar a sua experiência gamer em Angola.</p>
    <div class="cta-btns" data-aos="fade-up" data-aos-delay="240">
      <a href="https://wa.me/244931889628" target="_blank" class="btn btn-green btn-lg"><i class="fab fa-whatsapp"></i>Falar no WhatsApp</a>
      <a href="/servicos" class="btn btn-ghost btn-lg"><i class="fas fa-gamepad"></i>Ver Serviços</a>
    </div>
  </div>
</section>
`, 'sobre')
}

/* ══════════════════════════════════════════════════════════════
   SERVICES PAGE
══════════════════════════════════════════════════════════════ */
function servicesPage() {
  return base('Serviços', `

<!-- ── PAGE HERO ─────────────────────────────────── -->
<section class="page-hero">
  <div class="page-hero-bg"></div>
  <div class="page-hero-grid"></div>
  <div class="page-hero-glow"></div>
  <div class="page-hero-content">
    <div class="page-eyebrow"><i class="fas fa-gamepad"></i>O que oferecemos</div>
    <h1 class="page-title">Nossos <span class="accent">Serviços</span></h1>
    <p class="page-subtitle">Soluções completas em tecnologia gamer para uma experiência PlayStation incrível</p>
  </div>
  <div class="page-breadcrumb">
    <a href="/">Início</a><i class="fas fa-chevron-right"></i><span>Serviços</span>
  </div>
</section>

<!-- ── DETAILED SERVICES ───────────────────────── -->
<section class="srv-detail-wrap">
  <div class="sec" style="padding-top:0">

    <!-- 1. Transformação PC em Console -->
    <div class="srv-detail-card" data-aos="fade-up">
      <div class="srv-d-popular">Mais Popular</div>
      <div class="srv-d-icon-box srv-icon-green"><i class="fas fa-tv"></i></div>
      <div style="flex:1">
        <div class="srv-ps-tags" style="margin-bottom:16px">
          <span class="ps-tag ps-tag-3">PS3</span>
          <span class="ps-tag ps-tag-4">PS4</span>
        </div>
        <h2 class="srv-d-title">Transformação de PC em Console PlayStation</h2>
        <p class="srv-d-desc">Transformamos o seu computador num console PlayStation completamente funcional. Após a instalação, o PC funciona com a interface e a experiência original do PlayStation — sem necessidade de comprar o console físico.</p>
        <div class="console-trio">
          <div class="console-option-card con-ps3">
            <div class="con-logo">PS3</div>
            <div class="con-name">PlayStation 3</div>
            <div class="con-features">
              <div class="con-feat-item"><i class="fas fa-check"></i>Interface XMB original</div>
              <div class="con-feat-item"><i class="fas fa-check"></i>Jogos exclusivos PS3</div>
              <div class="con-feat-item"><i class="fas fa-check"></i>Controle DualShock 3</div>
              <div class="con-feat-item"><i class="fas fa-check"></i>Áudio e vídeo HD</div>
            </div>
          </div>
          <div class="console-option-card con-ps4">
            <div class="con-logo">PS4</div>
            <div class="con-name">PlayStation 4</div>
            <div class="con-features">
              <div class="con-feat-item"><i class="fas fa-check"></i>Interface PS4 completa</div>
              <div class="con-feat-item"><i class="fas fa-check"></i>Jogos modernos PS4</div>
              <div class="con-feat-item"><i class="fas fa-check"></i>Controle DualShock 4</div>
              <div class="con-feat-item"><i class="fas fa-check"></i>Gráficos HD / Full HD</div>
            </div>
          </div>
        </div>
        <a href="https://wa.me/244931889628?text=Olá!%20Quero%20transformar%20meu%20PC%20em%20console%20PlayStation.%20Podem%20me%20informar?" target="_blank" class="btn btn-green"><i class="fab fa-whatsapp"></i>Solicitar Orçamento</a>
      </div>
    </div>

    <!-- 2. Instalação de Jogos -->
    <div class="srv-detail-card alt" data-aos="fade-up">
      <div class="srv-d-icon-box srv-icon-yellow"><i class="fas fa-compact-disc"></i></div>
      <div style="flex:1">
        <h2 class="srv-d-title">Instalação de Jogos</h2>
        <p class="srv-d-desc">Instalamos a biblioteca de jogos do seu console com configuração otimizada para o melhor desempenho e experiência de jogo possíveis.</p>
        <div class="feat-2col">
          <div class="feat-row"><i class="fas fa-check-circle"></i>Jogos populares e exclusivos</div>
          <div class="feat-row"><i class="fas fa-check-circle"></i>Configuração otimizada</div>
          <div class="feat-row"><i class="fas fa-check-circle"></i>Compatibilidade garantida</div>
          <div class="feat-row"><i class="fas fa-check-circle"></i>Todos os géneros disponíveis</div>
          <div class="feat-row"><i class="fas fa-check-circle"></i>Jogos prontos para usar</div>
          <div class="feat-row"><i class="fas fa-check-circle"></i>Atualização da biblioteca</div>
        </div>
        <a href="https://wa.me/244931889628?text=Olá!%20Quero%20instalar%20jogos%20no%20meu%20console.%20Podem%20me%20ajudar?" target="_blank" class="btn btn-green"><i class="fab fa-whatsapp"></i>Solicitar Instalação</a>
      </div>
    </div>

    <!-- 3. Venda de CPU -->
    <div class="srv-detail-card" data-aos="fade-up">
      <div class="srv-d-icon-box srv-icon-orange"><i class="fas fa-microchip"></i></div>
      <div style="flex:1">
        <h2 class="srv-d-title">Venda de CPU a Preço Acessível</h2>
        <p class="srv-d-desc">Disponibilizamos computadores a preços acessíveis, prontos para transformação em consoles PlayStation. A solução completa para quem quer jogar sem gastar muito.</p>
        <div class="pricing-row">
          <div class="pricing-tier">
            <div class="pricing-icon"><i class="fas fa-desktop"></i></div>
            <div><div class="pricing-name">CPU Básica</div><div class="pricing-sub">Ideal para PS3</div></div>
          </div>
          <div class="pricing-tier recommended">
            <div class="pricing-rec-badge">Recomendado</div>
            <div class="pricing-icon"><i class="fas fa-server"></i></div>
            <div><div class="pricing-name">CPU Intermediária</div><div class="pricing-sub">Perfeita para PS3 e PS4</div></div>
          </div>
          <div class="pricing-tier">
            <div class="pricing-icon"><i class="fas fa-laptop"></i></div>
            <div><div class="pricing-name">CPU Avançada</div><div class="pricing-sub">PS4 em Full HD</div></div>
          </div>
        </div>
        <a href="https://wa.me/244931889628?text=Olá!%20Quero%20saber%20sobre%20as%20CPUs%20disponíveis%20para%20venda." target="_blank" class="btn btn-green"><i class="fab fa-whatsapp"></i>Ver Preços Disponíveis</a>
      </div>
    </div>

    <!-- 4. Venda de Comandos -->
    <div class="srv-detail-card alt" data-aos="fade-up">
      <div class="srv-d-icon-box srv-icon-red"><i class="fas fa-gamepad"></i></div>
      <div style="flex:1">
        <h2 class="srv-d-title">Venda de Comandos</h2>
        <p class="srv-d-desc">Controladores compatíveis com PS3 e PS4 para uma experiência de jogo autêntica. Comandos de qualidade para jogar com conforto e precisão.</p>
        <div class="ctrl-row">
          <div class="ctrl-card">
            <div class="ctrl-icon"><i class="fas fa-gamepad"></i></div>
            <div class="ctrl-name">Comando PS3</div>
            <div class="ctrl-sub">DualShock 3 / SIXAXIS</div>
          </div>
          <div class="ctrl-card">
            <div class="ctrl-icon"><i class="fas fa-gamepad"></i></div>
            <div class="ctrl-name">Comando PS4</div>
            <div class="ctrl-sub">DualShock 4 original</div>
          </div>
        </div>
        <a href="https://wa.me/244931889628?text=Olá!%20Quero%20comprar%20um%20comando%20PlayStation.%20Quais%20têm%20disponíveis?" target="_blank" class="btn btn-green"><i class="fab fa-whatsapp"></i>Comprar Comando</a>
      </div>
    </div>

    <!-- 5. Suporte Técnico -->
    <div class="srv-detail-card" data-aos="fade-up">
      <div class="srv-d-icon-box srv-icon-blue"><i class="fas fa-tools"></i></div>
      <div style="flex:1">
        <h2 class="srv-d-title">Suporte Técnico e Atendimento ao Domicílio</h2>
        <p class="srv-d-desc">A nossa equipa de técnicos especializados vai até à sua residência para instalar, configurar e solucionar qualquer problema com o seu sistema gamer.</p>
        <div class="support-row">
          <div class="support-opt">
            <div class="support-opt-icon"><i class="fas fa-home"></i></div>
            <div class="support-opt-name">Atendimento Domiciliar</div>
            <div class="support-opt-sub">Vamos até você</div>
          </div>
          <div class="support-opt">
            <div class="support-opt-icon"><i class="fas fa-store"></i></div>
            <div class="support-opt-name">Atendimento em Estúdio</div>
            <div class="support-opt-sub">Leve seu equipamento</div>
          </div>
          <div class="support-opt">
            <div class="support-opt-icon"><i class="fab fa-whatsapp"></i></div>
            <div class="support-opt-name">Suporte Online</div>
            <div class="support-opt-sub">Assistência via WhatsApp</div>
          </div>
        </div>
        <a href="https://wa.me/244931889628?text=Olá!%20Preciso%20de%20suporte%20técnico.%20Podem%20me%20ajudar?" target="_blank" class="btn btn-green"><i class="fab fa-whatsapp"></i>Agendar Atendimento</a>
      </div>
    </div>

  </div>
</section>

<!-- ── CTA ────────────────────────────────────────── -->
<section class="cta-section">
  <div class="cta-grid-bg"></div>
  <div class="cta-glow1"></div>
  <div class="cta-inner">
    <div class="cta-icon-wrap" data-aos="zoom-in">
      <div class="cta-icon-main"><i class="fas fa-headset"></i></div>
    </div>
    <h2 class="cta-title" data-aos="fade-up" data-aos-delay="80">Precisa de um serviço personalizado?</h2>
    <p class="cta-desc" data-aos="fade-up" data-aos-delay="160">Entre em contacto e vamos criar a solução gamer perfeita para as suas necessidades específicas.</p>
    <div class="cta-btns" data-aos="fade-up" data-aos-delay="240">
      <a href="https://wa.me/244931889628" target="_blank" class="btn btn-green btn-lg"><i class="fab fa-whatsapp"></i>Falar com Especialista</a>
      <a href="/contato" class="btn btn-ghost btn-lg"><i class="fas fa-envelope"></i>Formulário de Contato</a>
    </div>
  </div>
</section>
`, 'servicos')
}

/* ══════════════════════════════════════════════════════════════
   CONTACT PAGE
══════════════════════════════════════════════════════════════ */
function contactPage() {
  return base('Contato', `

<!-- ── PAGE HERO ─────────────────────────────────── -->
<section class="page-hero">
  <div class="page-hero-bg"></div>
  <div class="page-hero-grid"></div>
  <div class="page-hero-glow"></div>
  <div class="page-hero-content">
    <div class="page-eyebrow"><i class="fas fa-envelope"></i>Fale connosco</div>
    <h1 class="page-title">Entre em <span class="accent">Contato</span></h1>
    <p class="page-subtitle">A nossa equipa está pronta para transformar a sua experiência gamer</p>
  </div>
  <div class="page-breadcrumb">
    <a href="/">Início</a><i class="fas fa-chevron-right"></i><span>Contato</span>
  </div>
</section>

<!-- ── CONTACT MAIN ─────────────────────────────── -->
<section class="contact-layout">
  <div class="sec" style="padding-top:0">
    <div class="contact-grid">

      <!-- Info side -->
      <div data-aos="fade-right">
        <h2 class="contact-heading">Informações de <span class="accent">Contato</span></h2>
        <p class="contact-intro">Escolha o canal de sua preferência. Estamos sempre disponíveis e prontos para atendê-lo com rapidez e qualidade.</p>

        <div class="contact-card-list">
          <a href="https://wa.me/244931889628?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20Gameva%20Center." target="_blank" class="ccard ccard-wa">
            <div class="ccard-icon"><i class="fab fa-whatsapp"></i></div>
            <div class="ccard-info">
              <div class="ccard-lbl">WhatsApp · Principal</div>
              <div class="ccard-val">+244 931 889 628</div>
              <div class="ccard-hint">Resposta rápida · Disponível agora</div>
            </div>
            <i class="fas fa-external-link-alt ccard-arr"></i>
          </a>

          <a href="tel:+244952717970" class="ccard ccard-tel">
            <div class="ccard-icon"><i class="fas fa-phone"></i></div>
            <div class="ccard-info">
              <div class="ccard-lbl">Telefone</div>
              <div class="ccard-val">+244 952 717 970</div>
              <div class="ccard-hint">Ligações diretas</div>
            </div>
            <i class="fas fa-external-link-alt ccard-arr"></i>
          </a>

          <div class="ccard ccard-loc">
            <div class="ccard-icon"><i class="fas fa-map-marker-alt"></i></div>
            <div class="ccard-info">
              <div class="ccard-lbl">Localização</div>
              <div class="ccard-val">Angola</div>
              <div class="ccard-hint">Atendimento por agendamento · Domiciliar disponível</div>
            </div>
          </div>
        </div>

        <!-- Horários -->
        <div class="hours-card">
          <div class="hours-header"><i class="fas fa-clock"></i>Horário de Atendimento</div>
          <div class="hours-list">
            <div class="hours-row hours-active">
              <span class="hours-day">Segunda — Sexta</span>
              <span class="hours-time">Por agendamento</span>
            </div>
            <div class="hours-row hours-active">
              <span class="hours-day">Sábado</span>
              <span class="hours-time">Por agendamento</span>
            </div>
            <div class="hours-row">
              <span class="hours-day">Domingo</span>
              <span class="hours-time">Por agendamento</span>
            </div>
          </div>
        </div>

        <!-- WhatsApp big button -->
        <a href="https://wa.me/244931889628?text=Olá!%20Quero%20saber%20mais%20sobre%20os%20serviços%20da%20Gameva%20Center." target="_blank" class="wa-big-btn">
          <i class="fab fa-whatsapp wa-big-icon"></i>
          <div>
            <div class="wa-big-title">Conversar no WhatsApp</div>
            <div class="wa-big-sub">Clique para iniciar uma conversa agora</div>
          </div>
        </a>
      </div>

      <!-- Form side -->
      <div data-aos="fade-left">
        <div class="form-card">
          <div class="form-card-head">
            <div class="form-head-icon"><i class="fas fa-paper-plane"></i></div>
            <h3 class="form-head-title">Envie uma Mensagem</h3>
            <p class="form-head-sub">Preencha o formulário e redirecionaremos para o WhatsApp</p>
          </div>
          <form class="form-body" id="contactForm" novalidate>
            <div class="fg">
              <label for="name"><i class="fas fa-user"></i>Nome Completo *</label>
              <input type="text" id="name" name="name" placeholder="O seu nome completo" required>
            </div>
            <div class="fg-row">
              <div class="fg">
                <label for="phone"><i class="fas fa-phone"></i>Telefone / WhatsApp</label>
                <input type="tel" id="phone" name="phone" placeholder="+244 000 000 000">
              </div>
              <div class="fg">
                <label for="email"><i class="fas fa-envelope"></i>Email (opcional)</label>
                <input type="email" id="email" name="email" placeholder="seu@email.com">
              </div>
            </div>
            <div class="fg">
              <label for="service"><i class="fas fa-cog"></i>Serviço de Interesse</label>
              <select id="service" name="service">
                <option value="">Selecione um serviço...</option>
                <option value="ps3">Transformação PC em PS3</option>
                <option value="ps4">Transformação PC em PS4</option>
                <option value="jogos">Instalação de Jogos</option>
                <option value="cpu">Compra de CPU</option>
                <option value="comando">Compra de Comando</option>
                <option value="suporte">Suporte Técnico</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            <div class="fg">
              <label for="message"><i class="fas fa-comment"></i>Mensagem *</label>
              <textarea id="message" name="message" rows="5" placeholder="Descreva o que precisa em detalhe..." required></textarea>
            </div>
            <button type="submit" class="form-submit">
              <i class="fab fa-whatsapp"></i>Enviar via WhatsApp
            </button>
          </form>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ── FAQ ──────────────────────────────────────── -->
<section class="faq-layout">
  <div class="sec">
    <div class="sh">
      <div class="sh-tag"><i class="fas fa-question-circle"></i>Dúvidas</div>
      <h2 class="sh-title">Perguntas <span class="accent">Frequentes</span></h2>
    </div>
    <div class="faq-grid">
      <div class="faq-item" data-aos="fade-up">
        <div class="faq-q"><i class="fas fa-gamepad"></i><h4>O meu computador fica danificado após a transformação?</h4></div>
        <p class="faq-a">Não. O processo é 100% seguro via software. Não fazemos modificações físicas permanentes no hardware. O seu equipamento fica totalmente preservado.</p>
      </div>
      <div class="faq-item" data-aos="fade-up" data-aos-delay="60">
        <div class="faq-q"><i class="fas fa-desktop"></i><h4>Qualquer computador pode ser transformado?</h4></div>
        <p class="faq-a">A grande maioria pode. Fazemos uma avaliação prévia das especificações para garantir o melhor resultado. Entre em contacto para verificarmos a compatibilidade do seu PC.</p>
      </div>
      <div class="faq-item" data-aos="fade-up" data-aos-delay="120">
        <div class="faq-q"><i class="fas fa-clock"></i><h4>Quanto tempo demora a instalação?</h4></div>
        <p class="faq-a">Normalmente entre 1 a 4 horas, dependendo do tipo de console e quantidade de jogos. Instalações domiciliares são agendadas previamente conforme sua disponibilidade.</p>
      </div>
      <div class="faq-item" data-aos="fade-up" data-aos-delay="180">
        <div class="faq-q"><i class="fas fa-home"></i><h4>Fazem atendimento ao domicílio?</h4></div>
        <p class="faq-a">Sim. A nossa equipa desloca-se até à sua residência para realizar a instalação completa no horário mais conveniente para você.</p>
      </div>
      <div class="faq-item" data-aos="fade-up" data-aos-delay="60">
        <div class="faq-q"><i class="fas fa-undo"></i><h4>Posso voltar ao Windows depois?</h4></div>
        <p class="faq-a">Sim. O processo pode ser revertido a qualquer momento. O seu sistema Windows original pode ser restaurado sempre que desejar, sem perda de dados.</p>
      </div>
      <div class="faq-item" data-aos="fade-up" data-aos-delay="120">
        <div class="faq-q"><i class="fas fa-headset"></i><h4>Há suporte depois da instalação?</h4></div>
        <p class="faq-a">Sim. Oferecemos suporte técnico completo pós-instalação. Estamos disponíveis via WhatsApp para resolver qualquer dúvida ou problema que surja.</p>
      </div>
    </div>
  </div>
</section>
`, 'contato')
}

export default app
