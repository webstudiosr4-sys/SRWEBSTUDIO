import React, { useRef, useEffect, useState } from 'react';
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
  TextInput,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Image,
} from 'react-native';
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
    // Nav
    navServices: 'Services', navWork: 'Work', navPricing: 'Pricing', navContact: 'Contact',
    // Hero
    heroTitle1: 'Websites that bring clients', heroTitle2: '— fast and affordable',
    heroSub: 'I create modern websites for businesses in 2–3 days starting from ',
    heroSubPrice: '400 PLN',
    trustLine: 'Already helped multiple clients launch online',
    ctaOrder: 'Order a website', ctaConsult: 'Free consultation',
    // Services
    svcLabel: 'SERVICES', svcTitle: 'What I offer',
    svc1: 'Landing Pages', svc1d: 'Perfect for ads and quick sales',
    svc2: 'Business Websites', svc2d: 'Professional sites for your company',
    svc3: 'Online Stores', svc3d: 'Sell your products easily',
    // Advantages
    advLabel: 'ADVANTAGES', advTitle: 'Why choose SR Web Studio',
    adv1: 'Fast delivery', adv1d: '2–3 days turnaround',
    adv2: 'Affordable prices', adv2d: 'Starting from 400 PLN',
    adv3: 'Modern design', adv3d: 'Clean & professional',
    adv4: 'Mobile optimized', adv4d: 'Looks great everywhere',
    adv5: 'Personal approach', adv5d: 'Direct communication',
    // Portfolio
    portLabel: 'PORTFOLIO', portTitle: 'My work',
    port1: 'Barber Warszawa Premium', port1d: 'Exclusive barbershop website with online booking system and premium dark design', port1t: 'Landing Page',
    port1f1: 'Online booking', port1f2: '3D animations', port1f3: 'Mobile-first', port1f4: 'SEO optimized',
    port2: 'Cafe Retro Warszawa', port2d: 'Elegant café website with menu, gallery and warm retro atmosphere', port2t: 'Business Site',
    port2f1: 'Digital menu', port2f2: 'Photo gallery', port2f3: 'Contact form', port2f4: 'Google Maps',
    port3: 'Modern Store', port3d: 'Minimalist e-commerce with product catalog and seamless checkout', port3t: 'Online Store',
    port3f1: 'Product catalog', port3f2: 'Shopping cart', port3f3: 'Secure payments', port3f4: 'Order tracking',
    portBtn: 'View website',
    // Pricing
    priceLabel: 'PRICING', priceTitle: 'Simple pricing', priceGet: 'Get started',
    pricePop: 'Most Popular',
    p1: 'Basic', p1f1: '1 page website', p1f2: 'Simple modern design', p1f3: 'Mobile optimization',
    p2: 'Standard', p2f1: 'Up to 5 pages', p2f2: 'Custom design', p2f3: 'Mobile optimization', p2f4: 'Basic SEO', p2f5: 'Google Maps integration',
    p3: 'Premium', p3f1: 'Full website', p3f2: 'Advanced design', p3f3: 'SEO optimization', p3f4: 'Multi-language support (2 languages)', p3f5: 'Priority support',
    // Testimonials
    testLabel: 'TESTIMONIALS', testTitle: 'What clients say',
    t1: 'Got my landing page in 2 days. Already got my first clients through it!',
    t2: 'Fast, professional, and affordable. The website looks amazing on mobile.',
    t3: 'My online store was ready in 3 days. Sales started coming in right away.',
    // Final CTA
    ctaFinalTitle: 'Ready to get your website?', ctaFinalSub: "Let's build something that brings you clients",
    ctaOrderNow: 'Order now',
    // Contact
    contactLabel: 'CONTACT', contactTitle: 'Get in touch',
    formOr: 'Or send a message', formName: 'Your name', formEmail: 'Email',
    formMsg: 'Tell me about your project...', formSend: 'Send message',
    formSent: "Message sent! I'll reply soon.", formAnother: 'Send another',
    formFill: 'Please fill in all fields', formErr: 'Something went wrong. Try Telegram instead!',
    // Footer
    footerTag: 'Websites that work',
  },
  pl: {
    navServices: 'Usługi', navWork: 'Portfolio', navPricing: 'Cennik', navContact: 'Kontakt',
    heroTitle1: 'Strony, które przyciągają klientów', heroTitle2: '— szybko i w dobrej cenie',
    heroSub: 'Tworzę nowoczesne strony dla firm w 2–3 dni od ',
    heroSubPrice: '400 PLN',
    trustLine: 'Pomogłem wielu klientom zaistnieć w internecie',
    ctaOrder: 'Zamów stronę', ctaConsult: 'Bezpłatna konsultacja',
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
    port1: 'Barber Warszawa Premium', port1d: 'Ekskluzywna strona barbershopu z systemem rezerwacji online i ciemnym premium designem', port1t: 'Landing Page',
    port1f1: 'Rezerwacja online', port1f2: 'Animacje 3D', port1f3: 'Mobile-first', port1f4: 'SEO',
    port2: 'Cafe Retro Warszawa', port2d: 'Elegancka strona kawiarni z menu, galerią i ciepłą retro atmosferą', port2t: 'Strona firmowa',
    port2f1: 'Menu online', port2f2: 'Galeria zdjęć', port2f3: 'Formularz kontaktowy', port2f4: 'Google Maps',
    port3: 'Modern Store', port3d: 'Minimalistyczny e-commerce z katalogiem produktów i prostą finalizacją zakupów', port3t: 'Sklep online',
    port3f1: 'Katalog produktów', port3f2: 'Koszyk', port3f3: 'Bezpieczne płatności', port3f4: 'Śledzenie zamówień',
    portBtn: 'Zobacz stronę',
    priceLabel: 'CENNIK', priceTitle: 'Prosty cennik', priceGet: 'Rozpocznij',
    pricePop: 'Najpopularniejszy',
    p1: 'Basic', p1f1: 'Strona 1-stronicowa', p1f2: 'Prosty nowoczesny design', p1f3: 'Optymalizacja mobilna',
    p2: 'Standard', p2f1: 'Do 5 podstron', p2f2: 'Indywidualny design', p2f3: 'Optymalizacja mobilna', p2f4: 'Podstawowe SEO', p2f5: 'Integracja Google Maps',
    p3: 'Premium', p3f1: 'Pełna strona', p3f2: 'Zaawansowany design', p3f3: 'Optymalizacja SEO', p3f4: 'Wielojęzyczność (2 języki)', p3f5: 'Priorytetowe wsparcie',
    testLabel: 'OPINIE', testTitle: 'Co mówią klienci',
    t1: 'Landing page gotowy w 2 dni. Już mam pierwszych klientów!',
    t2: 'Szybko, profesjonalnie i w dobrej cenie. Strona świetnie wygląda na telefonie.',
    t3: 'Sklep online gotowy w 3 dni. Sprzedaż ruszyła od razu.',
    ctaFinalTitle: 'Gotowy na swoją stronę?', ctaFinalSub: 'Zbudujmy coś, co przyciągnie klientów',
    ctaOrderNow: 'Zamów teraz',
    contactLabel: 'KONTAKT', contactTitle: 'Skontaktuj się',
    formOr: 'Lub wyślij wiadomość', formName: 'Twoje imię', formEmail: 'Email',
    formMsg: 'Opowiedz o swoim projekcie...', formSend: 'Wyślij wiadomość',
    formSent: 'Wiadomość wysłana! Odpowiem wkrótce.', formAnother: 'Wyślij kolejną',
    formFill: 'Proszę wypełnić wszystkie pola', formErr: 'Coś poszło nie tak. Napisz na Telegram!',
    footerTag: 'Strony, które działają',
  },
};

// ── API ──
const getApiUrl = () => {
  const extra = Constants.expoConfig?.extra;
  if (extra?.EXPO_PUBLIC_BACKEND_URL) return extra.EXPO_PUBLIC_BACKEND_URL;
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

  // Language
  const [lang, setLang] = useState<'en' | 'pl'>('en');
  const t = TRANSLATIONS[lang];

  // Section refs
  const servicesY = useRef(0);
  const portfolioY = useRef(0);
  const pricingY = useRef(0);
  const contactY = useRef(0);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  // Floating orbs
  const orb1 = useRef(new Animated.Value(0)).current;
  const orb2 = useRef(new Animated.Value(0)).current;
  const orb3 = useRef(new Animated.Value(0)).current;

  // Testimonials carousel
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonialScrollRef = useRef<ScrollView>(null);
  const testimonialScrollX = useRef(new Animated.Value(0)).current;
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchingRef = useRef(false);
  const CARD_W = isSmallScreen ? Math.round(width * 0.82) : Math.min(Math.round(width * 0.85), 400);
  const CARD_GAP = 16;
  const SNAP = CARD_W + CARD_GAP;

  // Contact form
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();

    Animated.loop(Animated.sequence([
      Animated.timing(pulseAnim, { toValue: 1.04, duration: 1800, useNativeDriver: true }),
      Animated.timing(pulseAnim, { toValue: 1, duration: 1800, useNativeDriver: true }),
    ])).start();

    // Floating orbs
    const floatOrb = (anim: Animated.Value, dur: number) =>
      Animated.loop(Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: dur, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: dur, useNativeDriver: true }),
      ])).start();
    floatOrb(orb1, 6000);
    floatOrb(orb2, 8000);
    floatOrb(orb3, 7000);
  }, []);

  // Orb interpolations
  const orb1Y = orb1.interpolate({ inputRange: [0, 1], outputRange: [0, -20] });
  const orb1X = orb1.interpolate({ inputRange: [0, 1], outputRange: [0, 15] });
  const orb2Y = orb2.interpolate({ inputRange: [0, 1], outputRange: [0, 18] });
  const orb2X = orb2.interpolate({ inputRange: [0, 1], outputRange: [0, -12] });
  const orb3Y = orb3.interpolate({ inputRange: [0, 1], outputRange: [0, -14] });

  // Testimonials auto-scroll
  useEffect(() => {
    autoScrollRef.current = setInterval(() => {
      if (touchingRef.current) return;
      setActiveTestimonial(prev => {
        const next = (prev + 1) % 3;
        testimonialScrollRef.current?.scrollTo({ x: next * SNAP, animated: true });
        return next;
      });
    }, 4500);
    return () => { if (autoScrollRef.current) clearInterval(autoScrollRef.current); };
  }, []);

  const onTestimonialScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / SNAP);
    if (idx >= 0 && idx < 3 && idx !== activeTestimonial) setActiveTestimonial(idx);
  };

  const scrollTo = (ref: React.MutableRefObject<number>) => {
    scrollViewRef.current?.scrollTo({ y: ref.current - 60, animated: true });
  };

  const openTelegram = () => Linking.openURL(CONTACT.telegramUrl);
  const openEmail = () => Linking.openURL(`mailto:${CONTACT.email}`);
  const openWhatsApp = () => Linking.openURL(CONTACT.whatsappUrl);
  const openFacebook = () => Linking.openURL(CONTACT.facebookUrl);

  const submitForm = async () => {
    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) {
      Alert.alert(t.formFill);
      return;
    }
    setFormLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formName, email: formEmail, message: formMessage }),
      });
      if (res.ok) { setFormSent(true); setFormName(''); setFormEmail(''); setFormMessage(''); }
    } catch { Alert.alert(t.formErr); } finally { setFormLoading(false); }
  };

  const testimonials = [
    { name: 'Alex M.', role: 'Fitness Coach', text: t.t1, rating: 5 },
    { name: 'Sarah K.', role: 'Café Owner', text: t.t2, rating: 5 },
    { name: 'Mike T.', role: 'E-commerce', text: t.t3, rating: 5 },
  ];

  // ── RENDER ──
  return (
    <View style={[S.container, { paddingTop: insets.top }]}>
      <StatusBar style="light" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} contentContainerStyle={S.scrollContent}>

          {/* ════════ HERO ════════ */}
          <Animated.View style={[S.hero, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <LinearGradient colors={['rgba(99,102,241,0.14)', 'rgba(0,0,0,0)', 'rgba(139,92,246,0.1)']} style={StyleSheet.absoluteFill} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} />

            {/* Floating orbs for 3D depth */}
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
                <TouchableOpacity onPress={() => setLang('en')} style={[S.langBtn, lang === 'en' && S.langBtnActive]}>
                  <Text style={[S.langText, lang === 'en' && S.langTextActive]}>EN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setLang('pl')} style={[S.langBtn, lang === 'pl' && S.langBtnActive]}>
                  <Text style={[S.langText, lang === 'pl' && S.langTextActive]}>PL</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Nav */}
            <View style={S.navRow}>
              <TouchableOpacity onPress={() => scrollTo(servicesY)}><Text style={S.navLink}>{t.navServices}</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => scrollTo(portfolioY)}><Text style={S.navLink}>{t.navWork}</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => scrollTo(pricingY)}><Text style={S.navLink}>{t.navPricing}</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => scrollTo(contactY)}><Text style={S.navLink}>{t.navContact}</Text></TouchableOpacity>
            </View>

            <Text style={S.heroTitle}>{t.heroTitle1}{'\n'}<Text style={S.heroAccent}>{t.heroTitle2}</Text></Text>
            <Text style={S.heroSub}>{t.heroSub}<Text style={S.heroAccent}>{t.heroSubPrice}</Text></Text>

            <View style={S.trustBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#6366f1" />
              <Text style={S.trustText}>{t.trustLine}</Text>
            </View>

            <View style={S.ctaRow}>
              <TouchableOpacity onPress={openTelegram} activeOpacity={0.85}>
                <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                  <LinearGradient colors={['#6366f1', '#8b5cf6']} style={S.ctaPrimary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                    <Ionicons name="paper-plane" size={18} color="#fff" />
                    <Text style={S.ctaPrimaryText}>{t.ctaOrder}</Text>
                  </LinearGradient>
                </Animated.View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => scrollTo(contactY)} activeOpacity={0.85} style={S.ctaSecondary}>
                <Text style={S.ctaSecondaryText}>{t.ctaConsult}</Text>
                <Ionicons name="arrow-forward" size={16} color="#8b5cf6" />
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* ════════ SERVICES ════════ */}
          <View style={S.section} onLayout={e => { servicesY.current = e.nativeEvent.layout.y; }}>
            <Text style={S.sectionLabel}>{t.svcLabel}</Text>
            <Text style={S.sectionTitle}>{t.svcTitle}</Text>
            <View style={S.servicesGrid}>
              {[
                { icon: 'rocket-outline' as const, title: t.svc1, desc: t.svc1d, color: '#6366f1' },
                { icon: 'briefcase-outline' as const, title: t.svc2, desc: t.svc2d, color: '#8b5cf6' },
                { icon: 'cart-outline' as const, title: t.svc3, desc: t.svc3d, color: '#a855f7' },
              ].map((s, i) => (
                <View key={i} style={S.card3d}>
                  <LinearGradient colors={[`${s.color}18`, `${s.color}08`]} style={S.serviceCardInner} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <View style={[S.serviceIcon, { backgroundColor: `${s.color}20` }]}>
                      <Ionicons name={s.icon} size={26} color={s.color} />
                    </View>
                    <Text style={S.serviceTitle}>{s.title}</Text>
                    <Text style={S.serviceDesc}>{s.desc}</Text>
                  </LinearGradient>
                </View>
              ))}
            </View>
          </View>

          {/* ════════ WHY CHOOSE ME ════════ */}
          <View style={S.section}>
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
                <View key={i} style={S.advantageRow}>
                  <View style={S.advantageIconWrap}><Ionicons name={a.icon} size={22} color="#8b5cf6" /></View>
                  <View style={S.advantageTextWrap}>
                    <Text style={S.advantageTitle}>{a.title}</Text>
                    <Text style={S.advantageDesc}>{a.desc}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* ════════ PORTFOLIO ════════ */}
          <View style={S.section} onLayout={e => { portfolioY.current = e.nativeEvent.layout.y; }}>
            <Text style={S.sectionLabel}>{t.portLabel}</Text>
            <Text style={S.sectionTitle}>{t.portTitle}</Text>
            <View style={S.portfolioGrid}>
              {[
                {
                  title: t.port1, desc: t.port1d, tag: t.port1t,
                  features: [t.port1f1, t.port1f2, t.port1f3, t.port1f4],
                  image: 'https://images.unsplash.com/photo-1707836885254-79b6e3d7b18d?w=600&q=80',
                  url: '#', accent: '#d4a254',
                },
                {
                  title: t.port2, desc: t.port2d, tag: t.port2t,
                  features: [t.port2f1, t.port2f2, t.port2f3, t.port2f4],
                  image: 'https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=600&q=80',
                  url: '#', accent: '#ec4899',
                },
                {
                  title: t.port3, desc: t.port3d, tag: t.port3t,
                  features: [t.port3f1, t.port3f2, t.port3f3, t.port3f4],
                  image: 'https://images.unsplash.com/photo-1649442279006-8bccb4cc63e1?w=600&q=80',
                  url: '#', accent: '#8b5cf6',
                },
              ].map((p, i) => (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.92}
                  onPress={() => p.url !== '#' && Linking.openURL(p.url)}
                  style={S.portfolioCard}
                >
                  {/* Image Preview */}
                  <View style={S.portfolioImageWrap}>
                    <Image source={{ uri: p.image }} style={S.portfolioImg} resizeMode="cover" />
                    <LinearGradient
                      colors={['transparent', 'rgba(10,10,15,0.85)']}
                      style={S.portfolioImgOverlay}
                      start={{ x: 0, y: 0.3 }}
                      end={{ x: 0, y: 1 }}
                    />
                    <View style={[S.portfolioTagFloat, { backgroundColor: `${p.accent}25`, borderColor: `${p.accent}40` }]}>
                      <Text style={[S.portfolioTagText, { color: p.accent }]}>{p.tag}</Text>
                    </View>
                  </View>

                  {/* Content */}
                  <View style={S.portfolioContent}>
                    <Text style={S.portfolioCardTitle}>{p.title}</Text>
                    <Text style={S.portfolioCardDesc}>{p.desc}</Text>

                    {/* Features */}
                    <View style={S.portfolioFeatures}>
                      {p.features.map((f, fi) => (
                        <View key={fi} style={[S.portfolioFeaturePill, { borderColor: `${p.accent}30` }]}>
                          <View style={[S.portfolioFeatureDot, { backgroundColor: p.accent }]} />
                          <Text style={S.portfolioFeatureText}>{f}</Text>
                        </View>
                      ))}
                    </View>

                    {/* CTA Button */}
                    <View style={[S.portfolioBtnWrap, { borderColor: `${p.accent}40` }]}>
                      <Ionicons name="open-outline" size={16} color={p.accent} />
                      <Text style={[S.portfolioBtnText, { color: p.accent }]}>{t.portBtn}</Text>
                      <Ionicons name="arrow-forward" size={14} color={p.accent} />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* ════════ PRICING ════════ */}
          <View style={S.section} onLayout={e => { pricingY.current = e.nativeEvent.layout.y; }}>
            <Text style={S.sectionLabel}>{t.priceLabel}</Text>
            <Text style={S.sectionTitle}>{t.priceTitle}</Text>
            <View style={S.pricingGrid}>
              {[
                { name: t.p1, price: 'od 400 PLN', features: [t.p1f1, t.p1f2, t.p1f3], popular: false, color: '#6366f1' },
                { name: t.p2, price: 'od 700 PLN', features: [t.p2f1, t.p2f2, t.p2f3, t.p2f4, t.p2f5], popular: true, color: '#8b5cf6' },
                { name: t.p3, price: 'od 1500 PLN', features: [t.p3f1, t.p3f2, t.p3f3, t.p3f4, t.p3f5], popular: false, color: '#a855f7' },
              ].map((plan, i) => (
                <View key={i} style={[S.pricingCard, plan.popular && S.pricingCardPop]}>
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
                  <TouchableOpacity onPress={openTelegram} activeOpacity={0.85}>
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
          </View>

          {/* ════════ TESTIMONIALS ════════ */}
          <View style={S.section}>
            <Text style={S.sectionLabel}>{t.testLabel}</Text>
            <Text style={S.sectionTitle}>{t.testTitle}</Text>
            <Animated.ScrollView
              ref={testimonialScrollRef} horizontal showsHorizontalScrollIndicator={false}
              snapToInterval={SNAP} decelerationRate="fast" contentContainerStyle={S.carouselWrap}
              onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: testimonialScrollX } } }], { useNativeDriver: true, listener: onTestimonialScroll })}
              scrollEventThrottle={16}
              onTouchStart={() => { touchingRef.current = true; if (autoScrollRef.current) clearInterval(autoScrollRef.current); }}
              onTouchEnd={() => {
                touchingRef.current = false;
                autoScrollRef.current = setInterval(() => {
                  if (touchingRef.current) return;
                  setActiveTestimonial(prev => { const next = (prev + 1) % 3; testimonialScrollRef.current?.scrollTo({ x: next * SNAP, animated: true }); return next; });
                }, 4500);
              }}
              onMomentumScrollEnd={onTestimonialScroll}
            >
              {testimonials.map((tt, i) => {
                const range = [(i - 1) * SNAP, i * SNAP, (i + 1) * SNAP];
                const scale = testimonialScrollX.interpolate({ inputRange: range, outputRange: [0.9, 1.02, 0.9], extrapolate: 'clamp' });
                const opacity = testimonialScrollX.interpolate({ inputRange: range, outputRange: [0.5, 1, 0.5], extrapolate: 'clamp' });
                const rotY = testimonialScrollX.interpolate({ inputRange: range, outputRange: ['3deg', '0deg', '-3deg'], extrapolate: 'clamp' });
                return (
                  <Animated.View key={i} style={[S.testimonialCard, { width: CARD_W, transform: [{ perspective: 800 }, { scale }, { rotateY: rotY }], opacity }]}>
                    <View style={S.testimonialStars}>
                      {[...Array(tt.rating)].map((_, si) => <Ionicons key={si} name="star" size={14} color="#f59e0b" />)}
                    </View>
                    <Text style={S.testimonialText}>"{tt.text}"</Text>
                    <View style={S.testimonialAuthor}>
                      <View style={S.testimonialAvatar}>
                        <LinearGradient colors={['#6366f1', '#a855f7']} style={S.testimonialAvatarBg}>
                          <Text style={S.testimonialAvatarLetter}>{tt.name.charAt(0)}</Text>
                        </LinearGradient>
                      </View>
                      <View>
                        <Text style={S.testimonialName}>{tt.name}</Text>
                        <Text style={S.testimonialRole}>{tt.role}</Text>
                      </View>
                    </View>
                  </Animated.View>
                );
              })}
            </Animated.ScrollView>
            <View style={S.dots}>{[0, 1, 2].map(i => <View key={i} style={[S.dot, activeTestimonial === i && S.dotActive]} />)}</View>
          </View>

          {/* ════════ FINAL CTA ════════ */}
          <View style={S.finalCta}>
            <LinearGradient colors={['rgba(99,102,241,0.18)', 'rgba(139,92,246,0.12)']} style={S.finalCtaInner} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <Text style={S.finalCtaTitle}>{t.ctaFinalTitle}</Text>
              <Text style={S.finalCtaSub}>{t.ctaFinalSub}</Text>
              <View style={S.finalCtaBtns}>
                <TouchableOpacity onPress={openTelegram} activeOpacity={0.85}>
                  <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                    <LinearGradient colors={['#6366f1', '#8b5cf6']} style={S.ctaPrimary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                      <Ionicons name="paper-plane" size={18} color="#fff" />
                      <Text style={S.ctaPrimaryText}>{t.ctaOrderNow}</Text>
                    </LinearGradient>
                  </Animated.View>
                </TouchableOpacity>
                <View style={S.socialCtaRow}>
                  <TouchableOpacity onPress={openWhatsApp} activeOpacity={0.85} style={S.socialCtaBtn}>
                    <Ionicons name="logo-whatsapp" size={18} color="#25D366" />
                    <Text style={[S.socialCtaText, { color: '#25D366' }]}>WhatsApp</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={openFacebook} activeOpacity={0.85} style={S.socialCtaBtn}>
                    <Ionicons name="logo-facebook" size={18} color="#1877F2" />
                    <Text style={[S.socialCtaText, { color: '#1877F2' }]}>Facebook</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* ════════ CONTACT ════════ */}
          <View style={S.section} onLayout={e => { contactY.current = e.nativeEvent.layout.y; }}>
            <Text style={S.sectionLabel}>{t.contactLabel}</Text>
            <Text style={S.sectionTitle}>{t.contactTitle}</Text>

            <View style={S.contactGrid}>
              <View style={S.contactBtnRow}>
                <TouchableOpacity onPress={openTelegram} activeOpacity={0.85} style={S.contactBtn}>
                  <LinearGradient colors={['#2AABEE', '#229ED9']} style={S.contactBtnGrad}>
                    <Ionicons name="paper-plane" size={20} color="#fff" />
                    <Text style={S.contactBtnText}>Telegram</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={openWhatsApp} activeOpacity={0.85} style={S.contactBtn}>
                  <LinearGradient colors={['#25D366', '#128C7E']} style={S.contactBtnGrad}>
                    <Ionicons name="logo-whatsapp" size={20} color="#fff" />
                    <Text style={S.contactBtnText}>WhatsApp</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View style={S.contactBtnRow}>
                <TouchableOpacity onPress={openFacebook} activeOpacity={0.85} style={S.contactBtn}>
                  <LinearGradient colors={['#1877F2', '#0C5DC7']} style={S.contactBtnGrad}>
                    <Ionicons name="logo-facebook" size={20} color="#fff" />
                    <Text style={S.contactBtnText}>Facebook</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={openEmail} activeOpacity={0.85} style={S.contactBtn}>
                  <LinearGradient colors={['#6366f1', '#8b5cf6']} style={S.contactBtnGrad}>
                    <Ionicons name="mail" size={20} color="#fff" />
                    <Text style={S.contactBtnText}>Email</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

            {/* Contact Form */}
            <View style={S.formCard}>
              <Text style={S.formTitle}>{t.formOr}</Text>
              {formSent ? (
                <View style={S.formSuccess}>
                  <Ionicons name="checkmark-circle" size={40} color="#22c55e" />
                  <Text style={S.formSuccessText}>{t.formSent}</Text>
                  <TouchableOpacity onPress={() => setFormSent(false)}><Text style={S.formSuccessLink}>{t.formAnother}</Text></TouchableOpacity>
                </View>
              ) : (
                <>
                  <TextInput style={S.input} placeholder={t.formName} placeholderTextColor="#52525b" value={formName} onChangeText={setFormName} />
                  <TextInput style={S.input} placeholder={t.formEmail} placeholderTextColor="#52525b" value={formEmail} onChangeText={setFormEmail} keyboardType="email-address" autoCapitalize="none" />
                  <TextInput style={[S.input, S.inputMulti]} placeholder={t.formMsg} placeholderTextColor="#52525b" value={formMessage} onChangeText={setFormMessage} multiline numberOfLines={4} textAlignVertical="top" />
                  <TouchableOpacity onPress={submitForm} activeOpacity={0.85} disabled={formLoading}>
                    <LinearGradient colors={['#6366f1', '#8b5cf6']} style={S.formBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                      {formLoading ? <ActivityIndicator color="#fff" size="small" /> : (
                        <><Text style={S.formBtnText}>{t.formSend}</Text><Ionicons name="send" size={16} color="#fff" /></>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>

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
              <TouchableOpacity onPress={openTelegram} style={S.footerSocial}><Ionicons name="paper-plane" size={20} color="#2AABEE" /></TouchableOpacity>
              <TouchableOpacity onPress={openWhatsApp} style={S.footerSocial}><Ionicons name="logo-whatsapp" size={20} color="#25D366" /></TouchableOpacity>
              <TouchableOpacity onPress={openFacebook} style={S.footerSocial}><Ionicons name="logo-facebook" size={20} color="#1877F2" /></TouchableOpacity>
              <TouchableOpacity onPress={openEmail} style={S.footerSocial}><Ionicons name="mail" size={20} color="#8b5cf6" /></TouchableOpacity>
            </View>
            <View style={S.footerDivider} />
            <Text style={S.footerCopy}>© {new Date().getFullYear()} SR Web Studio. All rights reserved.</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ════════ FLOATING SOCIAL BUTTONS ════════ */}
      <View style={S.fab}>
        <TouchableOpacity onPress={openTelegram} activeOpacity={0.85} style={S.fabBtn}>
          <LinearGradient colors={['#2AABEE', '#229ED9']} style={S.fabGrad}><Ionicons name="paper-plane" size={22} color="#fff" /></LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={openWhatsApp} activeOpacity={0.85} style={S.fabBtn}>
          <LinearGradient colors={['#25D366', '#128C7E']} style={S.fabGrad}><Ionicons name="logo-whatsapp" size={22} color="#fff" /></LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={openFacebook} activeOpacity={0.85} style={S.fabBtn}>
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

  // Floating orbs
  orb: { position: 'absolute', borderRadius: 999 },
  orb1: { width: 180, height: 180, top: -40, right: -60, backgroundColor: 'rgba(99,102,241,0.08)' },
  orb2: { width: 120, height: 120, bottom: 20, left: -40, backgroundColor: 'rgba(168,85,247,0.07)' },
  orb3: { width: 90, height: 90, top: 100, right: 30, backgroundColor: 'rgba(236,72,153,0.06)' },

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
    shadowColor: '#6366f1', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 14, elevation: 8,
    ...(isWeb ? { cursor: 'pointer' } : {}),
  },
  ctaPrimaryText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  ctaSecondary: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 20, paddingVertical: 14, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(139,92,246,0.3)', ...(isWeb ? { cursor: 'pointer' } : {}) },
  ctaSecondaryText: { color: '#8b5cf6', fontSize: 15, fontWeight: '600' },

  // ── Sections ──
  section: { paddingHorizontal: 24, paddingVertical: 36 },
  sectionLabel: { color: '#6366f1', fontSize: 12, fontWeight: '700', letterSpacing: 2, textAlign: 'center', marginBottom: 6 },
  sectionTitle: { fontSize: isSmallScreen ? 24 : 30, fontWeight: '800', color: '#f5f5f5', textAlign: 'center', marginBottom: 26, letterSpacing: -0.3 },

  // ── 3D Card ──
  card3d: {
    borderRadius: 16, overflow: 'hidden',
    shadowColor: '#6366f1', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 16, elevation: 6,
    backgroundColor: 'rgba(99,102,241,0.04)',
    borderWidth: 1, borderColor: 'rgba(99,102,241,0.1)',
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
    backgroundColor: 'rgba(99,102,241,0.06)', borderWidth: 1, borderColor: 'rgba(99,102,241,0.1)',
    shadowColor: '#6366f1', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  advantageIconWrap: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(139,92,246,0.12)', justifyContent: 'center', alignItems: 'center' },
  advantageTextWrap: { flex: 1 },
  advantageTitle: { color: '#f5f5f5', fontSize: 16, fontWeight: '700' },
  advantageDesc: { color: '#71717a', fontSize: 13, marginTop: 2 },

  // ── Portfolio ──
  portfolioGrid: { gap: 24 },
  portfolioCard: {
    borderRadius: 20, overflow: 'hidden',
    backgroundColor: 'rgba(15,15,25,0.9)',
    borderWidth: 1, borderColor: 'rgba(99,102,241,0.12)',
    shadowColor: '#6366f1', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 24, elevation: 8,
  },
  portfolioImageWrap: {
    height: 200, position: 'relative', overflow: 'hidden',
  },
  portfolioImg: {
    width: '100%', height: '100%',
  },
  portfolioImgOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  portfolioTagFloat: {
    position: 'absolute', top: 14, left: 14,
    paddingHorizontal: 12, paddingVertical: 5, borderRadius: 8,
    borderWidth: 1,
  },
  portfolioTagText: {
    fontSize: 11, fontWeight: '700', letterSpacing: 0.5, textTransform: 'uppercase',
  },
  portfolioContent: {
    padding: 20,
  },
  portfolioCardTitle: {
    color: '#f5f5f5', fontSize: 20, fontWeight: '800', marginBottom: 8, letterSpacing: -0.3,
  },
  portfolioCardDesc: {
    color: '#a1a1aa', fontSize: 14, lineHeight: 20, marginBottom: 16,
  },
  portfolioFeatures: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 18,
  },
  portfolioFeaturePill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1,
  },
  portfolioFeatureDot: {
    width: 6, height: 6, borderRadius: 3,
  },
  portfolioFeatureText: {
    color: '#d4d4d8', fontSize: 12, fontWeight: '500',
  },
  portfolioBtnWrap: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    paddingVertical: 12, borderRadius: 12, borderWidth: 1,
    ...(isWeb ? { cursor: 'pointer' } : {}),
  },
  portfolioBtnText: {
    fontSize: 14, fontWeight: '700',
  },

  // ── Pricing ──
  pricingGrid: { gap: 16 },
  pricingCard: {
    borderRadius: 16, padding: 24, backgroundColor: 'rgba(99,102,241,0.06)', borderWidth: 1, borderColor: 'rgba(99,102,241,0.1)',
    position: 'relative', overflow: 'hidden',
    shadowColor: '#6366f1', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 4,
  },
  pricingCardPop: { borderColor: 'rgba(99,102,241,0.4)', backgroundColor: 'rgba(99,102,241,0.1)', shadowOpacity: 0.25 },
  popularBadge: { position: 'absolute', top: 0, right: 0, paddingHorizontal: 14, paddingVertical: 6, borderBottomLeftRadius: 12 },
  popularBadgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  pricingName: { color: '#a1a1aa', fontSize: 14, fontWeight: '600', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 },
  pricingPrice: { color: '#f5f5f5', fontSize: 30, fontWeight: '800', marginBottom: 18 },
  pricingFeatures: { gap: 10, marginBottom: 20 },
  pricingFeatureRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  pricingFeatureText: { color: '#d4d4d8', fontSize: 14 },
  pricingBtn: { paddingVertical: 14, borderRadius: 10, alignItems: 'center', ...(isWeb ? { cursor: 'pointer' } : {}) },
  pricingBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },

  // ── Testimonials ──
  carouselWrap: {
    paddingHorizontal: Math.round((width - (isSmallScreen ? Math.round(width * 0.82) : Math.min(Math.round(width * 0.85), 400))) / 2),
    gap: 16, alignItems: 'center', paddingVertical: 8,
  },
  testimonialCard: {
    borderRadius: 16, padding: 22, backgroundColor: 'rgba(99,102,241,0.08)', borderWidth: 1, borderColor: 'rgba(99,102,241,0.15)',
    shadowColor: '#6366f1', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 10, elevation: 4,
  },
  testimonialStars: { flexDirection: 'row', gap: 2, marginBottom: 12 },
  testimonialText: { color: '#d4d4d8', fontSize: 15, lineHeight: 22, fontStyle: 'italic', marginBottom: 16 },
  testimonialAuthor: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  testimonialAvatar: { width: 36, height: 36, borderRadius: 18, overflow: 'hidden' },
  testimonialAvatarBg: { width: 36, height: 36, justifyContent: 'center', alignItems: 'center' },
  testimonialAvatarLetter: { color: '#fff', fontSize: 15, fontWeight: '700' },
  testimonialName: { color: '#f5f5f5', fontSize: 14, fontWeight: '700' },
  testimonialRole: { color: '#71717a', fontSize: 12 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginTop: 18 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(99,102,241,0.2)' },
  dotActive: { width: 24, backgroundColor: '#6366f1' },

  // ── Final CTA ──
  finalCta: { paddingHorizontal: 24, paddingVertical: 28 },
  finalCtaInner: {
    padding: 28, borderRadius: 20, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(99,102,241,0.25)',
    shadowColor: '#6366f1', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 20, elevation: 6,
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

  // ── Contact ──
  contactGrid: { gap: 10, marginBottom: 20 },
  contactBtnRow: { flexDirection: 'row', gap: 10 },
  contactBtn: { flex: 1, borderRadius: 12, overflow: 'hidden' },
  contactBtnGrad: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4,
    ...(isWeb ? { cursor: 'pointer' } : {}),
  },
  contactBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },

  formCard: { backgroundColor: 'rgba(99,102,241,0.06)', borderRadius: 16, padding: 22, borderWidth: 1, borderColor: 'rgba(99,102,241,0.1)' },
  formTitle: { color: '#d4d4d8', fontSize: 16, fontWeight: '600', marginBottom: 16, textAlign: 'center' },
  input: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: 14, color: '#f5f5f5', fontSize: 15, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(99,102,241,0.1)' },
  inputMulti: { minHeight: 100, textAlignVertical: 'top' },
  formBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: 10, marginTop: 4, ...(isWeb ? { cursor: 'pointer' } : {}) },
  formBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  formSuccess: { alignItems: 'center', paddingVertical: 20, gap: 10 },
  formSuccessText: { color: '#d4d4d8', fontSize: 16, fontWeight: '600' },
  formSuccessLink: { color: '#6366f1', fontSize: 14, fontWeight: '600', marginTop: 6 },

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
  fab: {
    position: 'absolute', right: 16, bottom: 24, gap: 10, alignItems: 'center',
  },
  fabBtn: { borderRadius: 24, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  fabGrad: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
});
