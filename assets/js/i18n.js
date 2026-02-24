/**
 * i18n.js
 * Bilingual toggle ES <-> EN.
 * Uses data-i18n attributes on elements to swap text content.
 * Persists selection in localStorage.
 */

(function initI18n() {
  'use strict';

  /* ── Translations dictionary ─────────────────────────────── */
  const TRANSLATIONS = {
    es: {
      /* nav */
      'nav.skills':           'skills',
      'nav.experience':       'experience',
      'nav.pipeline':         'pipeline',
      'nav.cloud':            'cloud',
      'nav.contact':          'contact',

      /* hero terminal */
      'hero.role':            '"Ingeniero DevOps"',
      'hero.years':           'años',
      'hero.status':          'running',

      /* skills section */
      'skills.title':         'skills &amp; herramientas',
      'skills.scripting':     'Scripting &amp; Automatización',
      'skills.cloud':         'Plataformas Cloud',
      'skills.containers':    'Contenedores &amp; Orquestación',
      'skills.cicd':          'CI/CD &amp; VCS',
      'skills.os':            'Sistemas Operativos',
      'skills.monitoring':    'Monitoreo &amp; Observabilidad',

      /* experience section */
      'exp.title':            'experiencia',
      'exp.present':          'presente',

      'exp.job1.role':        'Cloud / DevOps Engineer',
      'exp.job2.bullet1':     '· Automatización de infraestructura en AWS, migraciones con Docker y Kubernetes, y diseño de pipelines CI mediante GitHub Actions..',
      'exp.job1.bullet2':     '· Diseñé, implementé y mantuve pipelines CI/CD robustos utilizando GitHub Actions, Bamboo, GitLab y Jenkins para agilizar los procesos de entrega de software.',
      'exp.job1.bullet3':     '· Desarrollé y aprovisioné Infraestructura como Código (IaC) utilizando Terraform y AWS CloudFormation para automatizar y estandarizar los despliegues de entornos.',

      'exp.job2.role':        'SysAdmin',
      'exp.job2.bullet1':     '· Desplegué y orquesté arquitecturas de microservicios en Azure Kubernetes Service (AKS) utilizando Helm.',
      'exp.job2.bullet2':     '· Desarrollé y gestioné Infraestructura como Código (IaC) con Terraform en Microsoft Azure para asegurar entornos cloud consistentes y escalables.',
      'exp.job2.bullet3':     '· Administré servidores Windows on-premise, gestionando Active Directory y Objetos de Directiva de Grupo (GPOs) para mantener la seguridad interna y el acceso de usuarios.',

      /* pipeline section */
      'pipeline.title':         'pipeline ci/cd',

      'pipeline1.step1':        '📝 Push de Código',
      'pipeline1.step2':        '🔍 Lint &amp; Test',
      'pipeline1.step3':        '🐳 Build Docker',
      'pipeline1.step4':        '🔐 Escaneo de Imagen',
      'pipeline1.step5':        '📦 Push Registro',
      'pipeline1.step6':        '🚀 Deploy K8S',

      'pipeline2.step1':        '📝 Pull Request',
      'pipeline2.step2':        '🔍 Validate &amp; Terragrunt Plan',
      'pipeline2.step3':        '📝 Push de Código',
      'pipeline2.step4':        '🌍 Terragrunt Apply',
      'pipeline2.step5':        '🚀 Deploy AWS',
      'pipeline2.step6':        '🔄 Detectión de Drift',

      'pipeline.metric1':       'Tasa de build exitoso',
      'pipeline.metric2':       'Frecuencia de despliegue',
      'pipeline.metric2val':    'diario',
      'pipeline.metric3':       'Tiempo medio de recuperación',
      'pipeline.metric4':       'Infraestructura como Código',

      /* cloud section */
      'cloud.title':            'cobertura cloud',

      /* contact section */
      'contact.title':          'contact',
      'contact.location':       'location',
      'contact.status':         'status',
      'contact.cv':             'descargar cv',
      'contact.available':      'open to opportunities',
      'contact.cta':            'send_message --to contact@darthfabax.com',

      /* footer */
      'footer.quote':           'echo "Built with Linux philosophy — do one thing and do it well"',
    },

    en: {
      /* nav */
      'nav.skills':             'skills',
      'nav.experience':         'experience',
      'nav.pipeline':           'pipeline',
      'nav.cloud':              'cloud',
      'nav.contact':            'contact',

      /* hero terminal */
      'hero.role':              '"DevOps Engineer"',
      'hero.years':             'years',
      'hero.status':            'running',
  
      /* skills section */  
      'skills.title':           'skills &amp; tooling',
      'skills.scripting':       'Scripting &amp; Automation',
      'skills.cloud':           'Cloud Platforms',
      'skills.containers':      'Containers &amp; Orchestration',
      'skills.cicd':            'CI/CD &amp; VCS',
      'skills.os':              'Operating Systems',
      'skills.monitoring':      'Monitoring &amp; Observability',

      /* experience section */
      'exp.title':              'experience',
      'exp.present':            'present',

      'exp.job1.role':          'Cloud / DevOps Engineer',
      'exp.job1.bullet1':       '· AWS infrastructure automation, Docker & Kubernetes migrations, GitHub Actions pipeline design.',
      'exp.job1.bullet2':       '· Designed, implemented, and maintained robust CI/CD pipelines using GitHub Actions, Bamboo, GitLab, and Jenkins to streamline software delivery processes.',
      'exp.job1.bullet3':       '· Developed and provisioned Infrastructure as Code (IaC) utilizing Terraform and AWS CloudFormation to automate and standardize environment deployments.',

      'exp.job2.role':          'SysAdmin',
      'exp.job2.bullet1':       '· Deployed and orchestrated microservices architectures in Azure Kubernetes Service (AKS) utilizing Helm.',
      'exp.job2.bullet2':       '· Developed and managed Infrastructure as Code (IaC) with Terraform on Microsoft Azure to ensure consistent and scalable cloud environments.',
      'exp.job2.bullet3':       '· Administered on-premises Windows servers, managing Active Directory and Group Policy Objects (GPOs) to maintain internal security and user access.',

      /* pipeline section */
      'pipeline.title':         'ci/cd pipeline',

      'pipeline1.step1':        '📝 Code Push',
      'pipeline1.step2':        '🔍 Lint &amp; Test',
      'pipeline1.step3':        '🐳 Docker Build',
      'pipeline1.step4':        '🔐 Image Scan',
      'pipeline1.step5':        '📦 Push Registry',
      'pipeline1.step6':        '🚀 Deploy K8S',

      'pipeline2.step1':        '📝 Pull Request',
      'pipeline2.step2':        '🔍 Validate &amp; Terragrunt Plan',
      'pipeline2.step3':        '📝 Code Push',
      'pipeline2.step4':        '🌍 Terragrunt Apply',
      'pipeline2.step5':        '🚀 Deploy AWS',
      'pipeline2.step6':        '🔄 Drift Detection',
 
      'pipeline.metric1':       'Build success rate',
      'pipeline.metric2':       'Deployment frequency',
      'pipeline.metric2val':    'daily',
      'pipeline.metric3':       'Mean time to recovery',
      'pipeline.metric4':       'Infrastructure as Code',

      /* cloud section */
      'cloud.title':            'cloud coverage',

      /* contact section */
      'contact.title':          'contact',
      'contact.location':       'location',
      'contact.status':         'status',
      'contact.cv':             'download cv',
      'contact.available':      'open to opportunities',
      'contact.cta':            'send_message --to contact@darthfabax.com',

      /* footer */
      'footer.quote':           'echo "Built with Linux philosophy — do one thing and do it well"',
    },
  };

  /* ── State ───────────────────────────────────────────────── */
  const STORAGE_KEY = 'portfolio-lang';
  let currentLang = localStorage.getItem(STORAGE_KEY) || 'en';

  /* ── DOM refs ────────────────────────────────────────────── */
  const toggleBtn = document.getElementById('js-lang-toggle');
  const htmlEl    = document.documentElement;

  /* ── Apply translations ──────────────────────────────────── */
  function applyLang(lang) {
    const dict = TRANSLATIONS[lang];
    if (!dict) return;

    /* Update all data-i18n elements */
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key   = el.getAttribute('data-i18n');
      const value = dict[key];
      if (value !== undefined) {
        /* Use innerHTML to support &amp; entities in translations */
        el.innerHTML = value;
      }
    });

    /* Update <html lang> attribute */
    htmlEl.setAttribute('lang', lang);

    /* Update button label — show the OTHER language as the target */
    if (toggleBtn) {
      toggleBtn.textContent = lang === 'es' ? 'EN' : 'ES';
      toggleBtn.setAttribute(
        'aria-label',
        lang === 'es' ? 'Switch to English' : 'Cambiar a Español'
      );
    }

    /* Persist */
    localStorage.setItem(STORAGE_KEY, lang);
    currentLang = lang;
  }

  /* ── Toggle handler ──────────────────────────────────────── */
  function toggleLang() {
    const next = currentLang === 'es' ? 'en' : 'es';
    applyLang(next);
  }

  /* ── Init ────────────────────────────────────────────────── */
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleLang);
  }

  /* Apply saved / default language on load */
  applyLang(currentLang);

})();
