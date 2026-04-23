import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Linking,
  Platform,
  Animated,
  KeyboardAvoidingView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 500;
const isWeb = Platform.OS === 'web';

// ── Contact Info ──
const CONTACT = {
  telegram: '@srwebstudio',
  telegramUrl: 'https://t.me/srwebstudio',
  email: 'webstudiosr4@gmail.com',
  whatsappUrl: 'https://wa.me/message/LDTWLYD6JRCWH1',
  facebookUrl: 'https://www.facebook.com/share/1CGfPkByqK/',
};

// ── Translations ──
const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    navServices: 'Services', navWork: 'Work', navPricing: 'Pricing', navContact: 'Contact',
    heroTitle1: 'Boost your business sales', heroTitle2: 'with a website that truly sells',
    heroSub: 'Modern websites for businesses — ready in as fast as 2–3 days',
    heroSubPrice: '',
    trustLine: 'Already helped multiple clients launch online',
    ctaOrder: 'Order a website', ctaConsult: 'Free consultation',
    // Trust badges
    badge1: '10+ projects', badge2: 'Ready in 3 days', badge3: 'Design + SEO',
    // Services
    svcLabel: 'SERVICES', svcTitle: 'What I offer',
    svc1: 'Landing Pages', svc1d: 'Perfect for ads and quick sales',
    svc2: 'Business Websites', svc2d: 'Professional sites for your company',
    svc3: 'Online Stores', svc3d: 'Sell your products easily',
    advLabel: 'ADVANTAGES', advTitle: 'Why choose SR Web Studio',
    adv1: 'Fast delivery', adv1d: '2–3 days turnaround',
    adv2: 'Affordable prices', adv2d: 'Starting from 400 PLN',
    adv3: 'Modern design', adv3d: 'Clean & professional',
    adv4: 'Mobile optimized', adv4d: 'Looks great everywhere',
    adv5: 'Personal approach', adv5d: 'Direct communication',
    portLabel: 'PORTFOLIO', portTitle: 'My work',
    port1: 'Premium Barbershop Website', port1d: 'Barbershop website that increases online bookings', port1t: 'Landing Page',
    port1f1: 'Online booking', port1f2: '3D animations', port1f3: 'Mobile-first', port1f4: 'SEO optimized',
    port1r: '+ more clients',
    port2: 'Stylish Cafe Website', port2d: 'Café website that attracts customers and builds atmosphere', port2t: 'Business Site',
    port2f1: 'Digital menu', port2f2: 'Photo gallery', port2f3: 'Contact form', port2f4: 'Google Maps',
    port2r: '+ better image',
    port3: 'Clothing Store Website', port3d: 'Online store designed to boost sales', port3t: 'Online Store',
    port3f1: 'Product catalog', port3f2: 'Shopping cart', port3f3: 'Secure payments', port3f4: 'Order tracking',
    port3r: '+ online sales',
    portBtn: 'View website',
    priceLabel: 'PRICING', priceTitle: 'Simple pricing', priceGet: 'Get started',
    pricePop: 'Most Popular',
    p1: 'Basic', p1f1: '1 page website', p1f2: 'Simple modern design', p1f3: 'Mobile optimization',
    p2: 'Standard', p2f1: 'Up to 5 pages', p2f2: 'Custom design', p2f3: 'Mobile optimization', p2f4: 'Basic SEO', p2f5: 'Google Maps integration',
    p3: 'Premium', p3f1: 'Full website', p3f2: 'Advanced design', p3f3: 'SEO optimization', p3f4: 'Multi-language support (2 languages)', p3f5: 'Priority support',
    testLabel: 'TESTIMONIALS', testTitle: 'What clients say',
    t1: 'Great cooperation, website ready in 2 days and looks mega professional!',
    t2: 'Thanks to this website I have more clients from the internet.',
    t3: 'Fast, concrete and at a good price. Highly recommend!',
    ctaFinalTitle: 'Ready to get your website?', ctaFinalSub: "Let's build something that brings you clients",
    ctaOrderNow: 'Order now',
    contactLabel: 'CONTACT', contactTitle: 'Get in touch',
    contactHeadline: 'Get in touch — I reply within 1–2 hours',
    contactSub: 'Choose your preferred contact method',
    contactTelegram: 'Telegram', contactTelegramSub: '@srwebstudio',
    contactWhatsApp: 'WhatsApp', contactWhatsAppSub: '+48 452 688 251',
    contactFacebook: 'Facebook', contactFacebookSub: 'Send a message',
    contactEmail: 'Email', contactEmailSub: 'webstudiosr4@gmail.com',
    contactResponse: 'I usually reply within 1–2 hours',
    // Contact form
    formTitle: 'Or send a message',
    formName: 'Your name', formEmail: 'Email address', formMessage: 'Your message...',
    formSend: 'Send message', formSuccess: 'Message sent! I\'ll reply soon.',
    footerTag: 'Websites that work',
  },
  pl: {
    navServices: 'Usługi', navWork: 'Portfolio', navPricing: 'Cennik', navContact: 'Kontakt',
    heroTitle1: 'Zwiększ sprzedaż swojej firmy', heroTitle2: 'dzięki stronie, która naprawdę sprzedaje',
    heroSub: 'Nowoczesne strony internetowe dla firm — gotowe nawet w 2–3 dni',
    heroSubPrice: '',
    trustLine: 'Pomogłem wielu klientom zaistnieć w internecie',
    ctaOrder: 'Zamów stronę', ctaConsult: 'Bezpłatna konsultacja',
    badge1: '10+ projektów', badge2: 'Gotowe w 3 dni', badge3: 'Design + SEO',
    svcLabel: 'USŁUGI', svcTitle: 'Co oferuję',
    svc1: 'Strony Landing Page', svc1d: 'Idealne do reklam i szybkiej sprzedaży',
    svc2: 'Strony firmowe', svc2d: 'Profesjonalne witryny dla Twojej firmy',
    svc3: 'Sklepy internetowe', svc3d: 'Sprzedawaj produkty z łatwością',
    advLabel: 'ZALETY', advTitle: 'Dlaczego SR Web Studio',
    adv1: 'Szybka realizacja', adv1d: 'Gotowe w 2–3 dni',
    adv2: 'Przystępne ceny', adv2d: 'Już od 400 PLN',
    adv3: 'Nowoczesny design', adv3d: 'Czysty i profesjonalny',
    adv4: 'Optymalizacja mobilna', adv4d: 'Świetnie wygląda wszędzie',
    adv5: 'Indywidualne podejście', adv5d: 'Bezpośredni kontakt',
    portLabel: 'PORTFOLIO', portTitle: 'Moje realizacje',
    port1: 'Barbershop Premium Warszawa', port1d: 'Strona dla barbera zwiększająca liczbę rezerwacji online', port1t: 'Landing Page',
    port1f1: 'Rezerwacja online', port1f2: 'Animacje 3D', port1f3: 'Mobile-first', port1f4: 'SEO',
    port1r: '+ więcej klientów',
    port2: 'Stylowa Kawiarnia Warszawa', port2d: 'Strona dla kawiarni, która przyciąga klientów i buduje klimat', port2t: 'Strona firmowa',
    port2f1: 'Menu online', port2f2: 'Galeria zdjęć', port2f3: 'Formularz kontaktowy', port2f4: 'Google Maps',
    port2r: '+ lepszy wizerunek',
    port3: 'Sklep Odzieżowy Premium', port3d: 'Sklep internetowy zaprojektowany do zwiększania sprzedaży', port3t: 'Sklep online',
    port3f1: 'Katalog produktów', port3f2: 'Koszyk', port3f3: 'Bezpieczne płatności', port3f4: 'Śledzenie zamówień',
    port3r: '+ sprzedaż online',
    portBtn: 'Zobacz stronę',
    priceLabel: 'CENNIK', priceTitle: 'Prosty cennik', priceGet: 'Rozpocznij',
    pricePop: 'Najpopularniejszy',
    p1: 'Basic', p1f1: 'Strona 1-stronicowa', p1f2: 'Prosty nowoczesny design', p1f3: 'Optymalizacja mobilna',
    p2: 'Standard', p2f1: 'Do 5 podstron', p2f2: 'Indywidualny design', p2f3: 'Optymalizacja mobilna', p2f4: 'Podstawowe SEO', p2f5: 'Integracja Google Maps',
    p3: 'Premium', p3f1: 'Pełna strona', p3f2: 'Zaawansowany design', p3f3: 'Optymalizacja SEO', p3f4: 'Wielojęzyczność (2 języki)', p3f5: 'Priorytetowe wsparcie',
    testLabel: 'OPINIE', testTitle: 'Co mówią klienci',
    t1: 'Świetna współpraca, strona gotowa w 2 dni i wygląda mega profesjonalnie!',
    t2: 'Dzięki tej stronie mam więcej klientów z internetu.',
    t3: 'Szybko, konkretnie i w dobrej cenie. Polecam!',
    ctaFinalTitle: 'Gotowy na swoją stronę?', ctaFinalSub: 'Zbudujmy coś, co przyciągnie klientów',
    ctaOrderNow: 'Zamów teraz',
    contactLabel: 'KONTAKT', contactTitle: 'Skontaktuj się',
    contactHeadline: 'Skontaktuj się ze mną — odpowiadam w ciągu 1–2 godzin',
    contactSub: 'Wybierz wygodny sposób kontaktu',
    contactTelegram: 'Telegram', contactTelegramSub: '@srwebstudio',
    contactWhatsApp: 'WhatsApp', contactWhatsAppSub: '+48 452 688 251',
    contactFacebook: 'Facebook', contactFacebookSub: 'Napisz wiadomość',
    contactEmail: 'Email', contactEmailSub: 'webstudiosr4@gmail.com',
    contactResponse: 'Zazwyczaj odpowiadam w ciągu 1–2 godzin',
    formTitle: 'Lub wyślij wiadomość',
    formName: 'Twoje imię', formEmail: 'Adres email', formMessage: 'Twoja wiadomość...',
    formSend: 'Wyślij wiadomość', formSuccess: 'Wiadomość wysłana! Odpowiem wkrótce.',
    footerTag: 'Strony, które działają',
  },
};

// ── API ──
const getApiUrl = () => {
  const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
  if (backendUrl) return backendUrl;
  if (Platform.OS === 'web') return '';
  return 'http://localhost:8001';
};
const API_BASE = getApiUrl();

// ═══════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════
export default function SRWebStudio() {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);

  // Language — default Polish, persist choice
  const [lang, setLang] = useState<'en' | 'pl'>('pl');
  const t = TRANSLATIONS[lang];
  const langReady = useRef(false);

  useEffect(() => {
    const loadLang = async () => {
      try {
        if (isWeb && typeof window !== 'undefined' && window.localStorage) {
          const saved = window.localStorage.getItem('sr_lang');
          if (saved === 'en' || saved === 'pl') setLang(saved);
        } else {
          const saved = await AsyncStorage.getItem('sr_lang');
          if (saved === 'en' || saved === 'pl') setLang(saved);
        }
      } catch {}
      langReady.current = true;
    };
    loadLang();
  }, []);

  const switchLang = useCallback((newLang: 'en' | 'pl') => {
    setLang(newLang);
    try {
      if (isWeb && typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('sr_lang', newLang);
      } else {
        AsyncStorage.setItem('sr_lang', newLang);
      }
    } catch {}
  }, []);

  // Section layout refs
  const servicesY = useRef(0);
  const advantagesY = useRef(0);
  const portfolioY = useRef(0);
  const pricingY = useRef(0);
  const testimonialsY = useRef(0);
  const finalCtaY = useRef(0);
  const contactY = useRef(0);

  // ── Hero animations ──
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // ── Global floating orbs (shared across sections) ──
  const orb1 = useRef(new Animated.Value(0)).current;
  const orb2 = useRef(new Animated.Value(0)).current;
  const orb3 = useRef(new Animated.Value(0)).current;
  const orb4 = useRef(new Animated.Value(0)).current;
  const orb5 = useRef(new Animated.Value(0)).current;

  // ── Scroll-based section fade-in animations ──
  const svcFade = useRef(new Animated.Value(0)).current;
  const advFade = useRef(new Animated.Value(0)).current;
  const portFade = useRef(new Animated.Value(0)).current;
  const priceFade = useRef(new Animated.Value(0)).current;
  const testFade = useRef(new Animated.Value(0)).current;
  const ctaFade = useRef(new Animated.Value(0)).current;
  const contFade = useRef(new Animated.Value(0)).current;
  const footFade = useRef(new Animated.Value(0)).current;
  const sectionAnimated = useRef<Set<string>>(new Set());

  // Testimonials data only — no animation needed

  // Contact form removed — direct contact only

  // ── Contact Form State ──
  const [fName, setFName] = useState('');
  const [fEmail, setFEmail] = useState('');
  const [fService, setFService] = useState('');
  const [fMessage, setFMessage] = useState('');
  const [fConsent, setFConsent] = useState(false);
  const [fErrors, setFErrors] = useState<Record<string, string>>({});
  const [fSending, setFSending] = useState(false);
  const [fSent, setFSent] = useState(false);
  const [fError, setFError] = useState('');

  const validateForm = useCallback(() => {
    const errors: Record<string, string> = {};
    if (!fName.trim()) errors.name = lang === 'pl' ? 'Imię jest wymagane' : 'Name is required';
    if (!fEmail.trim()) errors.email = lang === 'pl' ? 'Email jest wymagany' : 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(fEmail)) errors.email = lang === 'pl' ? 'Podaj poprawny adres email' : 'Enter a valid email';
    if (!fService.trim()) errors.service = lang === 'pl' ? 'Wybierz usługę' : 'Select a service';
    if (!fMessage.trim()) errors.message = lang === 'pl' ? 'Opis projektu jest wymagany' : 'Project description is required';
    if (!fConsent) errors.consent = lang === 'pl' ? 'Zgoda jest wymagana' : 'Consent is required';
    setFErrors(errors);
    return Object.keys(errors).length === 0;
  }, [fName, fEmail, fService, fMessage, fConsent, lang]);

  const submitForm = useCallback(async () => {
    if (!validateForm()) return;
    setFSending(true);
    setFError('');

    const w3Key = process.env.EXPO_PUBLIC_WEB3FORMS_KEY || '';
    let emailSent = false;

    // Try Web3Forms (works from HTTPS origins / real browsers)
    if (w3Key && w3Key !== 'YOUR_ACCESS_KEY_HERE') {
      try {
        const formData = new FormData();
        formData.append('access_key', w3Key);
        formData.append('subject', `Nowe zapytanie od ${fName} - SR Web Studio`);
        formData.append('from_name', fName);
        formData.append('name', fName);
        formData.append('email', fEmail);
        formData.append('service', fService);
        formData.append('message', fMessage);
        formData.append('consent', fConsent ? 'Tak' : 'Nie');

        const w3Res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        });
        const w3Data = await w3Res.json();
        if (w3Data.success) {
          emailSent = true;
          console.log('Email sent via Web3Forms');
        } else {
          console.log('Web3Forms error:', w3Data);
        }
      } catch (e) {
        console.log('Web3Forms fetch failed (CORS on localhost is normal):', e);
      }
    }

    // Save to backend DB (try multiple endpoints for dev/prod compatibility)
    try {
      const endpoints = [
        `${API_BASE}/api/contact`,
        '/api/contact',
        'http://localhost:8001/api/contact',
      ];
      let saved = false;
      for (const url of endpoints) {
        if (saved) break;
        try {
          const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: fName, email: fEmail, service: fService, message: fMessage, consent: fConsent }),
          });
          if (res.ok) {
            const data = await res.json().catch(() => ({}));
            if (data.email_sent) emailSent = true;
            saved = true;
            console.log('Form saved via:', url, 'email_sent:', emailSent);
          }
        } catch {}
      }
      if (saved) {
        setFSent(true);
        setFName(''); setFEmail(''); setFService(''); setFMessage(''); setFConsent(false); setFErrors({});
        setFSending(false);
        return;
      }
    } catch (e) {
      console.log('All backend saves failed:', e);
    }

    // If we got here, backend also failed
    if (emailSent) {
      setFSent(true);
      setFName(''); setFEmail(''); setFService(''); setFMessage(''); setFConsent(false); setFErrors({});
    } else {
      setFError(lang === 'pl' ? 'Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz na Telegram.' : 'Failed to send. Try again or contact via Telegram.');
    }
    setFSending(false);
  }, [fName, fEmail, fService, fMessage, fConsent, lang, validateForm]);

  // ── Init animations ──
  useEffect(() => {
    // Hero entrance
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();

    // CTA pulse
    Animated.loop(Animated.sequence([
      Animated.timing(pulseAnim, { toValue: 1.04, duration: 1800, useNativeDriver: true }),
      Animated.timing(pulseAnim, { toValue: 1, duration: 1800, useNativeDriver: true }),
    ])).start();

    // Floating orbs — staggered durations for organic movement
    const floatOrb = (anim: Animated.Value, dur: number) =>
      Animated.loop(Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: dur, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: dur, useNativeDriver: true }),
      ])).start();
    floatOrb(orb1, 6000);
    floatOrb(orb2, 8000);
    floatOrb(orb3, 7000);
    floatOrb(orb4, 9000);
    floatOrb(orb5, 5500);
  }, []);

  // Orb interpolations — reused across sections
  const orb1Y = orb1.interpolate({ inputRange: [0, 1], outputRange: [0, -20] });
  const orb1X = orb1.interpolate({ inputRange: [0, 1], outputRange: [0, 15] });
  const orb2Y = orb2.interpolate({ inputRange: [0, 1], outputRange: [0, 18] });
  const orb2X = orb2.interpolate({ inputRange: [0, 1], outputRange: [0, -12] });
  const orb3Y = orb3.interpolate({ inputRange: [0, 1], outputRange: [0, -14] });
  const orb4Y = orb4.interpolate({ inputRange: [0, 1], outputRange: [0, 16] });
  const orb4X = orb4.interpolate({ inputRange: [0, 1], outputRange: [0, -18] });
  const orb5Y = orb5.interpolate({ inputRange: [0, 1], outputRange: [0, -12] });
  const orb5X = orb5.interpolate({ inputRange: [0, 1], outputRange: [0, 10] });

  // ── Inject web-only CSS for NEON hover effects + cursor glow + keyframes ──
  useEffect(() => {
    if (!isWeb || typeof document === 'undefined') return;
    const id = 'sr-neon-css';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      /* ── Keyframe Animations ── */
      @keyframes neonPulse {
        0%, 100% { box-shadow: 0 0 10px rgba(99,102,241,0.3), 0 0 30px rgba(139,92,246,0.15), 0 0 60px rgba(99,102,241,0.08); }
        50% { box-shadow: 0 0 15px rgba(99,102,241,0.5), 0 0 45px rgba(139,92,246,0.25), 0 0 80px rgba(99,102,241,0.12); }
      }
      @keyframes btnSweep {
        0% { left: -100%; }
        100% { left: 200%; }
      }
      @keyframes glowBreath {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 0.8; }
      }
      @keyframes borderGlow {
        0%, 100% { border-color: rgba(99,102,241,0.2); }
        50% { border-color: rgba(139,92,246,0.45); }
      }

      /* ── Cursor Glow Follower ── */
      #sr-cursor-glow {
        position: fixed; pointer-events: none; z-index: 9999;
        width: 300px; height: 300px; border-radius: 50%;
        background: radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.04) 40%, transparent 70%);
        transform: translate(-50%, -50%);
        transition: left 0.15s ease-out, top 0.15s ease-out;
        mix-blend-mode: screen;
      }

      /* ── Service Cards ── */
      [data-testid="card3d"] {
        transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease, border-color 0.4s ease !important;
        animation: borderGlow 4s ease-in-out infinite !important;
      }
      [data-testid="card3d"]:hover {
        transform: translateY(-8px) scale(1.03) perspective(600px) rotateX(2deg) !important;
        box-shadow: 0 15px 50px rgba(99,102,241,0.35), 0 0 30px rgba(139,92,246,0.2), 0 0 60px rgba(99,102,241,0.1) !important;
        border-color: rgba(139,92,246,0.5) !important;
      }

      /* ── Portfolio Cards ── */
      [data-testid="portCard"] {
        transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease, border-color 0.4s ease !important;
      }
      [data-testid="portCard"]:hover {
        transform: translateY(-12px) scale(1.02) perspective(800px) rotateX(1.5deg) !important;
        box-shadow: 0 25px 60px rgba(99,102,241,0.4), 0 0 40px rgba(139,92,246,0.2), 0 0 80px rgba(99,102,241,0.1) !important;
        border-color: rgba(139,92,246,0.5) !important;
      }

      /* ── Pricing Cards ── */
      [data-testid="priceCard"] {
        transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease, border-color 0.4s ease !important;
        animation: borderGlow 5s ease-in-out infinite !important;
      }
      [data-testid="priceCard"]:hover {
        transform: translateY(-10px) scale(1.025) perspective(600px) rotateX(2deg) !important;
        box-shadow: 0 20px 55px rgba(99,102,241,0.35), 0 0 35px rgba(139,92,246,0.2), 0 0 70px rgba(99,102,241,0.08) !important;
        border-color: rgba(139,92,246,0.5) !important;
      }

      /* ── Advantage Rows ── */
      [data-testid="advRow"] {
        transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.35s ease !important;
      }
      [data-testid="advRow"]:hover {
        transform: translateX(6px) scale(1.015) !important;
        box-shadow: 0 10px 30px rgba(99,102,241,0.25), 0 0 15px rgba(139,92,246,0.12) !important;
        border-color: rgba(139,92,246,0.4) !important;
      }

      /* ── Contact Cards ── */
      [data-testid="contactCard"] {
        transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.35s ease !important;
      }
      [data-testid="contactCard"]:hover {
        transform: translateY(-8px) scale(1.04) perspective(500px) rotateY(2deg) !important;
        box-shadow: 0 16px 45px rgba(99,102,241,0.3), 0 0 25px rgba(139,92,246,0.15) !important;
        border-color: rgba(139,92,246,0.45) !important;
      }

      /* ── CTA Buttons — Neon Glow ── */
      [data-testid="ctaBtn"] {
        transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s ease !important;
        position: relative; overflow: hidden;
        animation: neonPulse 3s ease-in-out infinite !important;
      }
      [data-testid="ctaBtn"]:hover {
        transform: translateY(-4px) scale(1.06) !important;
        box-shadow: 0 10px 40px rgba(99,102,241,0.6), 0 0 20px rgba(139,92,246,0.4), 0 0 60px rgba(99,102,241,0.15) !important;
      }
      [data-testid="ctaBtn"]:active {
        transform: translateY(2px) scale(0.96) !important;
        box-shadow: 0 2px 12px rgba(99,102,241,0.3) !important;
      }
      [data-testid="ctaBtn"]::after {
        content: ''; position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
        animation: btnSweep 3.5s ease-in-out infinite;
      }

      /* ── Secondary Buttons ── */
      [data-testid="ctaBtnSec"] {
        transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, background-color 0.3s ease !important;
      }
      [data-testid="ctaBtnSec"]:hover {
        transform: translateY(-3px) !important;
        box-shadow: 0 8px 25px rgba(139,92,246,0.3), 0 0 15px rgba(99,102,241,0.1) !important;
        background-color: rgba(139,92,246,0.1) !important;
        border-color: rgba(139,92,246,0.5) !important;
      }

      /* ── Pricing Buttons ── */
      [data-testid="pricingBtn"] {
        transition: transform 0.25s ease, box-shadow 0.25s ease !important;
        position: relative; overflow: hidden;
      }
      [data-testid="pricingBtn"]:hover {
        transform: translateY(-3px) scale(1.04) !important;
        box-shadow: 0 8px 25px rgba(99,102,241,0.4), 0 0 15px rgba(139,92,246,0.2) !important;
      }
      [data-testid="pricingBtn"]:active {
        transform: translateY(1px) scale(0.97) !important;
      }
      [data-testid="pricingBtn"]::after {
        content: ''; position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
        animation: btnSweep 4s ease-in-out infinite;
      }

      /* ── Footer Social ── */
      [data-testid="footSocial"] {
        transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease !important;
      }
      [data-testid="footSocial"]:hover {
        transform: translateY(-4px) scale(1.15) !important;
        box-shadow: 0 8px 24px rgba(99,102,241,0.4), 0 0 12px rgba(139,92,246,0.2) !important;
        border-color: rgba(139,92,246,0.4) !important;
      }

      /* ── FABs ── */
      [data-testid="fabBtn"] {
        transition: transform 0.3s ease, box-shadow 0.3s ease !important;
      }
      [data-testid="fabBtn"]:hover {
        transform: scale(1.18) !important;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(99,102,241,0.3) !important;
      }

      /* ── Nav Links ── */
      [data-testid="navLink"] {
        transition: color 0.25s ease, text-shadow 0.25s ease !important;
      }
      [data-testid="navLink"]:hover {
        color: #a78bfa !important;
        text-shadow: 0 0 10px rgba(167,139,250,0.5) !important;
      }

      /* ── Neon Dividers ── */
      [data-testid="neonDivider"] {
        animation: glowBreath 3s ease-in-out infinite !important;
      }

      /* ── Testimonials responsive grid ── */
      [data-testid="tGrid"] {
        display: flex !important;
        flex-direction: column !important;
        gap: 16px !important;
      }
      @media (min-width: 768px) {
        [data-testid="tGrid"] {
          flex-direction: row !important;
        }
        [data-testid="tGridCard"] {
          flex: 1 !important;
        }
      }


      /* ── Trust Badges — multi-color hover ── */
      [data-testid="trustBadge"] {
        transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.35s ease !important;
        position: relative; overflow: hidden;
      }
      [data-testid="trustBadge"]:hover {
        transform: translateY(-5px) scale(1.06) !important;
        box-shadow: 0 10px 30px var(--badge-glow, rgba(99,102,241,0.3)), 0 0 15px var(--badge-glow, rgba(99,102,241,0.15)) !important;
        border-color: var(--badge-glow, rgba(99,102,241,0.4)) !important;
      }
      [data-testid="trustBadge"]::after {
        content: ''; position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        animation: btnSweep 4s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);

    // ── Cursor Glow Element ──
    const glow = document.createElement('div');
    glow.id = 'sr-cursor-glow';
    document.body.appendChild(glow);
    const onMove = (e: MouseEvent) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    };
    document.addEventListener('mousemove', onMove);
    return () => {
      document.removeEventListener('mousemove', onMove);
      glow.remove();
    };
  }, []);

  // ── Scroll handler for section fade-in ──
  const handleMainScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    const vh = e.nativeEvent.layoutMeasurement.height;
    const threshold = vh * 0.78;
    const trigger = (name: string, layoutY: number, anim: Animated.Value) => {
      if (!sectionAnimated.current.has(name) && y + threshold > layoutY) {
        sectionAnimated.current.add(name);
        Animated.spring(anim, { toValue: 1, tension: 50, friction: 9, useNativeDriver: true }).start();
      }
    };
    trigger('svc', servicesY.current, svcFade);
    trigger('adv', advantagesY.current, advFade);
    trigger('port', portfolioY.current, portFade);
    trigger('price', pricingY.current, priceFade);
    trigger('test', testimonialsY.current, testFade);
    trigger('cta', finalCtaY.current, ctaFade);
    trigger('cont', contactY.current, contFade);
  }, []);

  const scrollTo = (ref: React.MutableRefObject<number>) => {
    scrollViewRef.current?.scrollTo({ y: ref.current - 60, animated: true });
  };

  const openTelegram = () => Linking.openURL(CONTACT.telegramUrl);
  const openEmail = () => Linking.openURL(`mailto:${CONTACT.email}`);
  const openWhatsApp = () => Linking.openURL(CONTACT.whatsappUrl);
  const openFacebook = () => Linking.openURL(CONTACT.facebookUrl);

  const testimonials = [
    { name: 'Alex M.', role: 'Fitness Coach', text: t.t1, rating: 5 },
    { name: 'Sarah K.', role: 'Café Owner', text: t.t2, rating: 5 },
    { name: 'Mike T.', role: 'E-commerce', text: t.t3, rating: 5 },
  ];

  // Helper: animated section wrapper values
  const secStyle = (anim: Animated.Value) => ({
    opacity: anim,
    transform: [
      { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) },
    ],
  });

  // ── RENDER ──
  return (
    <View style={[S.container, { paddingTop: insets.top }]}>
      <StatusBar style="light" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={S.scrollContent}
          onScroll={handleMainScroll}
          scrollEventThrottle={16}
        >

          {/* ════════ HERO ════════ */}
          <Animated.View style={[S.hero, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <LinearGradient colors={['rgba(99,102,241,0.14)', 'rgba(0,0,0,0)', 'rgba(139,92,246,0.1)']} style={StyleSheet.absoluteFill} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} />

            {/* Floating orbs — 3D depth */}
            <Animated.View style={[S.orb, S.orb1, { transform: [{ translateY: orb1Y }, { translateX: orb1X }] }]} />
            <Animated.View style={[S.orb, S.orb2, { transform: [{ translateY: orb2Y }, { translateX: orb2X }] }]} />
            <Animated.View style={[S.orb, S.orb3, { transform: [{ translateY: orb3Y }] }]} />

            {/* Logo + Language Switcher */}
            <View style={S.headerRow}>
              <View style={S.logoRow}>
                <View style={S.logoGlow}>
                  <LinearGradient colors={['#6366f1', '#a855f7']} style={S.logoBox} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <Text style={S.logoLetters}>SR</Text>
                  </LinearGradient>
                </View>
                <Text style={S.logoLabel}>Web Studio</Text>
              </View>
              <View style={S.langSwitch}>
                <TouchableOpacity onPress={() => switchLang('en')} style={[S.langBtn, lang === 'en' && S.langBtnActive]}>
                  <Text style={[S.langText, lang === 'en' && S.langTextActive]}>EN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => switchLang('pl')} style={[S.langBtn, lang === 'pl' && S.langBtnActive]}>
                  <Text style={[S.langText, lang === 'pl' && S.langTextActive]}>PL</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Nav */}
            <View style={S.navRow}>
              <TouchableOpacity testID="navLink" onPress={() => scrollTo(servicesY)}><Text style={S.navLink}>{t.navServices}</Text></TouchableOpacity>
              <TouchableOpacity testID="navLink" onPress={() => scrollTo(portfolioY)}><Text style={S.navLink}>{t.navWork}</Text></TouchableOpacity>
              <TouchableOpacity testID="navLink" onPress={() => scrollTo(pricingY)}><Text style={S.navLink}>{t.navPricing}</Text></TouchableOpacity>
              <TouchableOpacity testID="navLink" onPress={() => scrollTo(contactY)}><Text style={S.navLink}>{t.navContact}</Text></TouchableOpacity>
            </View>

            <Text style={S.heroTitle}>{t.heroTitle1}{'\n'}<Text style={S.heroAccent}>{t.heroTitle2}</Text></Text>
            <Text style={S.heroSub}>{t.heroSub}</Text>

            <View style={S.trustBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#6366f1" />
              <Text style={S.trustText}>{t.trustLine}</Text>
            </View>

            {/* Trust Badges — Multi-color neon */}
            <View style={S.trustBadgesRow}>
              {[
                { icon: 'briefcase-outline' as const, text: t.badge1, colors: ['rgba(34,211,238,0.18)', 'rgba(59,130,246,0.1)'] as [string, string], iconColor: '#22d3ee', glowColor: '#22d3ee' },
                { icon: 'flash-outline' as const, text: t.badge2, colors: ['rgba(168,85,247,0.18)', 'rgba(236,72,153,0.1)'] as [string, string], iconColor: '#c084fc', glowColor: '#a855f7' },
                { icon: 'color-palette-outline' as const, text: t.badge3, colors: ['rgba(251,146,60,0.18)', 'rgba(250,204,21,0.1)'] as [string, string], iconColor: '#fb923c', glowColor: '#f59e0b' },
              ].map((b, i) => (
                <View key={i} testID="trustBadge" style={[S.trustBadgeItem, { borderColor: `${b.glowColor}30`, shadowColor: b.glowColor }]}>
                  <LinearGradient colors={b.colors} style={S.trustBadgeGrad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <View style={[S.trustBadgeIconGlow, { backgroundColor: `${b.glowColor}18` }]}>
                      <Ionicons name={b.icon} size={15} color={b.iconColor} />
                    </View>
                    <Text style={[S.trustBadgeText, { color: b.iconColor }]}>{b.text}</Text>
                  </LinearGradient>
                </View>
              ))}
            </View>

            <View style={S.ctaRow}>
              <TouchableOpacity testID="ctaBtn" onPress={openTelegram} activeOpacity={0.85}>
                <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                  <LinearGradient colors={['#6366f1', '#8b5cf6']} style={S.ctaPrimary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                    <Ionicons name="paper-plane" size={18} color="#fff" />
                    <Text style={S.ctaPrimaryText}>{t.ctaOrder}</Text>
                  </LinearGradient>
                </Animated.View>
              </TouchableOpacity>
              <TouchableOpacity testID="ctaBtnSec" onPress={() => scrollTo(contactY)} activeOpacity={0.85} style={S.ctaSecondary}>
                <Text style={S.ctaSecondaryText}>{t.ctaConsult}</Text>
                <Ionicons name="arrow-forward" size={16} color="#8b5cf6" />
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* ════════ NEON DIVIDER ════════ */}
          <LinearGradient testID="neonDivider" colors={['rgba(99,102,241,0.3)', 'rgba(236,72,153,0.2)', 'rgba(139,92,246,0.3)']} style={S.sectionDivider} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />

          {/* ════════ SERVICES ════════ */}
          <Animated.View style={[S.section, S.sectionRelative, secStyle(svcFade)]} onLayout={e => { servicesY.current = e.nativeEvent.layout.y; }}>
            {/* Section orbs */}
            <Animated.View style={[S.orbSec, { top: -30, right: -50, width: 140, height: 140, backgroundColor: 'rgba(99,102,241,0.06)', transform: [{ translateY: orb4Y }, { translateX: orb4X }] }]} />
            <Animated.View style={[S.orbSec, { bottom: -20, left: -30, width: 100, height: 100, backgroundColor: 'rgba(168,85,247,0.05)', transform: [{ translateY: orb5Y }, { translateX: orb5X }] }]} />

            <Text style={S.sectionLabel}>{t.svcLabel}</Text>
            <Text style={S.sectionTitle}>{t.svcTitle}</Text>
            <View style={S.servicesGrid}>
              {[
                { icon: 'rocket-outline' as const, title: t.svc1, desc: t.svc1d, color: '#6366f1' },
                { icon: 'briefcase-outline' as const, title: t.svc2, desc: t.svc2d, color: '#8b5cf6' },
                { icon: 'cart-outline' as const, title: t.svc3, desc: t.svc3d, color: '#a855f7' },
              ].map((s, i) => (
                <View key={i} testID="card3d" style={S.card3d}>
                  <LinearGradient colors={[`${s.color}18`, `${s.color}06`]} style={S.serviceCardInner} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <View style={[S.serviceIcon, { backgroundColor: `${s.color}20` }]}>
                      <Ionicons name={s.icon} size={26} color={s.color} />
                    </View>
                    <Text style={S.serviceTitle}>{s.title}</Text>
                    <Text style={S.serviceDesc}>{s.desc}</Text>
                  </LinearGradient>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* ════════ WHY CHOOSE ME ════════ */}
          <Animated.View style={[S.section, S.sectionRelative, secStyle(advFade)]} onLayout={e => { advantagesY.current = e.nativeEvent.layout.y; }}>
            <Animated.View style={[S.orbSec, { top: 20, left: -40, width: 110, height: 110, backgroundColor: 'rgba(236,72,153,0.05)', transform: [{ translateY: orb2Y }, { translateX: orb2X }] }]} />

            <Text style={S.sectionLabel}>{t.advLabel}</Text>
            <Text style={S.sectionTitle}>{t.advTitle}</Text>
            <View style={S.advantagesGrid}>
              {[
                { icon: 'flash-outline' as const, title: t.adv1, desc: t.adv1d },
                { icon: 'wallet-outline' as const, title: t.adv2, desc: t.adv2d },
                { icon: 'color-palette-outline' as const, title: t.adv3, desc: t.adv3d },
                { icon: 'phone-portrait-outline' as const, title: t.adv4, desc: t.adv4d },
                { icon: 'person-outline' as const, title: t.adv5, desc: t.adv5d },
              ].map((a, i) => (
                <View key={i} testID="advRow" style={S.advantageRow}>
                  <View style={S.advantageIconWrap}><Ionicons name={a.icon} size={22} color="#8b5cf6" /></View>
                  <View style={S.advantageTextWrap}>
                    <Text style={S.advantageTitle}>{a.title}</Text>
                    <Text style={S.advantageDesc}>{a.desc}</Text>
                  </View>
                </View>
              ))}
            </View>
          </Animated.View>

          <LinearGradient testID="neonDivider" colors={['rgba(139,92,246,0.3)', 'rgba(99,102,241,0.15)', 'rgba(236,72,153,0.25)']} style={S.sectionDivider} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />

          {/* ════════ PORTFOLIO ════════ */}
          <Animated.View style={[S.section, S.sectionRelative, secStyle(portFade)]} onLayout={e => { portfolioY.current = e.nativeEvent.layout.y; }}>
            <Animated.View style={[S.orbSec, { top: -20, right: -40, width: 160, height: 160, backgroundColor: 'rgba(99,102,241,0.06)', transform: [{ translateY: orb1Y }, { translateX: orb1X }] }]} />
            <Animated.View style={[S.orbSec, { bottom: 40, left: -50, width: 120, height: 120, backgroundColor: 'rgba(236,72,153,0.04)', transform: [{ translateY: orb4Y }] }]} />

            <Text style={S.sectionLabel}>{t.portLabel}</Text>
            <Text style={S.sectionTitle}>{t.portTitle}</Text>
            <View style={S.portfolioGrid}>
              {[
                {
                  title: t.port1, desc: t.port1d, tag: t.port1t, result: t.port1r,
                  features: [t.port1f1, t.port1f2, t.port1f3, t.port1f4],
                  image: 'https://images.unsplash.com/photo-1707836885254-79b6e3d7b18d?w=600&q=80',
                  url: 'https://barber-style-27.preview.emergentagent.com/', accent: '#d4a254',
                },
                {
                  title: t.port2, desc: t.port2d, tag: t.port2t, result: t.port2r,
                  features: [t.port2f1, t.port2f2, t.port2f3, t.port2f4],
                  image: 'https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=600&q=80',
                  url: 'https://premium-cafe-43.preview.emergentagent.com/', accent: '#ec4899',
                },
                {
                  title: t.port3, desc: t.port3d, tag: t.port3t, result: t.port3r,
                  features: [t.port3f1, t.port3f2, t.port3f3, t.port3f4],
                  image: 'https://images.unsplash.com/photo-1649442279006-8bccb4cc63e1?w=600&q=80',
                  url: 'https://demo-ecommerce-1.preview.emergentagent.com/', accent: '#8b5cf6',
                },
              ].map((p, i) => (
                <TouchableOpacity
                  key={i} testID="portCard"
                  activeOpacity={0.88}
                  onPress={() => Linking.openURL(p.url)}
                  style={S.portfolioCard}
                >
                  <View style={S.portfolioImageWrap}>
                    <Image source={{ uri: p.image }} style={S.portfolioImg} resizeMode="cover" />
                    <LinearGradient colors={['transparent', 'rgba(10,10,15,0.85)']} style={S.portfolioImgOverlay} start={{ x: 0, y: 0.3 }} end={{ x: 0, y: 1 }} />
                    <View style={[S.portfolioTagFloat, { backgroundColor: `${p.accent}25`, borderColor: `${p.accent}40` }]}>
                      <Text style={[S.portfolioTagText, { color: p.accent }]}>{p.tag}</Text>
                    </View>
                    <View style={S.liveBadge}>
                      <View style={S.liveDot} />
                      <Text style={S.liveBadgeText}>LIVE</Text>
                    </View>
                  </View>
                  <View style={S.portfolioContent}>
                    <Text style={S.portfolioCardTitle}>{p.title}</Text>
                    <Text style={S.portfolioCardDesc}>{p.desc}</Text>
                    <View style={S.portfolioFeatures}>
                      {p.features.map((f, fi) => (
                        <View key={fi} style={[S.portfolioFeaturePill, { borderColor: `${p.accent}30` }]}>
                          <View style={[S.portfolioFeatureDot, { backgroundColor: p.accent }]} />
                          <Text style={S.portfolioFeatureText}>{f}</Text>
                        </View>
                      ))}
                    </View>
                    {/* Result Badge */}
                    <View style={[S.resultBadge, { borderColor: `${p.accent}40` }]}>
                      <Ionicons name="trending-up" size={14} color="#22c55e" />
                      <Text style={S.resultBadgeText}>{p.result}</Text>
                    </View>
                    <LinearGradient
                      colors={[`${p.accent}20`, `${p.accent}10`]}
                      style={[S.portfolioBtnWrap, { borderColor: `${p.accent}50` }]}
                      start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    >
                      <Ionicons name="globe-outline" size={16} color={p.accent} />
                      <Text style={[S.portfolioBtnText, { color: p.accent }]}>{t.portBtn}</Text>
                      <Ionicons name="arrow-forward" size={14} color={p.accent} />
                    </LinearGradient>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>

          <LinearGradient testID="neonDivider" colors={['rgba(236,72,153,0.2)', 'rgba(139,92,246,0.3)', 'rgba(99,102,241,0.2)']} style={S.sectionDivider} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />

          {/* ════════ PRICING ════════ */}
          <Animated.View style={[S.section, S.sectionRelative, secStyle(priceFade)]} onLayout={e => { pricingY.current = e.nativeEvent.layout.y; }}>
            <Animated.View style={[S.orbSec, { top: 0, left: -30, width: 130, height: 130, backgroundColor: 'rgba(139,92,246,0.06)', transform: [{ translateY: orb3Y }] }]} />
            <Animated.View style={[S.orbSec, { bottom: -10, right: -40, width: 100, height: 100, backgroundColor: 'rgba(99,102,241,0.05)', transform: [{ translateY: orb5Y }, { translateX: orb5X }] }]} />

            <Text style={S.sectionLabel}>{t.priceLabel}</Text>
            <Text style={S.sectionTitle}>{t.priceTitle}</Text>
            <View style={S.pricingGrid}>
              {[
                { name: t.p1, price: 'od 400 PLN', features: [t.p1f1, t.p1f2, t.p1f3], popular: false, color: '#6366f1' },
                { name: t.p2, price: 'od 700 PLN', features: [t.p2f1, t.p2f2, t.p2f3, t.p2f4, t.p2f5], popular: true, color: '#8b5cf6' },
                { name: t.p3, price: 'od 1500 PLN', features: [t.p3f1, t.p3f2, t.p3f3, t.p3f4, t.p3f5], popular: false, color: '#a855f7' },
              ].map((plan, i) => (
                <View key={i} testID="priceCard" style={[S.pricingCard, plan.popular && S.pricingCardPop]}>
                  {plan.popular && (
                    <LinearGradient colors={['#6366f1', '#8b5cf6']} style={S.popularBadge} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                      <Text style={S.popularBadgeText}>{t.pricePop}</Text>
                    </LinearGradient>
                  )}
                  <Text style={S.pricingName}>{plan.name}</Text>
                  <Text style={S.pricingPrice}>{plan.price}</Text>
                  <View style={S.pricingFeatures}>
                    {plan.features.map((f, fi) => (
                      <View key={fi} style={S.pricingFeatureRow}>
                        <Ionicons name="checkmark-circle" size={16} color={plan.color} />
                        <Text style={S.pricingFeatureText}>{f}</Text>
                      </View>
                    ))}
                  </View>
                  <TouchableOpacity testID="pricingBtn" onPress={openTelegram} activeOpacity={0.85}>
                    <LinearGradient
                      colors={plan.popular ? ['#6366f1', '#8b5cf6'] : ['rgba(99,102,241,0.15)', 'rgba(139,92,246,0.15)']}
                      style={S.pricingBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    >
                      <Text style={[S.pricingBtnText, !plan.popular && { color: '#8b5cf6' }]}>{t.priceGet}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* ════════ TESTIMONIALS — SIMPLE STATIC GRID ════════ */}
          <View style={S.section} onLayout={e => { testimonialsY.current = e.nativeEvent.layout.y; }}>
            <Text style={S.sectionLabel}>{t.testLabel}</Text>
            <Text style={S.sectionTitle}>{t.testTitle}</Text>

            <View testID="tGrid" style={S.testimonialsGrid}>
              {testimonials.map((tt, i) => (
                <View key={i} testID="tGridCard" style={S.tCard}>
                  <View style={S.tStars}>
                    {[...Array(tt.rating)].map((_, si) => <Ionicons key={si} name="star" size={14} color="#f59e0b" />)}
                  </View>
                  <Text style={S.tText}>"{tt.text}"</Text>
                  <View style={S.tAuthor}>
                    <LinearGradient colors={['#6366f1', '#a855f7']} style={S.tAvatar}>
                      <Text style={S.tAvatarLetter}>{tt.name.charAt(0)}</Text>
                    </LinearGradient>
                    <View>
                      <Text style={S.tName}>{tt.name}</Text>
                      <Text style={S.tRole}>{tt.role}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <LinearGradient testID="neonDivider" colors={['rgba(99,102,241,0.25)', 'rgba(236,72,153,0.2)', 'rgba(139,92,246,0.25)']} style={S.sectionDivider} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />

          {/* ════════ CONTACT ════════ */}
          <Animated.View style={[S.section, S.sectionRelative, secStyle(contFade)]} onLayout={e => { contactY.current = e.nativeEvent.layout.y; }}>
            <Animated.View style={[S.orbSec, { top: -10, right: -30, width: 100, height: 100, backgroundColor: 'rgba(139,92,246,0.06)', transform: [{ translateY: orb3Y }] }]} />

            <Text style={S.sectionLabel}>{t.contactLabel}</Text>
            <Text style={S.sectionTitle}>{t.contactTitle}</Text>
            <Text style={S.contactHeadline}>{t.contactHeadline}</Text>

            {/* Direct contact buttons */}
            <TouchableOpacity testID="ctaBtn" onPress={openTelegram} activeOpacity={0.85} style={{ marginBottom: 14 }}>
              <LinearGradient colors={['#2AABEE', '#1E96D1']} style={S.telegramPrimary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <Ionicons name="paper-plane" size={22} color="#fff" />
                <View>
                  <Text style={S.telegramPrimaryText}>{t.contactTelegram}</Text>
                  <Text style={S.telegramPrimarySub}>{t.contactTelegramSub}</Text>
                </View>
                <Ionicons name="arrow-forward" size={18} color="rgba(255,255,255,0.7)" style={{ marginLeft: 'auto' }} />
              </LinearGradient>
            </TouchableOpacity>

            <View style={S.contactRow}>
              {[
                { icon: 'logo-whatsapp' as const, label: t.contactWhatsApp, color: '#25D366', gradColors: ['rgba(37,211,102,0.14)', 'rgba(37,211,102,0.04)'] as [string, string], onPress: openWhatsApp },
                { icon: 'logo-facebook' as const, label: t.contactFacebook, color: '#1877F2', gradColors: ['rgba(24,119,242,0.14)', 'rgba(24,119,242,0.04)'] as [string, string], onPress: openFacebook },
                { icon: 'mail' as const, label: t.contactEmail, color: '#8b5cf6', gradColors: ['rgba(139,92,246,0.14)', 'rgba(139,92,246,0.04)'] as [string, string], onPress: openEmail },
              ].map((c, i) => (
                <TouchableOpacity key={i} testID="contactCard" onPress={c.onPress} activeOpacity={0.82} style={S.contactCard}>
                  <LinearGradient colors={c.gradColors} style={S.contactCardInnerSm} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <Ionicons name={c.icon} size={22} color={c.color} />
                    <Text style={[S.contactCardLabelSm, { color: c.color }]}>{c.label}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>

            <View style={S.contactResponseRow}>
              <Ionicons name="time-outline" size={14} color="#6366f1" />
              <Text style={S.contactResponseText}>{t.contactResponse}</Text>
            </View>

            {/* ── Contact Form ── */}
            <View style={S.formCard}>
              <Text style={S.formTitle}>{lang === 'pl' ? 'Wyślij zapytanie' : 'Send an inquiry'}</Text>

              {fSent ? (
                <View style={S.formSuccess}>
                  <Ionicons name="checkmark-circle" size={36} color="#22c55e" />
                  <Text style={S.formSuccessTitle}>{lang === 'pl' ? 'Dziękuję!' : 'Thank you!'}</Text>
                  <Text style={S.formSuccessText}>{lang === 'pl' ? 'Wiadomość została wysłana. Odpowiem w ciągu kilku godzin.' : 'Message sent. I\'ll reply within a few hours.'}</Text>
                  <TouchableOpacity onPress={() => setFSent(false)} style={S.formAgainBtn}>
                    <Text style={S.formAgainText}>{lang === 'pl' ? 'Wyślij kolejne zapytanie' : 'Send another inquiry'}</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  {/* Name */}
                  <Text style={S.formLabel}>{lang === 'pl' ? 'Imię i nazwisko / firma *' : 'Name / company *'}</Text>
                  <TextInput style={[S.formInput, fErrors.name ? S.formInputErr : null]} placeholder={lang === 'pl' ? 'np. Jan Kowalski' : 'e.g. John Smith'} placeholderTextColor="#52525b" value={fName} onChangeText={v => { setFName(v); setFErrors(e => ({...e, name: ''})); }} />
                  {fErrors.name ? <Text style={S.formErrText}>{fErrors.name}</Text> : null}

                  {/* Email */}
                  <Text style={S.formLabel}>{lang === 'pl' ? 'Adres e-mail *' : 'Email address *'}</Text>
                  <TextInput style={[S.formInput, fErrors.email ? S.formInputErr : null]} placeholder="email@example.com" placeholderTextColor="#52525b" value={fEmail} onChangeText={v => { setFEmail(v); setFErrors(e => ({...e, email: ''})); }} keyboardType="email-address" autoCapitalize="none" />
                  {fErrors.email ? <Text style={S.formErrText}>{fErrors.email}</Text> : null}

                  {/* Service */}
                  <Text style={S.formLabel}>{lang === 'pl' ? 'Jakie usługi szukasz? *' : 'What service are you looking for? *'}</Text>
                  <TextInput style={[S.formInput, fErrors.service ? S.formInputErr : null]} placeholder={lang === 'pl' ? 'np. Landing page, sklep internetowy...' : 'e.g. Landing page, online store...'} placeholderTextColor="#52525b" value={fService} onChangeText={v => { setFService(v); setFErrors(e => ({...e, service: ''})); }} />
                  {fErrors.service ? <Text style={S.formErrText}>{fErrors.service}</Text> : null}

                  {/* Message */}
                  <Text style={S.formLabel}>{lang === 'pl' ? 'Opis projektu *' : 'Project description *'}</Text>
                  <TextInput style={[S.formInput, S.formTextArea, fErrors.message ? S.formInputErr : null]} placeholder={lang === 'pl' ? 'Opisz swój projekt, cele i oczekiwania...' : 'Describe your project, goals and expectations...'} placeholderTextColor="#52525b" value={fMessage} onChangeText={v => { setFMessage(v); setFErrors(e => ({...e, message: ''})); }} multiline numberOfLines={5} textAlignVertical="top" />
                  {fErrors.message ? <Text style={S.formErrText}>{fErrors.message}</Text> : null}

                  {/* Consent */}
                  <TouchableOpacity onPress={() => { setFConsent(!fConsent); setFErrors(e => ({...e, consent: ''})); }} style={S.consentRow} activeOpacity={0.8}>
                    <View style={[S.consentBox, fConsent && S.consentBoxActive, fErrors.consent ? S.consentBoxErr : null]}>
                      {fConsent && <Ionicons name="checkmark" size={14} color="#fff" />}
                    </View>
                    <Text style={S.consentText}>{lang === 'pl' ? 'Wyrażam zgodę na przetwarzanie moich danych w celu kontaktu *' : 'I consent to processing my data for contact purposes *'}</Text>
                  </TouchableOpacity>
                  {fErrors.consent ? <Text style={S.formErrText}>{fErrors.consent}</Text> : null}

                  {/* Error */}
                  {fError ? (
                    <View style={S.formErrorBanner}>
                      <Ionicons name="alert-circle" size={16} color="#ef4444" />
                      <Text style={S.formErrorText}>{fError}</Text>
                    </View>
                  ) : null}

                  {/* Submit */}
                  <TouchableOpacity testID="ctaBtn" onPress={submitForm} activeOpacity={0.85} disabled={fSending} style={{ marginTop: 8 }}>
                    <LinearGradient colors={['#6366f1', '#8b5cf6']} style={S.formBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                      {fSending ? <ActivityIndicator color="#fff" size="small" /> : (
                        <>
                          <Ionicons name="send" size={16} color="#fff" />
                          <Text style={S.formBtnText}>{lang === 'pl' ? 'Wyślij Zapytanie' : 'Send Inquiry'}</Text>
                        </>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </Animated.View>

          {/* ════════ FOOTER ════════ */}
          <View style={S.footer}>
            <View style={S.footerTop}>
              <View style={S.logoRow}>
                <LinearGradient colors={['#6366f1', '#a855f7']} style={S.logoBoxSm} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                  <Text style={S.logoLettersSm}>SR</Text>
                </LinearGradient>
                <Text style={S.logoLabelSm}>Web Studio</Text>
              </View>
              <Text style={S.footerTagline}>{t.footerTag}</Text>
            </View>
            <View style={S.footerLinks}>
              <TouchableOpacity testID="footSocial" onPress={openTelegram} style={S.footerSocial}><Ionicons name="paper-plane" size={20} color="#2AABEE" /></TouchableOpacity>
              <TouchableOpacity testID="footSocial" onPress={openWhatsApp} style={S.footerSocial}><Ionicons name="logo-whatsapp" size={20} color="#25D366" /></TouchableOpacity>
              <TouchableOpacity testID="footSocial" onPress={openFacebook} style={S.footerSocial}><Ionicons name="logo-facebook" size={20} color="#1877F2" /></TouchableOpacity>
              <TouchableOpacity testID="footSocial" onPress={openEmail} style={S.footerSocial}><Ionicons name="mail" size={20} color="#8b5cf6" /></TouchableOpacity>
            </View>
            <View style={S.footerDivider} />
            <Text style={S.footerCopy}>© {new Date().getFullYear()} SR Web Studio. All rights reserved.</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ════════ FLOATING SOCIAL BUTTONS ════════ */}
      <View style={S.fab}>
        <TouchableOpacity testID="fabBtn" onPress={openTelegram} activeOpacity={0.85} style={S.fabBtn}>
          <LinearGradient colors={['#2AABEE', '#229ED9']} style={S.fabGrad}><Ionicons name="paper-plane" size={22} color="#fff" /></LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity testID="fabBtn" onPress={openWhatsApp} activeOpacity={0.85} style={S.fabBtn}>
          <LinearGradient colors={['#25D366', '#128C7E']} style={S.fabGrad}><Ionicons name="logo-whatsapp" size={22} color="#fff" /></LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity testID="fabBtn" onPress={openFacebook} activeOpacity={0.85} style={S.fabBtn}>
          <LinearGradient colors={['#1877F2', '#0C5DC7']} style={S.fabGrad}><Ionicons name="logo-facebook" size={22} color="#fff" /></LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ═══════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════
const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f' },
  scrollContent: { paddingBottom: 20 },

  // ── Hero ──
  hero: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 36, position: 'relative', overflow: 'hidden' },

  // Floating orbs — hero (BRIGHTER NEON)
  orb: { position: 'absolute', borderRadius: 999 },
  orb1: { width: 220, height: 220, top: -50, right: -70, backgroundColor: 'rgba(99,102,241,0.12)' },
  orb2: { width: 160, height: 160, bottom: 10, left: -50, backgroundColor: 'rgba(168,85,247,0.1)' },
  orb3: { width: 110, height: 110, top: 90, right: 20, backgroundColor: 'rgba(236,72,153,0.09)' },

  // Floating orbs — sections (reusable, BRIGHTER)
  orbSec: { position: 'absolute', borderRadius: 999, zIndex: -1 },

  // Section with relative positioning for orbs
  sectionRelative: { position: 'relative', overflow: 'hidden' },

  // Gradient dividers between sections — NEON
  sectionDivider: { height: 2, marginHorizontal: 30 },

  // Header
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  logoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  logoGlow: { borderRadius: 16, shadowColor: '#6366f1', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 8 },
  logoBox: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  logoLetters: { color: '#fff', fontSize: 22, fontWeight: '800' },
  logoLabel: { color: '#fff', fontSize: 22, fontWeight: '700' },

  // Language
  langSwitch: { flexDirection: 'row', borderRadius: 8, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(99,102,241,0.25)' },
  langBtn: { paddingHorizontal: 12, paddingVertical: 6 },
  langBtnActive: { backgroundColor: 'rgba(99,102,241,0.25)' },
  langText: { color: '#52525b', fontSize: 13, fontWeight: '700' },
  langTextActive: { color: '#818cf8' },

  navRow: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginBottom: 28, flexWrap: 'wrap' },
  navLink: { color: '#71717a', fontSize: 14, fontWeight: '500' },

  heroTitle: { fontSize: isSmallScreen ? 28 : 36, fontWeight: '800', color: '#f5f5f5', textAlign: 'center', lineHeight: isSmallScreen ? 36 : 46, marginBottom: 12, letterSpacing: -0.5 },
  heroAccent: { color: '#818cf8' },
  heroSub: { fontSize: 15, color: '#a1a1aa', textAlign: 'center', lineHeight: 24, marginBottom: 14, maxWidth: 400, alignSelf: 'center' },

  trustBadge: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 22 },
  trustText: { color: '#71717a', fontSize: 13 },

  ctaRow: { flexDirection: isSmallScreen ? 'column' : 'row', alignItems: 'center', justifyContent: 'center', gap: 12 },
  ctaPrimary: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28, paddingVertical: 16, borderRadius: 12, gap: 8, minWidth: 200,
    shadowColor: '#6366f1', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.45, shadowRadius: 18, elevation: 10,
    ...(isWeb ? { cursor: 'pointer' } : {}),
  },
  ctaPrimaryText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  ctaSecondary: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 20, paddingVertical: 14, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(139,92,246,0.3)', ...(isWeb ? { cursor: 'pointer' } : {}) },
  ctaSecondaryText: { color: '#8b5cf6', fontSize: 15, fontWeight: '600' },

  // ── Sections ──
  section: { paddingHorizontal: 24, paddingVertical: 36 },
  sectionLabel: { color: '#6366f1', fontSize: 12, fontWeight: '700', letterSpacing: 2, textAlign: 'center', marginBottom: 6 },
  sectionTitle: { fontSize: isSmallScreen ? 24 : 30, fontWeight: '800', color: '#f5f5f5', textAlign: 'center', marginBottom: 26, letterSpacing: -0.3 },

  // ── 3D Card — NEON glassmorphism ──
  card3d: {
    borderRadius: 16, overflow: 'hidden',
    shadowColor: '#6366f1', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, shadowRadius: 24, elevation: 8,
    backgroundColor: 'rgba(99,102,241,0.06)',
    borderWidth: 1, borderColor: 'rgba(139,92,246,0.2)',
    ...(isWeb ? { backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' } as any : {}),
  },

  // ── Services ──
  servicesGrid: { gap: 14 },
  serviceCardInner: { padding: 22, borderRadius: 16 },
  serviceIcon: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 14 },
  serviceTitle: { color: '#f5f5f5', fontSize: 18, fontWeight: '700', marginBottom: 6 },
  serviceDesc: { color: '#a1a1aa', fontSize: 14, lineHeight: 20 },

  // ── Advantages ──
  advantagesGrid: { gap: 12 },
  advantageRow: {
    flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, borderRadius: 14,
    backgroundColor: 'rgba(99,102,241,0.07)', borderWidth: 1, borderColor: 'rgba(139,92,246,0.18)',
    shadowColor: '#6366f1', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 14, elevation: 4,
    ...(isWeb ? { backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' } as any : {}),
  },
  advantageIconWrap: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(139,92,246,0.12)', justifyContent: 'center', alignItems: 'center' },
  advantageTextWrap: { flex: 1 },
  advantageTitle: { color: '#f5f5f5', fontSize: 16, fontWeight: '700' },
  advantageDesc: { color: '#71717a', fontSize: 13, marginTop: 2 },

  // ── Portfolio ──
  portfolioGrid: { gap: 24 },
  portfolioCard: {
    borderRadius: 20, overflow: 'hidden',
    backgroundColor: 'rgba(15,15,25,0.92)',
    borderWidth: 1, borderColor: 'rgba(139,92,246,0.18)',
    shadowColor: '#6366f1', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.25, shadowRadius: 32, elevation: 10,
    ...(isWeb ? { backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' } as any : {}),
  },
  portfolioImageWrap: { height: 200, position: 'relative', overflow: 'hidden' },
  portfolioImg: { width: '100%', height: '100%' },
  portfolioImgOverlay: { ...StyleSheet.absoluteFillObject },
  portfolioTagFloat: { position: 'absolute', top: 14, left: 14, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 8, borderWidth: 1 },
  portfolioTagText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5, textTransform: 'uppercase' },
  portfolioContent: { padding: 20 },
  portfolioCardTitle: { color: '#f5f5f5', fontSize: 20, fontWeight: '800', marginBottom: 8, letterSpacing: -0.3 },
  portfolioCardDesc: { color: '#a1a1aa', fontSize: 14, lineHeight: 20, marginBottom: 16 },
  portfolioFeatures: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 18 },
  portfolioFeaturePill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1 },
  portfolioFeatureDot: { width: 6, height: 6, borderRadius: 3 },
  portfolioFeatureText: { color: '#d4d4d8', fontSize: 12, fontWeight: '500' },
  portfolioBtnWrap: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 13, borderRadius: 12, borderWidth: 1, ...(isWeb ? { cursor: 'pointer' } : {}) },
  portfolioBtnText: { fontSize: 14, fontWeight: '700' },
  liveBadge: { position: 'absolute', top: 14, right: 14, flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(0,0,0,0.6)', borderWidth: 1, borderColor: 'rgba(34,197,94,0.5)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#22c55e' },
  liveBadgeText: { color: '#22c55e', fontSize: 10, fontWeight: '800', letterSpacing: 1 },

  // ── Pricing ──
  pricingGrid: { gap: 16 },
  pricingCard: {
    borderRadius: 16, padding: 24, backgroundColor: 'rgba(99,102,241,0.07)', borderWidth: 1, borderColor: 'rgba(139,92,246,0.18)',
    position: 'relative', overflow: 'hidden',
    shadowColor: '#6366f1', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.18, shadowRadius: 20, elevation: 6,
    ...(isWeb ? { backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' } as any : {}),
  },
  pricingCardPop: { borderColor: 'rgba(139,92,246,0.5)', backgroundColor: 'rgba(99,102,241,0.12)', shadowOpacity: 0.35 },
  popularBadge: { position: 'absolute', top: 0, right: 0, paddingHorizontal: 14, paddingVertical: 6, borderBottomLeftRadius: 12 },
  popularBadgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  pricingName: { color: '#a1a1aa', fontSize: 14, fontWeight: '600', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 },
  pricingPrice: { color: '#f5f5f5', fontSize: 30, fontWeight: '800', marginBottom: 18 },
  pricingFeatures: { gap: 10, marginBottom: 20 },
  pricingFeatureRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  pricingFeatureText: { color: '#d4d4d8', fontSize: 14 },
  pricingBtn: { paddingVertical: 14, borderRadius: 10, alignItems: 'center', ...(isWeb ? { cursor: 'pointer' } : {}) },
  pricingBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },

  // ── Testimonials — simple static grid ──
  testimonialsGrid: {
    gap: 16,
  },
  tCard: {
    backgroundColor: 'rgba(99,102,241,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.2)',
    borderRadius: 16,
    padding: 22,
  },
  tStars: { flexDirection: 'row', gap: 2, marginBottom: 12 },
  tText: { color: '#d4d4d8', fontSize: 15, lineHeight: 22, fontStyle: 'italic', marginBottom: 16 },
  tAuthor: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  tAvatar: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  tAvatarLetter: { color: '#fff', fontSize: 15, fontWeight: '700' },
  tName: { color: '#f5f5f5', fontSize: 14, fontWeight: '700' },
  tRole: { color: '#71717a', fontSize: 12 },

  // ── Final CTA ──
  finalCta: { paddingHorizontal: 24, paddingVertical: 28 },
  finalCtaInner: {
    padding: 28, borderRadius: 20, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(139,92,246,0.3)',
    shadowColor: '#6366f1', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 30, elevation: 8,
    ...(isWeb ? { backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' } as any : {}),
  },
  finalCtaTitle: { fontSize: isSmallScreen ? 24 : 30, fontWeight: '800', color: '#f5f5f5', textAlign: 'center', marginBottom: 8 },
  finalCtaSub: { color: '#a1a1aa', fontSize: 15, textAlign: 'center', marginBottom: 22 },
  finalCtaBtns: { alignItems: 'center', gap: 14 },
  socialCtaRow: { flexDirection: 'row', gap: 12 },
  socialCtaBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', ...(isWeb ? { cursor: 'pointer' } : {}),
  },
  socialCtaText: { fontSize: 14, fontWeight: '600' },

  // ── Contact Premium ──
  contactSubtext: { color: '#a1a1aa', fontSize: 15, textAlign: 'center', lineHeight: 22, marginBottom: 28, maxWidth: 360, alignSelf: 'center' },
  contactRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  contactCard: {
    flex: 1, borderRadius: 18, overflow: 'hidden',
    borderWidth: 1, borderColor: 'rgba(139,92,246,0.2)',
    shadowColor: '#6366f1', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 18, elevation: 5,
    ...(isWeb ? { cursor: 'pointer' } : {}),
  },
  contactCardInner: { padding: 20, borderRadius: 18, alignItems: 'center', minHeight: 140, justifyContent: 'center' },
  contactCardIcon: { width: 50, height: 50, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  contactCardLabel: { color: '#f5f5f5', fontSize: 15, fontWeight: '700', marginBottom: 4, textAlign: 'center' },
  contactCardSub: { fontSize: 11, fontWeight: '500', textAlign: 'center', opacity: 0.85 },
  contactCardArrow: { position: 'absolute', top: 12, right: 12, width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.06)', justifyContent: 'center', alignItems: 'center' },
  contactResponseRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 14, paddingVertical: 10, paddingHorizontal: 18, borderRadius: 10, backgroundColor: 'rgba(99,102,241,0.06)', borderWidth: 1, borderColor: 'rgba(99,102,241,0.1)', alignSelf: 'center' },
  contactResponseText: { color: '#71717a', fontSize: 13, fontWeight: '500' },

  // ── Telegram Primary CTA ──
  telegramPrimary: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    paddingHorizontal: 22, paddingVertical: 18, borderRadius: 16,
    shadowColor: '#2AABEE', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 18, elevation: 8,
    ...(isWeb ? { cursor: 'pointer' } : {}),
  },
  telegramPrimaryText: { color: '#fff', fontSize: 17, fontWeight: '800' },
  telegramPrimarySub: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: '500', marginTop: 2 },

  // ── Compact Contact Cards (3 in a row) ──
  contactCardInnerSm: {
    padding: 14, borderRadius: 18, alignItems: 'center', justifyContent: 'center', gap: 6, minHeight: 80,
  },
  contactCardLabelSm: { fontSize: 12, fontWeight: '700', textAlign: 'center' },

  // ── Trust Badges — Multi-color neon ──
  trustBadgesRow: {
    flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 24, marginTop: 6,
  },
  trustBadgeItem: {
    borderRadius: 12, overflow: 'hidden',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 12, elevation: 4,
  },
  trustBadgeGrad: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12,
  },
  trustBadgeIconGlow: {
    width: 26, height: 26, borderRadius: 8, justifyContent: 'center', alignItems: 'center',
  },
  trustBadgeText: { fontSize: 12, fontWeight: '700' },

  // ── Portfolio Result Badge ──
  resultBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start',
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, marginBottom: 14,
    backgroundColor: 'rgba(34,197,94,0.08)', borderWidth: 1,
  },
  resultBadgeText: { color: '#22c55e', fontSize: 12, fontWeight: '700' },

  // ── Contact Headline ──
  contactHeadline: {
    color: '#d4d4d8', fontSize: 16, fontWeight: '600', textAlign: 'center', lineHeight: 24, marginBottom: 8,
  },

  // ── Contact Form ──
  formCard: {
    marginTop: 24, padding: 24, borderRadius: 18,
    backgroundColor: 'rgba(99,102,241,0.06)', borderWidth: 1, borderColor: 'rgba(139,92,246,0.18)',
    ...(isWeb ? { backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' } as any : {}),
  },
  formTitle: { color: '#f5f5f5', fontSize: 18, fontWeight: '700', textAlign: 'center', marginBottom: 20 },
  formLabel: { color: '#a1a1aa', fontSize: 13, fontWeight: '600', marginBottom: 6, marginTop: 4 },
  formInput: {
    backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(99,102,241,0.15)',
    borderRadius: 10, paddingHorizontal: 16, paddingVertical: 13, color: '#f5f5f5', fontSize: 14, marginBottom: 4,
  },
  formInputErr: { borderColor: 'rgba(239,68,68,0.5)' },
  formTextArea: { minHeight: 100 },
  formErrText: { color: '#ef4444', fontSize: 12, fontWeight: '500', marginBottom: 6, marginLeft: 4 },
  consentRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginTop: 10, marginBottom: 4 },
  consentBox: {
    width: 22, height: 22, borderRadius: 6, borderWidth: 1.5, borderColor: 'rgba(99,102,241,0.3)',
    backgroundColor: 'rgba(255,255,255,0.04)', justifyContent: 'center', alignItems: 'center', marginTop: 2,
  },
  consentBoxActive: { backgroundColor: '#6366f1', borderColor: '#6366f1' },
  consentBoxErr: { borderColor: 'rgba(239,68,68,0.5)' },
  consentText: { color: '#a1a1aa', fontSize: 12, lineHeight: 18, flex: 1 },
  formBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    paddingVertical: 16, borderRadius: 12,
    shadowColor: '#6366f1', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 6,
    ...(isWeb ? { cursor: 'pointer' } : {}),
  },
  formBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  formSuccess: { alignItems: 'center', gap: 10, paddingVertical: 28 },
  formSuccessTitle: { color: '#f5f5f5', fontSize: 22, fontWeight: '800' },
  formSuccessText: { color: '#a1a1aa', fontSize: 15, textAlign: 'center', lineHeight: 22, maxWidth: 300 },
  formAgainBtn: { marginTop: 12, paddingHorizontal: 18, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(99,102,241,0.3)', ...(isWeb ? { cursor: 'pointer' } : {}) },
  formAgainText: { color: '#818cf8', fontSize: 13, fontWeight: '600' },
  formErrorBanner: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, borderRadius: 10, backgroundColor: 'rgba(239,68,68,0.08)', borderWidth: 1, borderColor: 'rgba(239,68,68,0.2)', marginTop: 8 },
  formErrorText: { color: '#ef4444', fontSize: 13, fontWeight: '500', flex: 1 },

  // ── Footer ──
  footer: { paddingHorizontal: 24, paddingTop: 28, paddingBottom: 80, alignItems: 'center' },
  footerTop: { alignItems: 'center', marginBottom: 16 },
  logoBoxSm: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  logoLettersSm: { color: '#fff', fontSize: 16, fontWeight: '800' },
  logoLabelSm: { color: '#f5f5f5', fontSize: 18, fontWeight: '700' },
  footerTagline: { color: '#52525b', fontSize: 13, marginTop: 6 },
  footerLinks: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  footerSocial: {
    width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(99,102,241,0.08)', justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(99,102,241,0.12)', ...(isWeb ? { cursor: 'pointer' } : {}),
  },
  footerDivider: { width: '100%', height: 1, backgroundColor: 'rgba(255,255,255,0.06)', marginBottom: 14 },
  footerCopy: { color: '#3f3f46', fontSize: 12, textAlign: 'center' },

  // ── Floating Action Buttons ──
  fab: { position: 'absolute', right: 16, bottom: 24, gap: 10, alignItems: 'center' },
  fabBtn: { borderRadius: 24, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  fabGrad: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
});
